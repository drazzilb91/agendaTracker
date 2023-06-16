
import { useState } from 'react';
import { Progress, Text } from '@mantine/core';
import { AgendaItem } from './AgendaItem';

export function SectionedProgressBar() {
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

export function TooltipProgressBar({ value }: StripedProgressBarProps, agenda?: AgendaItem[]) {
    if (!agenda) {
        return <Progress color="teal" size={50} value={value} striped animate />;
    }
    
  return (
    <Progress
      radius="md"
      size={50}
      sections={[
        { value: 33, color: 'pink', label: 'Documents', tooltip: 'Document - 33 Gb' },
        { value: 28, color: 'grape', label: 'Apps', tooltip: 'Apps - 28 Gb' },
        { value: 25, color: 'violet', label: 'Other', tooltip: 'Other - 25 Gb' },
      ]}
    />
  );
}



type StripedProgressBarProps = {
    value: number;
}

export function StripedProgressBar({ value }: StripedProgressBarProps) {
    return <Progress color="teal" size={50} value={value} striped animate />;
  }