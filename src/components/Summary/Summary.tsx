import Image from 'next/image';
import styles from './Summary.module.css';
import { useViewContext } from '@/contexts/ViewContext';
import { useMemo } from 'react';
import { Product } from '@/typings/Product';
import { Recipe } from '@/typings/Recipe';

interface SummaryProps extends React.ComponentProps<'section'> {
	items: Product[] | Recipe[],
}

export default function Summary({ items, ...props }: Readonly<SummaryProps>) {
	const { view } = useViewContext();
	const sortedItems = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })), [items]);

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

	const handleItemClick = (e: React.MouseEvent, itemId: string) => {
		e.preventDefault();
		const el = document.querySelector(`#_${itemId}`);
		if (!el) return;
		el.scrollIntoView();
	}

	const data = getData();

	return (
		<section className={styles.container} {...props}>
			<div className={styles.header}>
				<Image
					src={data.icon}
					alt={data.title}
					title={data.title}
					width={100}
					height={100}
					priority
					className={styles.icon}
				/>
				<h3 className={styles.title}>Índice</h3>
			</div>
			<div className={styles.linksContainer}>
				{sortedItems.map(item => (
					<a
						key={item.id}
						onClick={e => handleItemClick(e, item.id)}
						className={styles.link}
					>{item.name}</a>
				))}
			</div>
		</section>

	)
}
