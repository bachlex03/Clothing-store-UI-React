import style from './Address.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import * as accountService from '~/services/api/accountService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const fetchAddresses = async () => {
      try {
        const response = await accountService.getAddresses();
        if (response.status === 200) {
          setUserCountry(response.data.address_country);
          setUserCity(response.data.address_province);
          setUserDistrict(response.data.address_city);
          setStreet(response.data.address_addressLine);
        }
      } catch (error) {
        console.error('Error during fetch addresses:', error);
      }
    };

    fetchAddresses();
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

  // const inputStreet = (e) => {
  //   let street = e.target.value;
  //   let streetLines = street.trim().concat(', ', district.name);
  //   setStreet(streetLines);
  //   console.log(streetLines);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateAddress()) {
      let address = {
        country: country,
        province: city.name,
        city: district.name,
        addressLine: street,
      };

      try {
        const response = await accountService.updateAddress(address);
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
    if (!country) {
      toast.warn('Country is required');
      return false;
    }
    if (!city) {
      toast.warn('City is required');
      return false;
    }
    if (!district) {
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
      <h3 className={cx('heading')}>Billing Address</h3>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <div className={cx('w-50', 'px-3')}>
            <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
              First name
            </label>
            <input
              type="text"
              className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
              id="basic-url"
              placeholder="First name..."
              disabled
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={cx('w-50', 'px-3')}>
            <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
              Last name
            </label>
            <input
              type="text"
              className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
              id="basic-url"
              placeholder="Last name..."
              disabled
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label className={cx('form-label', 'mb-0', 'label-ovr')}>
            Country <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className={cx('form-select', 'form-select-ovr', 'rounded-5', 'my-3')}
            aria-label="Default select example"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option selected>{userCountry || '-- Choose your opinion --'}</option>
            <option value="Việt Nam">Việt Nam</option>
          </select>
        </div>

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label className={cx('form-label', 'mb-0', 'label-ovr')}>
            Province / City <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className={cx('form-select', 'form-select-ovr', 'rounded-5', 'my-3')}
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

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label className={cx('form-label', 'mb-0', 'label-ovr')}>
            District <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className={cx('form-select', 'form-select-ovr', 'rounded-5', 'my-3')}
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

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
            Street address <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
            id="basic-url"
            placeholder="Street address..."
            onChange={(e) => setStreet(e.target.value)}
            value={street}
          />
        </div>

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
            Phone number
          </label>
          <input
            type="text"
            className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
            id="basic-url"
            placeholder="Phone number..."
            disabled
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
            Email address
          </label>
          <input
            type="text"
            className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
            id="basic-url"
            placeholder="email@gmail.com"
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={cx('mt-5 d-flex flex-row-reverse')}>
          <button type="submit" className={cx('btn btn-dark rounded-5 mb-0 text-uppercase', 'button')}>
            Save Address
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default Address;
