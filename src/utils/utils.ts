// Generate a random color class from Bulma CSS framework
export function getRandomColor(): string {
  const colors = [
    "is-primary",
    "is-link",
    "is-info",
    "is-success",
    "is-warning",
    "is-danger",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
