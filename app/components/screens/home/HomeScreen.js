import React from 'react'
import { Text, View,StyleSheet,ScrollView } from 'react-native'
// import Calendar from './Calendar'
import CalendarStrip from 'react-native-calendar-strip';

export default function HomeScreen() {
    
        
        
        return (
            <>
               <View style={styles.body}>
                <CalendarStrip
                    scrollable
                    style={{height:150, paddingTop: 20, paddingBottom: 0}}
                    calendarColor={'#D2F5F0'}
                    calendarHeaderStyle={{color: '#707070'}}
                    dateNumberStyle={{color: '#707070'}}
                    dateNameStyle={{color: '#707070'}}
                    iconContainer={{flex: 0.1}}
                    highlightDateNumberStyle={{color: '#6FE6D6'}}
                    highlightDateNameStyle={{color: '#6FE6D6'}}
                    onDateSelected={(date) => {
                        console.log(date.format('YYYY-MM-DD').toString());
                } }   //date = YYYY-MM-DD         
                    
                
                    
                />
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                        
                
                {/*session rendered here with all exercises*/}
                
                </ScrollView>

                </View>
                

            </>
            
        )
    
};


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5F5F5',
      },
      body: {
        flex: 1,
      }
});
