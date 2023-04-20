import './style/App.css';
import './style/Home.css';
import './style/LoadingScreen.css';

import React, { useEffect, useState } from 'react';
import { GlobalStoreContextProvider } from './Store';

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
    <GlobalStoreContextProvider>
      {!isLoading
        ? <div>
          <HomeScreen/>
        </div>
        : <LoadingScreen/>
      }
    </GlobalStoreContextProvider>
  );
}

export default App;
