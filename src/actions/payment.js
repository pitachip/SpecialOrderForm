import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const createNewInvoice = (
	contactInformation,
	orderItems,
	paymentInformation
) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const createInvoice = await pitachip.post(
			"/payment/invoice",
			{
				contactInformation,
				orderItems,
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
