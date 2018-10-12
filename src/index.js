import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer'
import PropTypes from 'prop-types';

class AppolodoroMediaRecorder extends Component {

  videoDevices = null
  currentDevice = null
  recorder = null
  URL = window.URL || window.webkitURL;

  constructor(props) {
    super(props)
    this.state = {
      current: 'INIT'
    }
  }

  componentDidMount() {
    this.enumerateDevices()
  }

  componentDidCatch = (error) => {
    alert(error)
  }

  /**
   * List media devices and detect video input.
   */
  enumerateDevices = () => {
    try {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        this.videoDevices = devices.filter((item) => {
          return item.kind === 'videoinput'
        })
        if (this.videoDevices.length > 0) {
          this.currentDevice = this.videoDevices[0]
          this.setStreaming(this.videoDevices[0].deviceId)

        }
      }).catch((error) => {
        (this.props.onError) && this.props.onError(error)
      })
    } catch (error) {
      this.props.unavailable(error)
    }
  }

  /** 
   * Set streaming properties with video device saved
  */
  setStreaming = (deviceId) => {

    const audioSettings = {
      sampleRate: 48000,
      channelCount: 2,
      volume: 1.0
    }

    const videoSettings = {
      width: 640,
      height: 480,
      deviceId: deviceId
    }

    const constraints = {
      audio: audioSettings,
      video: videoSettings
    }
    this.playStreaming(constraints)
  }

  /**
   * Attach streaming from video device to video player and start
   * state.current to STREAMING
   */
  playStreaming = (constraints) => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then((MediaStream) => {
        this.setRecord(MediaStream)
        this.videoPlayer.srcObject = MediaStream;
        this.videoPlayer.onloadedmetadata = (event) => {
          try {
            event.target.play()
            this.setState({
              current : 'STREAMING'
            })
          } catch (error) {
            (this.props.onError) && this.props.onError(error)
          }
        }
      }).catch((error) => {
        (this.props.onError) && this.props.onError(error)
      })
    } catch(error) {
      (this.props.onError) && this.props.onError(error)
    }
  }

  stopStreaming = () => {
    if (this.videoPlayer.srcObject) {
      const tracks = this.videoPlayer.srcObject.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      this.videoPlayer.srcObject = null
      this.setState({
        current : 'STOPSTREAMING'
      })
    }
  }

  setRecord = (MediaStream) => {
    this.recorder = new MediaRecorder(MediaStream);

    this.recorder.onerror = (event) => {

    }

    this.recorder.onstart = (event) => {
      console.log('onstart')
    }

    this.recorder.onstop = (event) => {
      this.stopStreaming()
    }

    this.recorder.ondataavailable = (event) => {
      try{
        const capturedVideo = this.URL.createObjectURL(event.data)

        this.videoPlayer.src = capturedVideo
        this.videoPlayer.load();
        
        this.setState({
          current : 'LOADING_VIDEO'
        })
  
        this.videoPlayer.onloadedmetadata = (event) => {
          this.setState({
            current : 'PLAYING_VIDEO'
          })        
          this.videoPlayer.play()
        }
      }catch(error){
        console.log(error)
      }
      
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

    (this.props.onTakePhoto) && this.props.onTakePhoto(canvas.toDataURL("image/jpeg", 1))

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

  videoPlayerHandler = (element) => {
    this.videoPlayer = element
  }

  audioPlayerHandler = (element) => {
    this.audioPlayer = element
  }

  render() {
    return (
      <VideoPlayer
        setVideoPlayer={this.videoPlayerHandler}
        setAudioPlayer={this.audioPlayerHandler}
        startRecord={this.handleStartRecord}
        stopRecord={this.handleStopRecord}
        takePhoto={this.handleTakePhoto}
      />
    );
  }

}

AppolodoroMediaRecorder.propTypes = {
  onTakePhoto: PropTypes.func,
  onError: PropTypes.func.isRequired,
  unavailable: PropTypes.func.isRequired,
}

AppolodoroMediaRecorder.defaultProps = {

}
export default AppolodoroMediaRecorder;