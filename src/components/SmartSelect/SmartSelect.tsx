import { Product } from '@/typings/Product';
import { Recipe } from '@/typings/Recipe';
import { useState } from 'react';

interface TableSelectProps extends React.ComponentProps<'select'> {
	items: Product[] | Recipe[];
	initialValue?: string;
	className?: string;
	onSelectChange: (id: string) => void;
}

export default function SmartSelect({ items, initialValue, className = '', onSelectChange, ...props }: TableSelectProps) {
	const [selectedId, setSelectedId] = useState(initialValue || items[0].id);

	const handleOnChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		if (e.currentTarget.value !== selectedId) {
			onSelectChange(e.currentTarget.value);
			setSelectedId(e.currentTarget.value);
		}
	}

	return (
		<select
			className={className}
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
