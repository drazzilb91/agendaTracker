
import { useState } from 'react';
import { Progress } from '@mantine/core';
import { AgendaItem } from './AgendaItem';
import { colors } from '../helpers/colors';

type SectionedProgressBarProps = {
  agenda: AgendaItem[],
  totalDuration: number,
  textSize?: number|string,

}

export function SectionedProgressBar({ agenda, totalDuration, textSize }: SectionedProgressBarProps) {
  const [hovered, setHovered] = useState(-1);
  hovered;
  const reset = () => setHovered(-1);

  return (
      <Progress.Root onMouseLeave={() => setHovered(-1)} size={textSize} mih={30} radius="md">
        {agenda.map((item, index) => (
          <Progress.Section
            key={`${item.name}-${index}`}
            value={(item.duration / totalDuration) * 100}
            color={colors[index % colors.length]}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={reset}
          >
            <Progress.Label>{item.name}</Progress.Label>
          </Progress.Section>
        ))}
      </Progress.Root>
  );
}