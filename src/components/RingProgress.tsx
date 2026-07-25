import { RingProgress, Text } from '@mantine/core';

export function MyRingProgress({value, color, duration}: {value: number, color: string, duration: number}) {
    const inverseValue = 100 - value;
    const remaining = duration * inverseValue / 100;
    const myColor = inverseValue < 5 ? "red"
        : inverseValue < 10 ? "orange"
        : inverseValue < 25 ? "yellow"
        : color;

  return (
    <>
      <RingProgress
        sections={[{ value: inverseValue, color: myColor}]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            {Math.round(remaining).toString()}
          </Text>
        }
      />
    </>
  );
}