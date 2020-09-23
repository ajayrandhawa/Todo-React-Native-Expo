import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Notes extends React.Component {
    
    render () {
      return (
        <View style={styles.container} key={this.props.keyval}>
            <View style={styles.taskList}>
            <Text style={styles.taskListText}>{this.props.note}</Text>
                <TouchableOpacity style={styles.taskListButton} onPress={this.props.deleteMethod}>
                    <Ionicons name="md-trash" size={22}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.taskListtime}>{this.props.date}</Text>
        </View>
      );
    }
}

export default Notes;


const styles = StyleSheet.create({

    container:{
        margin: 10,
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#cdcdcd',
        borderRadius: 5
    },

    taskList : {
        flexDirection: 'row',
    },

    taskListText : {
        flex: 1,
        
    },

    taskListButton : {
        padding: 5
    },

    taskListtime:{
        marginTop:20,
        color: '#8d8d8d',
        textAlign: 'right'
    }
});

  