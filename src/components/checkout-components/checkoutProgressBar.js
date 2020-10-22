//libs
import React from "react";
import { Step, Icon } from "semantic-ui-react";
//css
import "semantic-ui-css/semantic.min.css";

class CheckoutProgressBar extends React.Component {
	renderSteps = () => {
		return this.props.progressBarData.map((step) => {
			return (
				<Step
					key={step.title}
					completed={step.completed}
					active={step.active}
					disabled={step.disabled}
				>
					<Icon name={step.icon} />
					<Step.Content>
						<Step.Title>{step.title}</Step.Title>
						{step.description ? (
							<Step.Description>{step.description}</Step.Description>
						) : null}
					</Step.Content>
				</Step>
			);
		});
	};
	render() {
		return <Step.Group size="small">{this.renderSteps()}</Step.Group>;
	}
}

export default CheckoutProgressBar;
