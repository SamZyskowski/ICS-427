import React from 'react';
import { Card, Image, Container, Header } from 'semantic-ui-react';

const developers = [
  {name: 'James Bennet', githubUsername: 'Bennetjames649', img: 'https://avatars.githubusercontent.com/u/46543890?v=4'},
  {name: 'Jeffery Wood', githubUsername: 'jwoodii', img: 'https://avatars.githubusercontent.com/u/35505841?v=4'},
  {name: 'Chris Lau', githubUsername: 'christopherjnlau', img: 'https://avatars.githubusercontent.com/u/43080973?v=4'},
  {name: 'Samuel Zyskowski', githubUsername: 'SamZyskowski', img: 'https://avatars.githubusercontent.com/u/31745246?v=4'},
];
const render = [];

class AboutUs extends React.Component {
  generate() {
    for (var i = 0; i < developers.length; i++) {
      const githubLink = 'https://github.com/' + developers[i].githubUsername;
      render.push(
        <Card centered key={i} href={githubLink} target='_blank'>
          <Card.Content>
            <Container textAlign='center'>
              <Image circular style={{ height: '125px', paddingBottom: '10px' }} src={developers[i].img}/>
            </Container>
            <Card.Header content={developers[i].name}/>
            <Card.Meta content={developers[i].githubUsername}/>
          </Card.Content>
        </Card>
      );
    }
  }

  render() {
    if (render.length == 0) {
      this.generate();
    }
    return (
      <div className='main'>
        <Container>
          <Header size='huge'>Meet the Team</Header>
        </Container>
        <br/>
        <Container textAlign='center'>
          <Card.Group itemsPerRow={4}>{render}</Card.Group>
        </Container>
      </div>
    );
  }
}
export default AboutUs;
