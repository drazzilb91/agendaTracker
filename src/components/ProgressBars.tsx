
import { useState } from 'react';
import { Progress, ProgressProps } from '@mantine/core';
import { AgendaItem } from './AgendaItem';
import { colors } from '../helpers/colors';

type SectionedProgressBarProps = {
  agenda: AgendaItem[],
  totalDuration: number,
  textSize?: number|string,

}

export function SectionedProgressBar({ agenda, totalDuration, textSize }: SectionedProgressBarProps) {
  const [hovered, setHovered] = useState(-1);
  console.log(hovered);
  const reset = () => setHovered(-1);

  const mySections: ProgressProps["sections"] = agenda.map((item, index) => ({
    value: item.duration / totalDuration * 100,
    color: colors[index % colors.length], // Use modulo operator to prevent index out of bounds
    label: item.name,
    tooltip: item.description,
    onMouseEnter: () => setHovered(index),
    onMouseLeave: reset,
  }));
  

  return (
      <Progress
        onMouseLeave={() => setHovered(-1)}
        size={textSize}
        mih={30}
        radius="md"
        sections={mySections}
      />
  );
}