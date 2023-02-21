import { Box, Paper, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper 
      sx={{ 
        width: '100%', 
        position: 'fixed', 
        bottom: 0, 
        height: 50, 
        backgroundColor: 'whitesmoke' 
      }} 
      elevation={2}
    >
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: 'center',
          display: "flex",
          height: 50
        }}
      >
        <Typography variant="caption" sx={{ textAlign: 'center' }}>T20 Quiztionnaire © 2023</Typography>
      </Box>
    </Paper>
  );
};

export default Footer;