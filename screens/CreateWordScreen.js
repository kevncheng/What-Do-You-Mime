import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class CreateWordScreen extends Component {
  render() {
    return (
      <View>
        <Input
            label = 'Title'
        />
        <Input 
            label = 'Word'
        />

        <Button
            title = 'Add Word'
        />
        <ScrollView>
            
        </ScrollView>
      </View>
    );
  }
}

export default CreateWordScreen;