import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Workers,
    Childrens,
    AccountRequests,
    Orders,
    VaccineDrive,
    AddWorker,
    AddChildren

} from '@pages'
import Login from "../pages/login";
import PrivateRoute from "./privateRoute";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/'
                    element={<PrivateRoute><VaccineDrive /> </PrivateRoute>} />
                <Route
                    path='/workers'
                    element={<PrivateRoute><Workers /></PrivateRoute>}
                />

                <Route
                    path='/childrens'
                    element={<PrivateRoute><Childrens /></PrivateRoute>}
                />

                <Route
                    path='/account-requests'
                    element={<PrivateRoute><AccountRequests /> </PrivateRoute>}
                />
                <Route
                    path='/orders'
                    element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route
                    path='/add-worker'
                    element={<PrivateRoute><AddWorker /></PrivateRoute>} />
                <Route
                    path='/add-children'
                    element={<PrivateRoute><AddChildren /></PrivateRoute>} />

                <Route path='/login' element={<Login />} />


            </Routes>
        </Router>
    );
}


