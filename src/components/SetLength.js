import React from 'react'
import setLengthStyles from './setLength.module.css'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SetLength = (props) => {
    return (
            <div className={setLengthStyles.setters}>
                <p>{props.name} {props.length} min</p>
                <FontAwesomeIcon 
                icon={faCaretUp} 
                className={setLengthStyles.settersSet + " fa-2x"} 
                onClick={() => props.incLength(props.name)} />
                <FontAwesomeIcon 
                icon={faCaretDown} 
                className={setLengthStyles.settersSet + " fa-2x"} 
                onClick={() => props.decLength(props.name)} />
            </div>
    )
}

export default SetLength