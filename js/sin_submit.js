import React, { Component } from 'react';
import { View, ListView, Text, Switch, TouchableHighlight } from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';


var sinSubmitState = observable({
    timer: 0
});

var sin = observable({
    total: function() {
      let answers = [].concat.apply([],[].concat.apply([], questionsByCategory.slice().map(c => c.questions.slice().map(q => q.answers.slice()))));
      let scores = answers.filter(a => a.marked === false).map(a => a.weight);
      return scores.reduce(function(previousValue, currentValue){return currentValue + previousValue;}, 0);
    }
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
  },
  {
    "category":"Energy",
    "questions":[
      {
        "question":"What do you do to reduce energy use?",
        "answers":[
          {"answer":"Turn off lights when you're not in the room", "weight":1, "marked":false},
          {"answer":"Wear sweaters in your house instead of using heating in the winter", "weight":5, "marked":false},
          {"answer":"Open windows in the summer and use fans instead of the Airco", "weight":7, "marked":false}
        ]
      },
      {
        "question":"What do you do to use renewable energy or minimise grid energy use?",
        "answers":[
          {"answer":"Buy green electricity or green gas from your energy provider", "weight":1, "marked":false},
          {"answer":"Use solar panels or windmills installed in your house", "weight":5, "marked":false},
          {"answer":"Use a Tesla PowerWall or other battery systems", "weight":7, "marked":false}
        ]
      }
    ]
  }
]);

const Question = observer(({question}) => {
  return  <View>
            <Text>{sin.total} Question: {(question != null)? question.question:"a"}</Text>
            {question.answers.map((a) => <View style={{flex: 1, flexDirection: 'row'}}><Switch value={a.marked} onValueChange={(value) => a.marked = !a.marked}/><Text>{a.answer}</Text></View>)}
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
        <Text>Hi! Current time is {sinSubmitState.timer} and total {sin.total}. On compinent {this.props.title}.</Text>
        <TouchableHighlight onPress={() => sinSubmitState.timer = sinSubmitState.timer + 1}>
          <Text>Increase by one.</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View>
            <Text>{rowData.category}</Text>
            {rowData.questions.map(question => <Question question = {question}/>)}
            </View>
          }
        />
      </View>
    )
  }
})