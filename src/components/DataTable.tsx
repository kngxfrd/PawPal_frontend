import type { ReactNode } from "react";


interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
}

function DataTable({ columns, data, emptyMessage = "No data available" }: DataTableProps){
  return (
    <div className="mt-6 rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
  {data.length === 0 ? (
    <tr>
      <td
        colSpan={columns.length}
        className="text-center py-5 text-sm text-gray-300"
      >
        {emptyMessage}
      </td>
    </tr>
  ) : (
    data.map((row, index) => (
      <tr
        key={index}
        className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
      >
        {columns.map((column) => (
          <td key={column.accessor} className="px-6 py-4 text-sm text-gray-600">
            {column.render
              ? column.render(row[column.accessor], row)
              : row[column.accessor]}
          </td>
        ))}
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
}

export default DataTable;