import style from './Register.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { LoginNoti } from '~/components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as accountService from '~/services/api/accountService';
import qs from 'qs';

const cx = classNames.bind(style);

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let user = {
        firstName,
        lastName,
        email,
        password,
      };
      try {
        const response = await accountService.register(qs.stringify(user));
        if (response.status === 200) {
          const jwtMailToken = new URLSearchParams(response?.data?.redirect.split('?')[1]).get('q');
          const verifyResponse = await accountService.sendMailToken(qs.stringify({ q: jwtMailToken }));
          if (verifyResponse.status === 200) {
            navigate(response?.data?.redirect);
          }
        }
      } catch (error) {
        let newErrors = [error?.response?.data?.message];
        setErrors(newErrors);
        console.error('Error during registration:', error);
      }
    }
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

    if (!email.trim()) {
      setEmailEmpty(true);
      newErrors.push("Email can't be blank");
      isValid = false;
    } else {
      setEmailEmpty(false);
      if (!emailRegex.test(email)) {
        setEmailInvalid(true);
        newErrors.push('Email must be in correct format');
        isValid = false;
      } else {
        setEmailInvalid(false);
      }
    }

    if (!password.trim()) {
      setPasswordEmpty(true);
      setPasswordInvalid(false);
      newErrors.push("Password can't be blank");
      isValid = false;
    } else {
      setPasswordEmpty(false);
      if (!passwordRegex.test(password)) {
        setPasswordInvalid(true);
        newErrors.push(
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
        );
        isValid = false;
      } else {
        setPasswordInvalid(false);
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>Register</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-register')}>
          <div className={cx('register-wrapper')}>
            <form onSubmit={handleSubmit}>
              {/* login message */}
              {(errors.length > 0 || emailEmpty || passwordEmpty) && (
                <LoginNoti message="Please adjust the following:" errors={errors} />
              )}
              {/* input fiels */}
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingFirstName"
                  placeholder=""
                />
                <label htmlFor="floatingFirstName" className={cx('label-ovr')}>
                  First Name
                </label>
              </div>
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingLastName"
                  placeholder=""
                />
                <label htmlFor="floatingLastName" className={cx('label-ovr')}>
                  Last Name
                </label>
              </div>
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingEmail"
                  placeholder=""
                />
                <label htmlFor="floatingEmail" className={cx('label-ovr')}>
                  Email<span className={cx('asterisk')}> *</span>
                </label>
              </div>
              {emailEmpty && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Email can't be blank
                </p>
              )}
              {emailInvalid && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Email must be in correct
                  format
                </p>
              )}
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cx('form-control rounded-0', 'password', 'form-control-ovr')}
                  id="floatingPassword"
                  placeholder=""
                />
                <label htmlFor="floatingPassword" className={cx('label-ovr')}>
                  Password<span className={cx('asterisk')}> *</span>
                </label>
              </div>
              {passwordEmpty && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Password can't be blank
                </p>
              )}
              {passwordInvalid && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Password must contain at
                  least 8 characters, one uppercase, one lowercase, one number and one special character
                </p>
              )}
              <button type="submit" className={cx('btn btn-outline-dark rounded-0', 'button')}>
                Register
              </button>
              <p>
                <Link to="/login" className={cx('link', 'p-text')}>
                  Already have a account? Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
