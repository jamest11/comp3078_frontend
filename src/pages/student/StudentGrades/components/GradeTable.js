import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatDate } from 'utils';

const columns = [
  { field: 'classTitle', headerName: 'Class', flex: 1 },
  { field: 'quizTitle', headerName: 'Quiz', flex: 1 },
  { 
    field: 'date', 
    headerName: 'Date',
    width: 120,
    valueFormatter: (params) => formatDate(params.value)
  },
  { 
    field: 'grade', 
    headerName: 'Grade',
    width: 120,
    valueFormatter: (params) => `${params.value}%`
  }
];

const GradeTable = ({ grades }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={grades}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        autoHeight
        density="compact"
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        disableColumnSelector
        sx={{ backgroundColor: 'white', boxShadow: 2 }}
      />
    </Box>
  );
};

export default GradeTable;