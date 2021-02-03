//libs
import React from "react";
//ui components
import { Dimmer, Loader } from "semantic-ui-react";

const withLoading = (Component, test) => {
	class WithLoadingComponent extends React.Component {
		renderLoader = (loadingText) => {
			return (
				<div style={{ height: "50vh" }}>
					<Dimmer active inverted>
						<Loader inverted>{loadingText}</Loader>
					</Dimmer>
				</div>
			);
		};

		render() {
			const { loading, loadingText } = this.props;

			return loading ? (
				this.renderLoader(loadingText)
			) : (
				<Component {...this.props} />
			);
		}
	}
	return WithLoadingComponent;
};

export default withLoading;
