import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = {
	onClick?: () => void;
	formIsOpened?: boolean;
};
export const ArrowButton = ({ onClick, formIsOpened }: OnClick) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			onClick={onClick}
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				formIsOpened
					? `${styles.container} ${styles.container_open}`
					: styles.container
			}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					formIsOpened ? `${styles.arrow} ${styles.arrow_open}` : styles.arrow
				}
			/>
		</div>
	);
};
