import styles from "@/styles/Home.module.css";
import Head from "next/head";
import ViewContextProvider, { useViewContext } from "@/contexts/ViewContext";
import Navbar from "@/components/Navbar";
import Products from "@/views/Products";
import Recipes from "@/views/Recipes";


export default function Home() {
	const { view } = useViewContext();

	const handleClick = () => {
		// MEALS
		// update
		// fetch('/api/update_meal?day=5&amount=721', { method: 'PUT' })
		// 	.then(res => res.json())
		// 	.then(console.log);

		// get
		// fetch('/api/meals')
		// 	.then(res => res.json())
		// 	.then(console.log);


		// RECIPES
		// update
		// fetch('/api/update_recipe?id=a81780d9-8814-4757-bc28-7b907c3f015f&name=Inhames Vivos', { method: 'PUT' })
		// 	.then(res => res.json())
		// 	.then(console.log);

		// add
		// fetch('/api/add_recipe?name=File à Parmegiana', { method: 'POST' })
		// 	.then(res => res.json())
		// 	.then(console.log);

		// get
		// fetch('/api/recipes')
		// 	.then(res => res.json())
		// 	.then(console.log);


		// PRODUCTS
		// update
		// fetch('/api/update_product?id=5bea39cb-58ac-4ca9-b98a-5371afbbdf6a&name=Arroz&unit=g&x1000=kg', { method: 'PUT' })
		// 	.then(res => res.json())
		// 	.then(console.log);

		// delete
		// fetch('/api/delete_product?id=8492cac7-3f1c-42a1-b156-df9159bb20d3', { method: 'DELETE' })
		// 	.then(res => res.json())
		// 	.then(console.log);

		// add
		// fetch('/api/add_product?name=Feijão Carioquinha&unit=g&x1000=kg', { method: 'POST' })
		// 	.then(res => res.json())
		// 	.then(console.log);

		// get
		// fetch('/api/products')
		// 	.then(res => res.json())
		// 	.then(console.log);
	}

	const getView = () => {
		switch (view) {
			case 0:
				return null;
			case 1:
				return <Recipes />;
			case 2:
				return <Products />;
			default:
				return null;
		}
	}

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
				{getView()}
			</ViewContextProvider>
		</>
	);
}
