
import { useState } from 'react';
import { Progress, Tooltip } from '@mantine/core';
import { AgendaItem } from './AgendaItem';
import { colors } from '../helpers/colors';

type SectionedProgressBarProps = {
  agenda: AgendaItem[],
  totalDuration: number,
  textSize?: number|string,

}

export function SectionedProgressBar({ agenda, totalDuration, textSize }: SectionedProgressBarProps) {
  const [, setHovered] = useState(-1);
  const reset = () => setHovered(-1);

  return (
    <Progress.Root
      onMouseLeave={() => setHovered(-1)}
      size={textSize}
      mih={30}
      radius="md"
    >
      {agenda.map((item, index) => (
        <Tooltip key={index} label={item.description} withArrow>
          <Progress.Section
            value={item.duration / totalDuration * 100}
            color={colors[index % colors.length]}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={reset}
          >
            <Progress.Label>{item.name}</Progress.Label>
          </Progress.Section>
        </Tooltip>
      ))}
    </Progress.Root>
  );
}