import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Video } from 'expo-av';

export const Videos = () => {
    const [state, setState] = React.useState({
        muted: false,
        fullScreen: false,
        shouldPlay: true,
    });
    const handlePlayAndPause = () => {
        setState((prevState) => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    const handleVolume = () => {
        setState(prevState => ({
            muted: !prevState.muted,
        }));
    };
    const handleFullScreen = () => {
        setState(prevState => ({
            fullScreen: !prevState.fullScreen,
        }));
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.fullScreenButton}
                onPress={() => { handlePlayAndPause() }}
                underlayColor="black"
            >
                <Video
                    source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    shouldPlay={state.shouldPlay}
                    resizeMode="contain"
                    style={styles.video}
                    volume={state.muted ? 0 : 1}
                />
            </TouchableOpacity>
            <View style={styles.controlBar}>
                <TouchableOpacity
                    underlayColor="black"
                    onPress={()=>{handlePlayAndPause()}}
                >
                    {state.shouldPlay ? (
                        <Text style={styles.controlButton}>Pause</Text>
                    ) : (
                        <Text style={styles.controlButton}>Play</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    underlayColor="black"
                    onPress={()=>{handleVolume()}}
                >
                    {state.muted ? (
                        <Text style={styles.controlButton}>Unmute</Text>
                    ) : (
                        <Text style={styles.controlButton}>Mute</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    underlayColor="black"
                    onPress={()=>{handleFullScreen()}}
                >
                    {state.fullScreen ? (
                        <Text style={styles.controlButton}>Exit full screen</Text>
                    ) : (
                        <Text style={styles.controlButton}>Go full screen</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Dimensions.get('window').height / 2.5,
        alignSelf: 'stretch'
    },
    controlBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    fullScreenButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    controlButton: {
        margin: 10,
        fontSize: 15,
        color: "white",
    },
});