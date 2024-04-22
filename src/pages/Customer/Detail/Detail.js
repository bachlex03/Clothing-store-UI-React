import style from './Detail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Detail() {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Account Infor</h3>
      <div className="d-flex justify-content-between">
        <div class="form-floating mb-4 w-50">
          <input
            type="email"
            className={cx('form-control rounded-0', 'form-control-ovr')}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
        </div>
        <p className='mx-3'></p>
        <div class="form-floating mb-4 w-50">
          <input
            type="email"
            className={cx('form-control rounded-0', 'form-control-ovr')}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
        </div>
      </div>

      <div class="form-floating mb-4 w-100">
        <input
          type="email"
          className={cx('form-control rounded-0', 'form-control-ovr')}
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
      </div>

      <div class="form-floating mb-4 w-100">
        <input
          type="email"
          className={cx('form-control rounded-0', 'form-control-ovr')}
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
      </div>

      <div className={cx('wrapper', 'password', 'mt-5 mb-5')}>
        <h3 className={cx('heading')}>Change password</h3>

        <div class="form-floating mb-4">
          <input
            type="email"
            className={cx('form-control rounded-0', 'form-control-ovr')}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
        </div>

        <div class="form-floating mb-4">
          <input
            type="email"
            className={cx('form-control rounded-0', 'form-control-ovr')}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
        </div>

        <div class="form-floating mb-4">
          <input
            type="email"
            className={cx('form-control rounded-0', 'form-control-ovr')}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className={cx('label-ovr')}>Email address</label>
        </div>
      </div>

      <div className={cx("mt-5 d-flex flex-row-reverse")}>
        <button type="button" className={cx("btn btn-dark rounded-0", "button")}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Detail;
