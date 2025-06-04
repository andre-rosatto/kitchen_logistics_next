import { useEffect, useState } from 'react';
import styles from './Meals.module.css';
import WaitOverlay from '@/components/WaitOverlay';
import MealsItem from '@/components/MealsItem';
import { isMealArray, Meal } from '@/typings/Meals';
import { isRecipeArray, Recipe } from '@/typings/Recipe';
import { isProductArray, Product } from '@/typings/Product';

export default function Meals() {
	const [waiting, setWaiting] = useState(false);
	const [meals, setMeals] = useState<Meal[]>([]);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		setWaiting(true);
		fetch(`/api/meals`)
			.then(res => res.json())
			.then(data => {
				if (data.ok && isMealArray(data.data)) {
					setMeals(data.data);
				} else {
					console.log('Error fetching meals:', data);
				}
				setWaiting(false);
			});
		fetch(`/api/recipes`)
			.then(res => res.json())
			.then(data => {
				if (data.ok && isRecipeArray(data.data)) {
					setRecipes(data.data);
				} else {
					console.log('Error fetching recipes:', data);
				}
			});
		fetch(`/api/products`)
			.then(res => res.json())
			.then(data => {
				if (data.ok && isProductArray(data.data)) {
					setProducts(data.data);
				} else {
					console.log('Error fetching products:', data);
				}
			});
	}, []);

	const handleAddMeal = (meal: Meal, isLunch: boolean) => {
		setWaiting(true);
		fetch(`/api/add_meal?recipeId=${recipes[0].id}&mealId=${meal.id}&isLunch=${isLunch}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					console.log(data);
					const newRecipes = [{
						id: data.data.id,
						recipeId: data.data.recipe_id,
						isLunch: isLunch,
					}, ...meal.recipes];
					setMeals(meals => meals.map(m => m.id !== meal.id ? m : { ...m, recipes: newRecipes }));
				} else {
					console.log('Error adding meal:', data);
				}
				setWaiting(false);
			});
	}

	const handleDeleteMeal = (meal: Meal, id: string) => {
		setWaiting(true);
		fetch(`/api/delete_meal?id=${id}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					const newRecipes = meal.recipes.filter(r => r.id !== id);
					setMeals(meals => meals.map(m => m.id !== meal.id ? m : { ...m, recipes: newRecipes }));
				} else {
					console.log('Error deletin meal:', data);
				}
				setWaiting(false);
			});
	}

	const handleChangeMeal = (meal: Meal, id: string, recipeId: string) => {
		setWaiting(true);
		fetch(`/api/update_meal?id=${id}&recipeId=${recipeId}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					const newRecipes = meal.recipes.map(r => r.id !== id ? r : ({ ...r, recipeId }))!;
					setMeals(meals => meals.map(m => m.id !== meal.id ? m : { ...m, recipes: newRecipes }));
				} else {
					console.log('Error updating meal:', data);
				}
				setWaiting(false);
			});
	}

	return (
		<main className={styles.container}>
			<div className={styles.daysContainer}>
				{meals.map(meal => (
					<MealsItem
						key={meal.id}
						meal={meal}
						recipes={recipes}
						onAddMeal={isLunch => handleAddMeal(meal, isLunch)}
						onDeleteMeal={id => handleDeleteMeal(meal, id)}
						onChangeMeal={(id, recipeId) => handleChangeMeal(meal, id, recipeId)}
					/>
				))}
			</div>

			{/* wait overlay */}
			{waiting && <WaitOverlay />}
		</main>
	);
}
