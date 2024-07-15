function formatDate(dateString) {
  const parts = dateString.split("-");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


module.exports = formatDate