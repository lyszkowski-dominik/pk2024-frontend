export const localDateToISO = (date: string) => {
  const formattedDate = date.replace('.', '-').replace('.', '-');
  const [datePart, timePart] = formattedDate.split(', ');
  const [day, month, year] = datePart.split('-');
  const isoFormattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`;
  return isoFormattedDate;
};
