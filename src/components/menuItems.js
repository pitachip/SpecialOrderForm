//libs
import React from "react";
import { connect } from "react-redux";
import filter from "lodash/filter";
//ui components
import Card from "react-bootstrap/Card";
//app components
import { setMenuItem } from "../actions";
import MenuItemsHeader from "./menuItemsHeader";
import AddShoppingCartItemModal from "./modals/addShoppingCartItemModal";

import "../css/menuItems.scss";

class MenuItems extends React.Component {
	state = { showModal: false };

	handleMenuItemDetailModalClose = () => {
		this.setState({ showModal: false });
	};

	handleMenuItemDetailModalOpen = () => {
		this.setState({ showModal: true });
	};

	//put selected menu item in redux
	menuItemSelected = async (item) => {
		await this.props.setMenuItem(
			item,
			this.props.menuCategoryId,
			this.props.menuCategories
		);
		this.handleMenuItemDetailModalOpen();
	};

	renderMenuItems = () => {
		const menuCategory = filter(this.props.menuCategories, {
			_id: this.props.menuCategoryId,
		});
		const menuItems = menuCategory[0].items;

		return (
			<div>
				<MenuItemsHeader />
				{this.props.menuItemId ? (
					<AddShoppingCartItemModal
						show={this.state.showModal}
						close={this.handleMenuItemDetailModalClose}
						editOrderItem={false}
					/>
				) : null}
				{this.props.menuCategoryId
					? menuItems.map((item) => {
							return (
								<div
									key={item.name}
									data-div_id={item._id}
									onClick={(e) =>
										this.menuItemSelected(e.currentTarget.dataset.div_id)
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
		menuItemId: state.menu.menuItemId,
	};
};

export default connect(mapStateToProps, { setMenuItem })(MenuItems);
