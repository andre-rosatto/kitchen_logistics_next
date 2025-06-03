import { Recipe } from '@/views/Recipes/Recipes';
import styles from './RecipeItem.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { Product } from '@/views/Products/Products';
import TableSelect from '../TableSelect';
import { strToFloat } from '@/utils/converter';
import TableInput from '../TableInput';

interface RecipeItemProps extends React.ComponentProps<'div'> {
	recipe: Recipe;
	products: Product[];
	onRecipeNameChange: (id: string, value: string) => void;
	onRecipeDelete: (id: string) => void;
	onProductAdd: (id: string, amount: number) => void;
	onProductDelete: (id: string) => void;
	onProductAmountChange: (id: string, amount: number) => void;
}

export default function RecipeItem({
	recipe,
	products,
	onRecipeNameChange,
	onRecipeDelete,
	onProductAdd,
	onProductDelete,
	onProductAmountChange,
	...props
}: RecipeItemProps) {
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
		setAmount(Number.isInteger(formattedValue) ? formattedValue.toString() : formattedValue.toFixed(3));
	}

	const handleAddProduct = () => {
		onProductAdd(product.id, parseFloat(amount));
	}

	if (!product) return null;

	return (
		<div
			className={styles.container}
			id={`_${recipe.id}`}
			{...props}
		>
			{/* header */}
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

			{/* add bar */}
			<div className={styles.addBar}>
				<label className={styles.label}>
					Produto:
					<TableSelect
						items={products}
						onSelectChange={handleProductSelect}
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

			{/* ingredients */}
			{/* table head */}
			<div className={styles.tableHead}>
				<span className={`${styles.tableHeadItem} ${styles.tableColumn}`}>Produto</span>
				<span className={`${styles.tableHeadItem} ${styles.tableColumnSmall}`}>Quantidade</span>
				<span className={`${styles.tableHeadItem} ${styles.tableColumnSmall}`}>Unidade</span>
				<span className={`${styles.tableHeadItem} ${styles.tableColumnIcon}`}></span>
			</div>

			{/* table body */}
			<div className={styles.table}>
				{recipe.ingredients.map(ingredient => (
					<div
						key={ingredient.productId}
						id={`_${ingredient.productId}`}
						className={styles.tableRow}
					>
						{/* product name */}
						<span className={`${styles.tableItem} ${styles.tableColumn}`}>
							<TableSelect
								items={products}
								initialValue={ingredient.productId}
								onSelectChange={() => { }}
							/>
						</span>

						{/* product amount */}
						<span className={`${styles.tableItem} ${styles.tableColumnSmall}`}>
							<TableInput
								initialValue={Number.isInteger(ingredient.amount) ? ingredient.amount.toString() : ingredient.amount.toFixed(3)}
								onChange={newValue => onProductAmountChange(ingredient.productId, parseFloat(newValue))}
							/>
						</span>

						{/* product unit */}
						<span className={`${styles.tableItem} ${styles.tableColumnSmall}`}>
							{product.unit}
						</span>

						{/* delete button */}
						<span className={`${styles.tableItem} ${styles.tableColumnIcon}`}>
							<IconButton
								type='delete'
								onClick={() => onProductDelete(ingredient.productId)}
							/>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
