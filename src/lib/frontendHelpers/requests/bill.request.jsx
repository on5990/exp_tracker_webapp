import {
  BILL_CACHE,
  REQUEST_BILL,
  REQUEST_EXPENSE,
  REQUEST_FALSE,
  REQUEST_TRUE,
} from "../../../global/constants";

async function get() {
  let billCache = localStorage.getItem(BILL_CACHE);
  let shouldRequest = localStorage.getItem(REQUEST_BILL);
  shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
  if (billCache != null && shouldRequest != null && !shouldRequest.request) {
    console.log("GETTING BILLS FROM CACHE");
    billCache = JSON.parse(billCache);
    return billCache;
  } else {
    console.log("REQUESTING BILLs TO SERVER");
    const response = await fetch("/api/bill", { method: "GET" });
    let content = await response.json();
    content = content.data;
    if (response.ok) {
      localStorage.setItem(BILL_CACHE, JSON.stringify(content));
      localStorage.setItem(REQUEST_BILL, JSON.stringify(REQUEST_FALSE));
      return content;
    } else {
      console.log(content);
      return false;
    }
  }
}
async function create(input) {
  const response = await fetch("/api/bill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const content = await response.json();
  if (response.ok) {
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function update(_id, input) {
  const response = await fetch(`/api/bill/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const content = await response.json();
  if (response.ok) {
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function remove(_id) {
  const response = await fetch(`/api/bill/${_id}`, {
    method: "DELETE",
  });
  const content = await response.json();
  if (response.ok) {
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function pay(_id, input) {
  const response = await fetch(`/api/bill/pay/${_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const content = await response.json();
  if (response.ok) {
    localStorage.setItem(REQUEST_EXPENSE, JSON.stringify(REQUEST_TRUE));
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function getByMonths() {}
export default { get, create, update, remove, pay, getByMonths };
