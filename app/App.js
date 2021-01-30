/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View, Text
} from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

function HomeScreen() {
    
  return (
      <View>
          <Text> Home </Text>
      </View>
  )

}

function StatScreen() {
    
  return (
      <View>
          <Text> StatScreen </Text>
      </View>
  )

}


const App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused,color,size}) => {
              var iconName;
              if (route.name === 'Home') {
                if (focused) {
                  iconName = 'md-home';
                } else {
                 iconName= 'md-home-outline'
                }
              } else if (route.name === 'Stats') {
                if(focused) {
                  iconName = 'md-stats-chart';
                }else {
                  iconName = 'md-stats-chart-outline';
                }
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#6FE6D6',
            inactiveTintColor: '#707070'
          }}
        
        
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Stats" component={StatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5F5F5'
  },
  
  body: {
    
    height: windowHeight
  },
  
});

export default App;


/*
<StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <Header />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
         
          
          <View style={styles.body}>
            
          </View>
        </ScrollView>
      </SafeAreaView>

*/