// Clear all cookies
import eraseCookie from "./eraseCookie";

export default function clearStorage() {
  eraseCookie("tinkLinkUrl");
  eraseCookie("activeStep");
}
