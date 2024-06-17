type Props = {
  thead?: React.ReactNode;
  tbody?: React.ReactNode;
};

const Table = ({ thead, tbody }: Props) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {thead}
        </thead>

        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
};

export default Table;
