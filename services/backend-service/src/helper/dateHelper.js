const getDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const dateHelper = {
  validateAndParseDate: (req_date) => {
    let query_date;
    if (!req_date) {
      query_date = new Date(); // use today's date..
    } else {
      query_date = new Date(req_date);
      if (isNaN(query_date)) {
        return null;
      }
    }
    return getDateString(query_date);
  },
};

module.exports = dateHelper;
