import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'topic',
    headerName: 'Topic',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'duration',
    headerName: 'duration',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'comppiled',
    headerName: 'Full Compiled',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.topic || ''} : ${params.row.description || ''} : ${params.row.duration || ''}`,
  },
];

const rows = [
  { id: 1, topic: 'Jon', description:'dd', duration: 5 },
  { id: 2, topic: 'Cersei', description: 'asf', duration: 2 },
  { id: 3, topic: 'Jaime', description: 'asf', duration: 5 },
  { id: 4, topic: 'Arya', description: 'asf', duration: 1 },
];

export default function DataGridDemo() {

  const [copiedData, setCopiedData] = useState('');
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 10,
  //   maxColumns: 20,
  // });
  // const initialState = {
  //   ...data.initialState,
  //   columns: {
  //     columnVisibilityModel: {
  //       id: false,
  //       desk: false,
  //     },
  //   },
  // };

  useEffect (() => {
    console.log(copiedData);
  }, [copiedData]);
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onClipboardCopy={(copiedString) => setCopiedData(copiedString)}
      />
    </Box>
  );
}