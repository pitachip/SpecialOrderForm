//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Message, Container, Icon } from "semantic-ui-react";
//css
import "../App.css";

class ModifyDisclaimer extends React.Component {
	state = { hideMessage: false };

	render() {
		return (
			<Container fluid className="modifyDisclaimer">
				<Message
					icon
					hidden={this.state.hideMessage}
					warning
					onDismiss={() => this.setState({ hideMessage: true })}
					size="mini"
				>
					<Icon name="warning" />
					<Message.Content>
						<Message.Header>
							You are modfiying order #{this.props.orderToModify.orderNumber}
						</Message.Header>
						<a href="/order">Click here </a> to submit a new order instead.
					</Message.Content>
				</Message>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderToModify: state.orderHistory.orderToModify,
	};
};

export default connect(mapStateToProps, {})(ModifyDisclaimer);
