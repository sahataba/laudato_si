import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';


var sinSubmitState = observable({
    timer: 0
});

export default class SinSubmit extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}