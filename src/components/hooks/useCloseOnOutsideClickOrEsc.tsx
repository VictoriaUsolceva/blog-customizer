import { useEffect } from 'react';

type TUseCloseOnOtsideClickOrEsc = {
	isOpenElement: boolean;
	onClose?: () => void;
	elementRef: React.RefObject<HTMLElement>;
};

export const useCloseOnOtsideClickOrEsc = ({
	isOpenElement,
	onClose,
	elementRef,
}: TUseCloseOnOtsideClickOrEsc) => {
	useEffect(() => {
		if (!isOpenElement) return;

		const handleClick = ({ target }: MouseEvent) => {
			if (target instanceof Node && !elementRef.current?.contains(target)) {
				onClose?.();
			}
		};

		const handlerKeyDown = ({ key }: KeyboardEvent) => {
			if (key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handlerKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handlerKeyDown);
		};
	}, [isOpenElement, elementRef, onClose]);
};
