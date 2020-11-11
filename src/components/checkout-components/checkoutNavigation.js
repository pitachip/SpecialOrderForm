//libs
import React from "react";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//utils
import { history } from "../../utils/history";
//css
import "./checkout-css/checkoutDetails.css";

class CheckoutNavigation extends React.Component {
	backButtonClicked = () => {
		history.push(this.props.backNav);
	};

	render() {
		const {
			forwardText,
			backText,
			disableForwardButton,
			forwardButtonClicked,
		} = this.props;
		return (
			<div className="checkoutNavigationBottomMargin">
				<Row>
					<Col>
						<Button onClick={this.backButtonClicked}>{backText}</Button>
					</Col>
					<Col>
						<Button
							className="float-right"
							type="submit"
							disabled={disableForwardButton}
							onClick={(e) => forwardButtonClicked(e)}
						>
							{forwardText}
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CheckoutNavigation;
