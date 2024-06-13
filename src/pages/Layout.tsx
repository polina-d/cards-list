import {useEffect, useState} from 'react';
import {CardsList, Loading} from 'components';
import {observer} from 'mobx-react-lite';
import cardsStore from 'stores/cards-store.ts';

export const Layout = observer(() => {
    const {getCards} = cardsStore;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCards();
        setTimeout(() => setIsLoading(false), 3000);
    }, [getCards]);

    return isLoading ? <Loading /> : <CardsList />;
});
