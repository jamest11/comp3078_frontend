import { Box, MenuItem, Paper, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatDate } from 'utils';

const CustomTooltip = ({ active, payload, styles }) => {
  if (active && payload && payload.length) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.title}>{payload[0].payload.quizTitle}</div>
        <div style={styles.desc}>{payload[0].payload.classTitle}</div>
        <div style={styles.desc}>Grade: {payload[0].payload.grade}%</div>
      </div>
    );
  }
  return null;
};

const GradeChart = ({ data }) => {
  const theme = useTheme();
  const [classNames, setClassNames] = useState([]);
  const [grades, setGrades] = useState([]);

  const tooltipStyles = useRef({
    wrapper: {
      backgroundColor: theme.palette.grey['200'],
      borderRadius: 4,
      padding: 4
    },
    title: {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium
    },
    desc: {
      ...theme.typography.body2
    }
  });

  useEffect(() => {
    const names = [...new Set(data.map((x) => x.classTitle))];
    setClassNames(names);
    setGrades([...data].reverse());
  }, [data]);

  const handleChange = (event) => {
    const name = event.target.value;

    if(name === '') {
      setGrades([...data].reverse());
    }
    else {
      setGrades([...data].reverse().filter((x) => x.classTitle === name));
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Box sx={{ display: 'flex', width: 1 }}>
        <Typography variant="h6" color="primary" gutterBottom>Grade History</Typography>

        <TextField 
          sx={{ ml: 'auto', mr: 1, width: 200 }}
          select 
          size="small"
          label="Class Filter"
          defaultValue=""
          onChange={handleChange}
        >
          <MenuItem key={-1} value="" dense>All</MenuItem>
          {classNames.map((name, index) => (
            <MenuItem key={index} value={name} dense>{name}</MenuItem>
          ))}
        </TextField>
      </Box>

      <ResponsiveContainer>
        <LineChart
          data={grades}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 20,
          }}
        >
          <XAxis 
            dataKey="date"
            style={theme.typography.body2} 
            tickFormatter={(value) => formatDate(value)}
          >
            <Label
              position="middle"
              style={{
                ...theme.typography.body1,
              }}
              dy={20}
            >
              Date
            </Label>
          </XAxis>
          <YAxis 
            domain={[0, 100]}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                ...theme.typography.body1,
              }}
            >
              Grade
            </Label>
          </YAxis>
          <Tooltip 
            // @ts-ignore
            content={<CustomTooltip styles={tooltipStyles.current} />}
            wrapperStyle={{ outline: 'none' }}
          />
          <Line
            isAnimationActive={false} 
            type="linear" 
            dataKey="grade" 
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GradeChart;