import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import DataGridDemo from './DataGrid';
import ClipboardCopy from './DataGridCopy';
import { LinearProgress } from '@mui/joy';
import { Demo, Demo2, Demo3 } from './manProgress';
import { DateInput, DateTimePicker } from '@mantine/dates';



type AgendaItem = {
  name: string;
  description: string;
  duration: number;  // Note: duration in minutes
}

export default function FirstComponent() {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentItem, setCurrentItem] = useState<AgendaItem | null>(null);

  // Calculate total duration of the meeting in minutes
  const totalDuration = agenda.reduce((acc, item) => acc + item.duration, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        const now = new Date();
        const minutesElapsed = (now.getTime() - startTime.getTime()) / 60000;
        const newProgress = Math.min((minutesElapsed / totalDuration) * 100, 100);
        setProgress(newProgress);

        let elapsed = minutesElapsed;
        for (let i = 0; i < agenda.length; i++) {
          if (elapsed <= agenda[i].duration) {
            setCurrentItem(agenda[i]);
            break;
          }
          elapsed -= agenda[i].duration;
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startTime, totalDuration, agenda]);

  // ...
  const handleStartMeeting = () => {
    if (date && time) {
      const startDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );

      setStartTime(startDateTime);
    } else {
      setStartTime(new Date());
    }
  };


  const handleAgendaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const items = event.target.value.split('\n').map(line => {
      const [name, description, duration] = line.split(':');
      return { name, description, duration: Number(duration) };
    });
    setAgenda(items);
  }

  return (
    <>
    <DateTimePicker
      valueFormat="DD MMM YYYY hh:mm A"
      label="Pick date and time"
      placeholder="Pick date and time"
      maw={400}
      mx="auto"
    />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Demo3 />
        <Demo />
        <Demo2 />
        <DateInput
          value={date}
          onChange={(newValue) => { setDate(newValue); }}
          label="Date input"
          placeholder="Date input"
          maw={400}
          mx="auto"
        />

        <Box>
          <TextField
            multiline
            label="Agenda"
            variant="outlined"
            fullWidth
            onChange={handleAgendaChange}
          />
        </Box>
        <Box>

          <DatePicker value={date} onChange={(newValue) => { setDate(newValue); }} />
          <TimePicker value={time} onChange={(newValue) => { setTime(newValue); }} />
        </Box>
        <Box>
          <button onClick={handleStartMeeting}>Start meeting</button>
        </Box>
        <Box>
          <progress value={progress} max="100" />
        </Box>
        <Box>
          {currentItem ? <div>Current item: {currentItem.name}</div> : <div>Meeting not started or finished.</div>}
        </Box>
        <DataGridDemo />
        <LinearProgress determinate color="success" value={progress} />

      </LocalizationProvider>
    </>

  );
}