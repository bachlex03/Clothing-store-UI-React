// import style from './Login.module.scss';
// import classNames from 'classnames/bind';
// import { LoginNoti, RecoverNoti } from '~/components';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useHistory } from 'react-router-dom';
// import * as accountService from '~/services/api/accountService';

// const cx = classNames.bind(style);

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailEmpty, setEmailEmpty] = useState(false);
//   const [emailInvalid, setEmailInvalid] = useState(false);
//   const [passwordEmpty, setPasswordEmpty] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

//   const navigate = useNavigate();
//   const location = useLocation();
//   const fromRecover = location.state?.fromRecover;
//   useEffect(() => {
//     if (location?.state && location?.state?.fromRecover) {
//       // Reset fromRecover to false
//       location.state.fromRecover = false;
//     }
//   }, [location.state]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
// try {
//   let user = {
//     email,
//     password,
//   };
//   const response = await accountService.login(user);
//   if (response.status === 200) {
//     let token = response.data.accessToken;
//     let data = response.data;
//     localStorage.setItem('token', token);
//     navigate('/');
//   }
// } catch (error) {
//   let newErrors = [error?.response?.data?.message];
//   setErrors(newErrors);
//   console.error('Error during login:', error);
// }
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     let newErrors = [];

//     if (!email.trim()) {
//       setEmailEmpty(true);
//       setEmailInvalid(false);
//       newErrors.push("Email can't be blank");
//       isValid = false;
//     } else {
//       setEmailEmpty(false);
//       if (!emailRegex.test(email)) {
//         setEmailInvalid(true);
//         newErrors.push('Email must be in correct format');
//         isValid = false;
//       } else {
//         setEmailInvalid(false);
//       }
//     }

//     if (!password.trim()) {
//       setPasswordEmpty(true);
//       newErrors.push("Password can't be blank");
//       isValid = false;
//     } else {
//       setPasswordEmpty(false);
//     }
//     setErrors(newErrors);
//     return isValid;
//   };

//   return (
//     <div className={cx('container-fluid px-0')}>
//       <div className={cx('container-fluid', 'topbar')}>
//         <h1 className={cx('title', 'text-center')}>LOGIN</h1>
//       </div>
//       <div className={cx('container-fluid px-4')}>
//         <div className={cx('content-login')}>
//           <div className={cx('login-wrapper')}>
//             <form onSubmit={handleSubmit}>
//               {fromRecover && <RecoverNoti />}
//               {/* login message */}
//               {(errors.length > 0 || emailEmpty || passwordEmpty) && (
//                 <LoginNoti message="Please adjust the following:" errors={errors} />
//               )}
//               {/* input fiels */}
//               {}
//               <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
//                 <input
//                   type="text"
//                   className={cx('form-control rounded-0', 'form-control-ovr')}
//                   id="floatingInput"
//                   placeholder=""
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <label htmlFor="floatingInput" className={cx('label-ovr')}>
//                   Email<span className={cx('asterisk', 'label-ovr')}> *</span>
//                 </label>
//               </div>
//               {emailEmpty && (
//                 <p className={cx('error-messsage')}>
//                   <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Email can't be blank
//                 </p>
//               )}
//               {emailInvalid && (
//                 <p className={cx('error-messsage')}>
//                   <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Email must be in correct
//                   format
//                 </p>
//               )}
//               <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
//                 <input
//                   type="password"
//                   className={cx('form-control rounded-0', 'password', 'form-control-ovr')}
//                   id="floatingPassword"
//                   placeholder=""
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <label htmlFor="floatingPassword" className={cx('label-ovr')}>
//                   Password<span className={cx('asterisk')}> *</span>
//                 </label>
//               </div>
//               {passwordEmpty && (
//                 <p className={cx('error-messsage')}>
//                   <span className={cx('bi bi-exclamation-circle-fill', 'exclamation')}></span> Password can't be blank
//                 </p>
//               )}
//               <button type="submit" className={cx('btn btn-outline-dark rounded-0', 'button')}>
//                 Sign In
//               </button>
//               <p className={cx('p-text')}>
//                 New customer?{' '}
//                 <Link to="/register" className={cx('link')}>
//                   Create your account
//                 </Link>
//               </p>
//               <p className={cx('p-text')}>
//                 Lost password?{' '}
//                 <Link to="/recover" className={cx('link')}>
//                   Recover password
//                 </Link>
//               </p>
//             </form>
//           </div>

//           {/* guest */}
//           <div className={cx('guest-login-wrapper')}>
//             <hr />
//             <h2 className={cx('title')}>CONTINUE AS A GUEST</h2>
//             <button
//               type="button"
//               className={cx('btn btn-dark rounded-0', 'button')}
//               onClick={() => {
//                 navigate('/');
//               }}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

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
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <label>First name</label>
              </div>
              <div className={cx('input-box')}>
                <span className={cx('icon')}>
                  <i className={cx('bi bi-person-fill')}></i>
                </span>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
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
