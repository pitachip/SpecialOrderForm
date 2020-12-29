//libs
import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading }) => {
	if (isLoading && !isAuthenticated) {
		return <div>Loading...</div>;
	} else if (!isLoading && !isAuthenticated) {
		return <Redirect to="/order" />;
	} else if (!isLoading && isAuthenticated) {
		return <Component />;
	}
};

export default PrivateRoute;
