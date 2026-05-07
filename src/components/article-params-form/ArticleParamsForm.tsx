import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';

type TArticleParamsForm = {
	onSubmit: () => void;
	onReset: () => void;
	children?: ReactNode;
};

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
	children,
}: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		if (isOpen) document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={ref}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					{children}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={onSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
