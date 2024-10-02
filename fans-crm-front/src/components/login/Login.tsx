import React, {useState} from 'react';
import usersApi from "../../api/users";
import Account from "../../services/Account";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name: '', email: '', password: '', phone: ''})
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
        setFormData({name: '', email: '', password: '', phone: ''})
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        setFormData({name: '', email: '', password: '', phone: ''})
    };

    const handleChange = (key : string, value: string) => {
        setFormData({...formData, [key]: value});
    }

    const handleLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!(formData.email && formData.password)) {
            return;
        } else {
            try {
                const {data} = await usersApi.userLogin(formData);
                if(data && data.token){
                    Account.setToken(data.token)
                    navigate('/user')
                }
            } catch (e: any) {
                console.log(e)
                const errorMessage = e?.response?.data?.message || 'An error occurred during login';
                toast.error(errorMessage)
            }
        }
    }

    const handleCreateUser = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (!(formData.email && formData.password && formData.phone && formData.name)) {
            return;
        } else {
            try {
                const {data, status} = await usersApi.userSignUp(formData);
                if(data && status === 201){
                    handleSignInClick()
                    toast.success('User successfully added')
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div>
            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleCreateUser}>
                        <h1>Create Account</h1>
                        <input  required onChange={ev => handleChange('name', ev.target.value)} value={formData.name} type="text" placeholder="Name"/>
                        <input  required onChange={ev => handleChange('email', ev.target.value)} value={formData.email} type="email" placeholder="Email"/>
                        <input  required onChange={ev => handleChange('phone', ev.target.value)} value={formData.phone} type="text" placeholder="Phone"/>
                        <input  required onChange={ev => handleChange('password', ev.target.value)} value={formData.password} type="password" placeholder="Password"/>
                        <button >Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <input required onChange={ev => handleChange('email', ev.target.value)} value={formData.email} type="email" placeholder="Email"/>
                        <input required onChange={ev => handleChange('password', ev.target.value)} value={formData.password} type="password" placeholder="Password"/>
                        <button >Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button onClick={handleSignInClick} className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button onClick={handleSignUpClick} className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
