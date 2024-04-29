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
  const [jwtMailToken, setJwtMailToken] = useState(urlParams.get('q'));
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
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>Reset account password</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper', 'd-flex flex-column justify-content-center')}>
            {errors.length > 0 && <LoginNoti message="Please adjust the following:" errors={errors} />}
            <p className={cx('mb-5 text-center', 'p-sub-title')}>Enter new password for</p>
            <form onSubmit={handleSubmit}>
              {/* input fiels */}
              <div className={cx('form-floating mb-5', 'form-floating-ovr')}>
                <input
                  type="password"
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingInput1"
                  placeholder=""
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="floatingInput1" className={cx('label-ovr')}>
                  New Password
                </label>
              </div>
              <div className={cx('form-floating mb-5', 'form-floating-ovr')}>
                <input
                  type="password"
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingInput2"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="floatingInput2" className={cx('label-ovr')}>
                  Confirm Password
                </label>
              </div>
              <div className={cx('text-center')}>
                <button type="submit" className={cx('btn btn-dark rounded-0', 'button')}>
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
