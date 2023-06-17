import { ThemeIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export function MyRingProgress({value, color}) {
    
  return (
    <>
      <RingProgress
        sections={[{ value: value, color: color}]}
        label={
          <Text color="blue" weight={700} align="center" size="xl">
            {Math.floor(value).toString()}
          </Text>
        }
      />

      {/* <RingProgress
        sections={[{ value: value, color: color}]}
        label={
          <Center>
            <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
              <IconCheck size={22} />
            </ThemeIcon>
          </Center>
        }
      /> */}
    </>
  );
}