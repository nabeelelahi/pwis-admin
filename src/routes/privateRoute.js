import React from "react";
import { Navigate } from 'react-router'
import { CheckUser } from "@helpers";


export default function PrivateRoute({ children }) {

    const data = CheckUser()

    return data !== null ? children : <Navigate to="/login" />


}