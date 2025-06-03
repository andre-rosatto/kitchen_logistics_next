import styles from './TableSelect.module.css';
import { Product } from '@/views/Products/Products';
import { useState } from 'react';

interface TableSelectProps extends React.ComponentProps<'select'> {
	items: Product[];
	initialValue?: string;
	onSelectChange: (id: string) => void;
}

export default function TableSelect({ items, initialValue, onSelectChange, ...props }: TableSelectProps) {
	const [selectedId, setSelectedId] = useState(initialValue || items[0].id);

	const handleOnChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		if (e.currentTarget.value !== selectedId) {
			onSelectChange(e.currentTarget.value);
			setSelectedId(e.currentTarget.value);
		}
	}

	return (
		<select
			className={styles.container}
			defaultValue={selectedId}
			onChange={handleOnChange}
			{...props}
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
