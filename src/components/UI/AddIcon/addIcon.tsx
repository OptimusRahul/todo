import { FC } from "react";

import { appMessage } from '../../../config/index';
import Add from '../../../assets/icons/add.svg';

import './addIcon.scss';

const { EMPTY_LIST } = appMessage;

const AddIcon: FC = (): JSX.Element => {
    return (
        <div className="Empty">
            <div className="Empty--container">
                <img className="Empty--container__icon" src={Add} alt=""/>
                <p className="Empty--container__content">{EMPTY_LIST}</p>
            </div>
        </div>
    )
}

export default AddIcon;