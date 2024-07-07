import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from '../separator';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Article } from '../article/Article';
import { Text } from '../text';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	setAppState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ setAppState }: ArticleParamsFormProps) => {
	const [formState, setformState] = useState(defaultArticleState);
	const [formOpenState, setFormOpenState] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	function closeOnArrowButton() {
		setFormOpenState(!formOpenState);
	}

	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setAppState(formState);
		setFormOpenState(false);
	}

	function handleFormReset() {
		setAppState(defaultArticleState);
		setformState(defaultArticleState);
	}

	function handleOutsideFormClick(event: MouseEvent) {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setFormOpenState(false);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideFormClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideFormClick);
		};
	}, []);

	return (
		<>
			<ArrowButton
				onClick={() => closeOnArrowButton()}
				formIsOpened={formOpenState}
			/>
			<aside
				className={
					formOpenState
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value: OptionType) =>
							setformState({ ...formState, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='radio'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value: OptionType) =>
							setformState({ ...formState, fontSizeOption: value })
						}
					/>
					<Select
						title='Цвет Шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value: OptionType) =>
							setformState({ ...formState, fontColor: value })
						}
					/>
					<Separator />
					<Select
						title='Цвет Фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value: OptionType) =>
							setformState({ ...formState, backgroundColor: value })
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value: OptionType) =>
							setformState({ ...formState, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleFormReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
