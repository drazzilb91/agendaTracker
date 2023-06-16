import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearProgressDeterminate({props}) {
  const [progress, setProgress] = React.useState(0);
    
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <LinearProgress determinate color="success" value={progress} />
  );
}