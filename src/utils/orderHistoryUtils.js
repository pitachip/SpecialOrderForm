export const createFilterString = (orderHistoryTab) => {
	let filterString = "";
	switch (orderHistoryTab) {
		case "In Progress":
			filterString = "status=Confirmed&status=Scheduled For Delivery";
			return filterString;
		case "Completed":
			filterString = "status=Completed";
			return filterString;
		case "Cancelled":
			filterString = "status=Cancelled";
			return filterString;
		default:
			break;
	}
};
