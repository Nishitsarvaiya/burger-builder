import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from '../../UI/MenuButton/MenuButton';

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<Logo height='80%' />
			<MenuButton onClick={props.open} active={props.active} />
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;
