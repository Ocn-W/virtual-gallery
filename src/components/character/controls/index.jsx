//CUSTOM HOOK FOR USER INPUT 

import { useEffect, useState } from "react";

export const useInput = () => {
    //Setting key value pairs with a boolean to determine position 
    //character is moving
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false
    });

    //Assign a key to an input 
    const inputKeys = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right',
        ShiftLeft: 'shift'
    }

    //Find the current key the user is pressing
    //to updated boolean
    const findInputKey = (key) => inputKeys[key];

    useEffect(() => {

        //Sets boolean values to either true or false
        const handleKeyDown = (e) => {
            setInput((key) => ({...key, [findInputKey(e.code)]: true}));
        }
        const handleKeyUp = (e) => {
            setInput((key) => ({...key, [findInputKey(e.code)]: false}));
        }

        //Listens for user input
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        //Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp)
        }

    },[])

    return input;
}