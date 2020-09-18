import React from "react";
import { connect } from "react-redux";
import filter from "lodash/filter";
import Jumbotron from "react-bootstrap/Jumbotron";

class MenuItemsHeader extends React.Component {
	renderHeaderComponent = () => {
		const menuCategory = filter(this.props.menuCategories, {
			_id: this.props.menuCategoryId,
		});
		return (
			<div>
				<Jumbotron>
					<h1>{menuCategory[0].title}</h1>
					<p>{menuCategory[0].description}</p>
				</Jumbotron>
			</div>
		);
	};

	render() {
		return (
			<div>
				{this.props.menuCategoryId ? this.renderHeaderComponent() : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuCategoryId: state.menu.menuCategoryId,
		menuCategories: state.menu.menu.categories,
	};
};

export default connect(mapStateToProps, {})(MenuItemsHeader);
