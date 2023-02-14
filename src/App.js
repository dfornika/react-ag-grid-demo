import './App.css';

import React, { useEffect, useState, useContext, createContext, useReducer } from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

const initialState = {
  
};

const Context = createContext(initialState);

const Reducer = (state, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const Store = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
      <Context.Provider value={[state, dispatch]}>
          {children}
      </Context.Provider>
  );
};

const Table = (props) => {
  const [state, setState] = useState({runs: []});
  const [gridApi, setGridApi] = useState(null);
  const [, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
};

useEffect(() => {
    const getData = async () => {
        const response = await fetch("/data/data.json");
        const data = await response.json();
        setState({data: data});
    };
    getData();
}, []);

const [, dispatch] = useContext(Context);

const onSelectionChanged = (event) => {
    
};

const [columnDefs] = useState([
  { field: 'id', headerName: "id", lockPosition: "left", filter: "agTextColumnFilter", floatingFilter: true },
  { field: 'min', sortable: true, filter: "agNumberColumnFilter", floatingFilter: true },
  { field: 'mean', sortable: true, filter: "agNumberColumnFilter", floatingFilter: true },
  { field: 'max', sortable: true, filter: "agNumberColumnFilter", floatingFilter: true },
])

  return (
    <div className="ag-theme-balham" style={{height: 200}}>
      <AgGridReact
        rowData={state.data}
        columnDefs={columnDefs}
        onSelectionChanged={onSelectionChanged}
        onGridReady={onGridReady}>
      </AgGridReact>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Store>
        <header style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center"}}>
          <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center"}}>
            <h1 style={{fontFamily: "Arial", color: "#004a87"}}>AG-Grid Demo</h1><p style={{fontFamily: "Arial", color: "grey", justifySelf: "start"}}></p>
          </div>
          <div style={{display: "grid", alignSelf: "center", justifySelf: "end"}}>
            <img src="Octocat.png" style={{height: "64px"}} alt={"BCCDC Logo"}/>
          </div>
        </header>
        <div style={{display: "grid", gap: "24px", gridTemplateColumns: "1fr"}}>
          <Table/>
        </div>
      </Store>
    </div>
  );
}

export default App;
