import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Result from './Result';

const RoutesComponent = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Navigate to="/search" />}/>
                <Route exact path="/search" element={<Result/>}/>
                <Route path="/images" element={<Result/>}/>
                <Route path="/news" element={<Result/>}/>
                <Route path="/videos" element={<Result/>}/>
            </Routes>
        </div>
    )
}

export default RoutesComponent
