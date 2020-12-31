//libs
import React from "react";
//ui components
import { Button } from "semantic-ui-react";

class OrderStatusButton extends React.Component {
	render() {
		const { color, content } = this.props;
		return <Button basic color={color} content={content} compact size="tiny" />;
	}
}

export default OrderStatusButton;
