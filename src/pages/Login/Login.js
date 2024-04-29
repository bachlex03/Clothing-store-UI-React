import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { LoginNoti, RecoverNoti } from '~/components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useHistory } from 'react-router-dom';
import * as accountService from '~/services/api/accountService';

const cx = classNames.bind(style);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [errors, setErrors] = useState([]);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const navigate = useNavigate();
  const location = useLocation();
  const fromRecover = location.state?.fromRecover;
  useEffect(() => {
    if (location?.state && location?.state?.fromRecover) {
      // Reset fromRecover to false
      location.state.fromRecover = false;
    }
  }, [location.state]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let user = {
          email,
          password,
        };
        const response = await accountService.login(user);
        if (response.status === 200) {
          let token = response.data.accessToken;
          let data = response.data;
          localStorage.setItem('token', token);
          navigate('/');
        }
      } catch (error) {
        let newErrors = [error?.response?.data?.message];
        setErrors(newErrors);
        console.error('Error during login:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

    if (!email.trim()) {
      setEmailEmpty(true);
      setEmailInvalid(false);
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
      newErrors.push("Password can't be blank");
      isValid = false;
    } else {
      setPasswordEmpty(false);
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>LOGIN</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            <form onSubmit={handleSubmit}>
              {fromRecover && <RecoverNoti />}
              {/* login message */}
              {(errors.length > 0 || emailEmpty || passwordEmpty) && (
                <LoginNoti message="Please adjust the following:" errors={errors} />
              )}
              {/* input fiels */}
              {}
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="text"
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingInput"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput" className={cx('label-ovr')}>
                  Email<span className={cx('asterisk', 'label-ovr')}> *</span>
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
                  className={cx('form-control rounded-0', 'password', 'form-control-ovr')}
                  id="floatingPassword"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className={cx('btn btn-outline-dark rounded-0', 'button')}>
                Sign In
              </button>
              <p className={cx('p-text')}>
                New customer?{' '}
                <Link to="/register" className={cx('link')}>
                  Create your account
                </Link>
              </p>
              <p className={cx('p-text')}>
                Lost password?{' '}
                <Link to="/recover" className={cx('link')}>
                  Recover password
                </Link>
              </p>
            </form>
          </div>

          {/* guest */}
          <div className={cx('guest-login-wrapper')}>
            <hr />
            <h2 className={cx('title')}>CONTINUE AS A GUEST</h2>
            <button
              type="button"
              className={cx('btn btn-dark rounded-0', 'button')}
              onClick={() => {
                navigate('/');
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
