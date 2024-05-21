import { useNavigate } from 'react-router-dom';
// import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { remove as removeUser } from '~/redux/features/user/userSlice';
import { toast } from 'sonner';

const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.information);

  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      dispatch(removeUser());
      navigate('/login');
      toast.error('Your session has expired, please login again');
      return null;
    }
  }

  return children;
};

export default CheckAuth;
