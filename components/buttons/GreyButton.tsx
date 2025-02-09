import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const GreyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  variants: 'contained',
  fontFamily: 'Inter',
  fontSize: 15,
  fontWeight: 'normal',
  padding: '8px 16px 8px 16px',
  border: '2px solid #7f7f7F',
  boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.12)',
  color: theme.palette.getContrastText('#7f7f7F'),
  backgroundColor: '#969696',
  transition: 'colors 0.3s ease-in-out',
  position: 'relative',
  zIndex: 10,
  textAlign: 'center',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -10,
    height: '100%',
    width: '100%',
    origin: 'top left',
    transform: 'scaleX(0)',
    backgroundColor: '#7f7f7F',
    transition: 'transform 0.3s ease-in-out',
  },

  '&:hover': {
    boxShadow: 'none',
    color: 'white',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },

  '&:disabled': {
    color: '#ffffff',
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    border: '2px groove rgba(0, 0, 0, 0.12)',
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
}));

export default GreyButton;
