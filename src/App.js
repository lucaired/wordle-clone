import React, { useEffect, useState } from 'react';

import './App.css';
import wordlist from './wordlist.json';
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';

function App() {

  const [chosenWord, setChosenWord] = useState("")
  useEffect(() => {
    const chosenWord = wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
    setChosenWord(chosenWord)
    console.log(chosenWord)
  }, [])

  /**
   * This is the main component of the app. 
   * It contains the WordGrid and the Keyboard.
   */

  const [colorCoding, setColorCoding] = useState({})

  const [words, setWords] = useState([
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
  ])

  /**
   * The current index of the word grid. We will increment the inner
   * index if there is still place in the word. The outer index
   * will be incremented if the user presses enter and the current
   * word is in our list of words. Furthermore, the del button will
   * decrement the inner index if it is not 0.
   * 
   */
  const [currentIndex, setCurrentIndex] = useState([0,0])

  const letterButtonHandler = (letter) => {
    let newWords = [...words]
    if (currentIndex[0] < newWords.length && 
        currentIndex[1] < newWords[currentIndex[0]].length) {
          newWords[currentIndex[0]][currentIndex[1]] = letter
          setWords(newWords)
          setCurrentIndex([currentIndex[0], currentIndex[1] + 1])
    }
  }

  const delButtonHandler = () => {
    if (currentIndex[0] < words.length && 
        currentIndex[1] > 0 &&
        currentIndex[1] <= words[currentIndex[0]].length) {
          let newWords = [...words]
          newWords[currentIndex[0]][currentIndex[1] - 1] = ' '
          setWords(newWords)
          setCurrentIndex([currentIndex[0], currentIndex[1] - 1])
        }
  }

  // TODO: we have to make the color coding word specific and not letter specific

  const enterButtonHandler = () => {
    if (currentIndex[0] < words.length && 
        currentIndex[1] == words[currentIndex[0]].length) {
          const word = words[currentIndex[0]].join('')
          if (wordlist.includes(word.toLowerCase())) {
            setCurrentIndex([currentIndex[0] + 1, 0])

            let newColorCodings = {}

            for (let i = 0; i < word.length; i++) {
              if (word[i] == chosenWord[i]) {
                newColorCodings[word[i]] = 'green'
              }
              else if (chosenWord.includes(word[i])) {
                newColorCodings[word[i]] = 'orange'
              }
            }
            setColorCoding({
              ...colorCoding,
              ...newColorCodings
            })
          }
    }
  }
  // TODO: style the app
  return (
    <div className="App">
      <h1 style={{
        borderBottom: '1px solid black',
        fontSize: '18px'
      }}>Wordle</h1>
      <div 
        // Style the container, so that the Keyboard is at the bottom
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        >
        <WordGrid
          words={words}
          colorCoding={colorCoding}
        />
        <div style={{marginBottom: '100px'}}></div>
        <Keyboard
          letterButtonHandler={letterButtonHandler}
          enterButtonHandler={enterButtonHandler}
          delButtonHandler={delButtonHandler}
          colorCoding={colorCoding}
        />
      </div>
    </div>
  );
}

export default App;
