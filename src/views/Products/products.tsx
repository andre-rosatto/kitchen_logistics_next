import { useEffect, useState } from 'react';
import styles from './products.module.css';
import ListHeader from '@/components/ListHeader';
import IconButton from '@/components/IconButton';
import WaitOverlay from '@/components/WaitOverlay';
import TableInput from '@/components/TableInput';
import Summary from '@/components/Summary';

export type Product = {
	id: string;
	name: string;
	unit: string;
	x1000: string;
}

type ProductField = 'name' | 'unit' | 'x1000';

const isProduct = (obj: unknown): obj is Product => {
	return (
		typeof obj === 'object' && obj !== null
		&& 'id' in obj && typeof obj.id === 'string'
		&& 'name' in obj && typeof obj.name === 'string'
		&& 'unit' in obj && typeof obj.unit === 'string'
		&& 'x1000' in obj && typeof obj.x1000 === 'string'
	);
}

const isProductArray = (obj: unknown): obj is Product[] => {
	if (!Array.isArray(obj)) return false;
	return obj.every(o => isProduct(o));
}

export default function Products() {
	const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', unit: '', x1000: '' });
	const [products, setProducts] = useState<Product[]>([]);
	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		setWaiting(true);

		// fetch all products
		fetch('/api/products')
			.then(res => res.json())
			.then(result => {
				if ('data' in result && isProductArray(result.data)) {
					setProducts(result.data);
				} else {
					console.log('Error fetching data: ', result);
				}
				setWaiting(false);
			});
	}, []);

	const handleNewProductChange = (field: ProductField, value: string) => {
		setNewProduct(newProduct => ({
			name: field === 'name' ? value : newProduct.name,
			unit: field === 'unit' ? value : newProduct.unit,
			x1000: field === 'x1000' ? value : newProduct.x1000
		}));
	}

	const handleProductChange = (id: string, field: ProductField, value: string) => {
		const productIdx = products.findIndex(product => product.id === id);
		if (productIdx < 0) return;
		const nextProduct = { ...products[productIdx] };
		switch (field) {
			case 'name':
				nextProduct.name = value;
				break;
			case 'unit':
				nextProduct.unit = value;
				break;
			case 'x1000':
				nextProduct.x1000 = value;
				break;
		}

		setWaiting(true);
		fetch(`/api/update_product?id=${id}&name=${nextProduct.name}&unit=${nextProduct.unit}&x1000=${nextProduct.x1000}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					setProducts(products => products.map(product => (
						product.id !== id ? product : nextProduct
					)));
				} else {
					console.log('Error updating product', data);
				}
				setWaiting(false);
			});
	}

	const handleAddProduct = () => {
		setWaiting(true);

		// format fields
		const name = newProduct.name.trim();
		const unit = newProduct.unit.trim();
		const x1000 = newProduct.x1000.trim();

		// checks if product already in list
		if (products.find(product => product.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
			if (!confirm(`O produto ${name} já está na lista.\nAdicionar outro?`)) {
				setWaiting(false);
				return;
			}
		}

		// add product
		fetch(`/api/add_product?name=${name}&unit=${unit}&x1000=${x1000}`)
			.then(res => res.json())
			.then(data => {
				if (isProduct(data.data)) {
					const nextProducts = [data.data, ...products];
					setProducts(nextProducts);
					setNewProduct({
						name: '',
						unit: '',
						x1000: ''
					});
				} else {
					console.log('Error adding product', data);
				}
				setWaiting(false);
			});
	}

	const handleProductDelete = (id: string) => {
		const product = products.filter(p => p.id === id);
		if (product.length !== 1) return;
		if (!confirm(`Tem certeza de que deseja excluir este produto?\nO produto também será excluído das receitas.\nEsta ação não pode ser desfeita.\n\nProduto: ${product[0].name}\nUnidade: ${product[0].unit}\nx1000: ${product[0].x1000}`)) {
			return;
		}
		setWaiting(true);
		fetch(`/api/delete_product?id=${id}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					setProducts(products => products.filter(product => product.id !== id));
				} else {
					console.log('Error deleting product', data);
				}
				setWaiting(false);
			});
	}

	return (
		<main className={styles.container}>
			{/* Summary */}
			<Summary
				items={products}
			/>

			{/* main */}
			<div className={styles.listContainer}>
				{/* header */}
				<ListHeader />

				{/* new product bar */}
				<div className={styles.addBar}>
					<label className={styles.label}>
						Novo produto:
						<input
							className={styles.input}
							value={newProduct.name}
							onChange={e => handleNewProductChange('name', e.currentTarget.value)}
						/>
					</label>
					<label className={`${styles.label} ${styles.inputSmall}`}>
						Unidade:
						<input
							className={styles.input}
							value={newProduct.unit}
							onChange={e => handleNewProductChange('unit', e.currentTarget.value)}
						/>
					</label>
					<label className={`${styles.label} ${styles.inputSmall}`}>
						x1000:
						<input
							className={styles.input}
							value={newProduct.x1000}
							onChange={e => handleNewProductChange('x1000', e.currentTarget.value)}
						/>
					</label>
					<IconButton
						type='add'
						onClick={handleAddProduct}
						disabled={newProduct.name.trim() === '' || newProduct.unit.trim() === ''}
					/>
				</div>

				{/* table */}
				{/* table head */}
				<div className={styles.tableHead}>
					<span className={`${styles.tableHeadItem} ${styles.tableColumn}`}>Produto</span>
					<span className={`${styles.tableHeadItem} ${styles.tableColumnSmall}`}>Unidade</span>
					<span className={`${styles.tableHeadItem} ${styles.tableColumnSmall}`}>x1000</span>
					<span className={`${styles.tableHeadItem} ${styles.tableColumnIcon}`}></span>
				</div>

				{/* table body */}
				<div className={styles.table}>
					{products.map(product => (
						<div
							key={product.id}
							id={`_${product.id}`}
							className={styles.tableRow}
						>
							<span className={`${styles.tableItem} ${styles.tableColumn}`}>
								<TableInput
									initialValue={product.name}
									allowEmpty={false}
									onChange={value => handleProductChange(product.id, 'name', value)}
								/>
							</span>
							<span className={`${styles.tableItem} ${styles.tableColumnSmall}`}>
								<TableInput
									initialValue={product.unit}
									allowEmpty={false}
									onChange={value => handleProductChange(product.id, 'unit', value)}
								/>
							</span>
							<span className={`${styles.tableItem} ${styles.tableColumnSmall}`}>
								<TableInput
									initialValue={product.x1000}
									onChange={value => handleProductChange(product.id, 'x1000', value)}
								/>
							</span>
							<span className={`${styles.tableItem} ${styles.tableColumnIcon}`}>
								<IconButton
									type='delete'
									onClick={() => handleProductDelete(product.id)}
								/>
							</span>
						</div>
					))}
				</div>
			</div>

			{/* wait overlay */}
			{waiting && <WaitOverlay />}
		</main>
	)
}
