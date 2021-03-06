import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
	return (
		<React.Fragment>
			<Layout>
				<BurgerBuilder />
			</Layout>
		</React.Fragment>
	);
}

export default App;
