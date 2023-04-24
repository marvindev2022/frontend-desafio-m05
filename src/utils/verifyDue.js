export function verifyDue(date) {
  if (new Date(date) < new Date()) return "due";
  return "pendent";
}
