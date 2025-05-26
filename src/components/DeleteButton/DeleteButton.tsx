import Image from 'next/image';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
	disabled?: boolean;
	onClick: () => void;
}

export default function DeleteButton({ disabled = false, onClick }: DeleteButtonProps) {
	return (
		<button
			className={styles.container}
			disabled={disabled}
			onClick={onClick}
		>
			<Image
				src='/assets/delete_icon.svg'
				alt='Excluir item'
				title='Excluir item'
				width={100}
				height={100}
				priority
				className={styles.icon}
			/>
		</button>
	);
}
