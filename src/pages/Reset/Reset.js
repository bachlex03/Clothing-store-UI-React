import style from './Reset.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { LoginNoti } from '~/components';
import * as accountService from '~/services/api/accountService';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const cx = classNames.bind(style);

function Reset() {
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const [jwtMailToken] = useState(urlParams.get('q'));
  const navigate = useNavigate();

  const passwordRegex = /^\S{8,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError('');
  };

  const validateForm = () => {
    let isValid = true;
    setPasswordError('');
    setConfirmPasswordError('');

    if (!newpassword.trim()) {
      setPasswordError("New Password can't be blank");
      toast.error('Error', {
        description: "New Password can't be blank"
      });
      isValid = false;
      return isValid;
    }

    if (!passwordRegex.test(newpassword)) {
      setPasswordError('Password must be at least 8 characters and contain no spaces');
      toast.error('Error', {
        description: 'Password must be at least 8 characters and contain no spaces'
      });
      isValid = false;
      return isValid;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password can't be blank");
      toast.error('Error', {
        description: "Confirm Password can't be blank"
      });
      isValid = false;
      return isValid;
    }

    if (newpassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      toast.error('Error', {
        description: 'Passwords do not match'
      });
      isValid = false;
      return isValid;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let resetPassword = {
        password: newpassword,
        confirmPassword: confirmPassword,
      };
      const response = await accountService.resetPassword(qs.stringify({ q: jwtMailToken }), resetPassword);
      if (response.status === 200) {
        navigate('/login', {
          state: { fromRecover: true, message: 'Your password has been updated. Now you can Sign in' },
        });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error', {
        description: 'Error resetting password or expired link'
      });
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
            <p className={cx('p-sub-title')}>Enter new password for</p>
            <form onSubmit={handleSubmit}>
              <div className={cx('input-wrapper')}>
                <input
                  type="password"
                  className={cx('form-control-ovr', { error: passwordError })}
                  id="floatingInput1"
                  placeholder="New password"
                  value={newpassword}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className={cx('error-message')}>
                    <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                    {passwordError}
                  </p>
                )}
              </div>

              <div className={cx('input-wrapper')}>
                <input
                  type="password"
                  className={cx('form-control-ovr', { error: confirmPasswordError })}
                  id="floatingInput2"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && (
                  <p className={cx('error-message')}>
                    <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                    {confirmPasswordError}
                  </p>
                )}
              </div>

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
