import { ThemeIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export function MyRingProgress({value, color, duration}) {
    const inverseValue = 100 - value;
    const remaining = duration * inverseValue / 100;
    let myColor = color;
    if (remaining < 5) {
        myColor = "red";
    } else if (remaining < 10) {
        myColor = "orange";
    } else if (remaining < 15) {
        myColor = "yellow";
    } else if (remaining < 20) {
        myColor = "green";
    } else {
        myColor = "lightPurple";
    } 

  return (
    <>
      <RingProgress
        sections={[{ value: inverseValue, color: myColor}]}
        label={
          <Text color="blue" weight={700} align="center" size="xl">
            {Math.floor(remaining).toString()}
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