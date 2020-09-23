import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Notes from './Notes';

class MyTasks extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notes : [],
            note: ''
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('notes')
        .then((value)=>{
        const data = JSON.parse(value);
        this.setState({notes: data})
        });
    }


    render () {

        let notes = this.state.notes.map((val, key) => (
                <Notes keyval={key} note={val.note} date={val.date} deleteMethod={()=> this.deleteNote(key)}/>
        ))

      return (
        <SafeAreaView>
                    <Text style={styles.heading}>My Tasks</Text>
                    <View style={styles.inputConatiner}>
                        <TextInput style={styles.input} value={this.state.note} placeholder='Add a Note..' onChangeText={(note) => this.setState({note})}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={this.addTask.bind(this)}>
                            <Text style={styles.buttonText}>
                                Go
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        {notes}
                    </ScrollView>
            
        </SafeAreaView>
      );
    }

    addTask(){
        if(this.state.note){

            var ts = new Date();

            this.state.notes.push({
                'note' : this.state.note,
                'date' : ts.toDateString()
            });

            this.setState({notes : this.state.notes});
            this.setState({note : this.state.note});

            AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));
        }
        this.state.note = '';
        this.setState({note : this.state.note})
    }

    deleteNote(key){
        this.state.notes.splice(key,1);
        this.setState({notes:this.state.notes});
        AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));
    }
}

export default MyTasks;


const styles = StyleSheet.create({

    heading:{
        fontSize: 40,
        fontWeight: "bold",
        padding: 20,
        fontFamily: 'Roboto'
    },

    input:{
        flex: 1,
        fontSize: 20,
        borderWidth: 0.5,
        padding: 10,
        marginRight: 10,
        borderRadius: 50,
        borderColor: '#6200EE',
        color: '#333333'
    },

    button : {
        width : 50,
        height: 50,
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: '#6200EE',
        borderRadius: 50,
    },

    buttonText: {
        color: '#fff',
        fontWeight : 'bold'
    },

    inputConatiner : {
        flexDirection : 'row',
        alignItems: 'center',
        padding: 10
    }
});

  