interface TableCellProps {
  value: number | string;
  prefix?: string;
  isCurrency?: boolean;
  className?: string;
}

interface TableCellProps {
  value: number | string;
  prefix?: string;
  isCurrency?: boolean;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ value, prefix = "" }) => {
  const formattedValue =
    typeof value === "number" ? Math.ceil(value).toLocaleString() : value;

  return (
    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-indigo-600">
      {prefix} {formattedValue}
    </td>
  );
};

export default TableCell;
