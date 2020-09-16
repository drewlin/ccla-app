import React, { useEffect, useState } from 'react';
import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';

Amplify.configure(awsconfig);

function App() {
  const [response, setResponse] = useState('');
  const [userAttributes, setUserAttributes] = useState(null);

  const fetchLambda = async () => {
    const lambdaData = await API.get('cclaDevApi', '/ping');
    setResponse(lambdaData.success);
  };

  const fetchUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    setUserAttributes(attributes);
  };

  useEffect(() => {
    fetchLambda();
    fetchUser();
  }, []);

  return (
    <div className="App">
      <div>
        <AmplifySignOut />
      </div>
      <header className="App-header">
        <h1>user data: </h1>
        <p>{userAttributes?.email}</p>
        <p>{userAttributes?.phone_number}</p>
        
        <h2>data from lambda: </h2>
        <p>
          {response}
        </p>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
