import style from './Login.modules.scss';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const cx = classNames.bind(style);

function Login() {
    return (
        <div className={cx("container-fluid px-0")}>
            <div className={cx("topbar container-fluid")}>
                <h1 className={cx("title text-center")}>LOGIN</h1>
            </div>
            <div className={cx("container-fluid px-0")}>
                <div className={cx("content-login")}>
                    <div className={cx("login-wrapper")}>
                        <form>
                            {/* login message */}
                            <div className={cx("login-message")}>
                                <h2 className={cx("title")}>
                                    <span className={cx("bi bi-exclamation-circle-fill")}> </span>
                                    Please adjust the following
                                </h2>
                                <div className={cx("errors")}>
                                    <ul>
                                        <li>
                                            Incorect email or password
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* input fiels */}
                            <div className="form-floating mb-5">
                                <input type="email" className="form-control rounded-0" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email<span className={cx("asterisk")}> *</span></label>
                            </div>
                            <div className="form-floating mb-5">
                                <input type="password" className="form-control rounded-0 password" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password<span className={cx("asterisk")}> *</span></label>
                            </div>
                            <button type="button" className={cx("btn btn-outline-dark rounded-0 button")}>Sign In</button>
                            <p className={cx('p-text')}>New customer? <a href="#" className={cx('link')}>Create your account</a></p>
                            <p className={cx('p-text')}>Lost password? <a href="#" className={cx('link')}>Recover password</a></p>
                        </form>
                    </div>

                    {/* guest */}
                    <div className={cx('guest-login-wrapper')}>
                        <hr />
                        <h2 className={cx('title')}>CONTINUE AS A GUEST</h2>
                        <form>
                            <button type="button" className={cx("btn btn-dark rounded-0 button")}>Continue</button>
                        </form>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Login;