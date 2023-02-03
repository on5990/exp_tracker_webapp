import {
  EXPENSE_CACHE,
  REQUEST_BUDGET,
  REQUEST_EXPENSE,
  REQUEST_FALSE,
  REQUEST_TRUE,
} from "../../../global/constants";

async function get() {
  let cache = localStorage.getItem(EXPENSE_CACHE);
  let shouldRequest = localStorage.getItem(REQUEST_EXPENSE);
  shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
  if (cache != null && shouldRequest != null && !shouldRequest.request) {
    console.log("GETTING EXPENSES FROM CACHE");
    cache = JSON.parse(cache);
    return cache;
  } else {
    console.log("REQUESTING EXPENSES TO SERVER");
    let response = await fetch(`/api/expense`, {
      method: "GET",
    });
    if (response.ok) {
      let content = await response.json();
      content = content.data;
      localStorage.setItem(EXPENSE_CACHE, JSON.stringify(content));
      localStorage.setItem(REQUEST_EXPENSE, JSON.stringify(REQUEST_FALSE));
      return content;
    } else {
      console.log(content);
      return false;
    }
  }
}
async function create(input) {
  const response = await fetch("/api/expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const content = await response.json();
  if (response.ok) {
    localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_TRUE));
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function update(_id, input) {
  const response = await fetch(`/api/expense/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const content = await response.json();
  if (response.ok) {
    localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_TRUE));
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function remove(_id) {
  const response = await fetch(`/api/expense/${_id}`, {
    method: "DELETE",
  });
  const content = await response.json();
  if (response.ok) {
    localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_TRUE));
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
async function getCharts() {}
export default { get, create, update, remove, getCharts };
