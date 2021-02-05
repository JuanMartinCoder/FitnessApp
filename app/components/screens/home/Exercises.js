import React from 'react'
import { Text, View,ScrollView,StyleSheet } from 'react-native'


export default function Exercises({props}) {
    
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                        
                
                        <Text style={styles.titleRoutine}>{props[0].type_routine}</Text>
                
                
        </ScrollView>
        
    )

}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5F5F5',
      },
      body: {
        flex: 1,
      },
      titleRoutine:{
        flex: 1,
        fontSize: 29,
        marginTop: 25,
        marginLeft: 24,
        fontWeight: 'bold'
      }
});