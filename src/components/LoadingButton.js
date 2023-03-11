import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ children, loading, variant, color, size, onClick }) => {
  return (
    <>
      {loading ? (
          <Button 
            color={color} 
            size={size}
            variant={variant} 
            disabled
          >
            <CircularProgress size={24} />
          </Button>
        ) : (
          onClick.valueOf() === 'submit' ? (
            <Button 
              color={color} 
              size={size}
              variant={variant} 
              type="submit"
            >
              {children}
            </Button>
          ) : (
            <Button 
              color={color} 
              size={size}
              variant={variant} 
              onClick={onClick}
            >
              {children}
            </Button>
          )
        )
      }
    </>
  );
};

export default LoadingButton;