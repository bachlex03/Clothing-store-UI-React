import style from './Verify.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as accountService from '~/services/api/accountService';
import qs from 'qs';

const cx = classNames.bind(style);

function Verify() {
  const urlParams = new URLSearchParams(window.location.search);
  const [jwtMailToken, setJwtMailToken] = useState(urlParams.get('q'));
  const [otp, setOtp] = useState('');
  const [otpEmpty, setOtpEmpty] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const navigate = useNavigate();

  const handleResendOTP = async () => {
    try {
      const response = await accountService.sendMailToken(qs.stringify({ q: jwtMailToken }));
    } catch (error) {
      console.error('Error during resend OTP:', error);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await accountService.verifyEmail(qs.stringify({ q: jwtMailToken, mailToken: otp }));
        if (response.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        setOtpInvalid(true);
        console.error('Error during OTP verification:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!otp.trim()) {
      isValid = false;
      setOtpEmpty(true);
      setOtpInvalid(false);
    } else {
      setOtpEmpty(false);
    }
    return isValid;
  };

  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>Verify registration</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            <h2 className={cx('sub-title')}>
              <span className={cx('bi bi-check-circle-fill')} style={{ color: 'green', fontSize: '2rem' }}>
                {' '}
              </span>
              We've sent you an email with a code to verify your registration.
            </h2>
            <p className={cx('mb-4')}>
              A verify registration email has been sent to the email address on file for your account, but may take
              several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another
              re-send.
            </p>
            <form onSubmit={handleSubmitOTP}>
              {/* input fiels */}
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="password"
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingInput"
                  placeholder=""
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <label htmlFor="floatingInput" className={cx('label-ovr')}>
                  OTP Code
                </label>
              </div>
              {otpEmpty && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> OTP can't be blank
                </p>
              )}
              {otpInvalid && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Oops! The OTP code you
                  have entered is incorrect. Please try again.
                </p>
              )}
              <button type="submit" className={cx('btn btn-outline-dark rounded-0', 'button')}>
                Submit OTP
              </button>
              <p className={cx('p-text')}>
                Didn't receive the email?{' '}
                <Link to="#" className={cx('link')} onClick={handleResendOTP}>
                  Re-send OTP Code
                </Link>
              </p>
              <p className={cx('p-text')}>
                Back to login{' '}
                <Link to="/login" className={cx('link')}>
                  Cancel
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
