import style from './Detail.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Input, Button } from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as accountService from '~/services/api/accountService';

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
      if (validateOnlyUpdateInfor() && validatePassword()) {
        updatePassword();
        onlyUpdateInfor();
      }
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

  const validatePassword = () => {
    if (!password) {
      toast.warn('Current password is required');
      return false;
    }
    if (!newPassword) {
      toast.warn('New password is required');
      return false;
    }
    if (newPassword.length < 8) {
      toast.warn('Password must contain at least 8 characters');
      return false;
    }
    if (!confirmPassword) {
      toast.warn('Confirm password is required');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.warn('Password does not match');
      return false;
    }
    return true;
  };

  const updatePassword = async () => {
    try {
      let passwordData = {
        currentPassword: password,
        newPassword,
        confirmPassword,
      };
      const response = await accountService.updatePassword(passwordData);
      if (response.status === 200) {
        toast.success('Password updated successfully');
      }
    } catch (error) {
      console.error('Error during update password:', error);
      toast.error('Password updated failed');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w100 px-10px">
            <Input
              label="First name"
              placeholder="First name..."
              isRequired
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w100 px-10px">
            <Input
              label="Last name"
              placeholder="Last name..."
              isRequired
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            label="Phone number"
            placeholder="example..."
            type="text"
            note="Enter your phone number. This will be used for account recovery and verification purposes only and will not be publicly displayed."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            label="Email address"
            placeholder="email@gmail.com"
            type="email"
            isRequired
            required
            disabled
            value={email}
          />
        </div>

        <div className={cx('wrapper', 'password', 'mt-16px')}>
          <h3 className={cx('heading')}>Change password</h3>

          <div className="w100 px-10px mt-16px">
            <Input
              label="Current password"
              placeholder="Current password..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w100 px-10px mt-16px">
            <Input
              label="New password"
              placeholder="New password..."
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w100 px-10px mt-16px">
            <Input
              label="Confirm new password"
              placeholder="Confirm new password..."
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={cx('btn-wrapper')}>
          <button type="submit" className={cx('button')}>
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default Detail;
