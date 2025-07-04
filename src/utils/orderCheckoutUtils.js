import pickBy from "lodash/pickBy";
import each from "lodash/each";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import { v4 as uuidv4 } from "uuid";

export const formatSelectionForCheckout = (
	menuItem,
	selections,
	quantity,
	specialInstructions,
	editOrderItem,
	uniqueId
) => {
	let formattedSelection = {};

	formattedSelection = {
		name: menuItem.name,
		basePrice: menuItem.basePrice,
		quantity,
		specialInstructions,
		modifiers: [],
		uniqueId: editOrderItem ? uniqueId : uuidv4(),
		originalSelectionFormat: selections,
		originalMenuItem: menuItem,
	};

	each(menuItem.modifiers, (modifier) => {
		const modifierChoices = pickBy(selections, { modifierId: modifier._id });

		if (!isEmpty(modifierChoices)) {
			let modifierChoiceArray = [];

			map(modifierChoices, (modifierChoice) => {
				modifierChoiceArray.push({
					name: modifierChoice.name,
					modifierChoiceId: modifierChoice.id,
					price: modifierChoice.price,
				});
			});

			formattedSelection.modifiers.push({
				modifierId: modifier._id,
				modifierName: modifier.name,
				modifierChoices: modifierChoiceArray,
			});
		}
	});

	return formattedSelection;
};

/**
 * TODO: Refactor so that there's one calculate totals.
 * Need to think through the dfiferent functions that use it and
 * what params need to be included
 */
export const calculateTotals = (
	orderItems,
	menuConfigSettings,
	shippingMethod,
	paymentInformation,
	tip
) => {
	const deliveryFee = menuConfigSettings.cateringDeliveryFee;
	const taxExempt = paymentInformation ? paymentInformation.taxExempt : null;

	let totals = {
		subTotal: 0,
		tax: 0,
		tip: tip,
		total: 0,
		delivery: shippingMethod === "delivery" ? deliveryFee : 0,
	};

	each(orderItems, (item) => {
		let modifierTotal = 0;
		each(item.modifiers, (modifier) => {
			each(modifier.modifierChoices, (modifierChoice) => {
				modifierTotal = +(modifierTotal + modifierChoice.price).toFixed(2);
			});
		});
		totals.subTotal = +(
			totals.subTotal +
			item.quantity * ((item.basePrice + modifierTotal) / 100)
		).toFixed(2);
	});
	if (taxExempt) {
		totals.total = totals.subTotal - totals.tax + totals.delivery + totals.tip;
		totals.tax = 0;
	} else {
		totals.tax = +(totals.subTotal * menuConfigSettings.taxRate).toFixed(2);
		totals.total = +(
			totals.subTotal +
			totals.tax +
			totals.delivery +
			totals.tip
		).toFixed(2);
	}

	return totals;
};

export const formatOrderForDb = (
	order,
	customerInformation,
	paymentInformation,
	invoicePaymentDetails,
	creditCardPaymentDetails,
	paymentStatus
) => {
	/**
	 * TODO
	 * Might want to consider cleaning this up a little
	 * Also might want to consider combining delivery and pickup into a
	 * "shipping" section.
	 */
	let orderItemsArray = [];
	each(order.orderItems, (orderItem) => {
		orderItemsArray.push({
			name: orderItem.name,
			basePrice: orderItem.basePrice,
			modifiers: orderItem.modifiers,
			quantity: orderItem.quantity,
			specialInstructions: orderItem.specialInstructions,
			originalMenuItem: orderItem.originalMenuItem,
			originalSelectionFormat: orderItem.originalSelectionFormat,
		});
	});
	let formattedOrder = {
		customerInformation: {
			firstName: customerInformation.firstName,
			lastName: customerInformation.lastName,
			email: customerInformation.email,
			phoneNumber: customerInformation.phoneNumber,
		},
		deliveryInformation: {
			firstName: customerInformation.firstNameDelivery,
			lastName: customerInformation.lastNameDelivery,
			email: customerInformation.emailDelivery,
			phoneNumber: customerInformation.phoneNumberDelivery,
			address1: customerInformation.address1,
			address2: customerInformation.address2
				? customerInformation.address2
				: "",
			city: customerInformation.city,
			state: customerInformation.state,
			zip: customerInformation.zip,
			deliveryInstructions: customerInformation.deliveryInstructions
				? customerInformation.deliveryInstructions
				: "",
		},
		pickupInformation: {
			address1: order.orderDetails.pickupInformation.address1,
			address2: order.orderDetails.pickupInformation.address2,
			city: order.orderDetails.pickupInformation.city,
			state: order.orderDetails.pickupInformation.state,
			zip: order.orderDetails.pickupInformation.zip,
			email: order.orderDetails.pickupInformation.email,
			phoneNumber: order.orderDetails.pickupInformation.phoneNumber,
			pickupInstructions:
				order.orderDetails.pickupInformation.pickupInstructions,
		},
		paymentInformation: {
			paymentType: paymentInformation.paymentType,
			paymentStatus: paymentStatus,
			taxExempt: paymentInformation.taxExempt,
			taxExemptId: paymentInformation.taxExemptId
				? paymentInformation.taxExemptId
				: "",
			purchaseOrder: paymentInformation.purchaseOrder
				? paymentInformation.purchaseOrder
				: false,
			purchaseOrderNumber: paymentInformation.purchaseOrderNumber
				? paymentInformation.purchaseOrderNumber
				: "",
			universityMoneyAccount: paymentInformation.universityMoneyAccount
				? paymentInformation.universityMoneyAccount
				: "",
			invoicePaymentDetails,
			creditCardPaymentDetails,
		},
		orderItems: orderItemsArray,
		orderDetails: {
			location: order.orderDetails.location,
			orderDate: order.orderDetails.orderDate,
			shippingMethod: order.orderDetails.shippingMethod,
			specialInstructions: order.orderDetails.specialInstructions,
		},
		orderTotals: {
			subTotal: order.totals.subTotal,
			tax: order.totals.tax,
			tip: order.totals.tip,
			delivery: order.totals.delivery,
			total: order.totals.total,
		},
	};

	return formattedOrder;
};

export const formatStripeDescription = (order) => {
	let formattedDescription = "";
	each(order.orderItems, (item) => {
		formattedDescription +=
			item.name +
			" - " +
			"$" +
			((item.basePrice * item.quantity) / 100).toFixed(2) +
			"\n";
	});
	formattedDescription +=
		"Tax - " +
		"$" +
		order.totals.tax.toFixed(2) +
		"\n" +
		"Delivery - " +
		"$" +
		order.totals.delivery.toFixed(2) +
		"\n" +
		"Tip - " +
		"$" +
		order.totals.tip.toFixed(2);

	return formattedDescription;
};
