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
    <div className="overflow-hidden border border-slate-100 rounded-xl shadow-2xs">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5"
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
                className="text-center py-8 text-xs font-medium text-slate-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-slate-50 hover:bg-blue-50/15 last:border-none transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-3.5 text-xs font-semibold text-slate-600">
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