import styles from './RecipeItem.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IconButton from '../IconButton';
import SmartSelect from '../SmartSelect';
import { strToFloat } from '@/utils/converter';
import SmartInput from '../SmartInput';
import { Recipe } from '@/typings/Recipe';
import { Product } from '@/typings/Product';

interface RecipeItemProps extends React.ComponentProps<'div'> {
	recipe: Recipe;
	products: Product[];
	onRecipeNameChange: (id: string, value: string) => void;
	onRecipeDelete: (id: string) => void;
	onProductAdd: (id: string, amount: number) => void;
	onProductDelete: (id: string) => void;
	onProductChange: (ingredientId: string, productId: string) => void;
	onProductAmountChange: (id: string, amount: number) => void;
}

export default function RecipeItem({
	recipe,
	products,
	onRecipeNameChange,
	onRecipeDelete,
	onProductAdd,
	onProductDelete,
	onProductChange,
	onProductAmountChange,
	...props
}: Readonly<RecipeItemProps>) {
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

	const handleAmountChange = (newValue: string) => {
		const formattedValue = strToFloat(newValue);
		setAmount(Intl.NumberFormat('pt-BR', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 3,
			useGrouping: false,
		}).format(formattedValue));
	}

	const handleAddProduct = () => {
		onProductAdd(product.id, strToFloat(amount));
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
					className={styles.iconButton}
					buttonType='delete'
					onClick={handleDeleteRecipe}
				/>
			</div>

			{/* add bar */}
			<div className={styles.addBar}>
				<label className={styles.label}>
					Produto:
					<SmartSelect
						className={styles.select}
						items={products}
						onSelectChange={handleProductSelect}
					/>
				</label>

				<label className={styles.label}>
					Quantidade:
					<SmartInput
						className={`${styles.input} ${styles.inputSmall}`}
						initialValue={amount}
						allowEmpty={false}
						allowedChars='0123456789,.'
						onInputChange={handleAmountChange}
					/>
					{product.unit}
				</label>

				<IconButton
					className={styles.iconButton}
					buttonType='add'
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
						key={ingredient.ingredientId}
						id={`_${ingredient.ingredientId}`}
						className={styles.tableRow}
					>
						{/* product name */}
						<span className={`${styles.tableItem} ${styles.tableColumn}`}>
							<SmartSelect
								className={styles.select}
								items={products}
								initialValue={ingredient.productId}
								onSelectChange={id => onProductChange(ingredient.ingredientId, id)}
							/>
						</span>

						{/* product amount */}
						<span className={`${styles.tableItem} ${styles.tableColumnSmall}`}>
							<SmartInput
								className={`${styles.input} ${styles.tableInput}`}
								allowedChars='0123456789,.'
								initialValue={Intl.NumberFormat('pt-BR', {
									minimumFractionDigits: 0,
									maximumFractionDigits: 3,
									useGrouping: false,
								}).format(ingredient.amount)}
								allowEmpty={false}
								onInputChange={newValue => onProductAmountChange(ingredient.ingredientId, strToFloat(newValue))}
							/>
						</span>

						{/* product unit */}
						<span className={`${styles.tableItem} ${styles.tableColumnSmall}`}>
							{products.find(p => p.id === ingredient.productId)!.unit}
						</span>

						{/* delete button */}
						<span className={`${styles.tableItem} ${styles.tableColumnIcon}`}>
							<IconButton
								className={styles.iconButton}
								buttonType='delete'
								onClick={() => onProductDelete(ingredient.ingredientId)}
							/>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
