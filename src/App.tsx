import { Grid, Box, Button, Divider, Flex, Group, Header, Paper, Progress, Space, Text, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { AgendaItem } from './components/AgendaItem';
import { SectionedProgressBar } from './components/ProgressBars';
import { MyRingProgress } from './components/RingProgress';


export default function App() {
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
        <Header height={50}><h1>Meeting Agenda Timer</h1></Header>
        <Space h="lg" />

        <Paper shadow="xl" radius="md" p="md" withBorder maw={1200}>
          <Group position="left">
            <Flex
              mih={50}
              gap="sm"
              justify="flex-start"
              align="flex-end"
              direction="row"
              wrap="wrap"
            >
              <DateTimePicker
                valueFormat="DD MMM YYYY hh:mm A"
                label="Pick date and time"
                placeholder="Pick date and time"
                maw={200}
                value={date}
                onChange={(newValue) => { setDate(newValue); setTime(newValue); }}
              />
              <Button onClick={handleStartMeeting}>Start meeting</Button>
            </Flex>
          </Group>
          <Textarea
            placeholder="Item 1: Description 1: 10"
            label="Agenda"
            size="sm"
            onChange={(event) => handleAgendaChange(event)}
          />
          <Space h="sm" />
          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={<Box ml={5}>Search results</Box>}
          />
          <Space h="sm" />

          {/* <Stack spacing="md"> */}
          {elapsed > 0 && elapsed < 1 && <Text>Elapsed: {Math.floor(elapsed)} minutes</Text>}
          {elapsed >= 1 && elapsed < 2 && <Text>Elapsed: {Math.floor(elapsed)} minute</Text>}
          {elapsed >= 2 && <Text>Elapsed: {Math.floor(elapsed)} minutes</Text>}

          {elapsed > 0 && <Progress value={progress} size="xl" radius="xl" />}
          <SectionedProgressBar agenda={agenda} />
          <Space h="lg" />

          {/* <Group position="left"> */}
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
                    <Text>Current Item:</Text>
                    <Text>Description:</Text>
                    <Text>Duration:</Text>
                  </Flex>
                </Grid.Col>

                <Grid.Col span="auto">
                  <Flex
                    mih={50}
                    gap="sm"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text>{currentItem.name}</Text>
                    <Text>{currentItem.description}</Text>
                    <Text>{currentItem.duration}</Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col span="auto">
                <MyRingProgress value={progress} duration={currentItem?.duration} color={"red"}/>


                </Grid.Col>
              </Grid>

              {/* <Flex>
                <Text>Description: {currentItem.description}</Text>
                <Box w={200}>
                  <Text>{currentItem.description}</Text>
                </Box>
              </Flex>
              <Flex>
                <Text>Duration: {currentItem.duration} minutes</Text>
                <Box w={200}>
                  <Text>{currentItem.duration} minutes</Text>
                </Box>
              </Flex> */}
            </>)}

          {!currentItem && <Flex><Text>Meeting not started or already finished.</Text></Flex>}
          {/* </Stack> */}

          {/* </Group> */}
        </Paper>
      </LocalizationProvider>
    </>

  );
}

const defaultAgenda: AgendaItem[] = [
  { name: 'Item 1', description: 'Description 1', duration: 10 },
  { name: 'Item 2', description: 'Description 2', duration: 20 },
  { name: 'Item 3', description: 'Description 3', duration: 30 },
];