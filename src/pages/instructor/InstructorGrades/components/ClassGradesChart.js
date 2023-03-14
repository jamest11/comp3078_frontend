import { Box, Paper, Typography, useTheme } from '@mui/material';
import { tooltipStyles } from 'components/Layout';
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyles.wrapper}>
        <div style={tooltipStyles.title}>{payload[0].payload.quizTitle}</div>
        <div style={tooltipStyles.desc}>{payload[0].payload.classTitle}</div>
        <div style={tooltipStyles.desc}>Grade: {payload[0].payload.grade}%</div>
      </div>
    );
  }
  return null;
};

const ClassGradesChart = ({ data }) => {
  const theme = useTheme();
  
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        height: 350,
      }}
    >      
      <Typography variant="h6" color="secondary" gutterBottom>Class Grades</Typography>

      <ResponsiveContainer>
        <BarChart
          data={data.filter((x) => x.average)}
          margin={{
            top: 5,
            right: 15,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis 
            dataKey="classTitle"
            style={{ fontSize: 0 }}
          />
          <YAxis
            domain={[0, 100]}
            orientation="left"
            yAxisId="left"
            dataKey="average" 
            style={theme.typography.body2}
          />
          <Tooltip 
            // @ts-ignore
            wrapperStyle={{ outline: 'none' }}
          />
          <Bar
            yAxisId="left"
            dataKey="average" 
            fill={theme.palette.secondary.main}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ClassGradesChart;