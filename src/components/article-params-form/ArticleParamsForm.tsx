import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useCloseOnOtsideClickOrEsc } from '../hooks/useCloseOnOutsideClickOrEsc';

type TArticleParamsForm = {
	setCurrentArticleState: React.Dispatch<
		React.SetStateAction<ArticleStateType>
	>;
};

export const ArticleParamsForm = ({
	setCurrentArticleState,
}: TArticleParamsForm) => {
	const sidebarRef = useRef<HTMLElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedSize, setSelectedSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedColor, setSelectedColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	useCloseOnOtsideClickOrEsc({
		isOpenElement: isSidebarOpen,
		onClose: () => setIsSidebarOpen(false),
		elementRef: sidebarRef,
	});

	function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		setCurrentArticleState({
			fontFamilyOption: selectedFont,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontColor: selectedColor,
			fontSizeOption: selectedSize,
		});
	}

	function onReset(event: React.FormEvent) {
		event.preventDefault();
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedSize(defaultArticleState.fontSizeOption);
		setSelectedColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setCurrentArticleState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setIsSidebarOpen(!isSidebarOpen);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(event) => onSubmit(event)}
					onReset={(event) => onReset(event)}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedSize}
						name='radio'
						onChange={setSelectedSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedColor}
						onChange={setSelectedColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
