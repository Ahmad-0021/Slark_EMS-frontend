export function formatIndianNumber(number: number): string {
  const numberString = number?.toString();
  const lastThreeDigits = numberString?.slice(-3);
  const otherDigits = numberString?.slice(0, -3);
  const formattedNumber =
    otherDigits?.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherDigits ? "," : "") +
    lastThreeDigits;
  return formattedNumber;
}
