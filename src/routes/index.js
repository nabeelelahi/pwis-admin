import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Workers,
    Childrens,
    AccountRequests,
    Houses,
    VaccineDrive,
    AddWorker,
    AddChildren,
    UpdateWorker,
    Dashboard

} from '@pages'
import Login from "../pages/login";
import PrivateRoute from "./privateRoute";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/'
                    element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
                <Route path='/vaccine-drive'
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
                    path='/houses'
                    element={<PrivateRoute><Houses /></PrivateRoute>} />
                <Route
                    path='/add-worker'
                    element={<PrivateRoute><AddWorker /></PrivateRoute>} />
                <Route
                    path='/add-children'
                    element={<PrivateRoute><AddChildren /></PrivateRoute>} />
                <Route
                    path='/update-worker'
                    element={<PrivateRoute><UpdateWorker /></PrivateRoute>} />

                <Route path='/login' element={<Login />} />


            </Routes>
        </Router>
    );
}


