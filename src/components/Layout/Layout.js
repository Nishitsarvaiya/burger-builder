import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	closeSideDrawerHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	openSideDrawerHandler = () => {
		this.setState(prevState => {
			return {
				showSideDrawer: !prevState.showSideDrawer
			};
		});
	};

	render() {
		return (
			<React.Fragment>
				<Toolbar open={this.openSideDrawerHandler} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler} />
				<main className={classes.content}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;
