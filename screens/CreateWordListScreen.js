import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, ListView, Input, ListItem, List, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createWordList } from '../actions';
import WordList from '../components/WordList';
import _ from 'lodash';

class CreateWordListScreen extends Component {
    state = {
        words: [],
        inputWord: '',
        title: '',
        titleError: '',
        addWordsError: ''
    };

    onPressFinish = () => {
        const { title, words } = this.state;
        if (title <= 1 || words.length < 1) {
            let titleError = title <= 1 ? 'Please Enter A Title' : '';
            let addWordsError = words.length <= 1 ? 'Please Create Atleast One Word' : '';
            this.setState({ titleError, addWordsError });
        } else {
            this.props.createWordList({title, words});
            Actions.selectWords({ type: 'reset' });
        }
    };

    onPressAddWord = () => {
        const { inputWord } = this.state;
        if (inputWord.length >= 1) {
            this.setState((prevState) =>({
                words: [...prevState.words, inputWord],
                inputWord: '',
                addWordsError: ''
            }));
        } else {
            this.setState({ addWordsError: 'Can not enter blank' });
        }
    };

    onPressDeleteWord = (word) => {
        this.setState({ words: _.without(this.state.words, word) });
    };

    render() {
        const {titleError,addWordsError,words, inputWord} = this.state
        console.log(words)
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            title='Go Back'
                            icon={{ name: 'chevron-left', color: '#007AFF' }}
                            type='clear'
                            onPress={() => Actions.selectWords()}
                            
                        />
                        <Button
                            title='Finish'
                            onPress={() => this.onPressFinish()}
                            type='clear'
                            icon={{ name: 'done-all', color: 'green' }}
                            iconRight
                        />
                    </View>
                </TouchableWithoutFeedback>
                <Input
                    label='Create a title'
                    onChangeText={value => this.setState({ title: value })}
                    containerStyle={{ marginBottom: 20 }}
                    errorStyle={{ position: 'absolute', bottom: -20 }}
                    errorMessage={titleError}
                />
                <Input
                    label='Add Word'
                    onChangeText={value => this.setState({ inputWord: value })}
                    rightIcon={
                        <Button type='clear' icon={{ name: 'add' }} onPress={this.onPressAddWord} />
                    }
                    value={inputWord}
                    containerStyle={{ marginBottom: 20 }}
                    errorStyle={{ position: 'absolute', bottom: -20 }}
                    errorMessage={addWordsError}
                />

                <ScrollView style={{ flex: 3 }}>
                    <WordList words={words} handlePress={this.onPressDeleteWord} />
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    null,
    { createWordList }
)(CreateWordListScreen);
