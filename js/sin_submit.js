import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';


var sinSubmitState = observable({
    timer: 0
});

export default observer(class SinSubmit extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! Current time is {sinSubmitState.timer}. On compinent {this.props.title}.</Text>
        <TouchableHighlight onPress={() => sinSubmitState.timer = 5}>
          <Text>Increase by one.</Text>
        </TouchableHighlight>
      </View>
    )
  }
})