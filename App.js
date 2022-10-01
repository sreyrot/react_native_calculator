import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputNumberButton from './Screen/InputNumberButton';

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

export default class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false,
    };
    this.state = this.initialState;
  }

  renderButton() {
    let layouts = buttons.map((buttonRow, index) => {
      let rowItem = buttonRow.map((buttonItem, buttonIndex) => {
        return (
          <InputNumberButton
            value={buttonItem}
            handOnPress={this.handInput.bind(this, buttonItem)}
            key={'btn-' + buttonIndex}
          />
        );
      });
      return (
        <View style={style.inputRow} key={'row-' + index}>
          {rowItem}
        </View>
      );
    });
    return layouts;
  }

  handInput = input => {
    const {displayValue, operator, firstValue, secondValue, nextValue} = this.state;
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + input,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substr(0, displayValue.length - 1)
              : displayValue) + input,
        });
        break;
      case '.':
        let dot = displayValue.toString().slice(-1);
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      
      case '=':
        let result = eval(firstValue + operator + secondValue)
        this.setState({
          displayValue: result % 1 === 0 ? result: result.toFixed(2),
          firstValue: result % 1 === 0 ? result: result.toFixed(2),
          secondValue: '',
          operator: null,
          nextValue: false
        })
        break;


      case 'CLEAR':
        this.setState(this.initialState);
        break;
      case 'DEL':
        let string = displayValue.toString();
        let length = string.length;
        let deleteString = string.substr(0, string.length - 1);
        this.setState({
          displayValue: length == '1' ? 0 : deleteString,
          firstValue: length == '1' ? 0 : deleteString,
        });
        break;
    }
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.resultContainer}>
          <Text style={style.resultText}>{this.state.displayValue}</Text>
        </View>
        <View style={style.inputContainer}>{this.renderButton()}</View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#7F05C0',
    fontSize: 40,

  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#7302B0',
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    
  },
});
