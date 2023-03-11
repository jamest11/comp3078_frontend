import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatDate } from 'utils';

const columns = [
  { field: 'classTitle', headerName: 'Class', flex: 1 },
  { field: 'quizTitle', headerName: 'Quiz', flex: 1 },
  { field: 'completed', headerName: '# Grades', width: 120 },
  { 
    field: 'average', 
    headerName: 'Avg. Score',
    width: 120,
    valueFormatter: (params) => {
      if(!params.value) {
        return 'N/A';
      }
      return `${params.value}%`;
    } 
  },
  { 
    field: 'dueDate', 
    headerName: 'Due Date',
    width: 120,
    valueFormatter: (params) => formatDate(params.value)
  }
];

const GradeDataGrid = ({ quizGrades }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={quizGrades}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
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

export default GradeDataGrid;