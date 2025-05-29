import { Recipe } from '@/views/Recipes/Recipes';
import styles from './RecipeItem.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { Product } from '@/views/Products/Products';
import TableSelect from '../TableSelect';
import { strToFloat } from '@/utils/converter';

interface RecipeItemProps {
	recipe: Recipe;
	products: Product[];
	onRecipeNameChange: (id: string, value: string) => void;
	onRecipeDelete: (id: string) => void;
	onAddProduct: (id: string, amount: number) => void;
}

export default function RecipeItem({ recipe, products, onRecipeNameChange, onRecipeDelete, onAddProduct }: RecipeItemProps) {
	const [name, setName] = useState(recipe.name);
	const [amount, setAmount] = useState('0');
	const [product, setProduct] = useState<Product>(products[0]);

	useEffect(() => {
		setName(recipe.name);
	}, [recipe]);

	const handleNameBlur = () => {
		if (name.trim() === recipe.name) return;
		if (name.trim().length === 0) {
			setName(recipe.name);
			return;
		};
		setName(name.trim());
		onRecipeNameChange(recipe.id, name.trim());
	}

	const handleDeleteRecipe = () => {
		if (confirm(`Tem certeza de que deseja excluir esta receita?\nA receita também será excluída das refeições.\nEsta ação não pode ser desfeita.\n\nReceita: ${recipe.name}`)) {
			onRecipeDelete(recipe.id);
		}
	}

	const handleProductSelect = (id: string) => {
		const nextProduct = products.find(p => p.id === id);
		if (nextProduct) {
			setProduct(nextProduct);
		}
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formattedValue = e.currentTarget.value.trim();
		formattedValue = formattedValue.replace(/[^(0-9).,]+/g, '');
		setAmount(formattedValue);
	}

	const handleAmountBlur = () => {
		const formattedValue = strToFloat(amount);
		setAmount(Number.isInteger(formattedValue) ? formattedValue.toString() : formattedValue.toFixed(2));
	}

	const handleAddProduct = () => {
		onAddProduct(product.id, parseInt(amount));
	}

	return (
		<div
			className={styles.container}
			id={`_${recipe.id}`}
		>
			<div className={styles.header}>
				<div className={styles.headerInputContaier}>
					<Image
						className={styles.icon}
						src='/assets/recipe_icon.svg'
						alt={recipe.name}
						title={recipe.name}
						width={100}
						height={100}
						priority
					/>
					<input
						className={`${styles.input} ${styles.headerInput}`}
						value={name}
						onChange={e => setName(e.currentTarget.value)}
						onBlur={handleNameBlur}
					/>
				</div>
				<IconButton
					type='delete'
					onClick={handleDeleteRecipe}
				/>
			</div>

			<div className={styles.addBar}>
				<label className={styles.label}>
					Produto:
					{/* <input className={styles.input} /> */}
					<TableSelect
						items={products}
						onSelect={handleProductSelect}
					/>
				</label>

				<label className={styles.label}>
					Quantidade:
					<input
						className={`${styles.input} ${styles.inputSmall}`}
						value={amount}
						onChange={handleAmountChange}
						onBlur={handleAmountBlur}
					/>
					{product.unit}
				</label>

				<IconButton
					type='add'
					disabled={amount.trim().length === 0}
					onClick={handleAddProduct}
				/>
			</div>
		</div>
	);
}
