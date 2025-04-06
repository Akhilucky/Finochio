import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
// ...existing code...

const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return !!localStorage.getItem('authToken');
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <PrivateRoute path="/home" component={HomePage} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    );
}

export default App;
