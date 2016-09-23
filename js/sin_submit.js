import React, { Component } from 'react';
import { View, ListView, Text, Switch, TouchableHighlight } from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';


var sinSubmitState = observable({
    timer: 0
});

let questionsByCategory = observable([
  {
    "category":"Water",
    "questions":[
      {
        "question":"What do you do to reduce your water use?",
        "answers":[
          {"answer":"Don't boil more water than necessary when making tea", "weight":1, "marked":false},
          {"answer":"Take Navy or Military showers or use the bathtub", "weight":5, "marked":false}
        ]
      }
    ]
  }
]);

const Question = observer(({question}) => {
  return  <View>
            <Text>Question: {(question != null)? question.question:"a"}</Text>
            {question.answers.map((a) => <View><Text>{a.answer}</Text><Switch value={a.marked}/></View>)}
          </View>
})

export default observer(class SinSubmit extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(questionsByCategory.slice())
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! Current time is {sinSubmitState.timer}. On compinent {this.props.title}.</Text>
        <TouchableHighlight onPress={() => sinSubmitState.timer = sinSubmitState.timer + 1}>
          <Text>Increase by one.</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View>
            <Text>{rowData.category}</Text>
            <Question question = {rowData.questions[0]}/>
            </View>
          }
        />
      </View>
    )
  }
})