export const localDateToISO = (date: string) => {
  const formattedDate = date.replace('.', '-').replace('.', '-');
  const [datePart, timePart] = formattedDate.split(', ');
  const [day, month, year] = datePart.split('-');
  const isoFormattedDate = `${year}-${month}-${day}T${timePart}`;
  return isoFormattedDate;
};
