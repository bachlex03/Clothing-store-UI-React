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
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

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
          navigate('/login', { state: { fromRecover: true } });
        }
      } catch (error) {
        console.error('Error sending email to reset password:', error);
      }
    }
  };

  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>Reset account password</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            <h2 className={cx('sub-title')}>RESET YOUR PASSWORD</h2>
            <p className={cx('mb-4')}>
              Lost your password? Please enter your email address. You will receive a link to create a new password via
              email.
            </p>
            <form onSubmit={handleSubmit}>
              {/* input fiels */}
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
                  Email address
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
              <button type="submit" className={cx('btn btn-outline-dark rounded-0', 'button')}>
                Reset password
              </button>
            </form>
            <p className={cx('p-text')}>
              <Link to="/login" className={cx('link')}>
                Cancel
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recover;
