interface TableHeadingProps {
  title: string;
}

const TableHeading = ({ title }: TableHeadingProps) => {
  return (
    <th className="py-2 px-2 text-center text-xs font-medium text-white capitalize tracking-wider">
      {title}
    </th>
  );
};

export default TableHeading;
