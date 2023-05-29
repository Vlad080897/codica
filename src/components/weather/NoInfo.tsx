import { Typography } from '@mui/material';
import React from 'react';

const NoInfo = () => {
  return (
    <Typography
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      Sorry, you have not requested weather for any city yet.Do it now!
    </Typography>
  );
};

export default NoInfo;
