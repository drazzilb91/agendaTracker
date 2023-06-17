
import { useState } from 'react';
import { Progress, Text, ProgressProps} from '@mantine/core';
import { AgendaItem } from './AgendaItem';

type SectionedProgressBarProps = {
  agenda: AgendaItem[];
}

export function SectionedProgressBar({ agenda }: SectionedProgressBarProps) {
  const [hovered, setHovered] = useState(-1);
  const reset = () => setHovered(-1);

  // const mySections = [
  //   { value: 40, color: 'cyan', label: 'Documents', tooltip: 'Documents', onMouseEnter: () => setHovered(0), onMouseLeave: reset },
  //   { value: 20, color: 'blue',  label: 'Documents', tooltip: 'Documents', onMouseEnter: () => setHovered(1), onMouseLeave: reset },
  //   { value: 15, color: 'indigo',  label: 'Documents', tooltip: 'Documents', onMouseEnter: () => setHovered(2), onMouseLeave: reset },
  // ];


  const colors = ['cyan', 'blue', 'indigo']; // Add more colors as needed
  
  const mySections: ProgressProps["sections"] = agenda.map((item, index) => ({
    value: item.duration,
    color: colors[index % colors.length], // Use modulo operator to prevent index out of bounds
    label: item.name,
    tooltip: item.description,
    onMouseEnter: () => setHovered(index),
    onMouseLeave: reset,
  }));
  



  return (
    <>
      <Progress
        onMouseLeave={() => setHovered(-1)}
        size="xl"
        radius="md"
        sections={mySections}
      />
      <Text>Hovered section: {hovered === -1 ? 'none' : hovered}</Text>
    </>
  );
}

type StripedProgressBarProps = {
  value: number;
}

//  Below here, everything is not currently used in the app
//  but is left here for reference
export function TooltipProgressBar({ value }: StripedProgressBarProps, agenda?: AgendaItem[]) {
    if (!agenda) {
        return <Progress color="teal" size={50} value={value}  striped animate />;
    }
    
  return (
    <Progress
      radius="md"
      size={30}
      sections={[
        { value: 33, color: 'pink', label: 'Documents', tooltip: 'Document - 33 Gb' },
        { value: 28, color: 'grape', label: 'Apps', tooltip: 'Apps - 28 Gb' },
        { value: 25, color: 'violet', label: 'Other', tooltip: 'Other - 25 Gb' },
      ]}
    />
  );
}


export function StripedProgressBar({ value }: StripedProgressBarProps) {
    return <Progress color="teal" size={50} value={value} striped animate />;
  }