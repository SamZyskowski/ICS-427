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

            <Grid.Column>
              Fill this in later <Divider/>
              <List>
                <List.Item>1</List.Item>
                <List.Item>2</List.Item>
                <List.Item>3</List.Item>
                <List.Item>4</List.Item>
                <List.Item>5</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column>
              " " <Divider/>
              <List>
                <List.Item>1</List.Item>
                <List.Item>2</List.Item>
                <List.Item>3</List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}