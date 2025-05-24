export function adjustColor(col, amt) {
  let num = parseInt(col.slice(1), 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amt));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  let b = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

export function showError(msg) {
  console.error(msg);
}
