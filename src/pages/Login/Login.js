import style from './Login.modules.scss';
import classNames from 'classnames/bind';

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
                                <h2 className={cx("title")}>Please adjust the following</h2>
                                <div className={cx("errors")}>
                                    <ul>
                                        <li>
                                            Incorect email or password
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* input fiels */}
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <button type="button" className={cx("btn btn-outline-dark rounded-0 button")}>Sign In</button>
                            <p className={cx('p-text')}>New customer? <a href='#' className={cx('link')}>Create your account</a></p>
                            <p className={cx('p-text')}>Lost password? <a href='#' className={cx('link')}>Recover password</a></p>
                        </form>
                    </div>

                    {/* guest */}
                    <div className={cx('guest-login-wrapper')}>
                        <hr style={{ marginBottom: '50px', marginTop: '60px' }} />
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