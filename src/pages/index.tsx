import Head from "next/head";
import ViewContextProvider from "@/contexts/ViewContext";
import ViewSwitcher from "@/components/ViewSwitcher";
import AuthContextProvider from "@/contexts/AuthContext";


export default function Home() {
	return (
		<>
			<Head>
				<title>Bairral: Logística da Cozinha</title>
				<meta name="description" content="Kitchen Logistics" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AuthContextProvider>
				<ViewContextProvider>
					<ViewSwitcher />
				</ViewContextProvider>
			</AuthContextProvider>
		</>
	);
}
