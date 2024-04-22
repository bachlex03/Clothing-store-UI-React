import style from './Reset.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Reset() {
  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>Reset account password</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            <h2 className={cx('sub-title')}>
              <span className={cx('bi bi-check-circle-fill')} style={{ color: 'green', fontSize: '2rem' }}>
                {' '}
              </span>
              We've sent you an email with a link to update your password.
            </h2>
            <p className={cx('mb-4')}>
              A password reset email has been sent to the email address on file for your account, but may take several
              minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.
            </p>
            <form>
              {/* input fiels */}
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="password"
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingInput"
                  placeholder=""
                />
                <label htmlFor="floatingInput" className={cx('label-ovr')}>
                  OTP Code
                </label>
              </div>
              <button type="button" className={cx('btn btn-outline-dark rounded-0', 'button')}>
                Submit OTP
              </button>
              <p className={cx('p-text')}>
                Didn't receive the email?{' '}
                <Link to="#" className={cx('link')}>
                  Re-send OTP Code
                </Link>
              </p>
              <p className={cx('p-text')}>
                Back to login{' '}
                <Link to="/login" className={cx('link')}>
                  Cancel
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
