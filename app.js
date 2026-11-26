
const PROXY_BASE_URL = "";

const form = document.getElementById("proxy-form");
const input = document.getElementById("url-input");
const status = document.getElementById("status");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  let address = input.value.trim();

  if (!address) {
    status.textContent = "Please enter a website address.";
    return;
  }

  if (!/^https?:\/\//i.test(address)) {
    address = "https://" + address;
  }

  try {
    const target = new URL(address);

    if (!["http:", "https:"].includes(target.protocol)) {
      throw new Error("Invalid website address.");
    }

    if (!PROXY_BASE_URL) {
      status.textContent =
        "Proxy server is not connected yet. Backend required.";
      return;
    }

    const proxy = new URL("/proxy", PROXY_BASE_URL);
    proxy.searchParams.set("url", target.href);

    window.location.href = proxy.href;

  } catch (error) {
    status.textContent = error.message;
  }
});
