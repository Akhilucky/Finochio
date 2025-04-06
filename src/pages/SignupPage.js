import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// ...existing code...

function SignupPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();

    const handleSignup = () => {
        // Replace with actual signup logic
        if (credentials.username && credentials.password) {
            alert('Signup successful! Please login.');
            history.push('/login');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}

export default SignupPage;
