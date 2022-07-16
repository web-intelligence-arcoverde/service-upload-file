export function removeAccentSpace(str) {
  return str.replace(/[^a-zA-Zs]/g, "");
}