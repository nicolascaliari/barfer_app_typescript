import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

import { RootBottomParams } from "../types";
import { RootStackParams } from "../types";
import Home from "../views/Home/Home";
import InfoProduct from "../views/InfoProduct/InfoProduct";
import Cart from "../views/Cart/Cart";
import Productos from "../views/Productos/Productos";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Contact from "../views/Contact/Contact";
import Setting from "../views/Setting/Setting";
import ActualizarPerfil from "../views/ActualizarInfo/ActualizarInfo";



const Tab = createBottomTabNavigator<RootStackParams>();
const Stack = createStackNavigator<RootStackParams>();
const MainStack = createStackNavigator<RootBottomParams>()

function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="InfoProduct" component={InfoProduct} />
      <Stack.Screen name="Productos" component={Productos} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ActualizarPerfil" component={ActualizarPerfil} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={Routes}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color='#24599D' size={37} />
          ),
          headerShown: false
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color='#24599D' size={30} />
          ),
          headerShown: false
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={30} color="#24599D" />
          ),
          headerShown: false
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="MyTabs" component={MyTabs} />
    </MainStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
}
