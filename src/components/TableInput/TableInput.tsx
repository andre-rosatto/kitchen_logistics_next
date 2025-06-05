import styles from './TableInput.module.css';
import { useEffect, useState } from 'react';

interface TableInputProps extends React.ComponentProps<'input'> {
	className?: string;
	allowEmpty?: boolean;
	initialValue: string;
	onInputChange: (newValue: string) => void;
}

export default function TableInput({ className = '', allowEmpty = true, initialValue, onInputChange, ...props }: TableInputProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const handleBlur = () => {
		if (value.trim() === '' && !allowEmpty) {
			setValue(initialValue);
		} else if (value !== initialValue) {
			onInputChange(value);
		}
	}

	return (
		<input
			className={`${styles.container} ${className}`}
			value={value}
			onChange={e => setValue(e.currentTarget.value)}
			onBlur={handleBlur}
			{...props}
		/>
	)
}
