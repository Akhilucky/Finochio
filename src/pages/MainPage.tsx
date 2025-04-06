import React from 'react';

interface MainPageProps {
  userDetails: { name: string; email: string } | null;
}

const MainPage: React.FC<MainPageProps> = ({ userDetails }) => {
  return (
    <div>
      <h1>Welcome to the Website</h1>
      {userDetails && (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
