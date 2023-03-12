import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatDate } from 'utils';

const avgFormatter = (params) => {
  if(!params.value) {
    return 'N/A';
  }
  return `${params.value}%`;
};

const incompleteColumns = [
  { field: 'classTitle', headerName: 'Class', flex: 1 },
  { field: 'quizTitle', headerName: 'Quiz', flex: 1 },
  { 
    field: 'dueDate', 
    headerName: 'Due Date',
    width: 120,
    valueFormatter: (params) => formatDate(params.value)
  },
  { 
    field: 'progress', 
    headerName: '# Complete', 
    width: 120,
    sortable: false,
    valueGetter: (params) => `${params.row.numComplete}/${params.row.numStudents}`
  },
  { 
    field: 'average', 
    headerName: 'Avg. Score',
    width: 120,
    valueFormatter: avgFormatter
  },
];

const completeColumns = [
  { field: 'classTitle', headerName: 'Class', flex: 1 },
  { field: 'quizTitle', headerName: 'Quiz', flex: 1 },
  { 
    field: 'dueDate', 
    headerName: 'Completed On', 
    width: 120,
    valueFormatter: (params) => formatDate(params.value)
  },
  { 
    field: 'average', 
    headerName: 'Avg. Score',
    width: 120,
    valueFormatter: avgFormatter
  },
];

const GradeDataGrid = ({ quizGrades, variant }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={quizGrades}
        columns={variant === 'complete' ? completeColumns : incompleteColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        autoHeight
        pageSizeOptions={[5]}
        density="compact"
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        disableColumnSelector
        sx={{ backgroundColor: 'white', boxShadow: 2 }}
      />
    </Box>
  );
};

export default GradeDataGrid;