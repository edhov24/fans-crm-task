import React from 'react';
import Account from "../services/Account";
import {useNavigate} from "react-router-dom";

const User: React.FC = () => {
    const navigate= useNavigate()
    const handleLogoUt = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault()
        Account.delete()
        navigate('/login')
    }
    return (
        <div>
            <h1>User Page</h1>
            {/* Display user data here */}

            <button onClick={handleLogoUt}>Log out</button>
        </div>
    );
};

export default User;
