import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const createNewInvoice = (
	contactInformation,
	orderItems,
	deliveryAndTax,
	paymentInformation
) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const createInvoice = await pitachip.post(
			"/payment/invoice",
			{
				contactInformation,
				orderItems,
				deliveryAndTax,
				paymentInformation,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return createInvoice;
	} catch (error) {
		return error;
	}
};

export const createSpecialOrder = (specialOrder) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const createSpecialOrder = await pitachip.post(
			"/specialorder",
			{
				specialOrder,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return createSpecialOrder;
	} catch (error) {
		return error;
	}
};

export const updateSpecialOrder = (modifiedOrder, modifiedOrderId) => async (
	dispatch
) => {
	try {
		const userToken = await getUserToken();
		const modifySpecialOrder = await pitachip.put(
			`/specialorder/${modifiedOrderId}`,
			{
				modifiedOrder: modifiedOrder,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return modifySpecialOrder;
	} catch (error) {
		return error;
	}
};

export const createPaymentIntent = (amount) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const paymentIntent = await pitachip.post(
			"/payment/intent",
			{
				amount,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return paymentIntent.data;
	} catch (error) {
		return error;
	}
};

export const completePayment = (
	paymentIntentSecret,
	stripe,
	elements,
	cardElement
) => async (dispatch) => {
	try {
		const completePayment = await stripe.confirmCardPayment(
			paymentIntentSecret,
			{
				payment_method: {
					card: elements.getElement(cardElement),
				},
			}
		);
		return completePayment;
	} catch (error) {
		return error;
	}
};

export const getPaymentIntent = (paymentIntentId) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const paymentIntent = await pitachip.get(
			"/payment/intent/" + paymentIntentId,
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return paymentIntent;
	} catch (error) {
		return error;
	}
};

export const refundCreditCard = (paymentIntentId, amount) => async (
	dispatch
) => {
	try {
		const userToken = await getUserToken();
		const refundCreditCard = await pitachip.post(
			"/payment/refund/creditcard",
			{
				paymentIntentId: paymentIntentId,
				amount,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return refundCreditCard;
	} catch (error) {
		return error;
	}
};

export const voidInvoice = (invoiceId) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const voidInvoice = await pitachip.post(
			"/payment/refund/invoice",
			{
				invoiceId: invoiceId,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return voidInvoice;
	} catch (error) {
		return error;
	}
};

export const cancelOrder = (orderId, paymentStatus) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const cancelSpecialOrder = await pitachip.delete(
			`/specialorder/${orderId}`,
			{
				headers: {
					Authorization: `Bearer ${userToken.token}`,
				},
				data: {
					paymentStatus: paymentStatus,
				},
			}
		);
		return cancelSpecialOrder;
	} catch (error) {
		return error;
	}
};
