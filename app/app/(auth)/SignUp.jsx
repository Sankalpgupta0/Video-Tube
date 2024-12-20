import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import axios from "axios";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const submit = async () => {
        console.log(form);
        if(!form.username || !form.email || !form.password || !form.fullName) {
            Alert.alert('Error', 'Please fill in all the fields')
            return;
        }
        await axios.post("http://192.168.17.46:8000192.168.17.46/api/users/register", form)
        
        .then(async(res) => {
            console.log(res.data.data)
            if(res.data.data) {
                await AsyncStorage.setItem("isLogin", JSON.stringify(true));
                router.replace('/Home')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View
                    className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[215px] h-[84px]"
                    />

                    <Text className="text-xl font-semibold text-white  font-psemibold">
                        Sign Up to VideoTube
                    </Text>

                    <FormField
                        title="FullName"
                        value={form.fullName}
                        handleChangeText={(e) => setForm({ ...form, fullName: e })}
                        otherStyles="mt-3"
                        keyboardType="text"
                    />

                    <FormField
                        title="UserName"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e.toLowerCase() })}
                        otherStyles="mt-7"
                        keyboardType="text"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e.toLowerCase() })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e.toLowerCase() })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-3  flex-row gap-2">
                        <Text className="text-md text-gray-100 font-pregular">
                            already have an account ?
                        </Text>
                        <Link
                            href="/SignIn"
                            className="text-md font-psemibold text-secondary"
                        >
                            SignIn
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;