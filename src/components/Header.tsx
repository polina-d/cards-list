import {FC} from 'react';
interface HeaderProps {
    title: string;
}
export const Header: FC<HeaderProps> = ({title}) => {
    return (
        <div className={'header'}>
            <h4>{title}</h4>
        </div>
    );
};
