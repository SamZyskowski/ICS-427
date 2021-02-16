import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/dota.jpg"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to PROSTATS</h1>
            <p>Your next solution to becoming a smarter player</p>
            <p>Sign-up to begin</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
