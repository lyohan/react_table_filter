import { useTable, useFilters, useSortBy } from 'react-table'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import './Table.scss'

const ColumnFilter = ({ column }) => {
  const {
    filterValue,
    preFilteredRows,
    setFilter,
  } = column

  return (
    <input
      value={filterValue || '' }
      onChange={(e) => setFilter(e.target.value) || undefined }
      placeholder={`Search..${preFilteredRows.length}`}
    />
   )
}

const Sort = ({ column, onSortHandler }) => {
  const { 
    isSorted,
    isSortedDesc,
  } = column

  return (
    <div onClick={onSortHandler}>
      {
        isSorted ? (
          isSortedDesc ? <FaArrowDown /> : <FaArrowUp />
        ) : ''
      }
    </div>
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
    useSortBy,
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <Sort column={column} onSortHandler={() => console.log('api call sort')} />
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
