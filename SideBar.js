import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Alert } from 'react-native';

// create a component
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          shadowOffsetWidth: 1,
          shadowRadius: 4,
          selected : 'resolution',
          playback : 'Single track',
          audioplayback : 'Single track',
          resolution : 'Auto',
          enabled : null,
        };
    } 

    render() {
        return (
            <View 
                style={{ flex: 1, backgroundColor: '#fff'}}
            >
                <View style={{ height: 150}}>
                    <TouchableOpacity hasTVPreferredFocus={true} onPress={() => {this.props.callback(); }}>
                        <View style={{ width: 40, backgroundColor: '#e6e6e6' , padding: 10, borderRadius: 5, marginLeft: 10, marginTop: 10 }}>
                            <Image style={styles.image} source={require('./images/close.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => {this.setState({ selected: 'play' });}}>
                            <View style={{ backgroundColor: this.state.selected === 'play'? '#fbd2c1' : '#FFFFFF' , padding: 10, borderRadius: 5, width: 40 }}>
                                <Image style={styles.image} source={require('./images/play.png')} />
                            </View>
                        </TouchableOpacity>                        
                        
                        <TouchableOpacity onPress={() => {this.setState({ selected: 'time' });}}>
                            <View style={{ backgroundColor: this.state.selected === 'time'? '#fbd2c1' : '#FFFFFF' , padding: 10, borderRadius: 5, width: 40 }}>
                                <Image style={styles.image} source={require('./images/clock.png')} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => {this.setState({ selected: 'user' });}}>
                            <View style={{ backgroundColor: this.state.selected === 'user'? '#fbd2c1' : '#FFFFFF' , padding: 10, borderRadius: 5, width: 40 }}>
                                <Image style={styles.image} source={require('./images/user.png')} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {this.setState({ selected: 'resolution' });}}>
                            <View style={{ backgroundColor: this.state.selected === 'resolution' ? '#fbd2c1' : '#FFFFFF' , padding: 10, borderRadius: 5 }}>
                                <Image style={styles.image} source={require('./images/computer.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {/* { this.renderUI() }     */}
                </View>
                                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },
    image: {
        height: 20,
        width: 20,       
    },
    textTitle: {
        color: 'grey',
        fontSize: 14,
        paddingTop: 10,
        paddingLeft: 10,
    },
    textSubTitle: {
        color: 'black',
        fontSize: 16,
        paddingLeft: 10,
    },
    playContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 30,
        backgroundColor: '#ffffff',
    },
    textPlayback: {
        fontSize: 18,
        textAlign: 'left',
        margin: 10,
        color: '#000000',
        fontFamily: 'Imprima',
        backgroundColor: 'transparent',
    },
    textUnderline: {
        fontSize: 18,
        textAlign: 'left',
        margin: 10,
        color: '#000000',
        textDecorationLine: 'underline',
        padding: 5,
        fontFamily: 'Imprima',
        backgroundColor: 'transparent',
    },
});

//make this component available to the app
export default SideBar;
