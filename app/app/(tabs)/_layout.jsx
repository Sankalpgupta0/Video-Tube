import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'
import { StatusBar } from "expo-status-bar";
import { images } from "../../constants";

const TabIcon = ({ icon, color, focused, name }) => {
    return (
        <View className='flex items-center gap-1 mt-2'>
            <Image
                source={icon}
                tintColor={color}
                resizeMode='contain'
                className={'w-6 h-6'}
            />

            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} w-[25%] text-center text-[10px]`} style={{color:color}}>{name}</Text>
        </View>
    )
}
const _layout = () => {
    return (
        <>
        <Image
          source={images.logo}
          className="w-[80px] h-[34px] text-right"
          resizeMode="contain"
        />
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle:{
                        backgroundColor: '#1e1e1e',
                        borderColor: '#232533',
                        borderTopWidth: 1,
                        height: 60,
                    }
                }}
            >
                <Tabs.Screen name="Home" options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            focused={focused}
                            name="Home"
                        />
                    ),
                    headerShown: false,
                }} />

                <Tabs.Screen name="History" options={{
                    title: 'History',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            focused={focused}
                            name="History"
                        />
                    ),
                    headerShown: false,
                }} />

                <Tabs.Screen name="Channel" options={{
                    title: 'Channel',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            focused={focused}
                            name="Channel"
                        />
                    ),
                    headerShown: false,
                }} />

                <Tabs.Screen name="Profile" options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            focused={focused}
                            name="Profile"
                        />
                    ),
                    headerShown: false,
                }} />
            </Tabs>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}

export default _layout


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
  