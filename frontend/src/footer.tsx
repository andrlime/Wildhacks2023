import { createStyles, Container, Group, Anchor, rem, Image } from '@mantine/core';
import LOGO from "./Components/logo.png";
import React from 'react';
import './LandingPage.css';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function FooterSimple({ links }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer + " absolute bottom-0 invisible sm:visible w-full"}>
      <Container className={classes.inner}>
        <Image src={LOGO} style={{width: '100px'}}/>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}