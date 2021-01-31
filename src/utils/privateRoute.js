//libs
import React from "react";
import { Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	isAuthenticated,
	isLoading,
	...props
}) => {
	if (isLoading && !isAuthenticated) {
		return <div>Loading...</div>;
	} else if (!isLoading && !isAuthenticated) {
		return <Redirect to="/order" />;
	} else if (!isLoading && isAuthenticated) {
		return <Component {...props} />;
	}
};

export default withRouter(PrivateRoute);
