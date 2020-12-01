//libs
import React from "react";
import findIndex from "lodash/findIndex";
//ui components
import { Grid } from "semantic-ui-react";
//css
import "../contact-css/pickup.css";

class PickUpInformation extends React.Component {
	render() {
		const { selectedStore, locationInformation } = this.props;

		const indexOfSelectedStore = findIndex(locationInformation, (location) => {
			return location.storeName === selectedStore;
		});
		return (
			<div className="storeInformation">
				<h2>Pick-Up Information</h2>
				<h4>Location: {locationInformation[indexOfSelectedStore].storeName}</h4>
				<p className="storeInformation">
					{locationInformation[indexOfSelectedStore].address1}
				</p>
				<p className="storeInformation">
					{locationInformation[indexOfSelectedStore].address2}
				</p>
				<p className="storeInformation">
					{locationInformation[indexOfSelectedStore].city},{" "}
					{locationInformation[indexOfSelectedStore].state}{" "}
					{locationInformation[indexOfSelectedStore].zip}
				</p>
				<p className="storeInformation">
					{locationInformation[indexOfSelectedStore].email}
				</p>
				<p className="storeInformation">
					{locationInformation[indexOfSelectedStore].phoneNumber}
				</p>
			</div>
		);
	}
}

export default PickUpInformation;
