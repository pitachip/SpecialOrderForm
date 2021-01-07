//libs
import React from "react";
import { connect } from "react-redux";
import find from "lodash/find";
import NumberFormat from "react-number-format";
//ui components
import Card from "react-bootstrap/Card";
import { Item } from "semantic-ui-react";
//app components
import MenuItemsHeader from "./menuItemsHeader";
import AddShoppingCartItemModal from "../menu-modals/addShoppingCartItemModal";
//actions
import { setMenuItem } from "../../../actions";
//css
import "../menu-css/menuItems.scss";
import "../menu-css/menuItemDetail.css";

class MenuItems extends React.Component {
	state = { showModal: false };

	handleMenuItemDetailModalClose = () => {
		this.setState({ showModal: false });
	};

	handleMenuItemDetailModalOpen = () => {
		this.setState({ showModal: true });
	};

	//put selected menu item in redux
	menuItemSelected = async (menuItem) => {
		const { setMenuItem } = this.props;

		await setMenuItem(menuItem);

		this.handleMenuItemDetailModalOpen();
	};

	renderMenuItems = () => {
		const { menuCategories, menuCategoryId, menuItemId } = this.props;

		//show the menu items by filtering on the selected menu category
		const menuCategory = find(menuCategories, { _id: menuCategoryId });

		const menuItems = menuCategory.items;

		return (
			<div>
				<MenuItemsHeader />
				{menuItemId ? (
					<AddShoppingCartItemModal
						show={this.state.showModal}
						close={this.handleMenuItemDetailModalClose}
						editOrderItem={false}
					/>
				) : null}
				{menuCategoryId
					? menuItems.map((item) => {
							return (
								<div
									key={item.name}
									onClick={(e) => this.menuItemSelected(item)}
									className="itemMargin"
								>
									<Card className="menuItem">
										<Card.Body>
											<Item.Group>
												<Item>
													<Item.Content>
														<Item.Header>{item.name}</Item.Header>
														<Item.Meta>{item.description}</Item.Meta>
														<Item.Description></Item.Description>
														<Item.Extra>
															<NumberFormat
																className="nospace"
																value={item.basePrice / 100}
																displayType={"text"}
																thousandSeparator={true}
																prefix={"$"}
																decimalScale={2}
																fixedDecimalScale="true"
															/>
															{` per person ${
																item.itemMinimum > 0
																	? `| ${item.itemMinimum} person minimum`
																	: ""
															}`}
														</Item.Extra>
													</Item.Content>
												</Item>
											</Item.Group>
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
		selectedMenuItem: state.menu.selectedMenuItem,
	};
};

export default connect(mapStateToProps, { setMenuItem })(MenuItems);
