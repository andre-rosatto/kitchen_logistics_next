import styles from './WaitOverlay.module.css';
import Image from 'next/image';

export default function WaitOverlay() {
	return (
		<div className={styles.container}>
			<Image
				src='/assets/loading_icon.svg'
				alt='Processando...'
				title='Processando...'
				width={200}
				height={200}
				priority
				className={styles.icon}
			/>
		</div>
	)
}
