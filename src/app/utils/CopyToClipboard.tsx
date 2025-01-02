export const copyTextToClipboard = (
  tableRef: React.RefObject<HTMLTableElement | null>
) => {
  if (!tableRef.current) {
    console.error("Table reference is null");
    return;
  }

  const table = tableRef.current; // No need for 'as HTMLTableElement' as tableRef is already typed
  const rows = Array.from(table.querySelectorAll("tr"));

  const text = rows
    .map((row, index) => {
      if (index === 0) return ""; // Skip the first row if needed (for table headers)

      const columns = Array.from(row.querySelectorAll("td, th"));
      return columns
        .map((col) => col.textContent?.trim() ?? "") // Safely get text content
        .join(": "); // Join columns with ": " separator
    })
    .join("\n"); // Join rows with a new line

  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};
