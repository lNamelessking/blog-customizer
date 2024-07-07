import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

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
				clsx(styles.container,{[styles.container_open]: formIsOpened})
			}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					clsx(styles.arrow,{[styles.arrow_open]: formIsOpened})
				}
			/>
		</div>
	);
};
