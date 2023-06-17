import { RingProgress, Text } from '@mantine/core';

export function MyRingProgress({value, color, duration}: {value: number, color: string, duration: number}) {
    const inverseValue = 100 - value;
    const remaining = duration * inverseValue / 100;
    let myColor = color;
    if (inverseValue < 5) {
        myColor = "red";
    } else if (inverseValue < 10) {
        myColor = "orange";
    } else if (inverseValue < 25) {
        myColor = "yellow";
    } else {
        myColor = "green";
    }

  return (
    <>
      <RingProgress
        sections={[{ value: inverseValue, color: myColor}]}
        label={
          <Text color="blue" weight={700} align="center" size="xl">
            {Math.round(remaining).toString()}
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