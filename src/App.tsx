import { Button, Text, Textarea, Progress } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { TooltipProgressBar, SectionedProgressBar, StripedProgressBar } from './manProgress';
import { AgendaItem } from './AgendaItem';


const defaultAgenda: AgendaItem[] = [
  { name: 'Item 1', description: 'Description 1', duration: 10 },
  { name: 'Item 2', description: 'Description 2', duration: 20 },
  { name: 'Item 3', description: 'Description 3', duration: 30 },
];

export default function FirstComponent() {
  const [agenda, setAgenda] = useState<AgendaItem[]>(defaultAgenda);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentItem, setCurrentItem] = useState<AgendaItem | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Calculate total duration of the meeting in minutes
  const totalDuration = agenda.reduce((acc, item) => acc + item.duration, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        const now = new Date();
        const minutesElapsed = (now.getTime() - startTime.getTime()) / 60000;
        setElapsed(minutesElapsed);
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


  const handleAgendaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const items = event.target.value.split('\n').map(line => {
      const [name, description, duration] = line.split(':');
      return { name, description, duration: Number(duration) };
    });
    setAgenda(items);
  }

  return (
    <>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <SimpleGrid cols={2} spacing="lg"> */}
        <DateTimePicker
          valueFormat="DD MMM YYYY hh:mm A"
          label="Pick date and time"
          placeholder="Pick date and time"
          maw={400}
          onChange={(newValue) => { setDate(newValue); setTime(newValue); }}
        />
        <Button onClick={handleStartMeeting}>Start meeting</Button>
        {/* </SimpleGrid> */}
        <Textarea
          placeholder="Item 1: Description 1: 10"
          label="Agenda"
          size="lg"
          onChange={(event) => handleAgendaChange(event)}
        />
        <br />
        <StripedProgressBar value={progress} />
        {currentItem ? <Text>Current item: {currentItem.name}</Text> : <Text>Meeting not started or finished.</Text>}
        <br />
      <Progress value={75} label={elapsed.toString()} size="xl" radius="xl" />
        <TooltipProgressBar value={elapsed} />
        <br />
        <SectionedProgressBar />
        <br />
        {/* <LinearProgress determinate color="success" value={progress} /> */}

      </LocalizationProvider>
    </>

  );
}