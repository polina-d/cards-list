import {FC, useState} from 'react';
import {CompanyParams} from '../../api/getAllCards.ts';
import EyeIcon from 'assets/icons/eye.svg?react';
import TrashIcon from 'assets/icons/trash.svg?react';
import {formatTitle} from 'utils/hepers';
import {Modal} from 'components';

interface CardProps {
    card: CompanyParams;
}

export const Card: FC<CardProps> = ({card}) => {
    const cardData = card?.mobileAppDashboard;
    const loyaltyLevel = card?.customerMarkParameters?.loyaltyLevel;
    const mark = card?.customerMarkParameters?.mark || 0;
    const companyId = card?.company?.companyId;
    const [modal, setModal] = useState({content: '', isOpen: false});

    const body = [
        {title: 'Кешбэк', value: loyaltyLevel?.number + '%'},
        {title: 'Уровень', value: loyaltyLevel?.name}
    ];
    const openModal = (name: string) => {
        setModal({content: `Нажата кнопка "${name}" \r\n ID компании: ${companyId}`, isOpen: true});
    };

    return (
        <div className={'card__wrapper'} style={{backgroundColor: cardData?.cardBackgroundColor}}>
            <div className={'card--row card__header'}>
                <h4 style={{color: cardData?.highlightTextColor}}>{cardData?.companyName}</h4>
                <img src={cardData?.logo} alt={'company-logo'} className={'card__logo'} />
            </div>
            <hr className={'divider'} />
            <div className={'card__body--mark'}>
                <h4 style={{color: cardData?.highlightTextColor, marginRight: '6px'}}>{mark}</h4>
                <p style={{color: cardData?.textColor}}>{formatTitle(mark, ['балл', 'балла', 'баллов'])}</p>
            </div>
            <div className={'card__body--level-block'}>
                {body?.map((item) => (
                    <div key={item?.title} className={'card__body--level-item'}>
                        <p style={{color: cardData?.textColor}} className={'card__text-lite'}>
                            {item?.title}
                        </p>
                        <p>{item?.value}</p>
                    </div>
                ))}
            </div>
            <hr className={'divider'} />
            <div className={'card--row'}>
                <button type={'button'} className={'button--icon'} onClick={() => openModal('Показать')}>
                    <EyeIcon color={cardData?.mainColor} className={'card__icon'} />
                </button>
                <button type={'button'} className={'button--icon'} onClick={() => openModal('Удалить')}>
                    <TrashIcon color={cardData?.accentColor} className={'card__icon'} />
                </button>
                <button
                    style={{backgroundColor: cardData?.backgroundColor, color: cardData?.mainColor}}
                    onClick={() => openModal('Подробнее')}
                    type={'button'}>
                    Подробнее
                </button>
            </div>
            {modal?.isOpen && <Modal content={modal?.content} onClose={() => setModal({content: '', isOpen: false})} />}
        </div>
    );
};
