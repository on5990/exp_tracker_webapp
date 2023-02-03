import { REQUEST_BUDGET, REQUEST_TRUE } from "../../../global/constants";

async function get() {}
async function create(category) {
  const response = await fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: category }),
  });
  let content = await response.json();
  if (response.ok) {
    localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_TRUE));
    content = content.data.category;
    return content;
  } else {
    console.log(content);
    return false;
  }
}
async function remove(_id) {
  const response = await fetch(`/api/category/${_id}`, {
    method: "DELETE",
  });
  const content = await response.json();
  if (response.ok) {
    localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_TRUE));
    return content.data.categories;
  } else {
    console.log(content);
    return false;
  }
}
export default { get, create, remove };
