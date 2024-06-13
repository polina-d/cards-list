import {observer} from 'mobx-react-lite';
import cardsStore from 'stores/cards-store.ts';
import axios from 'axios';
import {Modal} from 'components/Modal.tsx';
import {useEffect, useState} from 'react';

const ERROR_MESSAGE = (message: string = ''): {[key: number]: string} => ({
    400: message,
    401: 'Ошибка авторизации',
    500: 'Всё упало'
});
export const ErrorModal = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const {offset, error, getCards} = cardsStore;
    const isAxios = axios.isAxiosError(error);
    const status = isAxios ? error?.response?.status || 0 : 0;
    const message = isAxios ? error?.response?.data?.message : '';
    const errorMessage = ERROR_MESSAGE(message)[status];
    useEffect(() => {
        if (errorMessage) {
            setIsOpen(true);
        }
    }, [error]);
    if (isOpen)
        return (
            <Modal
                content={errorMessage}
                action={{text: 'Повторить', handleClick: async () => getCards(offset)}}
                onClose={() => setIsOpen(false)}
            />
        );
});
