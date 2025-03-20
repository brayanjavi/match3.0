import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Aquí podrías agregar lógica para obtener el usuario logueado
        const fetchUser = async () => {
            // Simulación de una llamada a la API para obtener el usuario
            const loggedInUser = await getUserFromApi();
            setUser(loggedInUser);
        };

        fetchUser();
    }, []);

    const getUserFromApi = async () => {
        // Simulación de una llamada a la API
        return { id: 1, name: 'Usuario Ejemplo' }; // Reemplaza con la lógica real
    };

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };