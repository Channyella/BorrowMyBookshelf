import React, { createContext, useState, ReactNode } from 'react';
import { GetCurrentUser, UserInfo } from '../models/AuthHelper';

interface AuthContextType {
    auth: UserInfo | null;
    setAuth: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const initialAuthContext: AuthContextType = {
    auth: GetCurrentUser(),
    setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<UserInfo | null>(initialAuthContext.auth);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;