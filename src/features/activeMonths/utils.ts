export function getFirstAndLastDaysOfMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    first: new Date(year, month, 1),
    last: new Date(year, month + 1, 0),
  };
}
