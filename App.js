import React, { useState } from "react";
import { StyleSheet,View,SafeAreaView,Text, Modal,FlatList, Alert} from "react-native";
import { Button, colors} from "react-native-elements"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from "react-native-gesture-handler";
export default function App(){
    const [Title,settitle]=useState('')
    const[description,setdescription]=useState('')
    const[startday,setstartday]=useState('')
    const[endday,setendday]=useState('')
    const[isModalvisible,setisModalvisible]=useState(false)
    const [todo,settodo]=useState([])
    const onPressItem=()=>{
        setisModalvisible(true);
    }
    const ListItem=({todo}) =>{
        return(
            <View style={styles.ListItem}>
                <View style={{flex:1}}>
                    <Text
                    style={{fontWeight:"bold",
                    fontSize:15,
                    color:colors.primary,
                    textDecorationLine:todo?.completed?"line-through":"none"}}
                    >{todo?.Title} {todo?.description} {todo?.startday} {todo?.endday}</Text>
                </View>
                {
                    !todo?.completed&&(
                <Button style={styles.actionIcon} onPress={()=>markTodoComplete(todo?.id)}>
                   <Icon name="done" size={20} color={colors.white}/>
               </Button>
                    )
                }

               <Button style={[styles.actionIcon,{backgroundColor:"red"}]} onPress={()=>deleteTodo(todo?.id)} >
                   <Icon name="delete" size={20} color={colors.white}/>
               </Button>
            </View>
        )
    }

    const addtodo =()=>{
        const newtodo={
            id:Math.random(),
            Title,
            description,
            startday,
            endday,
            completed:false
        };
        settodo([...todo,newtodo]);
        setisModalvisible(false)
    }
    const markTodoComplete=todoId=>{
        const newTodo=todo.map((item)=>{
            if(item.id==todoId){
                return {...item,completed:true}
            }
            return item;
        })
        settodo(newTodo);
    };
    const deleteTodo=(todoId)=>{
        const newTodo=todo.filter(item=>item.id!=todoId);
        settodo(newTodo);
    }
    const clearTodo=()=>{
        Alert.alert('Confirm','Clear todo?',[
            {
                text:'Yes',
                onPress:()=>settodo([])
            },
            {text:'No'}
        ])
    }
    return(
        <SafeAreaView
        style={{flex:1,backgroundColor:colors.black}}
        >
            <View style={styles.header}>
                <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>
                    TO DO APP
                </Text>
                <Icon name="delete" size={30} color="red" onPress={clearTodo}/>
            </View>
            <FlatList data={todo} 
                renderItem={({item})=><ListItem todo={item} />}
                contentContainerStyle={{padding:20,paddingBottom:100}}
                showsVerticalScrollIndicator={false}
                />
            <View style={{backgroundColor: "blue",marginLeft:350, borderRadius: 50, borderColor: "#1db0e3", borderWidth: 1, width:50, justifyContent: "center", alignItems: "center"}}>
                <Icon          
                name="add" 
                size={45} 
                color="white"
                onPress={()=>onPressItem()}></Icon>
            </View>
                
            <Modal
            animationType="fade"
            visible={isModalvisible}
            onRequestClose={()=>setisModalvisible(false)}
            >
                <View style={styles.container}>
          
          <View style={{marginTop:50,alignItems:"center"}}>
              <Text style={{fontSize:30, color:"white"}}>Add a task</Text>
          </View>
          <View style={{marginTop:40}}>
              <View>
                  <TextInput style={styles.textinput1}
                  onChangeText={Title=>settitle(Title)}
                  placeholder="Title"
                  placeholderTextColor="#fff" 
                  />
              </View>
          </View>
          <View style={{marginTop:30}}>
              <View>
                  <TextInput style={styles.textinput2}
                   onChangeText={description=>setdescription(description)}
                   placeholder="Description"
                   placeholderTextColor="#fff" 
                  />
              </View>
          </View>
      
          <View>
          <TextInput style={styles.textinput3}
            onChangeText={startday=>setstartday(startday)}
            placeholder="Start"
            placeholderTextColor="#fff" 
          />
          </View>

          <View style={{marginTop:-40}}>
          <View style={{alignItems:"flex-end"}}>
          <TextInput style={styles.textinput3}
            onChangeText={endday=>setendday(endday)}
            placeholder="End"
            placeholderTextColor="#fff" 
          />
          </View>
          </View>

         <View style={{alignItems:"flex-end", marginHorizontal:20,marginTop:20} }>
         <Button
          title="Save"
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTittle}
          onPress={()=>addtodo()}
          
          />
         </View>
      </View> 
            </Modal>
           
            
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    header:{
        padding:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    footer:{
        position:"absolute",
        bottom:0,
        color:colors.white,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:20,
    },
    inputContainer:{
        backgroundColor:colors.white,
        elevation:40,
        flex:1,
        height:50,
        marginVertical:20,
        marginRight:20,
        borderRadius:30,
        paddingHorizontal:20,
    },
    container :{
        backgroundColor: "black",
        flex:1
    },
        
    textinput1:{
        color:"white",
        fontSize: 20,
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
    },  
    textinput2:{
        color:"white",
        fontSize: 20,
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        height:200
    },  
    textinput3:{
        color:"white",
        fontSize: 20,
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        width:135
        
    },  
    createButton:{
        backgroundColor:"blue",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1,
        borderColor:"#1db0e3",
        height:50,
        paddingHorizontal:20
    },
    createButtonTittle:{
        color:"#fff",
        fontSize: 26,
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:"center",
        marginTop:-3
    },
    iconContainer:{
        height:50,
        width:50,
        backgroundColor:colors.primary,
        borderRadius:25,
        elevation:40,
        justifyContent:"center",
        alignItems:"center"
    },
    actionIcon:{
        height:25,
        width:25,
        backgroundColor:"green",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:5,
        borderRadius:3,
    },
    ListItem:{
        padding:20,
        backgroundColor:colors.white,
        flexDirection:"row",
        elevation:12,
        borderRadius:7,
        marginVertical:10,
    },
})