import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios_orders';
import errorWrapper from '../errorWrapper/errorWrapper';
import { GooSpinner } from 'react-spinners-kit';

const INGREDIENT_PRICES = {
	salad: 3,
	cheese: 6,
	bacon: 4,
	meat: 7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get('https://react-burgerbuilder-91a0e.firebaseio.com/ingredients.json')
			.then(res => {
				const totalPrice = Object.keys(res.data)
					.map(igKey => res.data[igKey] * INGREDIENT_PRICES[igKey])
					.reduce((sum, el) => sum + el);
				this.setState({ ingredients: res.data, totalPrice: totalPrice });
			})
			.catch(err => {
				console.log(err);

				this.setState({ error: true });
			});
	}

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
					purchasing: false
				});
			})
			.catch(err => {
				this.setState({
					loading: false,
					purchasing: false
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

		let burgerbuilder = this.state.error ? <p>Ingredients couldn't be loaded!</p> : <GooSpinner size={128} sizeUnit='px' color='#7f3608' />;
		let orderSummary = null;

		if (this.state.ingredients) {
			burgerbuilder = (
				<React.Fragment>
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

			orderSummary = (
				<OrderSummary
					price={this.state.totalPrice}
					ingredients={this.state.ingredients}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <GooSpinner size={64} sizeUnit='px' color='#7f3608' />;
		}

		return (
			<React.Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burgerbuilder}
			</React.Fragment>
		);
	}
}

export default errorWrapper(BurgerBuilder, axios);
