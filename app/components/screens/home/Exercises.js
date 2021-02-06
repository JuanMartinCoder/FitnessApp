import React from 'react'
import { Text, View,ScrollView,StyleSheet } from 'react-native'
import Exercise from './Exercise'

export default function Exercises({props}) {

    var existe_prop = false;

    if (props[0] != null) {
       existe_prop = true;
    }
    
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                        
                
                        {
                          existe_prop ? <Text style={styles.titleRoutine}>{props[0].type_routine}</Text> : null 
                        }
                        {
                          existe_prop ? props[0].exercises.map((e,i)=> {
                            return (
                              <Exercise key={i} props={e} />
                            )
                          }) : null
                        }
                
                
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
        fontWeight: 'bold',
        color: '#A1A1A1',
        marginBottom: 22        

      },
      textExercise: {
        flex: 1,
        marginLeft: 24,
        marginTop: 25,
      }
});