import React from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


export function StocksTable(props) {

    console.log(props.stocks);

    const columns = [
        {
            headerName: 'Name',
            field: 'name',
            width: 250
        },
        {
            headerName: 'Symbol',
            field: 'symbol',
            width: 250
        },
        {
            headerName: 'Industry',
            field: 'industry',
            width: 250
        }
    ];

    return (
        <div 
            className="ag-theme-alpine"
            style={{
                height: '630px',
                width: '752px',
                margin: 'auto',
            }}>
      
            <AgGridReact
            columnDefs={columns}
            rowData={props.stocks}
            pagination={true}
            paginationPageSize={12}
            />
        </div>
    );
    
}

export function StockHistoryTable(props){

    var rowData = props.entries;
    if (props.entries === null || 
        props.entries[0] === null ||
        (props.entries && props.entries.error)){
        rowData = [];
    }

    console.log(rowData);
  
    const columns = [
      {
        headerName: 'Timestamp',
        field: 'timestamp',
        width: 200
      },
      {
        headerName: 'Open',
        field: 'open',
        width: 110
      },
      {
        headerName: 'High',
        field: 'high',
        width: 110
      },
      {
        headerName: 'Low',
        field: 'low',
        width: 110
      },
      {
        headerName: 'Close',
        field: 'close',
        width: 110
      },{
        headerName: 'Volumes',
        field: 'volumes',
        width: 110
      }
    ];
  
    return (
      <div 
        className="ag-theme-alpine"
        style={{
            height: '360px',
            width: '752px',
            margin: 'auto'
        }}>
    
        <AgGridReact
        columnDefs={columns}
        rowData={rowData}
        pagination={true}
        paginationPageSize={6}
        />
      </div>
    );
  }