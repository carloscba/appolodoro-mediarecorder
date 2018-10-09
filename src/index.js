import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer'
import PropTypes from 'prop-types';

class AppolodoroMediaRecorder extends Component {

  videoDevices = null
  currentDevice = null
  recorder = null

  constructor(props) {
    super(props)
    this.state = {
      current: 'INIT'
    }
  }

  componentDidMount() {

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

  componentDidCatch = (error) => {
    alert(error)
  }

  setStreaming = (deviceId) => {
    const constraints = {
      audio: {
        sampleRate: 48000,
        channelCount: 2,
        volume: 1.0
      },
      video: {
        width: 640,
        height: 480,
        deviceId: deviceId
      }
    }

    try {
      navigator.mediaDevices.getUserMedia(constraints).then((MediaStream) => {
        //Genero un recorder usando el streaming
        this.setRecord(MediaStream)
        //Asigo el streaming como fuente para el player de video
        this.videoPlayer.srcObject = MediaStream;
        //Activo la previsualizacion de la camara en el player
        this.videoPlayer.onloadedmetadata = (event) => {
          try {
            event.target.play()
          } catch (error) {
            (this.props.onError) && this.props.onError(error)
          }
        }
      }).catch((error) => {
        (this.props.onError) && this.props.onError(error)
      })
    } catch (error) {
      (this.props.onError) && this.props.onError(error)
    }

  }

  stopStreaming = () => {
    //Detengo el streaming de todas las fuentes en el video player
    const tracks = this.videoPlayer.srcObject.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
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
      console.log('event.data', event.data)
      this.videoPlayer.src = window.URL.createObjectURL(event.data)
      this.videoPlayer.onloadedmetadata = (event) => {
        console.log('event', event)
        this.videoPlayer.play()
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
        setVideoPlayer ={this.videoPlayerHandler}
        setAudioPlayer ={this.audioPlayerHandler}
        startRecord={this.handleStartRecord}
        stopRecord={this.handleStopRecord}
        takePhoto={this.handleTakePhoto}
      />
    );
  }

}

AppolodoroMediaRecorder.propTypes = {
  onTakePhoto: PropTypes.func,
  onError: PropTypes.func,
  unavailable: PropTypes.func.isRequired,
}

AppolodoroMediaRecorder.defaultProps = {

}
export default AppolodoroMediaRecorder;