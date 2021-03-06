import React from "react";
import classes from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];

const buildControls = props => (
	<div className={classes.BuildControls}>
		<p>
			Price: <strong>{props.price}</strong>
		</p>
		{controls.map(control => (
			<BuildControl
				key={control.label}
				label={control.label}
				more={() => props.addIngredient(control.type)}
				less={() => props.removeIngredient(control.type)}
				disabled={props.disabled[control.type]}
			/>
		))}
		<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
			ORDER NOW
		</button>
	</div>
);

export default buildControls;
