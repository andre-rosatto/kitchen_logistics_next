"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
	logged: boolean;
	setLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({ logged: false, setLogged: () => { } });

export default function AuthContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		setLogged(sessionStorage.getItem('logged') !== null);
	}, []);

	return (
		<AuthContext.Provider value={{ logged, setLogged: setLogged }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuthContext must be used within a AuthContextProvider')
	}
	return context;
}