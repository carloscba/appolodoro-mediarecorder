import React from 'react'

const VideoPlayer = (props) => {
        
    return (
        <div style = { props.styles.container }>
            <video ref={ props.setRef } style = { props.styles.video }></video>
            <button onClick={ props.takePhoto } style = { props.styles.btnPhoto }></button>
        </div>
    )
}

export default VideoPlayer