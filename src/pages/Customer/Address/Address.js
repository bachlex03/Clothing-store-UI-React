import style from './Address.module.scss';
import classNames from 'classnames/bind';
import { Input, Button } from '~/components';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as accountService from '~/services/api/accountService';

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

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await accountService.getProfile();
        if (response.status === 200) {
          setFirstName(response.data.profile_firstName);
          setLastName(response.data.profile_lastName);
          setPhone(response.data.profile_phoneNumber);
          setEmail(response?.data?.email);
        }
      } catch (error) {
        console.error('Error during fetch account:', error);
      }
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await accountService.getCities();
      if (data) {
        console.log(data.data);
        setCities(data.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await accountService.getDistricts(city?.id);
      if (data) {
        console.log(data.data);
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

      try {
        const response = await accountService.updateCheckoutInfo(info);
        if (response.status === 200) {
          toast.success('Address updated successfully');
        }
      } catch (error) {
        console.error('Error during update address:', error);
        toast.error('Address updated failed');
      }
    }

    window.scrollTo(0, 0);
  };

  const validateAddress = () => {
    if (!country && !userCountry) {
      toast.warn('Country is required');
      return false;
    }
    if (!city && !userCity) {
      toast.warn('City is required');
      return false;
    }
    if (!district && !userDistrict) {
      toast.warn('District is required');
      return false;
    }
    if (!street) {
      toast.warn('Street is required');
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
            onChange={(e) => setCountry(e.target.value)}
          >
            <option selected>{userCountry || '-- Choose your opinion --'}</option>
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
            onChange={(e) => {
              const selectedCity = cities.find((city) => city.name === e.target.value);
              setCity(selectedCity);
            }}
          >
            <option selected>{userCity || '-- Choose your opinion --'}</option>
            {cities.map((city) => (
              <option value={city.name}>{city.name}</option>
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
            onChange={(e) => {
              const selectedDistrict = districts.find((district) => district.name === e.target.value);
              setDistrict(selectedDistrict);
            }}
          >
            <option selected>{userDistrict || '-- Choose your opinion --'}</option>
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
            disable
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
