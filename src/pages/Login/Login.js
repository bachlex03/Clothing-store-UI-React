import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { LoginNoti } from '~/components';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Login() {
    return (
        <div className={cx('container-fluid px-0')}>
            <div className={cx("container-fluid", "topbar")}>
                <h1 className={cx("title", "text-center")}>LOGIN</h1>
            </div>
            <div className={cx("container-fluid px-4")}>
                <div className={cx("content-login")}>
                    <div className={cx("login-wrapper")}>
                        <form>
                            {/* login message */}
                            <LoginNoti message="Please adjust the following:" errors={["Incorrect email or password"]}/>
                            {/* input fiels */}
                            <div className={cx("form-floating mb-4", "form-floating-ovr")}>
                                <input type="email" className={cx("form-control rounded-0", "form-control-ovr")} id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput" className={cx('label-ovr')}>Email<span className={cx("asterisk", "label-ovr")}> *</span></label>
                            </div>
                            <div className={cx("form-floating mb-4", "form-floating-ovr")}>
                                <input type="password" className={cx("form-control rounded-0", "password", "form-control-ovr")} id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword" className={cx('label-ovr')}>Password<span className={cx("asterisk")}> *</span></label>
                            </div>
                            <button type="button" className={cx("btn btn-outline-dark rounded-0", "button")}>Sign In</button>
                            <p className={cx('p-text')}>New customer? <Link to="/register" className={cx('link')}>Create your account</Link></p>
                            <p className={cx('p-text')}>Lost password? <Link to="/recover" className={cx('link')}>Recover password</Link></p>
                        </form>
                    </div>

                    {/* guest */}
                    <div className={cx('guest-login-wrapper')}>
                        <hr />
                        <h2 className={cx('title')}>CONTINUE AS A GUEST</h2>
                        <form>
                            <button type="button" className={cx("btn btn-dark rounded-0", "button")}>Continue</button>
                        </form>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Login;