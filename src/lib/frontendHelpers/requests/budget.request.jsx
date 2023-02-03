import {
  BUDGET_CACHE,
  REQUEST_BUDGET,
  REQUEST_FALSE,
} from "../../../global/constants";

async function get() {
  let cache = localStorage.getItem(BUDGET_CACHE);
  let shouldRequest = localStorage.getItem(REQUEST_BUDGET);
  shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
  if (cache != null && shouldRequest != null && !shouldRequest.request) {
    console.log("GETTING BUDGET FROM CACHE");
    cache = JSON.parse(cache);
    return cache;
  } else {
    console.log("REQUESTING BUDGET TO SERVER");
    const response = await fetch("/api/budget", {
      method: "GET",
    });
    let content = await response.json();
    content = content.data;
    if (response.ok) {
      localStorage.setItem(BUDGET_CACHE, JSON.stringify(content));
      localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_FALSE));
      return content;
    } else {
      console.log(content);
      return false;
    }
  }
}
async function create(input) {
  const response = await fetch("/api/budget", {
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
  const response = await fetch(`/api/budget/${_id}`, {
    method: "PUT",
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
async function remove(_id) {
  const response = await fetch(`/api/budget/${_id}`, { method: "DELETE" });
  const content = await response.json();
  if (response.ok) {
    return content.data;
  } else {
    console.log(content);
    return false;
  }
}
export default { get, create, update, remove };
