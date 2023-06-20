import { Title, Box, Button, Chip, Collapse, Divider, Flex, Grid, Group, Header, Paper, Progress, Space, Text, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { AgendaItem } from './components/AgendaItem';
import { SectionedProgressBar } from './components/ProgressBars';
import { MyRingProgress } from './components/RingProgress';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from 'react-responsive';


export default function App() {
  const [agenda, setAgenda] = useState<AgendaItem[]>(defaultAgenda);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentItem, setCurrentItem] = useState<AgendaItem | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [opened, { toggle }] = useDisclosure(true);
  const [isStriped, setIsStriped] = useState(true);
  const [isAnimated, setIsAnimated] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 500 }); // set the maximum width for mobile devices

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
      console.warn('handleStartMeeting : date and time vars are null');
    }
  };


  const handleAgendaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const items = event.target.value.split('\n').map(line => {
      const [name, description, duration] = line.split(':');
      if (!duration || isNaN(Number(duration))) {
        return null; // ignore lines without a valid duration
      }
      return { name, description, duration: Number(duration) };
    }).filter((item): item is AgendaItem => item !== null);
    setAgenda(items);
  }
  // ******************************************************
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Title order={3} align="center">Meeting Agenda Timer</Title>
        <Space h="lg" />

        <Paper shadow="xl" radius="md" p="md" withBorder maw={1200}>
          <Button onClick={toggle} size='xs'>Collapse/Expand</Button>
          <Collapse in={opened} transitionDuration={2000} transitionTimingFunction="linear">
            {/* <Group position="left"> */}
            <Flex
              mih={50}
              gap="sm"
              justify="flex-start"
              align="flex-end"
              direction="row"
              wrap="wrap"
            >
              <DateTimePicker
                size='xs'
                valueFormat="DD MMM YYYY hh:mm A"
                label="Pick date and time"
                placeholder="Pick date and time"
                maw={200}
                value={date}
                onChange={(newValue) => { setDate(newValue); setTime(newValue); }}
              />
              <Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap="sm">
                <Button onClick={handleStartMeeting} size='xs'>Start meeting</Button>
                <Chip defaultChecked={isStriped} variant="filled" color='dark' size='xs' onChange={(event) => { setIsStriped(event.valueOf()); }}>Striped</Chip>
                <Chip defaultChecked={isAnimated} variant="filled" color='dark' size='xs' onChange={(event) => { setIsAnimated(event.valueOf()); }}>Animated</Chip>
              </Flex>
            </Flex>
            <Textarea
              label="Agenda"
              // placeholder="Item 1: Description 1: 10"
              placeholder="Item 1 : Description 1 : 10
              Item 2 : Description 2 : 20
              Item 3 : Description 3 : 30"
              autosize
              minRows={2}
              maxRows={10}
              size="xs"
              onChange={(event) => handleAgendaChange(event)}
            />
            <Space h="sm" />
            <Divider
              my="xs"
              variant="dashed"
              labelPosition="center"
              label={<Box ml={5}>Resultant Agenda Timer</Box>}
            />
          </Collapse>
          <Space h="sm" />

          {currentItem && <Grid >
            <Grid.Col span="content">
              <MyRingProgress value={progress} duration={currentItem?.duration} color={"red"} />
            </Grid.Col>
            <Grid.Col span={10} >
            
                {elapsed > 0 && elapsed < 1 && <Text size={isMobile ? 'xs' : 'l'}>Elapsed: {Math.floor(elapsed)} minutes</Text>}
                {elapsed >= 1 && elapsed < 2 && <Text size={isMobile ? 'xs' : 'l'}>Elapsed: {Math.floor(elapsed)} minute</Text>}
                {elapsed >= 2 && <Text size={isMobile ? 'xs' : 'l'}>Elapsed: {Math.floor(elapsed)} minutes</Text>}
                <Progress value={progress} size="xl" radius="xl" color='black' striped={isStriped} animate={isAnimated} />
                <SectionedProgressBar agenda={agenda} totalDuration={totalDuration} textSize={isMobile ? 15 : 25} />
              
            </Grid.Col>
          </Grid>
          }
          <Space h="lg" />

          {currentItem && (
            <>
              <Grid columns={2}>
                <Grid.Col span="content">
                  <Flex
                    mih={50}
                    gap="xs"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text size={isMobile ? 'xs' : 'l'} >Current Item:</Text>
                    <Text size={isMobile ? 'xs' : 'l'} >Duration:</Text>
                    <Text size={isMobile ? 'xs' : 'l'} >Description:</Text>
                  </Flex>
                </Grid.Col>

                <Grid.Col span="auto">
                  <Flex
                    mih={50}
                    gap="xs"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text size={isMobile ? 'xs' : 'l'} >{currentItem.name}</Text>
                    {/* <Text>{currentItem.duration} minutes</Text> */}
                    {currentItem.duration == 1 && <Text size={isMobile ? 'xs' : 'l'} >{Math.floor(currentItem.duration)} minute</Text>}
                    {currentItem.duration > 1 && <Text size={isMobile ? 'xs' : 'l'} >{Math.floor(currentItem.duration)} minutes</Text>}
                    <Text size={isMobile ? 'xs' : 'l'} >{currentItem.description}</Text>
                  </Flex>
                </Grid.Col>
              </Grid>

            </>)}

          {!currentItem && <Flex><Text>Meeting not started or already finished.</Text></Flex>}
        </Paper >
      </LocalizationProvider >
    </>

  );
}

const defaultAgenda: AgendaItem[] = [
  { name: 'Item 1', description: 'Description 1', duration: 10 },
  { name: 'Item 2', description: 'Description 2', duration: 20 },
  { name: 'Item 3', description: 'Description 3', duration: 30 },
];