import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	render() {
		return (
			<React.Fragment>
				<Backdrop isShow={this.props.show} clicked={this.props.modalClosed} />
				<div className={classes.Modal} style={{ transform: this.props.show ? 'scale(1)' : 'scale(0)', opacity: this.props.show ? '1' : '0' }}>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

export default Modal;
