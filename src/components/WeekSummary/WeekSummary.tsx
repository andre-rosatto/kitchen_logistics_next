import { Meal } from '@/typings/Meals';
import styles from './WeekSummary.module.css';
import { Recipe } from '@/typings/Recipe';
import { Product } from '@/typings/Product';
import { useMemo } from 'react';
import { SummaryTotal } from '@/typings/SummaryTotal';
import { getSummaryTotal } from '@/utils/getSummaryTotal';

interface WeekSummaryProps extends React.ComponentProps<'section'> {
	meals: Meal[];
	recipes: Recipe[];
	products: Product[];
}

export default function WeekSummary({ meals, recipes, products, ...props }: WeekSummaryProps) {
	const weekTotal = useMemo((): SummaryTotal[] => {
		let result: SummaryTotal[] = [];
		meals.forEach(meal => {
			meal.recipes.forEach(mealRecipe => {
				const recipe = recipes.find(r => mealRecipe.recipeId === r.id)!;
				recipe.ingredients.forEach(ingredient => {
					const product = products.find(p => ingredient.productId === p.id)!;
					const resultIdx = result.findIndex(res => res.id === product.id);
					if (resultIdx >= 0) {
						result[resultIdx].amount += ingredient.amount * meal.amount;
					} else {
						result.push({
							id: product.id,
							name: product.name,
							amount: ingredient.amount * meal.amount,
						});
					}
				})
			});
		});
		return result;
	}, [meals, recipes, products]);

	return (
		<section
			className={styles.container}
			{...props}
		>
			{/* header */}
			<div className={styles.header}>
				<h3 className={styles.headerTitle}>Total de Produtos da Semana</h3>
				<div className={styles.buttonsContainer}>
					<button className={styles.button}>Imprimir</button>
					<button className={styles.button}>Copiar</button>
				</div>
			</div>

			{/* table */}
			<div className={styles.table}>
				{weekTotal.map(product => (
					<div
						key={product.id}
						className={styles.tableRow}
					>
						<span className={styles.tableItem}>{product.name}</span>
						<span className={`${styles.tableItem} ${styles.tableAmount}`}>{getSummaryTotal(products, product)}</span>
					</div>
				))}
			</div>
		</section>
	);
}
