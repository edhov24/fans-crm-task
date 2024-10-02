import React, {useEffect} from 'react';
import Account from "../services/Account";
import {Outlet, useNavigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Wrapper: React.FC = () => {
    const token = Account.getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            navigate('/user')
        }
    }, [navigate, token])

    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
};

export default Wrapper;
