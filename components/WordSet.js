import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import _ from 'lodash'

const WordSet = ({ wordList, handlePress, checkSelect, deleteSet }) => {
    return (
        <View>
            {_.map(wordList, function(e, i) {
                return (
                    <View key={i}>
                        <ListItem
                            title={e.title}
                            onLongPress = {() => deleteSet(e.title)}
                            checkBox={{
                                checked: Boolean(checkSelect[e.title]),
                                onPress: () => handlePress(e.title,e.words)
                            }}
                        />
                        <Divider />
                    </View>
                );
            })}
        </View>
    );
};

export default WordSet;
