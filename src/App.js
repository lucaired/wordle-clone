import React, { useEffect, useState } from 'react';

import './App.css';
import wordlist from './wordlist.json';
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';

function App() {

  const [chosenWord, setChosenWord] = useState("")
  const [hideNotInWordList, setHideNotInWordList] = useState(true)
  const [hideWinnerNotification, setHideWinnerNotification] = useState(true)

  useEffect(() => {
    const chosenWord = wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
    setChosenWord(chosenWord)
  }, [])

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
              }, 5000)
            }
          } else {
            setHideNotInWordList(false)
            setTimeout(() => {
              setHideNotInWordList(true)
            }, 500)
          }
    }
  }

  const Toast = (props) => {
    // How to wrap the text in CSS so that it takes only the width of the word
    const { hide, backgroundColor, text } = props
    return <p 
      style={{
          color: 'white',
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: backgroundColor,
          display: hide ? 'none' : 'inline-block',
          padding: '1vw',
          fontWeight: 'bold',
          zIndex: '100',
        }}>
          {text}
        </p> 
  }

  /* TODO: styling
    - centralize the letter in the word grid
    - use a toast to show the user that the word is not in the word list
    - adapt font size to the screen size
  */


  return (
    <div className="App">
      <h1 style={{
        borderBottom: '1px solid black',
        fontSize: '6vw',
        paddingBottom: '30px',
      }}>
        Wordle
      </h1>
      <div 
        // Style the container, so that the Keyboard is at the bottom
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          rowGap: '10px',
        }}
        >
        <WordGrid
          words={words}
        />
        <Keyboard
          letterButtonHandler={letterButtonHandler}
          enterButtonHandler={enterButtonHandler}
          delButtonHandler={delButtonHandler}
          words={words}
        />
      </div>
      <Toast
        hide={hideNotInWordList}
        backgroundColor='black'
        text='In the word list'
      />
      <Toast
        hide={hideWinnerNotification}
        backgroundColor='green'
        text='You won!'
      />
    </div>
  );
}

export default App;
