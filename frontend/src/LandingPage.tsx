// import React from 'react';
import './LandingPage.css';
//import {FeaturesImages} from './aboutsection';

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       <img src="./images/cl wder.png" alt="Logo" className="logo" />
//       <h1 className="company-name">Clowder</h1>
//       <p className="description">Clowder is a live map for spotting Wildcats on Campus</p>
//       <div className="buttons">
//         <button className="sign-in">Sign In</button>
//         <button className="sign-up">Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import { createStyles, Container, Text, Button, Group, rem, LoadingOverlay } from '@mantine/core';


const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: rem(200),
    paddingBottom: rem(120),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    alignItems: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

export function LandingPage() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
        <img src={require("./logo.png")} alt="Logo" className="logo" />
      <Container size={700} className={classes.inner}>
        
        <h1 className={classes.title} style={{textAlign: "center"}}>
           <Text style={{ fontSize: 42, marginBottom: '-40px' }}>Spot Wildcats on Campus with</Text>
           <Text component="span" style={{ fontSize: 150 }} variant="gradient" gradient={{ from: 'purple', to: 'cyan' }}>clowder</Text>
        
        </h1>
        <Text className={classes.description} color="dimmed" style={{textAlign: "center", marginTop: '-20px'}}>
            Clowder is a live map for Northwestern Students to find and meet Wildcats to study, hangout, and explore together
        </Text>
        <div style={{textAlign: "center"}} className={classes.controls}>

          {/* <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}>
            Get started
          </Button> */}

          <Button
            component="a"
            href=""
            size="xl"
            variant="default"
            className={classes.control}
            style={{marginRight: '50px'}}
            //leftIcon={<GithubIcon size={20} />}
          >
            Log In
          </Button>
              
          <Button
            component="a"
            href=""
            size="xl"
            variant="default"
            className={classes.control}
            color="blue"
            //leftIcon={<GithubIcon size={20} />}
          >
            Sign Up
          </Button>

        </div>
      </Container>
      <div style={{alignSelf: 'center' }}>
      <img className="demo" style={{alignSelf: 'center', marginTop: '-100px', width: '1000px' }} src={require("./demo.png")} alt="demo"/>
      </div>
    </div>
  );
}

export default LandingPage;