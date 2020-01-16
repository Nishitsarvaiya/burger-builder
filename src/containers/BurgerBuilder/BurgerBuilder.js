import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios_orders';
import errorWrapper from '../errorWrapper/errorWrapper';

const INGREDIENT_PRICES = {
	salad: 3,
	cheese: 6,
	bacon: 4,
	meat: 7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			cheese: 0,
			bacon: 0,
			meat: 0
		},
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
		loading: false,
		ordered: false
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.setState({ loading: true, ordered: false });
		const orderData = {
			ingredients: this.state.ingredients,
			billAmount: this.state.totalPrice,
			customer: {
				name: 'Nishit Sarvaiya',
				email: 'nishit@avdevs.com',
				phone: '+917043839575',
				address: {
					street: 'dummy street 11',
					country: 'India',
					zipcode: '390023'
				}
			},
			orderTime: new Date().toString()
		};

		axios
			.post('/orders.json', orderData)
			.then(res => {
				this.setState({
					loading: false,
					purchasing: false,
					ordered: true
				});
			})
			.catch(err => {
				this.setState({
					loading: false,
					purchasing: false,
					ordered: false
				});
			});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<React.Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary
						price={this.state.totalPrice}
						ingredients={this.state.ingredients}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}
						loading={this.state.loading}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuilderControls
					addIngredient={this.addIngredientHandler}
					removeIngredient={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</React.Fragment>
		);
	}
}

export default errorWrapper(BurgerBuilder, axios);
