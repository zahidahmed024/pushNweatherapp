import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class Tophead extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  goBack=()=>{
    this.props.navigation.navigate('Cities')
}
  render() {
    return (
        <Header style={{backgroundColor:'#00804A'}} androidStatusBarColor="#00804A" >
            {this.props.nav=="map" ? (<Left style={{flex:1}}>
            <Button transparent onPress={this.goBack} style={{}}>
              <Icon name='arrow-back'/>
            </Button>
            </Left>) : ( <Left style={{flex:1}}></Left>)}
        <Body style={{flex:1}}>
          <Title style={{ alignSelf: 'center', fontFamily:'Roboto Bold'}}>Weather App</Title>
        </Body>
        <Right/>
      </Header>
    );
  }
}
