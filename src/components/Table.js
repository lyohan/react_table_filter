import { useTable, useFilters } from 'react-table'
import './Table.scss'

const ColumnFilter = ({ column }) => {
  const {
    filterValue,
    preFilteredRows,
    setFilter
  } = column

  return (
    <input
      value={filterValue || '' }
      onChange={(e) => setFilter(e.target.value) || undefined }
      placeholder={`Search..${preFilteredRows.length}`}
    />
   )
}

const Table = ({ columns, data }) => {
  const instance = useTable({
      columns,
      data,
      defaultColumn: {
        Filter: ColumnFilter
      }
    },
    useFilters,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = instance

  return (
    <div>
      {console.log('aaa', instance)}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>
                    {column.canFilter && column.render('Filter')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table> 
    </div>
  )
}

export default Table
