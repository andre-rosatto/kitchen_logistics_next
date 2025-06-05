import { useEffect, useState } from 'react';

interface SmartInputProps extends React.ComponentProps<'input'> {
	className?: string;
	allowedChars?: string;
	allowEmpty?: boolean;
	initialValue: string;
	onInputChange: (newValue: string) => void;
}

export default function SmartInput({ className = '', allowedChars = '', allowEmpty = true, initialValue, onInputChange, ...props }: SmartInputProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = [...e.currentTarget.value];
		if (allowedChars.length > 0) {
			const charSet = new Set(allowedChars.toLocaleLowerCase());
			newValue = newValue.filter(v => charSet.has(v.toLocaleLowerCase()));
		}
		setValue(newValue.join(''));
	}

	const handleBlur = () => {
		if (value.trim() === '' && !allowEmpty) {
			setValue(initialValue);
		} else if (value !== initialValue) {
			onInputChange(value);
		}
	}

	return (
		<input
			className={className}
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
			{...props}
		/>
	)
}
