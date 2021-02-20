import { FC } from 'react';

import { appConfiguration } from '../../config';
import Logo from '../../assets/logo/logo.svg'
import './header.scss';

const { APP_NAME } = appConfiguration;

/**
 * 
 * @description: Returns header of the application
 * 
 * @returns: { JSX }
 * 
 */

const Header: FC = (): JSX.Element => <header> <img src={Logo} alt='logo'/>{' '}{APP_NAME} </header>

export default Header;