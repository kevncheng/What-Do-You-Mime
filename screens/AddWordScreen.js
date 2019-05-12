import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

class AddWordScreen extends Component {
  render() {
    return (
      <View>
      <ListItem
        title = 'Hard Words'
        checkBox 
      />
        <Button 
            title = 'Create Your Own Set Of Words'
            icon = 'add'
        />
      </View>
    );
  }
}

export default AddWordScreen;