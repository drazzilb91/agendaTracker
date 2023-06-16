
import { useState } from 'react';
import { Progress, Text } from '@mantine/core';

export function Demo2() {
  const [hovered, setHovered] = useState(-1);
  const reset = () => setHovered(-1);
  return (
    <>
      <Progress
        onMouseLeave={() => setHovered(-1)}
        size="xl"
        sections={[
          { value: 40, color: 'cyan', onMouseEnter: () => setHovered(0), onMouseLeave: reset },
          { value: 20, color: 'blue', onMouseEnter: () => setHovered(1), onMouseLeave: reset },
          { value: 15, color: 'indigo', onMouseEnter: () => setHovered(2), onMouseLeave: reset },
        ]}
      />
      <Text>Hovered section: {hovered === -1 ? 'none' : hovered}</Text>
    </>
  );
}

export function Demo() {
  return (
    <Progress
      radius="xl"
      size={24}
      sections={[
        { value: 33, color: 'pink', label: 'Documents', tooltip: 'Document – 33 Gb' },
        { value: 28, color: 'grape', label: 'Apps', tooltip: 'Apps – 28 Gb' },
        { value: 25, color: 'violet', label: 'Other', tooltip: 'Other – 25 Gb' },
      ]}
    />
  );
}

export function Demo3() {
    return <Progress color="teal" size={50} value={90} striped animate />;
  }