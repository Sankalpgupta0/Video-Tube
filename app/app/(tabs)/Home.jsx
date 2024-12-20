import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '../../components/VideoCard';
import { images } from "../../constants";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const resp = await axios.get("http://192.168.17.46:8000/api/videos");
        setVideos(resp.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className="w-full justify-center items-end px-4">
        <Image
          source={images.logo}
          className="w-[80px] h-[34px] text-right"
          resizeMode="contain"
        />
      </View>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} id={item._id}/>}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
