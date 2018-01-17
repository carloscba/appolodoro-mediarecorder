import React from 'react'

const VideoPlayer = (props) => {
        
    return (
        <div className='VideoPlayer'>
            <video className='VideoPlayer__video' ref={ props.setRef }></video>
            <button className='VideoPlayer__btnPhoto' onClick={ props.takePhoto }></button>
        </div>
    )
}

export default VideoPlayer