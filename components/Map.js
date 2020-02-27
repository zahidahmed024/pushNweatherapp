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
  Grid,
  Col,
  Row,
} from 'native-base';
import Tophead from './Tophead';

import {Dimensions} from 'react-native';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 23.777176;
const LONGITUDE = 90.399452;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      geodata: this.props.data,
      region: {
        latitude: this.props.navigation.getParam('data').coord.lat,
        longitude: this.props.navigation.getParam('data').coord.lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  goBack = () => {
    this.props.navigation.navigate('Cities');
  };
  render() {
    let info = this.props.navigation.getParam('data');
    return (
      <Container>
        <Tophead nav="map" navigation={this.props.navigation} />

        {/* <Text>
          {JSON.stringify(this.props.navigation.getParam('data').coord)}
        </Text> */}
        <Content>
          <MapView
              provider={this.props.provider}
              style={{height: 350, width: 350, alignSelf: 'center', margin: 20}}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={false}
              rotateEnabled={false}
              initialRegion={this.state.region}>
              <Marker
                title="This is a title"
                description="This is a description"
                coordinate={this.state.region}
              />
            </MapView>
        </Content>

        <Content style={{flex: 1}}>
          <Grid>
            <Col style={{padding: 40, height: 200}}>
              <Text style={{fontSize: 33}}>{info.name}</Text>
              <Text>
                {info.clouds
                  ? 'cloudy'
                  : '' || info.rain
                  ? 'rainy'
                  : '' || info.snow
                  ? 'snow'
                  : ''}
              </Text>
              <Text>Humidity: {info.main.humidity}</Text>
              <Text>WindSpeed: {info.wind.speed}</Text>
              <Text>Max Temp: {info.main.temp_max}</Text>
              <Text>Min_temp: {info.main.temp_min}</Text>
            </Col>
            <Col style={{padding: 25, height: 200}}>
              <Text style={{fontSize: 30, alignSelf: 'center'}}>
                {info.main.temp}
                {'\u00b0'}c
              </Text>
              {info.clouds
                  ? <Icon
                  name="cloud"
                  style={{fontSize: 100, color: '#979da6', alignSelf: 'center'}}
                />
                  : '' || info.rain
                  ? <Icon
                  name="md-rainy"
                  style={{fontSize: 100, color: '#979da6', alignSelf: 'center'}}
                />
                  : '' || info.snow
                  ? <Icon
                  name="md-snow"
                  style={{fontSize: 100, color: '#979da6', alignSelf: 'center'}}
                />
                  : ''}
              
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
