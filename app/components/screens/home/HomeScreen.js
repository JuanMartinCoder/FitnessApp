import React , { useEffect, useState } from 'react'
import { Text, View,StyleSheet,ScrollView } from 'react-native'
// import Calendar from './Calendar'
import CalendarStrip from 'react-native-calendar-strip';
import Exercises from './Exercises';

var today = new Date();
var Changedtoday = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');;
        

export default function HomeScreen() {

        const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState([]);
        
        

        useEffect(() => {
            var url = 'http://192.168.0.110:4000/setsbydate/2021-01-31'; // + Changedtoday
            console.log(url);
            fetch(url)
              .then((response) => response.json())
              .then((json) => setData(json))
              .catch((error) => console.error(error))
              .finally(() => {setLoading(false);});
          }, []);


          
    
         
        
        return (
            
               <View style={styles.body}>
                <CalendarStrip
                    scrollable
                    startingDate={today}
                    selectedDate={today}
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
                
                 
                  
                  
                <Exercises props={data}/>
                  
                

                </View>
                

            
            
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
