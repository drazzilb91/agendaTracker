
import { useState } from 'react';
import { Progress, ProgressProps } from '@mantine/core';
import { AgendaItem } from './AgendaItem';
import { colors } from '../helpers/colors';

type SectionedProgressBarProps = {
  agenda: AgendaItem[];
}

export function SectionedProgressBar({ agenda }: SectionedProgressBarProps) {
  const [hovered, setHovered] = useState(-1);
  console.log(hovered);
  const reset = () => setHovered(-1);

  const mySections: ProgressProps["sections"] = agenda.map((item, index) => ({
    value: item.duration,
    color: colors[index % colors.length], // Use modulo operator to prevent index out of bounds
    label: item.name,
    tooltip: item.description,
    onMouseEnter: () => setHovered(index),
    onMouseLeave: reset,
  }));
  

  return (
      <Progress
        onMouseLeave={() => setHovered(-1)}
        size="xl"
        radius="md"
        sections={mySections}
      />
  );
}



//  Below here, everything is not currently used in the app
//  but is left here for reference
// export function TooltipProgressBar({ value }: StripedProgressBarProps, agenda?: AgendaItem[]) {
//     if (!agenda) {
//         return <Progress color="teal" size={50} value={value}  striped animate />;
//     }
    
//   return (
//     <Progress
//       radius="md"
//       size={30}
//       sections={[
//         { value: 33, color: 'pink', label: 'Documents', tooltip: 'Document - 33 Gb' },
//         { value: 28, color: 'grape', label: 'Apps', tooltip: 'Apps - 28 Gb' },
//         { value: 25, color: 'violet', label: 'Other', tooltip: 'Other - 25 Gb' },
//       ]}
//     />
//   );
// }


// export function StripedProgressBar({ value }: StripedProgressBarProps) {
//     return <Progress color="teal" size={50} value={value} striped animate />;
//   }

// type StripedProgressBarProps = {
//   value: number;
// }