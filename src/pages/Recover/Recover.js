import style from './Recover.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Recover() {
  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>Reset account password</h1>
      </div>
      <div className={cx('container-fluid px-4')}>
        <div className={cx('content-login')}>
          <div className={cx('login-wrapper')}>
            <h2 className={cx('sub-title')}>RESET YOUR PASSWORD</h2>
            <p className={cx('mb-4')}>
              Lost your password? Please enter your email address. You will receive a link to create a new password via
              email.
            </p>
            <form>
              {/* input fiels */}
              <div className={cx('form-floating mb-4', 'form-floating-ovr')}>
                <input
                  type="email"
                  className={cx('form-control rounded-0', 'form-control-ovr')}
                  id="floatingInput"
                  placeholder=""
                />
                <label htmlFor="floatingInput" className={cx('label-ovr')}>
                  Email address
                </label>
              </div>
              <button type="button" className={cx('btn btn-outline-dark rounded-0', 'button')}>
                Reset password
              </button>
              <p className={cx('p-text')}>
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

export default Recover;
