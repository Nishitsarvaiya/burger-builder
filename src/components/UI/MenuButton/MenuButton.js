import React from 'react';
import classes from './MenuButton.module.css';

const MenuButton = props => {
	let menuClasses = classes.MenuStick;
	if (props.active) {
		menuClasses = [classes.MenuStick, classes.isActive].join(' ');
	}
	return (
		<div onClick={props.onClick} className={classes.MenuButton}>
			<div className={menuClasses}></div>
		</div>
	);
};

export default MenuButton;
