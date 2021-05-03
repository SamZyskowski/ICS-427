import React from 'react';
import { Container, List, Grid, Image, Divider } from 'semantic-ui-react';

export default class FooterMenu extends React.Component {
  render() {
    return (
        <Container fluid className='b-background'>
          <Grid columns='equal' colorblocktop>
            <Grid.Column>
            <Image size='small' circular src="/images/dota3.jpg"/>
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}