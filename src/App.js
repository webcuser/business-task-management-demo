import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
    return (
        <AuthProvider>
            <div className='app'>
                <h1>Business Task Management</h1>
                <Login />
                <Logout />
            </div>
        </AuthProvider>
    );
};

export default App;