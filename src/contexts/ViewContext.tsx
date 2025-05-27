"use client";

import { createContext, useContext, useState } from "react";

export type ViewContextType = {
	view: number;
	setView: (idx: number) => void;
}

const ViewContext = createContext<ViewContextType>({ view: 1, setView: () => { } });

export default function ViewContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [view, setView] = useState<number>(1);

	return (
		<ViewContext.Provider value={{ view, setView }}>
			{children}
		</ViewContext.Provider>
	);
}

export function useViewContext() {
	const context = useContext(ViewContext);
	if (context === undefined) {
		throw new Error('useViewContext must be used within a ViewContextProvider')
	}
	return context;
}