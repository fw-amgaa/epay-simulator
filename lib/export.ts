import type { Table } from "@tanstack/react-table";
import * as XLSX from "xlsx";

export function exportTableToXLSX<TData>(
  /**
   * The table to export.
   * @type Table<TData>
   */
  table: Table<TData>,
  opts: {
    /**
     * The filename for the XLSX file.
     * @default "table"
     * @example "tasks"
     */
    filename?: string;
    /**
     * The columns to exclude from the XLSX file.
     * @default []
     * @example ["select", "actions"]
     */
    excludeColumns?: (keyof TData | "select" | "actions")[];

    /**
     * Whether to export only the selected rows.
     * @default false
     */
    onlySelected?: boolean;
  } = {}
): void {
  const {
    filename = "table",
    excludeColumns = [],
    onlySelected = false,
  } = opts;

  // Retrieve headers (column names)
  const headers = table
    .getAllLeafColumns()
    .filter(
      (column) =>
        !excludeColumns.includes(
          column.id as keyof TData | "select" | "actions"
        )
    );

  // Build the rows content (excluding selected columns)
  const rows = (
    onlySelected
      ? table.getFilteredSelectedRowModel().rows
      : table.getRowModel().rows
  ).map((row) =>
    headers.map((header) => {
      const cellValue = row.getValue(header.id);
      switch (typeof cellValue) {
        case "string":
          return `${cellValue.replace(/"/g, '""')}`;
        case "boolean":
          return cellValue ? "Баталгаажсан" : "Баталгаажаагүй";
        default:
          return cellValue;
      }
    })
  );

  // Include headers as the first row
  const data = [
    headers.map((column) => column.columnDef.meta?.title || column.id),
    ...rows,
  ];

  // Convert to worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Set column widths based on the longest text in each column
  const colWidths = headers.map((_, colIndex) => {
    let maxLength = 0;
    // Find the maximum length for each column
    data.forEach((row) => {
      const cellValue = row[colIndex];
      maxLength = Math.max(maxLength, cellValue?.toString().length || 0);
    });
    // Set the width with a little padding
    return { wch: maxLength + 2 };
  });

  // Apply column widths to the worksheet
  worksheet["!cols"] = colWidths;

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate XLSX file as an array
  const xlsxArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the array data
  const xlsxBlob = new Blob([xlsxArray], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a URL for the Blob and trigger the download
  const url = URL.createObjectURL(xlsxBlob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.xlsx`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
