import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

import { RootBottomParams , RootBottomAdminParams} from "../types";
import { RootStackParams, RootStackAdminParams } from "../types";


//clients
import Home from "../views/client/Home/Home";
import InfoProduct from "../views/client/InfoProduct/InfoProduct";
import Cart from "../views/client/Cart/Cart";
import Products from "../views/client/Products/Products";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Setting from "../views/client/Setting/Setting";
import UpdateInfo from "../views/client/UpdateInfo/UpdateInfo";
import Contact from "../views/client/Contact/Contact";


//admin
import HomeAdmin from "../views/admin/HomeAdmin/HomeAdmin";
import ProductsAdmin from "../views/admin/ProductsAdmin/ProductsAdmin";
import EditProduct from "../views/admin/EditProduct/EditProduct";



//clients
const Tab = createBottomTabNavigator<RootStackParams>();
const Stack = createStackNavigator<RootStackParams>();
const MainStack = createStackNavigator<RootBottomParams>()


//admin
const TabAdmin = createBottomTabNavigator<RootStackParams>();
const StackAdmin = createStackNavigator<RootStackAdminParams>();


function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="InfoProduct" component={InfoProduct} />
      <Stack.Screen name="Productos" component={Products} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ActualizarPerfil" component={UpdateInfo} />
    </Stack.Navigator>
  );
}



function RoutesAdmin() {
  return (
    <StackAdmin.Navigator initialRouteName="HomeAdmin">
      <StackAdmin.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
      <StackAdmin.Screen name="ProductsAdmin" component={ProductsAdmin} options={{ headerShown: true }} />
      <StackAdmin.Screen name="EditProduct" component={EditProduct} options={{ headerShown: true }} />

    </StackAdmin.Navigator>
  );
}




function MyTabsAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={RoutesAdmin}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color='#24599D' size={37} />
          ),
          headerShown: false
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}








function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="HomeScreen"
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
      <MainStack.Screen name="Register" component={Register} options={{ headerShown: true }}/>
      <MainStack.Screen name="MyTabs" component={MyTabs} />
      <MainStack.Screen name="MyTabsAdmin" component={MyTabsAdmin} />
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