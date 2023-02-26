import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [words, setWords] = useState([])
  const [solution, setSolution] = useState('')
  const [guesses, addGuess] = useState([])
  const [input, setInput] = useState('')
  const [inputCSSclass, setInputCSSclass] = useState('')

  
  const unusedGuesses = [
    ['', 'grey'],
    ['', 'grey'],
    ['', 'grey'],
    ['', 'grey'],
    ['', 'grey'],
    ['', 'grey'],
  ] 

  // howto use useEffect
  // Object.entries etc.
  // how to check if substring

  useEffect(() => {
    const fetchData = async () => {
      const words = ["ALBUM","HINGE","MONEY","SCRAP","GAMER","GLASS","SCOUR","BEING","DELVE","YIELD","METAL","TIPSY","SLUNG","FARCE","GECKO","SHINE","CANNY","MIDST","BADGE","HOMER","TRAIN","STORY","HAIRY","FORGO","LARVA","TRASH","ZESTY","SHOWN","HEIST","ASKEW","INERT","OLIVE","PLANT","OXIDE","CARGO","FOYER","FLAIR","AMPLE","CHEEK","SHAME","MINCE","CHUNK","ROYAL","SQUAD","BLACK","STAIR","SCARE","FORAY","COMMA","NATAL","SHAWL","FEWER","TROPE","SNOUT","LOWLY","STOVE","SHALL","FOUND","NYMPH","EPOXY","DEPOT","CHEST","PURGE","SLOSH","THEIR","RENEW","ALLOW","SAUTE","MOVIE","CATER","TEASE","SMELT","FOCUS","TODAY","WATCH","LAPSE","MONTH","SWEET","HOARD","CLOTH","BRINE","AHEAD","MOURN","NASTY","RUPEE","CHOKE","CHANT","SPILL","VIVID","BLOKE","TROVE","THORN","OTHER","TACIT","SWILL","DODGE","SHAKE","CAULK","AROMA","CYNIC","ROBIN","ULTRA","ULCER","PAUSE","HUMOR","FRAME","ELDER","SKILL","ALOFT","PLEAT","SHARD","MOIST","THOSE","LIGHT","WRUNG","COULD","PERKY","MOUNT","WHACK","SUGAR","KNOLL","CRIMP","WINCE","PRICK","ROBOT","POINT","PROXY","SHIRE","SOLAR","PANIC","TANGY","ABBEY","FAVOR","DRINK","QUERY","GORGE","CRANK","SLUMP","BANAL","TIGER","SIEGE","TRUSS","BOOST","REBUS","UNIFY","TROLL","TAPIR","ASIDE","FERRY","ACUTE","PICKY","WEARY","GRIPE","CRAZE","PLUCK","BRAKE","BATON","CHAMP","PEACH","USING","TRACE","VITAL","SONIC","MASSE","CONIC","VIRAL","RHINO","BREAK","TRIAD","EPOCH","USHER","EXULT","GRIME","CHEAT","SOLVE","BRING","PROVE","STORE","TILDE","CLOCK","WROTE","RETCH","PERCH","ROUGE","RADIO","SURER","FINER","VODKA","HERON","CHILL","GAUDY","PITHY","SMART","BADLY","ROGUE","GROUP","FIXER","GROIN","DUCHY","COAST","BLURT","PULPY","ALTAR","GREAT","BRIAR","CLICK","GOUGE","WORLD","ERODE","BOOZY","DOZEN","FLING","GROWL","ABYSS","STEED","ENEMA","JAUNT","COMET","TWEED","PILOT","DUTCH","BELCH","OUGHT","DOWRY","THUMB","HYPER","HATCH","ALONE","MOTOR","ABACK","GUILD","KEBAB","SPEND","FJORD","ESSAY","SPRAY","SPICY","AGATE","SALAD","BASIC","MOULT","CORNY","FORGE","CIVIC","ISLET","LABOR","GAMMA","LYING","AUDIT","ROUND","LOOPY","LUSTY","GOLEM","GONER","GREET","START","LAPEL","BIOME","PARRY","SHRUB","FRONT","WOOER","TOTEM","FLICK","DELTA","BLEED","ARGUE","SWIRL","ERROR","AGREE","OFFAL","FLUME","CRASS","PANEL","STOUT","BRIBE","DRAIN","YEARN","PRINT","SEEDY","IVORY","BELLY","STAND","FIRST","FORTH","BOOBY","FLESH","UNMET","LINEN","MAXIM","POUND","MIMIC","SPIKE","CLUCK","CRATE","DIGIT","REPAY","SOWER","CRAZY","ADOBE","OUTDO","TRAWL","WHELP","UNFED","PAPER","STAFF","CROAK","HELIX","FLOSS","PRIDE","BATTY","REACT","MARRY","ABASE","COLON","STOOL","CRUST","FRESH","DEATH","MAJOR","FEIGN","ABATE","BENCH","QUIET","GRADE","STINK","KARMA","MODEL","DWARF","HEATH","SERVE","NAVAL","EVADE","FOCAL","BLUSH","AWAKE","HUMPH","SISSY","REBUT","CIGAR"]
      setWords(words)
      const solution = words[Math.floor(Math.random()*words.length)]
      setSolution(solution)
      console.log(solution)
    }
    fetchData()
  }, [])

  // display characters that are at the correct index
  // display characters that are at some index, and are not previously shown
  // input

  const handleInput = (new_input) => {
    if (new_input.length === 5) {
      if (words.includes(new_input)) {
        let guess = new Array(5)
        for (let i = 0; i < new_input.length; i++) {
          const letter = new_input[i]
          const color = new_input[i] === solution[i] ? '#6aaa64' 
                        : solution.includes(new_input[i]) ? '#c9b458' 
                        : 'grey'
          guess[i] = [letter, color]
        }
        addGuess([...guesses, guess])
      } else {
        handleUnknownWord()
      }
      setInput('')
    } else {
      setInput(new_input)
    }
  }

  const handleUnknownWord = () => {
    setInputCSSclass('guess-input')
    setTimeout(() => {
      setInputCSSclass('')
    }, 500)
  }

  return (
    <div className="App">
      <div style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <p 
          style={{
            borderRadius: '50%',
            backgroundColor: '#f00',
            width: '20px',
            color: 'white',
            marginRight: '15px'
          }}
        >
          {6-guesses.length}
        </p>
      </div>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        {guesses.map((guess, index) =>
          <div 
            key={index} 
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '5px',
            }}>
            {guess.map((letter, index) => 
              <p 
                key={letter[0]+index} 
                style={{
                  background: letter[1],
                  color: 'white',
                  lineHeight: '20px',
                  width: '20px',
                  margin: '0px',
                  marginBottom: '5px'
                }}
              >
                {letter[0]}
              </p>
            )}
          </div>
        )}
        {unusedGuesses.slice(0,6-guesses.length).map((guess, index) =>
          <div 
            key={index} 
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '5px',
            }}>
            {guess.map((letter, index) => 
              <p 
                key={letter[0]+index} 
                style={{
                  background: letter[1],
                  color: 'white',
                  lineHeight: '20px',
                  width: '20px',
                  margin: '0px',
                  marginBottom: '5px'
                }}
              >
                {letter[0]}
              </p>
            )}
          </div>
        )}
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {guesses.length < 6 ? 
        <div className={inputCSSclass}>
          Guess:{' '} 
          <input
            value={input}
            onChange={e => handleInput(e.target.value)} 
          />
        </div> : <p>Solution: {solution}</p>}
      </div>
    </div>
  );
}

export default App;
