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
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const navigate = useNavigate();

  // Regex patterns for validation
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/; // Allow letters and spaces only, including Vietnamese characters
  const phoneRegex = /^[0-9]+$/; // Numbers only
  const passwordRegex = /^\S{8,}$/; // At least 8 characters, no whitespace

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError('');
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError('');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value === '' || (phoneRegex.test(value) && value.length <= 15)) {
      setPhone(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value && !passwordRegex.test(value)) {
      setPasswordError('Password must be at least 8 characters and contain no spaces');
    } else {
      setPasswordError('');
    }
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value && !passwordRegex.test(value)) {
      setNewPasswordError('Password must be at least 8 characters and contain no spaces');
    } else {
      setNewPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  useEffect(() => {
    fetchingAccount.mutate();
  }, []);

  useEffect(() => {
    if (!newPassword && !confirmPassword) {
      setConfirmPasswordError('');
    }
  }, [newPassword, confirmPassword]);

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
    let isValid = true;
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      toast.warning('First name and last name are required');
      isValid = false;
    }

    if (!nameRegex.test(trimmedFirstName)) {
      setFirstNameError('First name can only contain letters and spaces');
      toast.warning('First name can only contain letters and spaces');
      isValid = false;
    }

    if (!nameRegex.test(trimmedLastName)) {
      setLastNameError('Last name can only contain letters and spaces');
      toast.warning('Last name can only contain letters and spaces');
      isValid = false;
    }

    if (trimmedPhone && !phoneRegex.test(trimmedPhone)) {
      toast.warning('Phone number can only contain numbers');
      isValid = false;
    }

    return isValid;
  };

  const onlyUpdateInfor = useMutation({
    mutationFn: async () => {
      let user = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone.trim(),
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
    if (!passwordRegex.test(newPassword)) {
      toast.warning('Password must be at least 8 characters and contain no spaces');
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
              onChange={handleFirstNameChange}
            />
            {firstNameError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {firstNameError}
              </p>
            )}
          </div>
          <div className="w100 px-10px">
            <Input
              label="Last name"
              placeholder="Last name..."
              isRequired
              required
              value={lastName}
              onChange={handleLastNameChange}
            />
            {lastNameError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {lastNameError}
              </p>
            )}
          </div>
        </div>

        <div className="w100 px-10px mt-16px">
          <Input
            label="Phone number"
            placeholder="example..."
            type="text"
            note="Enter your phone number. This will be used for account recovery and verification purposes only and will not be publicly displayed."
            value={phone}
            onChange={handlePhoneChange}
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
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {' Password must be at least 8 characters and contain no spaces'}
              </p>
            )}
          </div>

          <div className="w100 px-10px mt-16px">
            <Input
              label="New password"
              placeholder="New password..."
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {newPasswordError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {' Password must be at least 8 characters and contain no spaces'}
              </p>
            )}
          </div>

          <div className="w100 px-10px mt-16px">
            <Input
              label="Confirm new password"
              placeholder="Confirm new password..."
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && (
              <p className={cx('error-message')}>
                <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span>
                {' Passwords do not match'}
              </p>
            )}
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
