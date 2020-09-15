import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchLambda = async () => {
      const lambdaData = await API.get('cclaDevApi', '/ping');
      setResponse(lambdaData.success);
    };

    fetchLambda();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          data from lambda: {response}
        </p>
      </header>
    </div>
  );
}

export default App;
