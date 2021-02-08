import React from 'react'
import { Text, View,ScrollView,StyleSheet } from 'react-native'


export default function Exercise({props}) {

    var existe_prop = false;
    
    if (props != null) {
       existe_prop = true;
    }
    
    return (
        <View style={styles.scrollView}>
            {
                existe_prop ? <Text style={styles.textExercise}>{props.exercise} </Text> : null
            }          
        </View>
        
    )

}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#FCFBFB',
        width:'88%',
        height:100,
        marginTop:20,
        marginLeft: 24,
        marginBottom:2,
        borderRadius: 6,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 2,
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
      },
      textExercise: {
        color:'#6FE6D685',
        marginLeft:15,
        marginTop:8,
        fontWeight: 'bold',
        fontSize: 21
      }
});