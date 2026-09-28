// How online orders are placed.
//
// "toast-link": the site shows the menu, but ordering hands off to the
//   shop's Toast online ordering page (orders, payment, rewards and gift
//   cards all live in Toast). Used until Toast API access is set up.
// "site": customers build a cart and check out on this site. Switch to
//   this once Checkout sends orders to Toast through the API.
export const ORDERING_MODE = "toast-link";

export const TOAST_ORDER_URL = "https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row";

export const usesToastLink = ORDERING_MODE === "toast-link";
