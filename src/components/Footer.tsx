import { Text, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),

    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

// interface FooterCenteredProps {
//   links: { link: string; label: string }[];
// }

export function FooterCentered() {
  const { classes } = useStyles();
  // const items = links.map((link) => (
  //   <Anchor<'a'>
  //     color="dimmed"
  //     key={link.label}
  //     href={link.link}
  //     sx={{ lineHeight: 1 }}
  //     onClick={(event) => event.preventDefault()}
  //     size="sm"
  //   >
  //     {link.label}
  //   </Anchor>
  // ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {/* <Group spacing="xs" position="right" noWrap>
        </Group> */}
        {/* <Group className={classes.inner}  > */}
            <Text size="sm" color="dimmed">MM</Text>
            {/* {items} */}
        {/* </Group> */}
        {/* <Group spacing="xs" position="right" noWrap>
        </Group> */}
      </div>
    </div>
  );
}