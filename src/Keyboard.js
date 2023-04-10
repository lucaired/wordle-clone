import { useEffect, useState } from "react"

function KeyboardButtonRow(props) {
    /**
     * Returns a row of buttons.
     */

    const { letters, colorCoding, buttonHandler } = props

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: '5px',
    }}>
        {letters.map((letter) => {
            return <KeyboardButton 
                        letter={letter} 
                        color={colorCoding[letter]} 
                        buttonHandler={buttonHandler}
                        buttonStyle={{}}
                    />
        })}
    </div>
}

function KeyboardButton(props) {
    /**
     * Returns a letter button.
     */
    
    // Detructure props in letter, color and buttonHandler
    const { letter, color, buttonHandler, buttonStyle } = props

    return <button 
            style={{ 
                backgroundColor: color,
                fontSize: '4vw',
                lineHeight: '4vw',
                ...buttonStyle 
            }} 
            onClick={() => buttonHandler(letter)}
        >
            {letter}
        </button>
}

function Keyboard(props) {
    /**
     * Returns the button beign pressed and takes a color-coding for the buttons.
     */
    
    // Detructure props in buttonHandler and colorCoding
    const { letterButtonHandler, enterButtonHandler, delButtonHandler, words } = props

    const [colorCoding, setColorCoding] = useState({})
    
    useEffect(()=> {
        buildColorMapping(words)
    }, [words])

    // Create a list of letters
    const letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']

    const buildColorMapping = (words) => {
        /**
         * Green always dominates, orange only grey. This function processes
         * changes to the words and updates the colorCoding. It will update
         * the colorCoding only if the new color is green or orange and the
         * old color is grey. If no color has been assigned to a letter it
         * will not be updated. Also if no previous colors have been assigned
         * the new color will be assigned.
         */

        let newColorCoding = {}
        words.forEach((word) => {
            word.forEach((letter) => {
                const label = letter['letter']
                const newColor = letter['color']
                if (colorCoding.hasOwnProperty(label)) {
                    const oldColor = colorCoding[label]
                    if (newColor === 'green') {
                        newColorCoding[label] = newColor
                    }
                    else if (oldColor === 'grey' && newColor === 'orange') {
                        newColorCoding[label] = newColor
                    }
                }
                else {
                    if (newColor !== undefined) {
                        newColorCoding[label] = newColor
                    }
                }
            })
        })
        setColorCoding(colorCoding => {
            return {...colorCoding, ...newColorCoding}
        })
    }

    return <div>
        <div style={{
            display: 'grid',
            gridGap: '5px',
            justifyContent: 'center',
            justifyItems: 'center'
        }}>
            <KeyboardButtonRow 
                letters= {letters.slice(0,10)}
                colorCoding={colorCoding}
                buttonHandler={letterButtonHandler}
            />
            <KeyboardButtonRow 
                letters= {letters.slice(10, 19)} 
                colorCoding={colorCoding}
                buttonHandler={letterButtonHandler}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <KeyboardButton 
                    letter={'Enter'} 
                    color={{}} 
                    buttonHandler={enterButtonHandler}
                    buttonStyle={{marginRight: '5px'}}
                />
                <KeyboardButtonRow 
                    letters= {letters.slice(19)} 
                    colorCoding={colorCoding}
                    buttonHandler={letterButtonHandler}
                />
                <KeyboardButton 
                    letter={'Del'} 
                    color={{}} 
                    buttonHandler={delButtonHandler}
                    buttonStyle={{marginLeft: '5px'}}
                />
            </div>
        </div>
    </div>
}

export default Keyboard