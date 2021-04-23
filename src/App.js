import Table from 'components/Table'
import columns from 'components/columns'
import makeData from 'components/makeData'

function App() {
  return (
    <div>
       Hello
       <Table
         columns={columns}
         data={makeData(20)}
       />
    </div>
  );
}

export default App;
