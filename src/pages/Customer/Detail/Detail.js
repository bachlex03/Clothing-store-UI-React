import style from './Detail.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Input, Button } from '~/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as accountService from '~/services/api/accountService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Detail() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchingAccount.mutate();
  }, []);

  const fetchingAccount = useMutation({
    mutationFn: async () => {
      return await accountService.getProfile();
    },
    onSuccess: (data) => {
      setFirstName(data.data.profile_firstName);
      setLastName(data.data.profile_lastName);
      setPhone(data.data.profile_phoneNumber);
      setEmail(data.data.email);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
        // if code is 401, it means user is not authenticated, navigate to login page
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if user doesn't change password, only update infor
    if (!password && !newPassword && !confirmPassword && validateOnlyUpdateInfor()) {
      onlyUpdateInfor.mutate();
    } else {
      // if user change password, update infor and password
      if (validateOnlyUpdateInfor() && validatePassword()) {
        updatePassword.mutate();
      }
    }
  };

  const validateOnlyUpdateInfor = () => {
    if (!firstName || !lastName) {
      toast.warning('First name and last name are required');
      return false;
    }
    return true;
  };

  const onlyUpdateInfor = useMutation({
    mutationFn: async () => {
      let user = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
      };
      return await accountService.updateProfile(user);
    },
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      console.log('error.response.data', error.response?.data);
      console.log('error.response.status', error.response?.status);

      toast.error(`Error ${error.response?.status}`, {
        description: `${error.response?.data?.message}`,
      });
    },
  });

  const validatePassword = () => {
    if (!password) {
      toast.warning('Current password is required');
      return false;
    }
    if (!newPassword) {
      toast.warning('New password is required');
      return false;
    }
    if (newPassword.length < 8) {
      toast.warning('Password must contain at least 8 characters');
      return false;
    }
    if (!confirmPassword) {
      toast.warning('Confirm password is required');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.warning('Password does not match');
      return false;
    }
    return true;
  };

  const updatePassword = useMutation({
    mutationFn: async () => {
      let passwordData = {
        currentPassword: password,
        newPassword,
        confirmPassword,
      };
      return await accountService.updatePassword(passwordData);
    },
    onSuccess: (data) => {
      toast.success('Password updated successfully');
      // when password updated successfully then update profile
      onlyUpdateInfor.mutate();
    },
    onError: (error) => {
      console.log('error.response.data', error.response?.data);
      console.log('error.response.status', error.response?.status);

      toast.error(`Error ${error.response?.status}`, {
        description: `${error.response?.data?.message}`,
      });
    },
  });

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
    </div>
  );
}

export default Detail;
