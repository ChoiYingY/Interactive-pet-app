import './style/App.css';
import './style/Home.css';
import './style/LoadingScreen.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalStoreContextProvider } from './Store';
import { GlobalBotContextProvider } from './Bot';

import NavBar from "./NavBar";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import LoadingScreen from './LoadingScreen';
import AboutScreen from './AboutScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
    
  return (
    <BrowserRouter>
      <GlobalStoreContextProvider>
        <GlobalBotContextProvider>
          {!isLoading ? (
              <div>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={HomeScreen}/>
                    <Route path="/game" exact component={GameScreen}/>
                    <Route path="/about" exact component={AboutScreen}/>
                </Switch>
              </div>
            )
            : <LoadingScreen/>
          }
        </GlobalBotContextProvider>
      </GlobalStoreContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
