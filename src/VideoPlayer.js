import React from 'react'

const VideoPlayer = (props) => {
        
    return (
        <div className='VideoPlayer'>
            
            <video controls className='VideoPlayer__video' width="320" height="240" ref={ props.setVideoPlayer }></video>

            <button className='VideoPlayer__btnStart' onClick={ props.startRecord }>Start Record</button>
            <button className='VideoPlayer__btnStop' onClick={ props.stopRecord }>Stop Record</button>
            <button className='VideoPlayer__btnPhoto' onClick={ props.takePhoto }>Photo</button>
        </div>
    )
}

export default VideoPlayer