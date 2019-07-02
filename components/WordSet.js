import React from 'react';
import { View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

const WordSet = ({ wordList, handlePress, checkSelect }) => {
    return (
        <View>
            {_.map(wordList, function(e, i) {
                return (
                    <View key={i}>
                        <ListItem
                            title={e.title}
                            onPress={() =>
                                Actions.createWords({ words: e.words, title: e.title, edit: true })
                            }
                            checkBox={{
                                checked: Boolean(checkSelect[e.title]),
                                onPress: () => handlePress(e.title, e.words)
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
