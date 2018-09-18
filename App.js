/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, BackHandler, Alert, Dimensions } from 'react-native';
import TVEventHandler from 'TVEventHandler';
import Drawer from 'react-native-drawer';
import Video from 'react-native-video';
import SideBar from './SideBar';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class App extends Component {

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  //store state of different player property
  state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      isOpen: false,
  };

  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, (cmp, evt) => {
       console.log(`eventType: ${evt.eventType}`);
        if(evt && evt.eventType === 'playPause') {
            cmp.setState({ paused: !cmp.state.paused });            
        } else if(evt && evt.eventType === 'menu') {
            if(cmp.state.paused){
                cmp.setState({ paused: false });    
            } else {                    
                cmp.onBackButtonPress.bind(this);
            }                
        } else if(evt && evt.eventType === 'select') {
            if(cmp.state.isOpen) {
                cmp.setState({ isOpen: false });
            } else {
                cmp.setState({ paused: !cmp.state.paused });    
        }
        }
    });
  }

  _disableTVEventHandler() {
      if (this._tvEventHandler) {
        this._tvEventHandler.disable();
        delete this._tvEventHandler;
      }
  }

  onBackButtonPress = () => {
      if(this.state.paused){
          return true;
      }
      console.log('onBackButtonPress');
      if(!this.state.isOpen) {
          this.openDrawer();
          this.setState({ isOpen: true });
      } else {
          Alert.alert(
              'Demo',
              'Confirm exit?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => console.log('Yes Pressed')},
              ],
              { cancelable: false }
          );
      }            
      return true;
  };


  componentDidMount() {
      this._enableTVEventHandler();
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress)
  }

  componentWillUnmount() {
      this._disableTVEventHandler();
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPress)
  }

  //callback method of video load
  onLoad = (data) => {
      this.setState({ duration: data.duration });        
  };

  //callback of video progress
  onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
  };

  //callback of video end
  onEnd = () => {
      this.setState({ paused: true });
      this.video.seek(0);
  };

  //Return percentage of video played
  getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
          return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
  }

  //close left side drawer
  closeDrawer = () => {
      this.drawer.close();
  }
  //open left side drawer
  openDrawer() {
      this.drawer.open();
  }

  video: Video;
  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <Drawer                
        type='static'
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar callback={this.closeDrawer.bind(this)}/>}
        tapToClose
        onClose={() => this.setState({ isOpen : false })}
        openDrawerOffset={0.7}
      >
        <View style={styles.container} >            
          <Video
              ref={(ref) => { this.video = ref; }}
              source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
              style={styles.fullScreen}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              repeat={false}
          />
          <View style={styles.controls}>
            <View style={styles.trackingControls}>
              <View style={styles.progress}>
                <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
              </View>
            </View>
          </View>                               
        </View>
      </Drawer>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
  },
  fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  },
  controls: {
      backgroundColor: 'transparent',
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
  },
  progress: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 3,
      overflow: 'hidden',
  },
  innerProgressCompleted: {
      height: 15,
      backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
      height: 15,
      backgroundColor: '#2C2C2C',
  },
  generalControls: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 4,
      overflow: 'hidden',
      paddingBottom: 10,
  },
  rateControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  volumeControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  resizeModeControl: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  controlOption: {
      alignSelf: 'center',
      fontSize: 20,
      color: 'white',
      paddingLeft: 2,
      paddingRight: 2,
      lineHeight: 12,
  },
  imageView: {
      height,
      width,
      position: 'absolute',
  },  
});