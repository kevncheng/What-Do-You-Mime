import React from 'react';
import { View } from 'react-native';
import {ListItem, Divider} from 'react-native-elements';

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
