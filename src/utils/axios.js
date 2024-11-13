// axios.js
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/user/userSlice'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Adjust with your API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const dispatch = useDispatch();
            const navigate = useNavigate();

            // Dispatch logout action
            dispatch(logoutUser());

            // Redirect to login page
            navigate('/login', { replace: true });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
