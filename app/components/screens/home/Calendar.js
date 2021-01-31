import React, { Component } from 'react';
import {
View, Text,
StyleSheet,
Dimensions
} from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';


const windowWidth = Dimensions.get('window').width;

export default class App extends Component {
      
    render() {
     
        return (
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
     
            
            </ScrollView>
            );
    }
}

const styles = StyleSheet.create({ 

});