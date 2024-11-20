import style from './Recover.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as accountService from '~/services/api/accountService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Recover() {
  const [email, setEmail] = useState('');
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailNotRegistered, setEmailNotRegistered] = useState(false);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

    if (!email.trim()) {
      setEmailEmpty(true);
      setEmailInvalid(false);
      setEmailNotRegistered(false);
      newErrors.push("Email can't be blank");
      isValid = false;
    } else {
      setEmailEmpty(false);
      if (!emailRegex.test(email)) {
        setEmailInvalid(true);
        setEmailNotRegistered(false);
        newErrors.push('Email must be in correct format');
        isValid = false;
      } else {
        setEmailInvalid(false);
      }
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // send email to reset password
      try {
        let emailReset = {
          email,
        };
        const response = await accountService.recoverPassword(emailReset);
        if (response.status === 200) {
          navigate('/login', {
            state: { fromRecover: true, message: "We've sent you an email with a link to update your password." },
          });
        }
      } catch (error) {
        console.error('Error sending email to reset password:', error);
        if (error.response?.status === 400) {
          setEmailNotRegistered(true);
        }
      }
    }
  };

  return (
    <div className={cx('container-fl')}>
      <div className={cx('topbar')}>
        <h1 className={cx('title')}>Reset account password</h1>
      </div>
      <div className={cx('container-login')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            <h2 className={cx('sub-title')}>RESET YOUR PASSWORD</h2>
            <p className={cx('sub-title2')}>
              Lost your password? Please enter your email address. You will receive a link to create a new password via
              email.
            </p>
            <form onSubmit={handleSubmit}>
              {/* input fiels */}
              <input
                type="text"
                className={cx('form-control-ovr')}
                id="floatingInput"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              {emailNotRegistered && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> This email is not registered
                </p>
              )}
              <button type="submit" className={cx('button')}>
                Reset password
              </button>
            </form>
            <p className={cx('p-text')}>
              <Link to="/login" className={cx('link')}>
                Cancel
              </Link>
            </p>
          </div>

          <div className={cx('guest-login-wrapper')}>
            <hr />
            <h2 className={cx('title')}>CONTINUE AS A GUEST</h2>
            <button
              type="button"
              className={cx('button-guest')}
              onClick={() => {
                navigate('/shop');
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

export default Recover;
