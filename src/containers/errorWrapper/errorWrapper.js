import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorWrapper = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		state = {
			error: null
		};

		UNSAFE_componentWillMount() {
			this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});

			this.resInterceptor = axiosInstance.interceptors.response.use(
				res => res,
				err => {
					this.setState({ error: err });
				}
			);
		}

		componentWillUnmount() {
			axiosInstance.interceptors.request.eject(this.reqInterceptor);
			axiosInstance.interceptors.response.eject(this.resInterceptor);
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
