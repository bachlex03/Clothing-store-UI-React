import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';
import * as accountService from '~/services/api/accountService';
import { RecoverNoti } from '~/components';
import { useDispatch } from 'react-redux';
import { store as storeUser } from '~/redux/features/user/userSlice';
const cx = classNames.bind(style);

function Login() {
  const [logregBoxToggle, setLogregBoxToggle] = useState(false);
  const [email, setEmail] = useState('' || localStorage.getItem('chani-email'));
  const [password, setPassword] = useState('' || localStorage.getItem('chani-password'));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [isCheckTerms, setIsCheckTerms] = useState(true);
  const [responseError, setResponseError] = useState(false);
  const [responseRegisterMsg, setResponseRegisterMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const navigate = useNavigate();
  const location = useLocation();
  const fromRecover = location.state?.fromRecover;
  const fromVerify = location.state?.fromVerify;
  const fromReset = location.state?.fromReset;
  const message = location.state?.message;
  const dispatch = useDispatch();

  const storeUserEmail = (user) => {
    dispatch(storeUser(user));
  };

  useEffect(() => {
    if (location?.state) {
      if (location.state.fromRecover) {
        // Reset fromRecover to false
        location.state.fromRecover = false;
        // Reset message to empty
        location.state.message = '';
      }
      if (location.state.fromVerify) {
        // Reset fromVerify to false
        location.state.fromVerify = false;
        // Reset message to empty
        location.state.message = '';
      }
      if (location.state.fromReset) {
        // Reset fromReset to false
        location.state.fromReset = false;
        // Reset message to empty
        location.state.message = '';
      }
    }
  }, [location.state]);

  const toggleLogregBox = (e, value) => {
    e.preventDefault();
    setLogregBoxToggle(value);
    
    // Clear all error states
    setResponseError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setLoginEmailError(false);
    setResponseRegisterMsg('');
    
    // Reset form fields for register
    if (!value) {
      setFirstName('');
      setLastName('');
      setEmailRegister('');
      setPasswordRegister('');
      setIsCheckTerms(true);
    }

    if (value) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleTermsCheck = (e) => {
    setIsCheckTerms(e.target.checked);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoginEmailError(false);
    setResponseError(false);

    // Validate email format
    if (!emailRegex.test(email)) {
      setLoginEmailError(true);
      return;
    }

    // Send login request
    try {
      let user = {
        email,
        password,
      };
      const response = await accountService.login(user);
      if (response.status === 200) {
        if (response.data?.redirect) {
          const jwtMailToken = new URLSearchParams(response?.data?.redirect.split('?')[1]).get('q');
          const verifyResponse = await accountService.sendMailToken(qs.stringify({ q: jwtMailToken }));
          if (verifyResponse.status === 200) {
            navigate(response?.data?.redirect);
          }
        } else {
          let token = response.data?.accessToken;
          let emailUser = response.data?.user?.email;
          localStorage.setItem('token', token);
          storeUserEmail(emailUser);
          console.log('User logged in');
          if (rememberMe) {
            localStorage.setItem('chani-email', email);
            localStorage.setItem('chani-password', password);
          }
          navigate('/shop');
        }
      }
    } catch (error) {
      setResponseError(true);
      console.error('Error during login:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateRegister()) {
      try {
        let user = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: emailRegister.trim(),
          password: passwordRegister,
        };
        const response = await accountService.register(user);
        if (response.status === 200) {
          const jwtMailToken = new URLSearchParams(response?.data?.redirect.split('?')[1]).get('q');
          const verifyResponse = await accountService.sendMailToken(qs.stringify({ q: jwtMailToken }));
          if (verifyResponse.status === 200) {
            navigate(response?.data?.redirect);
          }
        }
      } catch (error) {
        setResponseError(true);
        setResponseRegisterMsg(error?.response?.data?.message);
        console.error('Error during registration:', error);
      }
    }
  };

  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/; // Allow letters and spaces only, including Vietnamese characters

  const passwordRegex = /^\S{8,}$/; // At least 8 characters, no whitespace

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordRegister(value);
  };

  const validateRegister = () => {
    let isValid = true;
    setResponseError(false);

    // Validate first name
    const trimmedFirstName = firstName.trim();
    if (!trimmedFirstName || !nameRegex.test(trimmedFirstName)) {
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameError(false);
    }

    // Validate last name
    const trimmedLastName = lastName.trim();
    if (!trimmedLastName || !nameRegex.test(trimmedLastName)) {
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameError(false);
    }

    // Validate email
    if (!emailRegex.test(emailRegister.trim())) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // Validate password
    if (!passwordRegister || !passwordRegex.test(passwordRegister)) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // Check terms
    if (!isCheckTerms) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className={cx('body')}>
      <div className={cx('background')}></div>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <h2 className={cx('logo')}>
            <i className={cx('bi bi-handbag-fill')}></i> Chani
          </h2>
          <div className={cx('text-sci')}>
            <h2>
              Welcome! <br></br>
              <span>To our new website.</span>
            </h2>
            <p>Where Culture Meets Style: Explore Trends, Ideas, and Must-Have Items. Shop Now!</p>
            <div className={cx('social-icons')}>
              <i className={cx('bi bi-facebook')}></i>
              <i className={cx('bi bi-instagram')}></i>
              <i className={cx('bi bi-twitter')}></i>
              <i className={cx('bi bi-linkedin')}></i>
            </div>
          </div>
        </div>
        <div className={cx('logreg-box', { active: logregBoxToggle })}>
          <div className={cx('form-box', 'login')}>
            <form onSubmit={handleSignIn}>
              <h2>Sign In</h2>
              {(fromRecover || fromVerify || fromReset) && <RecoverNoti message={message} />}
              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-envelope-fill')}></i>
                </span>
                <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Email</label>
              </div>
              {loginEmailError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Email must be in correct format
                </p>
              )}

              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-lock-fill')}></i>
                </span>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>Password</label>
              </div>
              {responseError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Invalid email or password
                </p>
              )}

              <div className={cx('remember-forgot')}>
                <label>
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />{' '}
                  Remember me
                </label>
                <Link to="/recover">Forgot password?</Link>
              </div>

              <button type="submit" className={cx('btn')}>
                Sign In
              </button>

              <div className={cx('login-register')}>
                <p>
                  Don't have an account?{' '}
                  <a href="#" className={cx('register-link')} onClick={(e) => toggleLogregBox(e, !logregBoxToggle)}>
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className={cx('form-box', 'register')}>
            <form onSubmit={handleRegister}>
              <h2 className={cx('title')}>Sign Up</h2>
              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-person-fill')}></i>
                </span>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <label>
                  First name <span style={{ color: 'red' }}>*</span>
                </label>
              </div>
              {firstNameError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> First name can only contain
                  letters and spaces
                </p>
              )}

              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-person-fill')}></i>
                </span>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <label>
                  Last name <span style={{ color: 'red' }}>*</span>
                </label>
              </div>
              {lastNameError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Last name can only contain
                  letters and spaces
                </p>
              )}

              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-envelope-fill')}></i>
                </span>
                <input
                  type="text"
                  required
                  value={emailRegister}
                  onChange={(e) => setEmailRegister(e.target.value)}
                ></input>
                <label>
                  Email <span style={{ color: 'red' }}>*</span>
                </label>
              </div>
              {emailError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Email must be in correct
                  format
                </p>
              )}

              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-lock-fill')}></i>
                </span>
                <input
                  type="password"
                  required
                  value={passwordRegister}
                  onChange={handlePasswordChange}
                ></input>
                <label>
                  Password <span style={{ color: 'red' }}>*</span>
                </label>
              </div>
              {passwordError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Password must be at least 8
                  characters and contain no spaces
                </p>
              )}
              {responseError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> {responseRegisterMsg}
                </p>
              )}

              <div className={cx('remember-forgot')}>
                <label>
                  <input type="checkbox" defaultChecked={isCheckTerms} onClick={(e) => handleTermsCheck(e)}></input> I
                  agree to the terms and conditions
                </label>
              </div>
              {!isCheckTerms && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Please agree to the terms
                </p>
              )}

              <button type="submit" className={cx('btn')}>
                Sign In
              </button>

              <div className={cx('login-register')}>
                <p>
                  Already have an account?{' '}
                  <a href="#" className={cx('login-link')} onClick={(e) => toggleLogregBox(e, !logregBoxToggle)}>
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
