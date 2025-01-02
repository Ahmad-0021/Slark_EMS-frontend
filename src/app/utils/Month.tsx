
export const getPreviousMonth = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const currentMonth = date.getMonth(); // 0-based index (0 = January)
  const previousMonthIndex = currentMonth === 0 ? 11 : currentMonth - 1; // Wrap to December if current month is January

  return months[previousMonthIndex];
};
