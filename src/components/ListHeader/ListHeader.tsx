import { useViewContext } from '@/contexts/ViewContext';
import styles from './ListHeader.module.css';
import Image from 'next/image';

export default function ListHeader() {
	const { view } = useViewContext();

	const getData = (): { title: string; icon: string } => {
		switch (view) {
			case 0:
				return { title: 'Pratos', icon: '/assets/dish_icon.svg' }
			case 1:
				return { title: 'Receitas', icon: '/assets/recipe_icon.svg' }
			default:
				return { title: 'Produtos', icon: '/assets/product_icon.svg' }
		}
	}

	const data = getData();

	return (
		<div className={styles.container}>
			<Image
				src={data.icon}
				alt={data.title}
				title={data.title}
				width={100}
				height={100}
				priority
				className={styles.icon}
			/>
			<h2 className={styles.title}>{data.title}</h2>
		</div>
	)
}
