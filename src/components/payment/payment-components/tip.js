//libs
import { toInteger } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import { Button, Header, Input, Icon } from "semantic-ui-react";
//actions
import { updateOrderTotals } from "../../../actions";
//css
import "../payment-css/tip.css";

const Tip = () => {
	const orderTotals = useSelector((state) => state.order.totals);
	const dispatch = useDispatch();
	const [activeButton, setActiveButton] = useState();

	const tipAmountUpdated = (percentage) => {
		const tipAmount = orderTotals.subTotal * percentage;
		let updatedTotal = orderTotals;
		updatedTotal.tip = tipAmount;
		updatedTotal = {
			subTotal: updatedTotal.subTotal,
			tax: updatedTotal.tax,
			tip: updatedTotal.tip,
			delivery: updatedTotal.delivery,
			total: +(
				updatedTotal.subTotal +
				updatedTotal.tax +
				updatedTotal.tip +
				updatedTotal.delivery
			).toFixed(2),
		};
		dispatch(updateOrderTotals(updatedTotal));
	};

	//TODO: make one function out of the tip calculation
	const customTipAmountUpdated = (amount) => {
		let updatedTotal = orderTotals;
		updatedTotal.tip = amount;
		updatedTotal = {
			subTotal: updatedTotal.subTotal,
			tax: updatedTotal.tax,
			tip: updatedTotal.tip,
			delivery: updatedTotal.delivery,
			total: +(
				updatedTotal.subTotal +
				updatedTotal.tax +
				updatedTotal.tip +
				updatedTotal.delivery
			).toFixed(2),
		};
		dispatch(updateOrderTotals(updatedTotal));
	};
	return (
		<>
			<Header as="h3">Add a Tip</Header>
			<Header as="h5">100% of your tip supports our restaurant</Header>
			<Button.Group>
				<Button
					type="button"
					active={activeButton === "1"}
					onClick={() => {
						tipAmountUpdated(0.1);
						setActiveButton("1");
					}}
				>
					<div>10%</div>
					<p>${parseFloat(orderTotals.subTotal * 0.1).toFixed(2)}</p>
				</Button>
				<Button
					type="button"
					active={activeButton === "2"}
					onClick={() => {
						tipAmountUpdated(0.15);
						setActiveButton("2");
					}}
				>
					<div>15%</div>
					<p>${parseFloat(orderTotals.subTotal * 0.15).toFixed(2)}</p>
				</Button>
				<Button
					type="button"
					active={activeButton === "3"}
					onClick={() => {
						tipAmountUpdated(0.18);
						setActiveButton("3");
					}}
				>
					<div>18%</div>
					<p>${parseFloat(orderTotals.subTotal * 0.18).toFixed(2)}</p>
				</Button>
				<Button
					type="button"
					active={activeButton === "4"}
					onClick={() => {
						tipAmountUpdated(0);
						setActiveButton("4");
					}}
				>
					No Tip
				</Button>
			</Button.Group>
			<div className="tipContainer">
				<Header as="h5">Custom Amount</Header>
				<Input
					type="number"
					iconPosition="left"
					placeholder="Enter custom tip"
					onChange={(event, data) => {
						setActiveButton("0");
						customTipAmountUpdated(parseFloat(data.value));
					}}
				>
					<Icon name="dollar" />
					<input />
				</Input>
			</div>
		</>
	);
};

export default Tip;
