export function textareaIsEmpty(textarea) {
  return textarea.value.length ? false : true;
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
