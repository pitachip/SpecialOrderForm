//libs
import React from "react";

const withLoading = (Component, test) => {
	class WithLoadingComponent extends React.Component {
		render() {
			console.log("Hey there from with loading: ", test);
			return <Component {...this.props} />;
		}
	}
	return WithLoadingComponent;
};

export default withLoading;
