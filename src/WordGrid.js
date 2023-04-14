function Word(props) {
    /**
     * This component display a word. 
     */

    const { word, shake } = props

    return <div
            className={shake ? 'guess-input' : ''}
            style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '5px'
            }}
            >
        {word.map((letter) => {
            return <Letter letter={letter} />
        })}
    </div>
}

function Letter(props) {
    /**
     * This component display a single letter. If the letter has a 
     * color coding there will be a animation.
     */
    const { letter } = props
    return <span
            style={{
                background: letter.color,
                color: letter.color ? 'white' : 'black',
                animation: letter.color ? '1s ease 0s 1 normal none running colorChange' : 'none',
                fontWeight: 'bold',
                border: '1px solid grey',
                fontSize: '5vw',
                height: '8vw',
                width: '8vw',
            }}
        >{letter.letter}
        </span>
}

function WordGrid(props) {
    /**
     * This components display the letters of last row, each letter
     * also has a color coding. Here current letters have no color,
     * green letters are in the correct place, orange somewhere in the 
     * word and grey letters are not in the word. If the letter has a 
     * color coding there will be a animation.
     */
    const { words, shakingWordIndex } = props
    
    return <div style={{
        display: 'grid',
        gridGap: '5px',
        justifyItems: 'center',
        marginTop: '5vh',
    }}>
        {words.map((word, idx) => {
            return <Word
                word={word}
                shake={idx === shakingWordIndex}
            />
        })}
    </div>
}

export default WordGrid