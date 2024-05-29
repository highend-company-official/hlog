type Props = {
  thead?: React.ReactNode;
  tbody?: React.ReactNode;
};

const Table = ({ thead, tbody }: Props) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
          {thead}
        </thead>

        <tbody>
          {tbody}
          {/* <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-black whitespace-nowrap"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
          </tr>
          <tr className="bg-white">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-black whitespace-nowrap"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
