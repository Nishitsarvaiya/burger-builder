import Axios from 'axios';

const instance = Axios.create({
	baseURL: 'https://react-burgerbuilder-91a0e.firebaseio.com/'
});

export default instance;
