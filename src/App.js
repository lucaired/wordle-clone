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

  const [words, setWords] = useState(Array(6).fill().map(() => Array(5).fill({letter: ' '})))

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
          newWords[currentIndex[0]][currentIndex[1]] = { letter: letter }
          setWords(newWords)
          setCurrentIndex([currentIndex[0], currentIndex[1] + 1])
    }
  }

  const delButtonHandler = () => {
    if (currentIndex[0] < words.length && 
        currentIndex[1] > 0 &&
        currentIndex[1] <= words[currentIndex[0]].length) {
          let newWords = [...words]
          newWords[currentIndex[0]][currentIndex[1] - 1]['letter'] = ' '
          setWords(newWords)
          setCurrentIndex([currentIndex[0], currentIndex[1] - 1])
        }
  }

  const currentWord = () => words[currentIndex[0]].map((letterObj) => letterObj.letter).join('')

  const enterButtonHandler = () => {
    if (currentIndex[0] < words.length && 
        currentIndex[1] === words[currentIndex[0]].length) {
          const word = currentWord()
          if (wordlist.includes(word.toLowerCase())) {

            let newWords = [...words]

            for (let i = 0; i < word.length; i++) {
              if (word[i] === chosenWord[i]) {
                newWords[currentIndex[0]][i]['color'] = 'green'
              }
              else if (chosenWord.includes(word[i])) {
                newWords[currentIndex[0]][i]['color'] = 'orange'
              }
              else {
                newWords[currentIndex[0]][i]['color'] = 'grey'
              }
            }
            setCurrentIndex([currentIndex[0] + 1, 0])
            setWords(newWords)
          }
    }
  }
  // TODO: style the app
  return (
    <div className="App">
      <h1 style={{
        borderBottom: '1px solid black',
        fontSize: '18px'
      }}>
        Wordle
      </h1>
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
        />
        <div style={{marginBottom: '100px'}}></div>
        <Keyboard
          letterButtonHandler={letterButtonHandler}
          enterButtonHandler={enterButtonHandler}
          delButtonHandler={delButtonHandler}
          words={words}
        />
      </div>
    </div>
  );
}

export default App;
