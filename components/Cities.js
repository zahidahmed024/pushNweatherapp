import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import Tophead from './Tophead';
import {FlatList} from 'react-native';

export default class AnatomyExample extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getCities();
  }
  getCities = async () => {
    //try catch use kora lagbe
    let req = await fetch(
      'https://api.openweathermap.org/data/2.5/find?lat=23.68&lon=90.35&cnt=50&units=metric&appid=e384f9ac095b2109c751d95296f8ea76',
    );
    let response = await req.json();
    this.setState({data: response.list}, () => {
      console.log(this.state.data);
    });
  };

openMap=(geodata)=>{
console.log(geodata);
 this.props.navigation.navigate('Map',{
    data:geodata })
}

  renderItem = ({item}) => {
    return (
      <ListItem onPress={()=>this.openMap(item)}>
        <Left>
          <Text style={{fontSize: 20}}>
            {item.name} {'\n'}
            <Text style={{fontSize: 13}}>
              {item.clouds
                ? 'cloudy'
                : '' || item.rain
                ? 'rainy'
                : '' || item.snow
                ? 'snow'
                : ''}
            </Text>
          </Text>
        </Left>
        <Right>
          <Text style={{fontSize: 30}}>
            {item.main.temp}
            {'\u00b0'}c
          </Text>
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <Tophead />
        <Content>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.name}
          />
        </Content>
      </Container>
    );
  }
}
