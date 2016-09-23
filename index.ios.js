/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight
} from 'react-native';
import SinSubmit from './js/sin_submit.js';

class LaudatoSi extends Component {
  render() {
    const crossPicture = require('./images/cross.jpg');
    const routes = [
      {title: 'First Scene', index: 0},
      {title: 'Second Scene', index: 1},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={(route, navigator) => {
          return <View style={styles.container}>
            <SinSubmit />
            <Image source={crossPicture} style={{width: 100, height: 100}}/>
            <Text style={styles.welcome}>
              Welcome to {route.title}
            </Text>
            <Text style={styles.instructions}>
              To get started, edit index.ios.js
            </Text>
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
          </View>
        }}
        navigationBar = {
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                { return (<Text>Cancel</Text>); },
              RightButton: (route, navigator, index, navState) =>
                { return (
                  <TouchableHighlight onPress={() => navigator.push(routes[1])}>
                    <Text>Done</Text>
                  </TouchableHighlight>); },
              Title: (route, navigator, index, navState) =>
                { return (<Text>Awesome Nav Bar</Text>); },
            }}
            style={{backgroundColor: 'gray'}}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LaudatoSi', () => LaudatoSi);
