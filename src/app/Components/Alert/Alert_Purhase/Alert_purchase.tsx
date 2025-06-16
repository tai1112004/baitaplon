import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function DescriptionAlerts({ progress }: { progress: number }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Cảm ơn bạn đã mua hàng của chúng tôi.
        
      </Alert>
      <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ marginTop: 2, height: 8, borderRadius: 4,width:"100%"}}
        />
    </Stack>
  );
}
