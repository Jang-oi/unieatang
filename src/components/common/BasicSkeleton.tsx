import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function BasicSkeleton() {
  return (
    <Card variant="outlined" sx={{width: 'auto', display: 'flex'}}>
      <AspectRatio ratio="21/9">
        <Skeleton variant="overlay"></Skeleton>
      </AspectRatio>
    </Card>
  );
}
