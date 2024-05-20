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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateAddress()) {
      let info = {
        firstName,
        lastName,
        phoneNumber: phone,
        district: district.name || userDistrict,
        province: city.name || userCity,
        country: country || userCountry,
        addressLine: street,
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

  const validateAddress = () => {
    if (!country && !userCountry) {
      toast.warning('Country is required');
      return false;
    }
    if (!city && !userCity) {
      toast.warning('City is required');
      return false;
    }
    if (!district && !userDistrict) {
      toast.warning('District is required');
      return false;
    }
    if (!street) {
      toast.warning('Street is required');
      return false;
    }
    return true;
  };

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
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w100 px-10px">
            <Input
              name="lastName"
              label="Last name"
              placeholder="Last name..."
              required
              isRequired
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            <option value="default">{userCity || '-- Choose your opinion --'}</option>
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
            <option value="default">{userDistrict || '-- Choose your opinion --'}</option>
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
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            name="phoneNumber"
            label="Phone number"
            placeholder="(+84)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
