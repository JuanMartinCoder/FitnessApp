import React , { useEffect, useState } from 'react'
import { Text, View,StyleSheet,ScrollView ,TouchableOpacity,Modal, LogBox} from 'react-native'
// import Calendar from './Calendar'
import CalendarStrip from 'react-native-calendar-strip';
import Exercises from './Exercises';


var today = new Date();
var Changedtoday = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');;
        

export default function HomeScreen() {

        const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState([]);
        const [isvisible, setVisible] = useState(false);
        
        var existData = false;
        var url = 'http://192.168.0.110:4000/setsbydate/'+ Changedtoday;

        useEffect(() => {
          
              fetch(url)
              .then((response) => response.json())
              .then((json) => setData(json))
              .catch((error) => console.error(error))
              .finally(() => {setLoading(false);});
          }, []);


          
        if (data.errorMessage) {
          existData = false 
        } else {
          existData = true;
        }
    
         
        
        return (
            
               <View style={styles.body}>
                <CalendarStrip
                    scrollable
                    startingDate={Changedtoday}
                    selectedDate={Changedtoday}
                    style={{height:150, paddingTop: 20, paddingBottom: 0,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      elevation: 2,
                    }}
                    calendarColor={'#D2F5F0'}
                    calendarHeaderStyle={{color: '#707070'}}
                    dateNumberStyle={{color: '#707070'}}
                    dateNameStyle={{color: '#707070'}}
                    iconContainer={{flex: 0.1}}
                    highlightDateNumberStyle={{color: '#6FE6D6'}}
                    highlightDateNameStyle={{color: '#6FE6D6'}}
                    onDateSelected={(date) => {
                      url = 'http://192.168.0.110:4000/setsbydate/'+ date.format('YYYY-MM-DD').toString();
                      
                      fetch(url)
                      .then((response) => response.json())
                      .then((json) => setData(json))
                      .catch((error) => console.error(error))
                      .finally(() => {setLoading(false);});
                      
                      

                } }   //date = YYYY-MM-DD         
                    
                
                    
                />
                
                 
                  {
                    existData ? <Exercises props={data}/> : <Text style={styles.errorMessage}>No existe una rutina este dia. Aprete en el + para agregar una rutina.</Text>
                  }
                  {/*        MODAL      */}
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isvisible}
                    onRequestClose={() => {
                      setVisible(!isvisible);
                    }}> 

                      <View style={styles.centeredView}>
                          <View style={styles.modalView}>




                            <TouchableOpacity style={styles.buttonModal, styles.button} onPress={()=>setVisible(!isvisible)}>

                            </TouchableOpacity>  
                          </View>
                       </View>

                    
                  </Modal> 




                  {    /*BUTTON*/        }
                  <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=>setVisible(true)}>
                      <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                  </View>

                </View>
                

            
            
        )
    
};


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5F5F5',
      },
      body: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      errorMessage: {
        textAlign:'center',
        textAlignVertical: 'center',
        flex:1,
        color: '#A1A1A1',
        padding: 30
      },
      buttonModal:{
          alignSelf:'center'
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#00000020'
      },    
      modalView: {
        margin: 20,
        backgroundColor: "white",
        height:100,
        width:100,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button:{
        backgroundColor: "#6FE6D6",
        borderRadius: 40,
        width:70,
        height:70,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 2,
      },
      buttonText:{
        textAlign:'center',
        textAlignVertical:'center',        
        flex:1,
        fontSize:30,
        color:'#fff',
      },
      buttonContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 25,
        paddingRight:25,
        paddingTop:25,
        backgroundColor:'#F5F5F5',
        shadowColor: "#000",
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowOpacity: 0.12,
            shadowRadius: 60,
        
        
      }
      
});
