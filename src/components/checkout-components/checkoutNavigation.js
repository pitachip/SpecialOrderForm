//libs
import React from "react";
import { withRouter } from "react-router-dom";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Icon } from "semantic-ui-react";
//utils
//import { history } from "../../utils/history";
//css
import "./checkout-css/checkoutDetails.css";

class CheckoutNavigation extends React.Component {
	render() {
		const {
			forwardText,
			backText,
			disableForwardButton,
			disableBackButton,
			forwardButtonClicked,
			submitting,
			history,
		} = this.props;

		console.log("Checkout navigation props: ", this.props);
		return (
			<div className="checkoutNavigationBottomMargin">
				<Row>
					<Col>
						<Button onClick={history.goBack} disabled={disableBackButton}>
							<Icon name="chevron left" />
							{backText}
						</Button>
					</Col>
					<Col>
						{!submitting ? (
							<Button
								className="float-right"
								type="submit"
								disabled={disableForwardButton}
								onClick={(e) => forwardButtonClicked(e)}
							>
								{forwardText}
								<Icon name="chevron right" />
							</Button>
						) : (
							<Button disabled className="float-right">
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
								<span> Submitting Order...</span>
							</Button>
						)}
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(CheckoutNavigation);
