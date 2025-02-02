import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

type CalculatorButton = {
  label: string;
  onPress: () => void;
  isOperator?: boolean;
  isWide?: boolean;
};

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumberPress = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperatorPress = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operator) {
      const result = calculate(previousValue, current, operator);
      setPreviousValue(result);
      setDisplay(result.toString());
    }
    
    setOperator(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operator) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operator);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperator(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setNewNumber(true);
  };

  const CalculatorButton: React.FC<CalculatorButton> = ({ 
    label, 
    onPress, 
    isOperator = false,
    isWide = false 
  }) => (
    <TouchableOpacity 
      style={[
        styles.button, 
        isOperator && styles.operatorButton,
        isWide && styles.wideButton
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isOperator && styles.operatorText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <CalculatorButton label="C" onPress={handleClear} isOperator />
          <CalculatorButton label="±" onPress={() => setDisplay((parseFloat(display) * -1).toString())} isOperator />
          <CalculatorButton label="%" onPress={() => setDisplay((parseFloat(display) / 100).toString())} isOperator />
          <CalculatorButton label="÷" onPress={() => handleOperatorPress('÷')} isOperator />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="7" onPress={() => handleNumberPress('7')} />
          <CalculatorButton label="8" onPress={() => handleNumberPress('8')} />
          <CalculatorButton label="9" onPress={() => handleNumberPress('9')} />
          <CalculatorButton label="×" onPress={() => handleOperatorPress('×')} isOperator />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="4" onPress={() => handleNumberPress('4')} />
          <CalculatorButton label="5" onPress={() => handleNumberPress('5')} />
          <CalculatorButton label="6" onPress={() => handleNumberPress('6')} />
          <CalculatorButton label="-" onPress={() => handleOperatorPress('-')} isOperator />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="1" onPress={() => handleNumberPress('1')} />
          <CalculatorButton label="2" onPress={() => handleNumberPress('2')} />
          <CalculatorButton label="3" onPress={() => handleNumberPress('3')} />
          <CalculatorButton label="+" onPress={() => handleOperatorPress('+')} isOperator />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="0" onPress={() => handleNumberPress('0')} isWide />
          <CalculatorButton label="." onPress={() => handleNumberPress('.')} />
          <CalculatorButton label="=" onPress={handleEquals} isOperator />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  display: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
  },
  displayText: {
    fontSize: 48,
    color: '#000',
  },
  buttonContainer: {
    flex: 0.7,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wideButton: {
    flex: 2.2,
    aspectRatio: 2,
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
  operatorText: {
    color: '#fff',
  },
});

export default Calculator;