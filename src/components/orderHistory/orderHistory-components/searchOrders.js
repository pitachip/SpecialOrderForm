//libs
import React from "react";
//ui components
import { Input } from "semantic-ui-react";

class SearchOrders extends React.Component {
	render() {
		return (
			<Input
				action="Search"
				fluid
				loading={false}
				icon="search"
				iconPosition="left"
				placeholder="Search by Order Number"
			/>
		);
	}
}

export default SearchOrders;
