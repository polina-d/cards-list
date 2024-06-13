import cardsStore from 'stores/cards-store.ts';
import {useEffect, useRef} from 'react';
import {Card} from 'components/CardsList/Card.tsx';
import {ErrorModal, Header} from 'components';
import {observer} from 'mobx-react-lite';

export const CardsList = observer(() => {
    const {cards, addCards, isLoading} = cardsStore;
    const isCardsLength = !!cards?.length;
    const endOfPageRef = useRef(null);
    useEffect(() => {
        if (endOfPageRef.current) {
            onVisible(endOfPageRef.current, addCards);
        }
    }, [addCards, cards?.length]);

    const onVisible = (element: Element, callback: () => void) => {
        if (element) {
            new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        callback();
                        observer.disconnect();
                    }
                });
            }).observe(element);
        }
    };
    return (
        <>
            <Header title={'Управление картами'} />
            <div style={{paddingTop: '80px',maxWidth: '600px'}}>
                {cards?.map((card) => (
                        <Card card={card}  key={card?.company?.companyId}/>
                ))}
            </div>
            <div ref={isCardsLength ? endOfPageRef : undefined} className={'card-list__footer'}>
                {isLoading ? (
                    <>
                        <div className={'spinner'} />
                        <p>Подгрузка компаний</p>
                    </>
                ) : (
                    !isCardsLength && <p>Нет компаний</p>
                )}
            </div>
            <ErrorModal />
        </>
    );
});
