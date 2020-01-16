import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorWrapper = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		state = {
			error: null
		};

		UNSAFE_componentWillMount() {
			axiosInstance.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});

			axiosInstance.interceptors.response.use(
				res => console.log(res),
				err => {
					this.setState({ error: err });
				}
			);
		}

		modalClosedHandler = () => {
			this.setState({
				error: null
			});
		};

		render() {
			return (
				<React.Fragment>
					<Modal show={this.state.error} modalClosed={this.modalClosedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

export default errorWrapper;
