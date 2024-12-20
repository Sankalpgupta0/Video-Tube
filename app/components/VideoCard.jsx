import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";

/**
 * A component that renders a video card with its title, thumbnail, and
 * duration, as well as the avatar and name of the user who uploaded the video.
 * @param {{ video: { id: string, thumbnail: string, owner: string, title: string, duration: number } }} props
 * @returns {React.ReactElement}
 */
const VideoCard = ({ video, id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log(id)
        const response = await axios.get(
          `http://192.168.17.46:8000/api/users/u/${video.owner}`
        );
        setUser(response.data.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [video.owner]);

  return (
    <TouchableOpacity
      onPress={() => {
        const videoId = id
        console.log(videoId)
        router.push(`/${videoId}`);
      }
      }
      style={styles.card}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      {user && (
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.duration}>
              {video.duration >= 60
                ? `${(video.duration / 60).toFixed(2)} min`
                : `${video.duration.toFixed(2)} sec`}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "#1c1c1c", // Example background color
    borderRadius: 8,
    padding: 8,
    overflow: "hidden",
    cursor : "pointer",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  duration: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
