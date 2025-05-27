import styles from './TableSelect.module.css';
import { Product } from '@/views/Products/Products';
import { useState } from 'react';

interface TableSelectProps {
	items: Product[];
	onSelect: (id: string) => void;
}

export default function TableSelect({ items, onSelect }: TableSelectProps) {
	const [selectedId, setSelectedId] = useState(items[0].id);

	const handleOnChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		if (e.currentTarget.value !== selectedId) {
			onSelect(e.currentTarget.value);
			setSelectedId(e.currentTarget.value);
		}
	}

	return (
		<select
			className={styles.container}
			defaultValue={selectedId}
			onChange={handleOnChange}
		>
			{items.map(item => (
				<option
					key={item.id}
					value={item.id}
				>{item.name}</option>
			))}
		</select>
	);
}
