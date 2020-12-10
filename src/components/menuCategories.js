import React from "react";
import { connect } from "react-redux";
//import "../css/menuCategories.css";
import Nav from "react-bootstrap/Nav";
import { getMenu, setMenuCategory } from "../actions";

class MenuCategories extends React.Component {
	async componentDidMount() {
		await this.props.getMenu();
	}

	menuCategorySelected = (categoryId) => {
		this.props.setMenuCategory(categoryId);
	};

	render() {
		if (!this.props.menuCategories) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Nav
					className="bg-light flex-column"
					activeKey="/home"
					onSelect={(id) => this.menuCategorySelected(id)}
				>
					<div className="sidebar-sticky">Menu Categories</div>
					{this.props.menuCategories.map((category) => {
						return (
							<Nav.Item key={category._id}>
								<Nav.Link eventKey={category._id}>{category.title}</Nav.Link>
							</Nav.Item>
						);
					})}
				</Nav>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { menuCategories: state.menu.menu.categories };
};

export default connect(mapStateToProps, { getMenu, setMenuCategory })(
	MenuCategories
);
