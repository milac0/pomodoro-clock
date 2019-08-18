import React from 'react'

const SetLength = (props) => {
    return (
        <div>
        <p>{props.name} length prop: {props.length}</p>
            <button onClick={()=>props.incLength(props.name)}>+</button>
            <button onClick={()=>props.decLength(props.name)}>-</button>
        </div>
    )
}

export default SetLength