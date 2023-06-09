import React, { useEffect, useState } from 'react';

import './App.css';
import wordlist from './wordlist.json';
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';

function App() {

  const [chosenWord, setChosenWord] = useState("")
  const [hideNotInWordList, setHideNotInWordList] = useState(true)
  const [shakingWordIndex, setShakingWordIndex] = useState(-1)
  const [hideWinnerNotification, setHideWinnerNotification] = useState(true)

  const chooseWord = () => {
    const chosenWord = wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
    console.log(chosenWord)
    setChosenWord(chosenWord)
  }

  useEffect(() => chooseWord(), [])

  /**
   * This is the main component of the app. 
   * It contains the WordGrid and the Keyboard.
   */

  const initializeWords = () => Array(6).fill().map(() => Array(5).fill({letter: ' '}))
  const resetWords = () => { setWords(initializeWords()); setCurrentIndex([0,0]) }
  const [words, setWords] = useState(initializeWords())
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
    /**
     * This function is called when a letter button is pressed. 
     * It will add the letter to the current word and increment
     * the current index. If the current word is full, it will
     * no longer increment the inner index and will not add the
     * letter to the word.
     */

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

            if (chosenWord === word) {
              setHideWinnerNotification(false)
              setTimeout(() => {
                resetWords()
                setHideWinnerNotification(true)
                chooseWord()
              }, 5000)
            }
          } else {
            setHideNotInWordList(false)
            setShakingWordIndex(currentIndex[0])
            setTimeout(() => {
              setHideNotInWordList(true)
              setShakingWordIndex(-1)
            }, 1000)
          }
    }
  }

  const Toast = (props) => {
    const { hide, backgroundColor, text } = props
    return <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1vw',
            }}>
        <p 
          style={{
            color: 'white',
            border: '1px solid black',
            borderRadius: '5px',
            backgroundColor: backgroundColor,
            display: hide ? 'none' : 'inline-block',
            fontSize: '3vw',
            padding: '1vw',
            marginTop: '-1vw',
            fontWeight: 'bold',
            position: 'absolute',
            zIndex: '100',
          }}>
            {text}
        </p>
      </div>
  }

  /** TODO: coding
   * - refactor the code so that there is only one toast component
   * - add a timer to the toast component, showing it for 5000ms
   * - add a listener to keydown that passes the uppercase of a letter input to the letterButtonHandler
   * - update React deps
   * 

  /* TODO: styling
    - centralize the letter in the word grid
    - use a toast to show the user that the word is not in the word list
    - adapt font size to the screen size
    - shake the keyboard when the user presses enter on a word that is not in the word list
  */

/**
 * Generate a gap between the two columns inside the 
 * wordle-container div.
 */

  return (
    <div className="App">
      <h1 className="wordle-title">
        Wordle
      </h1>
      <Toast
        hide={hideNotInWordList}
        backgroundColor='black'
        text='Not in word list'
      />
      <Toast
        hide={hideWinnerNotification}
        backgroundColor='green'
        text='You won!'
      />
      <div className="wordle-container">
        <WordGrid
          words={words}
          shakingWordIndex={shakingWordIndex}
        />
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
