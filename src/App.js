import './App.css';
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';

function App() {

  // Generate button handler function for Keyboard
  const letterButtonHandler = (letter) => {
    console.log(letter)
  }

  return (
    <div className="App">
      <h1 style={{
        borderBottom: '1px solid black',
        fontSize: '18px'
      }}>Wordle</h1>
      <WordGrid
        words={[]}
        colorCoding={{}}
      >
      </WordGrid>
      <Keyboard
         letterButtonHandler={letterButtonHandler}
         enterButtonHandler={()=>console.log('Enter')}
         delButtonHandler={()=>console.log('Del')}
         colorCoding={{
          'W': 'green',
          'Q': 'orange'
        }}
      />
    </div>
  );
}

export default App;
