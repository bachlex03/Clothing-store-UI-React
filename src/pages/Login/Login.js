import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import * as accountService from '~/services/api/accountService';
const cx = classNames.bind(style);

function Login() {
  const [logregBoxToggle, setLogregBoxToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isCheckTerms, setIsCheckTerms] = useState(true);
  const [responseError, setResponseError] = useState(false);
  const [responseRegisterMsg, setResponseRegisterMsg] = useState('');
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const navigate = useNavigate();

  const toggleLogregBox = (e, value) => {
    e.preventDefault();
    setLogregBoxToggle(value);
    setResponseError(false);

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
    // Send login request
    try {
      let user = {
        email,
        password,
      };
      const response = await accountService.login(user);
      if (response.status === 200) {
        let token = response.data.accessToken;
        localStorage.setItem('token', token);
        navigate('/');
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
          firstName,
          lastName,
          email: emailRegister,
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

  const validateRegister = () => {
    let isValid = true;
    setResponseError(false);
    // Validate email, no need to validate empty because it's required
    if (!emailRegex.test(emailRegister)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // Validate password, no need to validate empty because it's required
    // password must be at least 8 characters
    if (passwordRegister.length < 8) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // Check terms and conditions checkbox is checked or not
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
              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-envelope-fill')}></i>
                </span>
                <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Email</label>
              </div>

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
                  <input type="checkbox"></input> Remember me
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
              <h2>Sign Up</h2>
              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-person-fill')}></i>
                </span>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <label>First name</label>
              </div>
              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-person-fill')}></i>
                </span>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <label>Last name</label>
              </div>
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
                  onChange={(e) => setPasswordRegister(e.target.value)}
                ></input>
                <label>
                  Password <span style={{ color: 'red' }}>*</span>
                </label>
              </div>
              {passwordError && (
                <p className={cx('error-messsage')}>
                  <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Password must be at least
                  8 characters
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
