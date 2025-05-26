import { useEffect, useState } from 'react';
import styles from './products.module.css';
import ListHeader from '@/components/ListHeader';
import IconButton from '@/components/IconButton';

type Product = {
	id: string;
	name: string;
	unit: string;
	x1000: string;
}

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

	useEffect(() => {
		fetch('/api/products')
			.then(res => res.json())
			.then(result => {
				if ('data' in result && isProductArray(result.data)) {
					setProducts(result.data);
				} else {
					console.log('Error fetching data: ', result);
				}
			});
	}, []);

	const handleNewProductChange = (field: 'name' | 'unit' | 'x1000', value: string) => {
		setNewProduct(newProduct => ({
			name: field === 'name' ? value : newProduct.name,
			unit: field === 'unit' ? value : newProduct.unit,
			x1000: field === 'x1000' ? value : newProduct.x1000
		}));
	}

	return (
		<main className={styles.container}>
			{/* Summary */}
			<div></div>

			{/* main */}
			<div className={styles.tableContainer}>
				{/* header */}
				<ListHeader />

				{/* new product bar */}
				<div className={styles.addBar}>
					<label className={styles.label}>
						Novo produto:
						<input
							className={styles.input}
							onChange={e => handleNewProductChange('name', e.currentTarget.value)}
						/>
					</label>
					<label className={`${styles.label} ${styles.inputSmall}`}>
						Unidade:
						<input
							className={styles.input}
							onChange={e => handleNewProductChange('unit', e.currentTarget.value)}
						/>
					</label>
					<label className={`${styles.label} ${styles.inputSmall}`}>
						x1000:
						<input
							className={styles.input}
							onChange={e => handleNewProductChange('x1000', e.currentTarget.value)}
						/>
					</label>
					<IconButton
						type='add'
						onClick={() => console.log('click')}
						disabled={newProduct.name.trim() === '' || newProduct.unit.trim() === ''}
					/>
				</div>

				{/* table */}
				<table className={styles.table}>
					{/* table head */}
					<thead className={styles.tableHead}>
						<tr>
							<th className={styles.tableHeadItem}>Produto</th>
							<th className={styles.tableHeadItem}>Unidade</th>
							<th className={styles.tableHeadItem}>x1000</th>
							<th className={styles.tableHeadItem}></th>
						</tr>
					</thead>

					{/* table body */}
					<tbody>
						{products.map(product => (
							<tr
								key={product.id}
								id={`_${product.id}`}
								className={styles.tableBodyRow}
							>
								<td className={styles.tableBodyItem}>{product.name}</td>
								<td className={styles.tableBodyItem}>{product.unit}</td>
								<td className={styles.tableBodyItem}>{product.x1000}</td>
								<td className={styles.tableBodyItem}>
									<IconButton
										type='delete'
										onClick={() => console.log('delete')}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	)
}
