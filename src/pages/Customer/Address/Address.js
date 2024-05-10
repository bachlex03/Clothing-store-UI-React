import style from './Address.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import * as accountService from '~/services/api/accountService';

const cx = classNames.bind(style);

function Address() {
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
          setUserCity(response.data.address_city);
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
      const data = await accountService.getDistricts(city.id);
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

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Billing Address</h3>
      <form>
        <div className="d-flex justify-content-between">
          <div className={cx('w-50', 'px-3')}>
            <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
              First name <span style={{ color: 'red' }}>*</span>
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
              Last name <span style={{ color: 'red' }}>*</span>
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
          >
            <option selected>{{ userCountry } ? userCountry : '-- Choose your opinion --'}</option>
            <option value="Vietnam">Việt Nam</option>
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
            <option selected>{{ userCity } ? userCity : '-- Choose your opinion --'}</option>
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
            <option selected>-- Choose your opinion --</option>
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
            Phone number <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
            id="basic-url"
            placeholder="+84 123 456 789"
            disabled
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={cx('w-100', 'px-3', 'mt-4')}>
          <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
            Email address <span style={{ color: 'red' }}>*</span>
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
    </div>
  );
}

export default Address;
