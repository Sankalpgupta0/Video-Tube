import { usePathname } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import { Video } from 'expo-av'; // Use expo-av for better video control
import { Slider } from "@react-native-community/slider";

export default function VideoDetails() {
  const route = usePathname(); // Extract `videoId` from the route
  const x = route.split("/");
  const videoId = x[x.length - 1];
  
  const [video, setVideo] = useState({});
  const [status, setStatus] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status
  const videoRef = useRef(null); // Ref for Video component

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const resp = await axios.get(`http://192.168.17.46:8000/api/videos/${videoId}`);
        console.log(resp.data.data);
        setVideo(resp.data.data);
        setLoading(false); // Set loading to false once video data is fetched
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoading(false); // Ensure loading is stopped even on error
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const handleSliderChange = (value) => {
    if (video.durationMillis && videoRef.current) {
      videoRef.current.setPositionAsync(value * video.durationMillis);
    }
  };

  // Make sure video duration is loaded
  const videoDuration = video.durationMillis ? video.durationMillis / 1000 : 0;
  const videoPosition = status.positionMillis ? status.positionMillis / 1000 : 0;

  return (
    <SafeAreaView style={styles.container} className='bg-primary h-full'>
      {loading ? ( // Show loading indicator while video is loading
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={{ uri: video.videoFile }}
              style={[styles.video, isFullscreen && styles.fullscreenVideo]}
              useNativeControls
              resizeMode="contain"
              shouldPlay={status.isPlaying}
              onPlaybackStatusUpdate={(status) => {
                setStatus(status);
                console.log('Video status:', status); // Log the status for debugging
              }}
            />
          </View>

          <View style={styles.controls}>
            {/* Display slider only when duration is available */}
            {videoDuration > 0 && (
              <Slider
                style={styles.slider}
                value={videoPosition / videoDuration} // Value between 0 and 1
                onValueChange={handleSliderChange}
              />
            )}
          </View>

          <View style={styles.videoDetails}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.description}>{video.description}</Text>
            <Text style={styles.duration}>Duration: {video.duration}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  fullscreenVideo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  videoDetails: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    fontSize: 16,
  },
  duration: {
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
