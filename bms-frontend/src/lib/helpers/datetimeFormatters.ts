export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th"; // 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const toDDMMM = (datetime: string) => {
  // Formats to 29th Jan
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });

  return `${day}${getOrdinalSuffix(day)} ${month}`;
};

export const toDDMMMYYYY = (datetime: string | undefined) => {
  // Formats to 29th Jan 2022
  if (!datetime) {
    return ""; // or handle the case when datetime is undefined
  }
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};
