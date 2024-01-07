import React, { useState } from 'react';
import {
 View,
 Text,
 TextInput,
 Button,
 Alert,
} from 'react-native';

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
 }
 
 function generateRandomMultiplication() {
  const number1 = randomNumberBetween(10, 50);
  const number2 = randomNumberBetween(1, 9);
  return {
     number1,
     number2,
     product: number1 * number2,
  };
 }

const App = () => {
 const [score, setScore] = useState(0);
 const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
 const [countFalseAnswer, setCountFalseAnswer] = useState(0);
 const [multiplication, setMultiplication] = useState(generateRandomMultiplication());
 const [inputValue, setInputValue] = useState('');

 const checkAnswer = () => {
    const answer = parseInt(inputValue);
    const correctAnswer = multiplication.product;

    if (answer === correctAnswer) {
      setScore(score + 10);
      setCountCorrectAnswer(countCorrectAnswer + 1);
      Alert.alert('Doğru!', 'Böyle Devam', [
        {
          text: 'Tekrar dene',
          onPress: () => {
            setMultiplication(generateRandomMultiplication())
            setInputValue('')
            console.log('Doğru cevap sayısı...', countCorrectAnswer)
          }
        },
      ]);
    } else {
      setScore(score - 10);
      setCountFalseAnswer(countFalseAnswer + 1);
      Alert.alert('Yanlış!', `Doğru cevap: ${correctAnswer}`, [
        {
          text: 'Tekrar dene',
          onPress: () => {
            setMultiplication(generateRandomMultiplication())
            console.log('Yanlış cevap sayısı...', countFalseAnswer)
          }
        },
      ]);
    }

    setInputValue('');
 };

 return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {multiplication.number1} x {multiplication.number2}
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Button title="Cevabı kontrol et" onPress={checkAnswer} />
      <Text style={styles.scoreText}>
        Puan:{score}
      </Text>
      <Text style={styles.scoreText}>
        Doğru Cevap Sayısı:{countCorrectAnswer}
      </Text>
      <Text style={styles.scoreText}>
        Yanlış Cevap Sayısı:{countFalseAnswer}
      </Text>
    </View>
 );
};

const styles = {
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 text: {
    fontSize: 24,
    marginBottom: 10,
 },
 input: {
    width: 100,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
 },
 scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
 },
};

export default App;