import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import controlsStyles from './controls.module.css'

const Controls = (props) => {
    return (
        <div>
            <button className={controlsStyles.button} onClick={props.handlePlay}>
                <FontAwesomeIcon icon={faPlay} className="fa-2x" />
                <FontAwesomeIcon icon={faPause} className="fa-2x" />
            </button>
            <button className={controlsStyles.button} onClick={props.handleReset}>
                <FontAwesomeIcon icon={faRedoAlt} className="fa-2x" />
            </button>
        </div>
    )
}

export default Controls