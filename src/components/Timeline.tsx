import { Timeline, Text, ThemeIcon } from '@mantine/core';
import { AgendaItem } from './AgendaItem';

import { useEffect, useState } from 'react';

type AgendaTimelineProps = {
    agenda: AgendaItem[];
    isMobile: boolean;
    currentItemIndex: number;
    isStarted: boolean;
};

export function AgendaTimeline({...props}: AgendaTimelineProps) {
    const agenda: AgendaItem[] = props.agenda;
    const isMobile: boolean = props.isMobile;
    const currentItemIndex: number = props.currentItemIndex;
    const isStarted: boolean = props.isStarted;

    const [activeTimelineItem, setActiveTimelineItem] = useState<number>(-1);

    useEffect(() => {
        if (isStarted) {
            setActiveTimelineItem(currentItemIndex);
        } else {
            setActiveTimelineItem(-1);
        }
    }, [isStarted, currentItemIndex,agenda]);

    // Generate Timeline.Item for each item in agenda


    const timelineJSX = agenda.map((item, index) => (
        <Timeline.Item
            key={index}
            title={item.name}
            color="cyan"
            bullet={activeTimelineItem >= index ? <ThemeIcon
                  size={'s'}
                  variant="gradient"
                  gradient={{ from: 'cyan', to: 'cyan' }}
                  radius="xl"
                  children="" 
                  />
                : null
              }
        >
            <Text color="dimmed" size={isMobile ? 'xs' : 's'}>{item.description}</Text>

            {item.duration == 1 && <Text color="dimmed" size={isMobile ? 'xs' : 's'} >{Math.floor(item.duration)} minute</Text>}
            {item.duration > 1 && <Text color="dimmed" size={isMobile ? 'xs' : 's'} >{Math.floor(item.duration)} minutes</Text>}
        </Timeline.Item>
    ));


    return (
        <Timeline color="cyan" active={activeTimelineItem} lineWidth={2} bulletSize={14}>
            {timelineJSX}
        </Timeline>
    );
}
