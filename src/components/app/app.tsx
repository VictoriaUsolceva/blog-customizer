import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import styles from './app.module.scss';

export const App = () => {
	const [options, setOptions] = useState<ArticleStateType>(defaultArticleState);
	const [selectedFont, setSelectedFont] = useState(fontFamilyOptions[0]);
	const [selectedSize, setSelectedSize] = useState(fontSizeOptions[0]);
	const [selectedColor, setSelectedColor] = useState(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
		contentWidthArr[0]
	);

	function onReset() {
		event?.preventDefault();
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedSize(defaultArticleState.fontSizeOption);
		setSelectedColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidthArr(defaultArticleState.contentWidth);
		setOptions(defaultArticleState);
	}

	function onSubmit() {
		event?.preventDefault();
		setOptions({
			fontFamilyOption: selectedFont,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidthArr,
			fontColor: selectedColor,
			fontSizeOption: selectedSize,
		});
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': options.fontFamilyOption.value,
					'--font-size': options.fontSizeOption.value,
					'--font-color': options.fontColor.value,
					'--container-width': options.contentWidth.value,
					'--bg-color': options.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...{ onReset, onSubmit }}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>
				<Select
					selected={selectedFont}
					onChange={setSelectedFont}
					options={fontFamilyOptions}
					title='шрифт'
				/>
				<RadioGroup
					selected={selectedSize}
					name='radio'
					onChange={setSelectedSize}
					options={fontSizeOptions}
					title='рАЗМЕР шрифта'
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
					selected={selectedContentWidthArr}
					onChange={setSelectedContentWidthArr}
					options={contentWidthArr}
					title='Ширина контента'
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};
