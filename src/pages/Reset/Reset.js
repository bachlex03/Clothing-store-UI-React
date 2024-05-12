import style from './Reset.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { LoginNoti } from '~/components';
import * as accountService from '~/services/api/accountService';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Reset() {
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const urlParams = new URLSearchParams(window.location.search);
  const [jwtMailToken] = useState(urlParams.get('q'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let resetPassword = {
          password: newpassword,
          confirmPassword: confirmPassword,
        };
        const response = await accountService.resetPassword(qs.stringify({ q: jwtMailToken }), resetPassword);
        if (response.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

    if (!newpassword.trim()) {
      newErrors.push("New Password can't be blank");
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      newErrors.push("Confirm Password can't be blank");
      isValid = false;
    }
    if (!passwordRegex.test(newpassword)) {
      newErrors.push('Password must contain at least 8 characters, including uppercase, lowercase letters and numbers');
      isValid = false;
    }
    if (newpassword !== confirmPassword) {
      newErrors.push('Password does not match');
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className={cx('container-fl')}>
      <div className={cx('topbar')}>
        <h1 className={cx('title')}>Reset account password</h1>
      </div>
      <div className={cx('container-login')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            {errors.length > 0 && <LoginNoti message="Please adjust the following:" errors={errors} />}
            <p className={cx('p-sub-title')}>Enter new password for</p>
            <form onSubmit={handleSubmit}>
              {/* input fiels */}
              <input
                type="password"
                className={cx('form-control-ovr')}
                id="floatingInput1"
                placeholder="New password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                className={cx('form-control-ovr')}
                id="floatingInput2"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className={cx('button-wrapper')}>
                <button type="submit" className={cx('button')}>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
