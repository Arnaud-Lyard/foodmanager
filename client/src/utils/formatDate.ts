export function formatDate(date: string): string {
  const dateFormat = new Date(date);
  const year = dateFormat.getFullYear();
  let month = dateFormat.getMonth();
  let dateTime = dateFormat.getDate();

  if (dateTime < 10) {
    dateTime = ('0' + dateTime) as unknown as number;
  }
  if (month < 10) {
    month = ('0' + month) as unknown as number;
  }
  return `${year}-${month}-${dateTime}`;
}
