import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/page1')}>Go to Page 1</button>
            <button onClick={() => navigate('/page2')}>Go to Page 2</button>
            <button onClick={() => navigate('/page3')}>Go to Page 3</button>
        </div>
    );
};

export default DashboardPage;
