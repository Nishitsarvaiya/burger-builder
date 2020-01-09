import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem url='/' active>
				Burger Builder
			</NavigationItem>
			<NavigationItem url='/'>Checkout</NavigationItem>
		</ul>
	);
};

export default NavigationItems;
