// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
    if (!isLoggedIn) {
        // Si no está logeado, redirige a la página de login
        return <Navigate to="/login" replace />;
    }
    // Si está logeado, muestra el componente hijo (el Dashboard)
    return children;
};

export default ProtectedRoute;