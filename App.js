import React from 'react';
import {View,Button,ScrollView,Text,Switch,StyleSheet,
} from 'react-native';
import { Constants } from 'expo';

let id=0;

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  fill: {
    flex: 1,
  }
})

const Todo = props => 
(
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onValueChange={props.toggle}/>
    <Text> {props.todo.text}</Text>
    <Button onPress={props.delete} title="delete"/>
  </View>
)

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  render(){
    return(
      <View style={[styles.appContainer,styles.fill]}>
        <Text>total number of todos {this.state.todos.length}</Text>
        <Text>todos left {this.state.todos.filter(todo=>todo.checked!=false).length}</Text>
       <Button onPress={() => this.addtodo()} title="Add TODO" />
        <ScrollView style={styles.fill}>
         {
           this.state.todos.map(todo=>(<Todo
           todo={todo}
           delete={()=>this.deletetodo(todo.id)}
           toggle={()=>this.toggletodo(todo.id)}        
           />))
         }
        </ScrollView>
      </View>
    )
  }

   addtodo() {
    id++
    const text = `TODO number ${id}`
    this.setState({
      todos:[...this.state.todos,{text:text,id:id,checked:false}],
    })   
  }

  deletetodo(id)
  {
    this.setState({todos:this.state.todos.filter(todo=>todo.id!==id)})
  }
  toggletodo(id)
  {
    this.setState({todos:this.state.todos.map(todo=>{
      if(todo.id!==id)
      return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
    })})
  }
}
