import { Product } from '@/typings/Product';
import styles from './ProductsSummary.module.css';
import SmartInput from '../SmartInput';
import { useEffect, useMemo, useState } from 'react';
import { Meal } from '@/typings/Meals';
import { Recipe } from '@/typings/Recipe';
import { SummaryTotal } from '@/typings/SummaryTotal';
import { getSummaryTotal } from '@/utils/getSummaryTotal';

interface ProductsSummaryProps extends React.ComponentProps<'div'> {
	mealRecipes: Meal['recipes'];
	recipes: Recipe[];
	products: Product[];
	initialAmount: number;
	onAmountChange: (value: number) => void;
}

export default function ProductsSummary({ initialAmount, mealRecipes, recipes, products, onAmountChange, ...props }: Readonly<ProductsSummaryProps>) {
	const [amount, setAmount] = useState(initialAmount);

	const productsTotal = useMemo((): SummaryTotal[] => {
		if (recipes.length === 0) return [];
		const result: SummaryTotal[] = [];
		mealRecipes.forEach(mealRecipe => {
			const recipe = recipes.find(r => r.id === mealRecipe.recipeId)!;
			recipe.ingredients.forEach(ingredient => {
				const product = products.find(p => p.id === ingredient.productId)!;
				const resultIdx = result.findIndex(r => r.id === product.id);
				if (resultIdx >= 0) {
					result[resultIdx].amount += ingredient.amount * initialAmount;
				} else {
					result.push({
						id: product.id,
						name: product.name,
						amount: ingredient.amount * initialAmount,
					});
				}
			});
		});
		return result;
	}, [products, initialAmount, mealRecipes, recipes]);

	useEffect(() => {
		setAmount(initialAmount);
	}, [initialAmount]);



	const handleAmountChange = (newValue: string) => {
		let formattedValue = parseInt(newValue.replace(/[^0-9].*$/, ''));
		if (isNaN(formattedValue)) {
			formattedValue = initialAmount;
		}
		if (formattedValue !== initialAmount) {
			onAmountChange(formattedValue);
		}
	}

	return (
		<div
			className={styles.container}
			{...props}
		>
			{/* header */}
			<div className={styles.header}>
				<h3 className={styles.headerText}>Produtos</h3>
				<label className={styles.label}>
					Quant.:
					<SmartInput
						className={styles.input}
						initialValue={Intl.NumberFormat('pt-BR', {
							minimumFractionDigits: 0,
							maximumFractionDigits: 3,
						}).format(amount)}
						onInputChange={handleAmountChange}
						allowEmpty={false}
						allowedChars='0123456789'
					/>
				</label>
			</div>

			{/* table */}
			<table className={styles.table}>
				<tbody>
					{productsTotal.map(product => (
						<tr
							key={product.id}
							className={styles.tableRow}
						>
							<td className={styles.tableItem}>{product.name}</td>
							<td className={`${styles.tableItem} ${styles.tableItemAmount}`}>{getSummaryTotal(products, product)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
