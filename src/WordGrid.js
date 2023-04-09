function Word(props) {
    /**
     * This component display a word. 
     */

    const { word, colorCoding } = props

    return <div 
        style={{display: 'flex', flexDirection: 'row', columnGap: '5px'}}
        >
        {word.map((letter) => {
            return <Letter letter={letter} color={colorCoding[letter]} />
        })}
    </div>
}

function Letter(props) {
    /**
     * This component display a single letter. If the letter has a 
     * color coding there will be a animation.
     */
    const { letter, color } = props
    return <span
            style={{
                background: color,
                color: color ? 'white' : 'black',
                animation: color ? '1s ease 0s 1 normal none running colorChange' : 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '1px solid grey',
                lineHeight: '1',
                width: '20px',
                height: '20px',
            }}
        >{letter}
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
    const { words, colorCoding } = props
    
    return <div style={{
        display: 'grid',
        gridGap: '5px',
        justifyContent: 'center',
        justifyItems: 'center'
    }}>
        {words.map((word) => Word({word, colorCoding}))}
    </div>
}

export default WordGrid