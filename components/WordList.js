import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
// words = [{ id: 12321, value: 'hello' }, {id: 1, value: 'world'}]

const WordList = ({words,handlePress}) => {
        return (
            <View>
                {words.map((word, i) => (
                    <View
                    key={i}>
                        <ListItem
                            title={word}
                            rightIcon={{ name: 'clear', color: 'red' }}
                            onPress={()=>handlePress(word)}
                        />
                        <Divider />
                    </View>
                ))}
            </View>
        );
    }


export default WordList;
