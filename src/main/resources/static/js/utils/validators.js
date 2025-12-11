export function required(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

export function email(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function minLength(value, min) {
  return String(value || '').length >= min;
}

export function showErrors(elementId, errors = []) {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerHTML = errors.map(err => `<div class="alert">${err}</div>`).join('');
  }
}
