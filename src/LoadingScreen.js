import React from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = () => {
    return(
        <div className="loading-screen">
            <ReactLoading id="loading" type="bubbles" color="var(--primary-color)"/>
        </div>
    );
}

export default LoadingScreen;