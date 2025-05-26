import Image from 'next/image';
import styles from './IconButton.module.css';

interface AddButtonProps {
	type: 'add' | 'delete'
	disabled?: boolean;
	onClick: () => void;
}

export default function IconButton({ type, disabled = false, onClick }: AddButtonProps) {
	return (
		<button
			className={`${styles.container} ${type === 'add' ? styles.add : styles.delete}`}
			disabled={disabled}
			onClick={onClick}
		>
			<Image
				src={type === 'add' ? '/assets/add_icon.svg' : '/assets/delete_icon.svg'}
				alt='Novo item'
				title='Novo item'
				width={100}
				height={100}
				priority
				className={styles.icon}
			/>
		</button>
	);
}
