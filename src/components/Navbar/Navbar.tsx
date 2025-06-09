import Image from 'next/image';
import styles from './Navbar.module.css';
import { useViewContext } from '@/contexts/ViewContext';
import { useAuthContext } from '@/contexts/AuthContext';

const PAGES = [
	{ title: 'Pratos', icon: '/assets/dish_icon.svg' },
	{ title: 'Receitas', icon: '/assets/recipe_icon.svg' },
	{ title: 'Produtos', icon: '/assets/product_icon.svg' }
];

export default function Navbar() {
	const { view, setView } = useViewContext();
	const { setLogged } = useAuthContext();

	const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
		e.preventDefault();
		setView(idx);
	}

	return (
		<nav className={styles.container}>
			<ul className={styles.menuBar}>
				{PAGES.map((page, idx) =>
					<li
						key={idx}
					>
						<a
							href='#'
							className={idx === view ? `${styles.menuItem} ${styles.selected}` : `${styles.menuItem}`}
							onClick={e => handlePageChange(e, idx)}
						>
							<Image
								src={page.icon}
								alt={page.title}
								title={page.title}
								width={100}
								height={100}
								className={styles.icon}
							/>
							{page.title}
						</a>
					</li>
				)}
				<li>
					<button
						className={styles.button}
						onClick={() => setLogged(false)}
					>Sair</button>
				</li>
			</ul>
		</nav>
	);
}
