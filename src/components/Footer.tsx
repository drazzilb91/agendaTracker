import { Text } from '@mantine/core';

const footerStyle: React.CSSProperties = {
  marginTop: '120px',
  borderTop: '1px solid #e9ecef',
};

const innerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
};

export function FooterCentered() {
  return (
    <div style={footerStyle}>
      <div style={innerStyle}>
            <Text size="sm" c="dimmed">MM</Text>
      </div>
    </div>
  );
}