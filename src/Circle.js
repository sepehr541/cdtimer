import React from 'react'

const Circle = (props) => {

    return (
        <div>
            <div className='circle' style={{position:'relative'}}>
                <svg width='200px' height='200px'>
                    <circle cx='100' cy='100' r='90' stroke='grey' strokeWidth='5px' fill='white'/>
                </svg>
                <span style={{position:'absolute', top:'80px', left:'75px', fontSize:'35px'}}>
                    {props.data}
                </span>
            </div>
            <div style={{display:'flex', alignContent:'center'}}>
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default Circle;