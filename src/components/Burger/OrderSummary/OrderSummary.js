import React from 'react';

import classes from './OrderSummary.module.css';

import Button from '../../UI/Button/Button';

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
			</li>
		);
	});

	return (
		<div className={classes.Summary}>
			<h3 className={classes.SummaryTitle}>Your Order</h3>
			<p className={classes.SummarySubtitle}>A delicious burger with the following ingredients:</p>
			<ul className={classes.SummaryIgList}>{ingredientSummary}</ul>
			<p>
				<strong>Total Price: {props.price.toFixed(2)}</strong>
			</p>
			<p className={classes.SummaryCheckout}>Continue to checkout?</p>
			<div className={classes.btnGroup}>
				<Button btnType={'Cancel'} clicked={props.purchaseCanceled}>
					CANCEL
				</Button>
				<Button btnType={'Continue'} clicked={props.purchaseContinue}>
					CONTINUE
				</Button>
			</div>
		</div>
	);
};

export default orderSummary;
