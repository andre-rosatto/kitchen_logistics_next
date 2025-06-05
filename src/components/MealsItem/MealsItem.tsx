import styles from './MealsItem.module.css';
import Image from 'next/image';
import IconButton from '../IconButton';
import { Meal } from '@/typings/Meals';
import { Recipe } from '@/typings/Recipe';
import SmartSelect from '../SmartSelect';

interface MealsItemProps extends React.ComponentProps<'div'> {
	meal: Meal;
	recipes: Recipe[];
	onAddMeal: (isLunch: boolean) => void;
	onDeleteMeal: (id: string) => void;
	onChangeMeal: (id: string, recipeId: string) => void;
}

const DAYS = [
	{ name: 'Domingo', icon: '/assets/sunday_icon.svg' },
	{ name: 'Segunda', icon: '/assets/monday_icon.svg' },
	{ name: 'Terça', icon: '/assets/tuesday_icon.svg' },
	{ name: 'Quarta', icon: '/assets/wednesday_icon.svg' },
	{ name: 'Quinta', icon: '/assets/thursday_icon.svg' },
	{ name: 'Sexta', icon: '/assets/friday_icon.svg' },
	{ name: 'Sábado', icon: '/assets/saturday_icon.svg' },
];

export default function MealsItem({ meal, recipes, onAddMeal, onDeleteMeal, onChangeMeal, ...props }: MealsItemProps) {
	if (!meal || recipes.length === 0) return null;

	return (
		<div
			className={styles.container}
			{...props}
		>
			{/* header */}
			<div className={styles.header}>
				<Image
					src={DAYS[meal.day].icon}
					alt={DAYS[meal.day].name}
					title={DAYS[meal.day].name}
					width={30}
					height={30}
				/>
				<h2 className={styles.day}>{DAYS[meal.day].name}</h2>
			</div>

			{/* meals */}
			{['Almoço', 'Jantar'].map(mealName => (
				<div
					key={mealName}
					className={styles.mealContainer}
				>
					{/* header */}
					<div className={styles.mealTypeContainer}>
						<h3 className={`${styles.mealType} ${styles.mealIcon} ${styles.lunch}`}>{mealName}</h3>
						<IconButton
							buttonType='add'
							className={styles.iconButton}
							onClick={() => onAddMeal(mealName === 'Almoço')}
						/>
					</div>

					{/* list */}
					<div>
						{meal.recipes.filter(recipe => mealName === 'Almoço' ? recipe.isLunch : !recipe.isLunch).map(recipe => (
							<div
								key={recipe.id}
								className={styles.tableRow}
							>
								<SmartSelect
									className={styles.select}
									items={recipes}
									initialValue={recipe.recipeId}
									onSelectChange={id => onChangeMeal(recipe.id, id)}
								/>
								<IconButton
									buttonType='delete'
									className={styles.iconButton}
									onClick={() => onDeleteMeal(recipe.id)}
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
