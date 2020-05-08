export function setItem(item, value) {
  localStorage.setItem(item, value);
}

export function getItem(item) {
  return localStorage.getItem(item);
}

export function deleteItem(item) {
  localStorage.removeItem(item);
}

export function logout() {
  deleteItem("token");
  window.location.href = "/login";
}
