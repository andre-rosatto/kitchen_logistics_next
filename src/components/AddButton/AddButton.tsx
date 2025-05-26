import Image from 'next/image';
import styles from './AddButton.module.css';

interface AddButtonProps {
	disabled?: boolean;
	onClick: () => void;
}

export default function AddButton({ disabled = false, onClick }: AddButtonProps) {
	return (
		<button
			className={styles.container}
			disabled={disabled}
			onClick={onClick}
		>
			<Image
				src='/assets/add_icon.svg'
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
