import style from './Detail.module.scss';
import classNames from 'classnames/bind';
import * as accountService from '~/services/api/accountService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Detail() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await accountService.getProfile();
        if (response.status === 200) {
          setFirstName(response.data.profile_firstName);
          setLastName(response.data.profile_lastName);
          setPhone(response.data.profile_phoneNumber);
          setEmail(response.data.email);
        }
      } catch (error) {
        console.error('Error during fetch account:', error);
      }
    };

    fetchAccount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if user doesn't change password, only update infor
    if (!password && !newPassword && !confirmPassword && validateOnlyUpdateInfor()) {
      onlyUpdateInfor();
    } else {
      // if user change password, update infor and password
      // updateInforAndPassword();
    }

    // after update infor and password, scroll to top
    window.scrollTo(0, 0);
  };

  const validateOnlyUpdateInfor = () => {
    if (!firstName || !lastName) {
      toast.warn('First name and last name are required');
      return false;
    }
    return true;
  };

  const onlyUpdateInfor = async () => {
    try {
      let user = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
      };
      const response = await accountService.updateProfile(user);
      if (response.status === 200) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error during update profile:', error);
      toast.error('Profile updated failed');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSubmit}>
        <h3 className={cx('heading')}>Account Infor</h3>
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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

        <div className={cx('wrapper', 'password', 'mt-5 mb-5')}>
          <h3 className={cx('heading')}>Change password</h3>

          <div className={cx('w-100', 'px-3', 'mt-4')}>
            <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
              Current password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
              id="basic-url"
              placeholder="Current password..."
            />
          </div>

          <div className={cx('w-100', 'px-3', 'mt-4')}>
            <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
              New password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
              id="basic-url"
              placeholder="New password..."
            />
          </div>

          <div className={cx('w-100', 'px-3', 'mt-4')}>
            <label for="basic-url" className={cx('form-label', 'mb-0', 'label-ovr')}>
              Confirm new password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              className={cx('form-control', 'my-3', 'rounded-5', 'form-control-ovr')}
              id="basic-url"
              placeholder="Confirm new password..."
            />
          </div>
        </div>

        <div className={cx('mt-5 d-flex flex-row-reverse')}>
          <button type="submit" className={cx('btn btn-dark rounded-5 mb-0 text-uppercase', 'button')}>
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default Detail;
