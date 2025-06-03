import styles from "@/styles/Home.module.css";
import Head from "next/head";
import ViewContextProvider from "@/contexts/ViewContext";
import Navbar from "@/components/Navbar";
import ViewSwitcher from "@/components/ViewSwitcher";


export default function Home() {
	return (
		<>
			<Head>
				<title>Bairral: Logística da Cozinha</title>
				<meta name="description" content="Kitchen Logistics" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ViewContextProvider>
				<Navbar />
				<ViewSwitcher />
			</ViewContextProvider>
		</>
	);
}
