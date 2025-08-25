import React from 'react';
import { Paper, Typography }                              from '@mui/material';
import { DataGrid, GridPagination, GridToolbarContainer } from '@mui/x-data-grid';

function CustomFooter() {
  return (
    <GridToolbarContainer>
      <GridPagination />
    </GridToolbarContainer>
  );
}

function DynamicTable({ 
  data, 
  columns, 
  idField,
  rowCount,
  paginationModel,
  onPaginationModelChange,
}) {
  if (!data || !idField) {
    return <Typography>표시할 데이터가 없습니다.</Typography>;
  }

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row[idField]}
        
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[5, 10, 20]}

        slots={{
          footer: CustomFooter,
        }}
        
        sx={{
          backgroundColor: '#282c34', color: 'white', border: 0,
          '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(0, 3, 168, 0.2)' },
          '& .MuiCheckbox-root': { color: 'white' },
          '& .MuiTablePagination-root': { color: 'white' },
        }}
      />
    </Paper>
  );
}

export default DynamicTable;