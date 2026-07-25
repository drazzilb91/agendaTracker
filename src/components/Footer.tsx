import { Text, rem } from '@mantine/core';

export function FooterCentered() {
  return (
    <div
      style={{
        marginTop: rem(120),
        borderTop: `${rem(1)} solid var(--mantine-color-gray-3)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: `${rem(16)} ${rem(16)}`,
        }}
      >
            <Text size="sm" color="dimmed">MM</Text>
      </div>
    </div>
  );
}