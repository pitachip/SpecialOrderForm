import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import filter from "lodash/filter";
import MenuItemsHeader from "./menuItemsHeader";

import "../css/menuItems.scss";

class MenuItems extends React.Component {
	renderMenuItems = () => {
		const menuCategory = filter(this.props.menuCategories, {
			_id: this.props.menuCategoryId,
		});
		const menuItems = menuCategory[0].items;

		return (
			<div>
				<MenuItemsHeader />
				{this.props.menuCategoryId
					? menuItems.map((item) => {
							console.log(item);
							return (
								<div
									key={item.name}
									data-div_id={item._id}
									onClick={(e) =>
										console.log(
											"Item Clicked: ",
											e.currentTarget.dataset.div_id
										)
									}
								>
									<Card className="menuItem">
										<Card.Body>
											<Card.Title>{item.name}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">
												{item.description}
											</Card.Subtitle>
										</Card.Body>
									</Card>
								</div>
							);
					  })
					: null}
			</div>
		);
	};

	render() {
		return (
			<div>{this.props.menuCategoryId ? this.renderMenuItems() : null}</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuCategoryId: state.menu.menuCategoryId,
		menuCategories: state.menu.menu.categories,
	};
};

export default connect(mapStateToProps, {})(MenuItems);
