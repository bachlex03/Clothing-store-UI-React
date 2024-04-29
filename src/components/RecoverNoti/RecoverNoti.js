import style from './RecoverNoti.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function RecoverNoti() {
  return (
    <>
      <h2 className={cx('sub-title')}>
        <span className={cx('bi bi-check-circle-fill')} style={{ color: 'green', fontSize: '2rem' }}>
          {' '}
        </span>
        We've sent you an email with a link to update your password.
      </h2>
      <p className={cx('mb-5', )}>
        A password reset email has been sent to the email address on file for your account, but may take several minutes
        to show up in your inbox. Please wait at least 10 minutes before attempting another reset.
      </p>
    </>
  );
}

export default RecoverNoti;
