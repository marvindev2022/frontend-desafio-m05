export function setItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function getItem(key) {
  return sessionStorage.getItem(key);
}

export function clear() {
  sessionStorage.clear();
}

export function removeItem(key) {
  sessionStorage.removeItem(key);
}
