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
  { field: 'quizTitle', headerName: 'Quiz', flex: 1 },
  { field: 'classTitle', headerName: 'Class', flex: 1 },
  { 
    field: 'dueDate', 
    headerName: 'Due Date',
    filterable: false,
    width: 120,
    valueFormatter: (params) => formatDate(params.value)
  },
  { 
    field: 'progress', 
    headerName: '# Complete', 
    width: 120,
    filterable: false,
    sortable: false,
    valueGetter: (params) => `${params.row.numComplete}/${params.row.numStudents}`
  },
  { 
    field: 'average', 
    headerName: 'Avg. Score',
    width: 120,
    filterable: false,
    valueFormatter: avgFormatter
  },
];

const completeColumns = [
  { field: 'quizTitle', headerName: 'Quiz', flex: 1 },
  { field: 'classTitle', headerName: 'Class', flex: 1 },
  { 
    field: 'dueDate', 
    headerName: 'Completed On', 
    filterable: false,
    width: 120,
    valueFormatter: (params) => formatDate(params.value)
  },
  { 
    field: 'average', 
    headerName: 'Avg. Score',
    filterable: false,
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