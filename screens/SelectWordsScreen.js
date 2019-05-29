import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { words, hardWords } from '../words';
import { selectWordList, unselectWordList, deleteWordList, resetWords } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import WordSet from '../components/WordSet';

class SelectWordsScreen extends Component {
    onCheckBoxClicked = (title, words) => {
        const { selected, selectWordList, unselectWordList, resetWords } = this.props;
        !selected[title] ? selectWordList({ title, words }) : unselectWordList({ title, words });
        resetWords();
    };

    onDeleteSet = title => {
        const { unselectWordList, deleteWordList } = this.props;
        Alert.alert(
            'Are you sure you want to delete',
            `'${title}' ?`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        unselectWordList({ title, words });
                        deleteWordList({ title });
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                ,
            ],
            { cancelable: false }
        );
    };

    render() {
        const { selected, wordList, CharadeWords, MasterWordList } = this.props;
        console.log(MasterWordList);
        console.log('Words in play:' + CharadeWords);

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Button
                        title='Go Back'
                        icon={{ name: 'chevron-left', color: '#007AFF' }}
                        type='clear'
                        onPress={() => Actions.home()}
                    />
                    <Button
                        title='Create Your Own Set Of Words'
                        icon={{ name: 'add', color: '#007AFF' }}
                        type= 'clear'
                        iconRight
                        onPress={() => Actions.createWords()}
                    />
                </View>
                <Divider/>
                <View style={{ flex: 4, justifyContent: 'flex-start' }}>
                    <ScrollView style={{ flex: 1 }}>
                        <ListItem
                            title='Default Words'
                            checkBox={{
                                checked: Boolean(selected['Default Words']),
                                onPress: () => {
                                    this.onCheckBoxClicked('Default Words', words);
                                }
                            }}
                        />
                        <Divider />
                        <ListItem
                            title='Hard Words'
                            checkBox={{
                                checked: Boolean(selected['Hard Words']),
                                onPress: () => {
                                    this.onCheckBoxClicked('Hard Words', hardWords);
                                }
                            }}
                        />
                        <Divider />

                        <WordSet
                            wordList={wordList}
                            handlePress={this.onCheckBoxClicked}
                            checkSelect={selected}
                            deleteSet={this.onDeleteSet}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { selected, wordList, MasterWordList, CharadeWords } = state.setting;
    return { selected, wordList, MasterWordList, CharadeWords };
};

export default connect(
    mapStateToProps,
    { selectWordList, unselectWordList, deleteWordList, resetWords }
)(SelectWordsScreen);