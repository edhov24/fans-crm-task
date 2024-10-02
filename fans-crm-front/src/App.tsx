import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import User from './components/User';
import Wrapper from "./components/Wrapper";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Wrapper/>}>
                <Route path="/"  Component={Login} />
                <Route path="/user" Component={User} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
