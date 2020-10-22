//libs
import React from "react";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//utils
import { history } from "../../utils/history";

class CheckoutNavigation extends React.Component {
	backButtonClicked = () => {
		history.push(this.props.backNav);
	};

	forwardButtonClicked = () => {
		history.push(this.props.forwardNav);
	};

	render() {
		const { forwardText, backText } = this.props;
		return (
			<div>
				<Row>
					<Col>
						<Button onClick={this.backButtonClicked}>{backText}</Button>
					</Col>
					<Col>
						<Button className="float-right" onClick={this.forwardButtonClicked}>
							{forwardText}
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CheckoutNavigation;
