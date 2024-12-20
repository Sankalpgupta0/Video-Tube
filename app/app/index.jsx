import { Text, View, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Redirect, router } from "expo-router";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("isLogin");
        if (value) {
          console.log("User is logged in already");
          router.replace('/Home');
        } else {
          console.log("User is not logged in");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, [router]);


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: `100%` }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[230px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">Discover Endless
              Possibilities with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>

            <Image 
            source={images.path} 
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8" 
            resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.replace("/SignIn")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
