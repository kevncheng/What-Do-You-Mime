import React, { Component } from 'react';
import { View, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, Text } from 'react-native';
import { Button, Input, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createWordList, deleteWordList, unselectWordList } from '../actions';
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

    componentDidMount = () => {
        const { words, title } = this.props;
        if (words) {
            this.setState({ words, title });
        }
    };

    onPressFinish = () => {
        const { title, words } = this.state;
        if (title <= 1 || words.length < 1) {
            let titleError = title <= 1 ? 'Please Enter A Title' : '';
            let addWordsError = words.length <= 1 ? 'Please Create Atleast One Word' : '';
            this.setState({ titleError, addWordsError });
        } else {
            this.props.createWordList({ title, words });
            Actions.selectWords({ type: 'reset' });
        }
    };

    onPressAddWord = () => {
        const { inputWord } = this.state;
        if (inputWord.length >= 1) {
            this.setState(prevState => ({
                words: [...prevState.words, inputWord],
                inputWord: '',
                addWordsError: ''
            }));
        } else {
            this.setState({ addWordsError: 'Can not enter blank' });
        }
    };

    onPressDeleteWord = word => {
        this.setState({ words: _.without(this.state.words, word) });
    };

    renderDeleteButton = () => {
        if (this.props.edit) {
            return (
                <>
                    <Button
                        title='Delete Word Set'
                        titleStyle={{ color: 'red' }}
                        type='clear'
                        icon={{ name: 'delete', color: 'red' }}
                        onPress={() => {
                            this.onPressDeleteWordSet();
                        }}
                    />
                </>
            );
        }
    };

    onPressDeleteWordSet = () => {
        const { unselectWordList, deleteWordList } = this.props;
        const { title, words } = this.state;
        Alert.alert(
            'Are you sure you want to delete',
            `'${title}' ?`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        Actions.pop();
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

    renderTitle = () => {
        if (this.props.edit) {
            return (
            <>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 50,
                        color: '#007AFF',
                        fontWeight: 'bold'
                    }}
                >
                    {this.state.title}
                </Text>
                <Divider style = {{marginBottom: 20}}/>
            </>);
        }
        return (
            <>
                <Input
                    label='Create a title'
                    onChangeText={value => this.setState({ title: value })}
                    value={this.state.title}
                    containerStyle={{ marginBottom: 20 }}
                    errorStyle={{ position: 'absolute', bottom: -20 }}
                    errorMessage={this.state.titleError}
                />
            </>
        );
    };

    render() {
        const { addWordsError, words, inputWord } = this.state;
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
                        {this.renderDeleteButton()}
                        <Button
                            title='Finish'
                            onPress={() => this.onPressFinish()}
                            type='clear'
                            icon={{ name: 'done-all', color: 'green' }}
                            iconRight
                        />
                    </View>
                </TouchableWithoutFeedback>
                {this.renderTitle()}
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
                <View style={{ flex: 3 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <WordList words={words} handlePress={this.onPressDeleteWord} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default connect(
    null,
    { createWordList, deleteWordList, unselectWordList }
)(CreateWordListScreen);
