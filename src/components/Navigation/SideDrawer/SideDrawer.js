import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
	let sideDrawerClasses = [classes.SideDrawer, classes.close];

	if (props.open) {
		sideDrawerClasses = [classes.SideDrawer, classes.open];
	}

	return (
		<React.Fragment>
			<BackDrop isShow={props.open} clicked={props.closed} />
			<div className={sideDrawerClasses.join(' ')}>
				<Logo height='10%' marginBottom='32px' />
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;
