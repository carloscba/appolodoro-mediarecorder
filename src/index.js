import React, {Component} from 'react';
import VideoPlayer from './VideoPlayer'
import PropTypes from 'prop-types';
import styles from './styles'

class AppolodoroMediaRecorder extends Component {
  
  videoDevices = null
  currentDevice = null
  recorder = null

  constructor(props){
    super(props)
  }

  componentDidMount(){
    
    navigator.mediaDevices.enumerateDevices()
    .then((devices)=> {
      
      this.videoDevices = devices.filter((item) => {
        return item.kind === 'videoinput'
      }) 
      
      if(this.videoDevices.length > 0){
        this.currentDevice = this.videoDevices[0]
        this.setStreaming(this.videoDevices[0].deviceId)
        
      }
    }).catch( (error) => {
      new Error(error)
    })    
  }

  setStreaming = (deviceId) => {
    const constraints = { 
      audio: false, 
      video: {
        width: 640,
        height: 480,
        deviceId: deviceId
      }
    }
    
    navigator.mediaDevices.getUserMedia(constraints).then( (MediaStream) => {
      //Asigno al recorder el streaming
      this.setRecord(MediaStream)

      //Player de previsualizacion
      this.videoPlayer.srcObject = MediaStream;

      this.videoPlayer.onloadedmetadata = (event) => {
        event.target.play()
      }
        
    })
  }

  stopStreaming = () => {
    const tracks = this.videoPlayer.srcObject.getTracks();
  
    tracks.forEach(function(track) {
      track.stop();
    });    
  }

  setRecord = (MediaStream) => {
    this.recorder = new MediaRecorder(MediaStream);
    
    this.recorder.onerror = (event) => {

    }
    this.recorder.onstart = (event) => {
      
    }
    this.recorder.onstop = (event) => {
      
    }
    this.recorder.ondataavailable = (event) => {
      
    }
    
  }

  takePhoto = () => {
    this.videoPlayer.pause()
    this.confirmPhoto()
  }

  confirmPhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = this.videoPlayer.offsetWidth;
    canvas.height = this.videoPlayer.offsetHeight;

    context.drawImage(this.videoPlayer, 0, 0, canvas.width, canvas.height);    
    
    canvas.toBlob( (response) => {
      (this.props.onTakePhoto) && this.props.onTakePhoto(response)
    })
    this.stopStreaming()
  }

  handleStartRecord = () => {
    this.recorder.start()
  }

  handleStopRecord = () => {
    this.recorder.stop()
  }
  
  handleTakePhoto = () => {
    this.takePhoto()
  }

  handleRef = (element) => {
    this.videoPlayer = element
  }

  render() {
    return (
      <VideoPlayer 
        setRef = { this.handleRef } 
        startRecord={ this.handleStartRecord } 
        stopRecord={ this.handleStopRecord }  
        takePhoto = { this.handleTakePhoto }
        styles = { this.props.styles }
      />
    );
  }

}

AppolodoroMediaRecorder.propTypes = {
  onTakePhoto : PropTypes.func,
  styles : PropTypes.object
}

AppolodoroMediaRecorder.defaultProps = {
  styles : styles
}
export default AppolodoroMediaRecorder;