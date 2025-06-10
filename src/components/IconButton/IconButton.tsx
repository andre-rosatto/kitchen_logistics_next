import Image from 'next/image';
import styles from './IconButton.module.css';

interface AddButtonProps extends React.ComponentProps<'button'> {
	buttonType: 'add' | 'delete';
	className?: string;
}

export default function IconButton({ buttonType, className = '', ...props }: Readonly<AddButtonProps>) {
	return (
		<button
			className={`${styles.container} ${className} ${buttonType === 'add' ? styles.add : styles.delete}`}
			{...props}
		>
			<Image
				src={buttonType === 'add' ? '/assets/add_icon.svg' : '/assets/delete_icon.svg'}
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
