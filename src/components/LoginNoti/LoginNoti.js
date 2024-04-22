import style from './LoginNoti.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

function LoginNoti(props) {

    return (
        <div className={cx("login-message")}>
            <h2 className={cx("title")}>
                <span className={cx("bi bi-exclamation-circle-fill", "exclamation")}> </span>
                {props.message}
            </h2>
            <div className={cx("errors")}>
                <ul>
                    {props.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// function LoginNoti() {
//     return (
//         <><div className={cx("login-message")}>
//             <h2 className={cx("title")}>
//                 <span className={cx("bi bi-exclamation-circle-fill", "exclamation")}> </span>
//                 Please adjust the following
//             </h2>
//             <div className={cx("errors")}>
//                 <ul>
//                     <li>
//                         Incorect email or password
//                     </li>
//                 </ul>
//             </div>
//         </div></>
//     )
// }

export default LoginNoti;