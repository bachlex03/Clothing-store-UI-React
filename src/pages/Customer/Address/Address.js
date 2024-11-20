import style from './Address.module.scss';
import classNames from 'classnames/bind';
import { Input, Button } from '~/components';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import * as accountService from '~/services/api/accountService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Address() {
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const navigate = useNavigate();

  // Thêm states cho validation
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Thêm regex patterns
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,}$/;
  const streetRegex = /^[a-zA-Z0-9À-ỹ\s,.-/]{5,}$/;
  const phoneRegex = /^[0-9]{8,15}$/;

  useEffect(() => {
    fetchingAccount.mutate();
  }, []);

  const fetchingAccount = useMutation({
    mutationFn: async () => {
      return await accountService.getProfile();
    },
    onSuccess: (data) => {
      setFirstName(data.data.profile_firstName);
      setLastName(data.data.profile_lastName);
      setPhone(data.data.profile_phoneNumber);
      setEmail(data.data.email);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);
        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
        //if code is 401, it means user is not authenticated, navigate to login page
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await accountService.getCities();
      if (data) {
        // console.log(data.data);
        setCities(data.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await accountService.getDistricts(city?.id);
      if (data) {
        // console.log(data.data);
        setDistricts(data.data);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await accountService.getAddresses();
        if (response.status === 200) {
          setUserCountry(response.data.address_country);
          setUserCity(response.data.address_province);
          setUserDistrict(response.data.address_district);
          setStreet(response.data.address_addressLine);
        }
      } catch (error) {
        console.error('Error during fetch addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle input changes
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(false);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(false);
  };

  const handleStreetChange = (e) => {
    const value = e.target.value;
    setStreet(value);
    setStreetError(false);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép nhập số
    if (value === '' || /^[0-9]{0,15}$/.test(value)) {
      setPhone(value);
      setPhoneError(false);
    }
  };

  const validateAddress = () => {
    let isValid = true;

    // Reset all error states
    setFirstNameError(false);
    setLastNameError(false);
    setStreetError(false);
    setPhoneError(false);

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedStreet = street.trim();
    const trimmedPhone = phone.trim();

    // Validate firstName
    if (!trimmedFirstName) {
      setFirstNameError(true);
      toast.warning('First name is required');
      isValid = false;
    } else if (!nameRegex.test(trimmedFirstName)) {
      setFirstNameError(true);
      toast.warning('First name must contain only letters and at least 2 characters');
      isValid = false;
    }

    // Validate lastName
    if (!trimmedLastName) {
      setLastNameError(true);
      toast.warning('Last name is required');
      isValid = false;
    } else if (!nameRegex.test(trimmedLastName)) {
      setLastNameError(true);
      toast.warning('Last name must contain only letters and at least 2 characters');
      isValid = false;
    }

    // Validate street address
    if (!trimmedStreet) {
      setStreetError(true);
      toast.warning('Street address is required');
      isValid = false;
    } else if (!streetRegex.test(trimmedStreet)) {
      setStreetError(true);
      toast.warning('Street address must be at least 5 characters and contain only letters, numbers, spaces, commas, dots, hyphens, and forward slashes');
      isValid = false;
    }

    // Validate phone number (optional but must be valid if provided)
    if (trimmedPhone && !phoneRegex.test(trimmedPhone)) {
      setPhoneError(true);
      toast.warning('Phone number must contain 8-15 digits only');
      isValid = false;
    }

    // Validate location fields
    if (!country && !userCountry) {
      toast.warning('Country is required');
      isValid = false;
    }
    if (!city && !userCity) {
      toast.warning('City is required');
      isValid = false;
    }
    if (!district && !userDistrict) {
      toast.warning('District is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateAddress()) {
      let info = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone.trim(),
        district: district.name || userDistrict,
        province: city.name || userCity,
        country: country || userCountry,
        addressLine: street.trim(),
      };

      updateCheckoutInfo.mutate(info);
    }
  };

  const updateCheckoutInfo = useMutation({
    mutationFn: async (info) => {
      return await accountService.updateCheckoutInfo(info);
    },
    onSuccess: (data) => {
      toast.success('Address updated successfully');
    },
    onError: (error) => {
      console.error('Error during update address:', error);
      toast.error('Address updated failed');
    },
  });

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Billing Addresses</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w100 px-10px">
            <Input
              name="firstName"
              label="First name"
              placeholder="First name..."
              required
              isRequired
              value={firstName}
              onChange={handleFirstNameChange}
            />
            {firstNameError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {' First name must contain only letters and at least 2 characters'}
              </p>
            )}
          </div>

          <div className="w100 px-10px">
            <Input
              name="lastName"
              label="Last name"
              placeholder="Last name..."
              required
              isRequired
              value={lastName}
              onChange={handleLastNameChange}
            />
            {lastNameError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {' Last name must contain only letters and at least 2 characters'}
              </p>
            )}
          </div>
        </div>

        <div className="w100 px-10px mt-16px">
          <label className={cx('label')}>
            Country <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className={cx('selection')}
            aria-label="Default select example"
            value="default"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="default">{userCountry || '-- Choose your opinion --'}</option>
            <option value="Việt Nam">Việt Nam</option>
          </select>
        </div>

        <div className="w100 px-10px mt-16px">
          <label className={cx('label')}>
            Province / City <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className={cx('selection')}
            aria-label="Default select example"
            value="default"
            onChange={(e) => {
              const selectedCity = cities.find((city) => city.name === e.target.value);
              setCity(selectedCity);
            }}
          >
            <option value="default" disabled>{city?.name || userCity || '-- Choose your opinion --'}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w100 px-10px mt-16px">
          <label className={cx('label')}>
            District <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className={cx('selection')}
            aria-label="Default select example"
            value="default"
            onChange={(e) => {
              const selectedDistrict = districts.find((district) => district.name === e.target.value);
              setDistrict(selectedDistrict);
            }}
          >
            <option value="default" disabled>{district?.name || userDistrict || '-- Choose your opinion --'}</option>
            {districts.map((district) => (
              <option value={district.name}>{district.name}</option>
            ))}
          </select>
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            name="addressLine"
            label="Street address"
            placeholder="Street address..."
            isRequired
            required
            value={street}
            onChange={handleStreetChange}
          />
          {streetError && (
            <p className={cx('error-message')}>
              <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
              {' Street address must be at least 5 characters and contain only letters, numbers, spaces, commas, dots, hyphens, and forward slashes'}
            </p>
          )}
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            name="phoneNumber"
            label="Phone number"
            placeholder="Enter phone number..."
            value={phone}
            onChange={handlePhoneChange}
          />
          {phoneError && (
            <p className={cx('error-message')}>
              <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
              {' Phone number must contain 8-15 digits only'}
            </p>
          )}
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            name="email"
            label="Email address"
            placeholder="Email address..."
            type="email"
            notEditable
            disabled
            value={email}
          />
        </div>

        <div className={cx('btn-wrapper')}>
          <button type="submit" className={cx('button')}>
            Save address
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default Address;
