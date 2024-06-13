import {FC, useEffect, useRef} from 'react';
import {Portal} from './Portal';

export interface ModalProps {
    content: string;
    action?: {text: string; handleClick: () => void};
    onClose: () => void;
}

export const Modal: FC<ModalProps> = ({content, action, onClose}) => {
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const {target} = event;
            if (target instanceof Node && ref.current === target) onClose();
        };
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('click', handleClickOutside);
        window.addEventListener('keydown', handleEscapePress);

        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('keydown', handleEscapePress);
        };
    }, [ref, onClose]);
    const onClick = async () => {
        try {
            if (action?.handleClick) action?.handleClick();
        } catch {
            onClose();
        }
    };

    return (
        <Portal>
            <div className={'modal__wrap'} ref={ref}>
                <div className={'modal__container'}>
                    <button type={'button'} onClick={onClose} className={'button--icon modal__close'}>
                        Х
                    </button>
                    <p className={'modal__content'}>{content}</p>
                    <button type={'button'} onClick={() => onClick().then(onClose)}>
                        {action?.text || 'Хорошо'}
                    </button>
                </div>
            </div>
        </Portal>
    );
};
