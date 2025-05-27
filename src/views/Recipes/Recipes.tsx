import { useEffect, useState } from 'react';
import styles from './Recipes.module.css';
import WaitOverlay from '@/components/WaitOverlay';
import Summary from '@/components/Summary';
import ListHeader from '@/components/ListHeader';
import IconButton from '@/components/IconButton';
import { Product } from '../Products/Products';
import RecipeItem from '@/components/RecipeItem';

export type Recipe = {
	id: string;
	name: string;
	ingredients: {
		product: Product,
		amount: number,
	}[]
}

export default function Recipes() {
	const [newRecipe, setNewRecipe] = useState('');
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [waiting, setWaiting] = useState(false);

	useEffect(() => {
		setWaiting(true);
		fetch('/api/products')
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					setProducts(data.data);
				}
			});
		fetch('/api/recipes')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setWaiting(false);
			});
	}, []);

	const handleAddRecipe = () => {
		if (newRecipe.trim().length === 0) return;
		setWaiting(true);
		fetch(`/api/add_recipe?name=${newRecipe.trim()}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					const newRecipe: Recipe = {
						id: data.data.id,
						name: data.data.name,
						ingredients: []
					};
					setRecipes(recipes => [newRecipe, ...recipes]);
				} else {
					console.log('Error fetching data:', data);
				}
				setWaiting(false);
			});
	}

	const handleRecipeNameChange = (id: string, value: string) => {
		setWaiting(true);
		fetch(`/api/update_recipe?id=${id}&name=${value}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					const nextRecipes = recipes.map(recipe => (
						recipe.id !== id ? recipe : { ...recipe, name: value }
					));
					setRecipes(nextRecipes);
				} else {
					console.log('Error fetching data:', data);
				}
				setWaiting(false);
			});
	}

	const handleRecipeDelete = (id: string) => {
		setWaiting(true);
		fetch(`/api/delete_recipe?id=${id}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					setRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
				} else {
					console.log('Error deleting recipe', data);
				}
				setWaiting(false);
			});
	}

	const handleAddProduct = (recipeId: string, productId: string, amount: number) => {
		setWaiting(true);
		fetch(`/api/add_product_to_recipe?recipeId=${recipeId}&productId=${productId}&amount=${amount}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					console.log(data);
				} else {
					console.log('Error adding product:', data);
				}
				setWaiting(false);
			});
	}

	return (
		<main className={styles.container}>
			{/* Summary */}
			<Summary
				items={[]}
			/>

			<div className={styles.listContainer}>
				{/* header */}
				<ListHeader />

				{/* new product bar */}
				<div className={styles.addBar}>
					<label className={styles.label}>
						Nova receita:
						<input
							className={styles.input}
							value={newRecipe}
							onChange={e => setNewRecipe(e.currentTarget.value)}
						/>
					</label>
					<IconButton
						type='add'
						onClick={handleAddRecipe}
						disabled={newRecipe.trim() === ''}
					/>
				</div>

				<div className={styles.recipesContainer}>
					{recipes.map(recipe => (
						<RecipeItem
							key={recipe.id}
							recipe={recipe}
							products={products}
							onRecipeNameChange={handleRecipeNameChange}
							onRecipeDelete={handleRecipeDelete}
							onAddProduct={(id, amount) => handleAddProduct(recipe.id, id, amount)}
						/>
					))}
				</div>
			</div>

			{/* wait overlay */}
			{waiting && <WaitOverlay />}
		</main>
	);
}
