export function textareaIsEmpty(textarea) {
  return textarea.value.length <= 0;
}

export function clearTextarea(textarea) {
  textarea.value = "";
}

export function switchForgiveBtnState() {
  const btn = document.getElementById("forgiveBtn");
  const disabled = btn.classList.contains("disabled");
  if (disabled) {
    btn.classList.remove("disabled");
  } else {
    btn.classList.add("disabled");
  }
}

export function togglePopup(id, timeout = 3000) {
  const popup = document.getElementById(id);
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, timeout);
}
