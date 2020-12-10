//libs
import React from "react";
//ui components
import { Message } from "semantic-ui-react";

class SubmissionError extends React.Component {
	render() {
		const { errorHeader, errorMessage, hidden } = this.props;
		return (
			<Message negative hidden={hidden}>
				<Message.Header>{errorHeader}</Message.Header>
				<p>{errorMessage}</p>
			</Message>
		);
	}
}

export default SubmissionError;
