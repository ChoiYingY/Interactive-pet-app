import './style/App.css';
import './style/Home.css';
import './style/LoadingScreen.css';

import React, { useEffect, useState } from 'react';

import HomeScreen from "./HomeScreen";
import LoadingScreen from './LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);
    
  return (
    <div>
      {!isLoading
        ? <div>
          <HomeScreen/>
        </div>
        : <LoadingScreen/>
      }
    </div>
  );
}

export default App;
