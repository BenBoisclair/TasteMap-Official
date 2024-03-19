export default function formatDate(dateString: Date) {
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

  const day = dateString.getDate();
  const monthIndex = dateString.getMonth();
  const year = dateString.getFullYear();

  return `Visited on ${day} ${months[monthIndex]} ${year}`;
}
