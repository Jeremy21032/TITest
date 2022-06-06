
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { Video } from 'expo';

export const VideoAIScreen = () => {
    state = {
        muted: false,
        fullScreen: false,
        shouldPlay: true,
    };

    handlePlayAndPause = () => {
        this.setState((prevState) => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    handleVolume = () => {
        this.setState(prevState => ({
            muted: !prevState.muted,
        }));
    };


    const { width } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.fullScreenButton}
                onPress={this.handlePlayAndPause}
                underlayColor="black"
            >
                <Video
                    source={{ uri: 'https://www.youtube.com/watch?v=IyFZznAk69U' }}
                    shouldPlay={this.state.shouldPlay}
                    resizeMode="cover"
                    style={styles.video}
                    volume={this.state.muted ? 0 : 1}
                />
            </TouchableHighlight>
            <View style={styles.controlBar}>
                <TouchableHighlight
                    underlayColor="black"
                    onPress={this.handlePlayAndPause}
                >
                    {this.state.shouldPlay ? (
                        <Text style={styles.controlButton}>Pause</Text>
                    ) : (
                        <Text style={styles.controlButton}>Play</Text>
                    )}
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="black"
                    onPress={this.handleVolume}
                >
                    {this.state.muted ? (
                        <Text style={styles.controlButton}>Unmute</Text>
                    ) : (
                        <Text style={styles.controlButton}>Mute</Text>
                    )}
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="black"
                    onPress={this.handleFullScreen}
                >
                    {this.state.fullScreen ? (
                        <Text style={styles.controlButton}>Exit full screen</Text>
                    ) : (
                        <Text style={styles.controlButton}>Go full screen</Text>
                    )}
                </TouchableHighlight>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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