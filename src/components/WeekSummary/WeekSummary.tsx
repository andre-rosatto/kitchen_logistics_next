import styles from './WeekSummary.module.css';

interface WeekSummaryProps extends React.ComponentProps<'section'> {

}

export default function WeekSummary() {
	return (
		<section className={styles.container}>
			{/* header */}
			<h3 className={styles.header}>Total de Produtos da Semana</h3>

			{/* table */}
			<div className={styles.table}>
				{/* <div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div>

				<div className={styles.tableRow}>
					<span className={styles.tableItem}>Queijo Mussarela</span>
					<span className={`${styles.tableItem} ${styles.tableAmount}`}>100.13 Kg</span>
				</div> */}
			</div>
		</section>
	);
}
