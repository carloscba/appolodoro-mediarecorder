import React from 'react'

const VideoPlayer = (props) => {
        
    return (
        <div className='VideoPlayer' style = { props.styles.container }>
            <video className='VideoPlayer__video' ref={ props.setRef } style = { props.styles.video }></video>
            <button className='VideoPlayer__btnPhoto' onClick={ props.takePhoto } style = { props.styles.btnPhoto }></button>
        </div>
    )
}

export default VideoPlayer