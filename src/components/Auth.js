import React, { Component } from 'react'
import PinView from 'react-native-pin-view'
import { AsyncStorage, View, Text, StyleSheet, BackHandler } from 'react-native'
import { Icon } from 'native-base'
//import { AsyncStorage } from 'react-native-comunity/async-storage'
import commonStyles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux'

import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode'
export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: '',
            pin: ''
        };
    }
    getState = async () => {
        const value = await AsyncStorage.getItem('senha');
        if (value) {
            return {
                status: 'enter'
            }
        }
        return {
            status: 'choose'
        }
    }
    hasSet = async () => {
        const pin = await AsyncStorage.getItem('senha');
        if (!pin) {
            this.setState({ status: 'choose' });
        } else {
            this.setState({ status: 'enter', pin });
        }
    }
    render() {
        this.hasSet();
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <PINCode
                    status={this.state.status}
                    storePin={async (pin) => {
                        await AsyncStorage.setItem('senha', pin);
                        this.setState({ status: 'enter' })
                    }}
                    colorPassword={'#000'}
                    storedPin={this.state.pin}
                    onClickButtonLockedPage={() => BackHandler.exitApp()}
                    subtitleChoose={'Digite um PIN'}
                    subtitleError={'Por favor, tente novamente'}
                    subtitleConfirm={'Confirme seu PIN'}
                    subtitleEnter={'Digite seu PIN'}
                    textDescriptionLockedPage={'Para sua segurança, o acesso foi bloqueado por 5 minutos.'}
                    textSubDescriptionLockedPage={'Volte mais tarde e tente novamente'}
                    titleAttemptFailed={'PIN incorreto'}
                    textTitleLockedPage={'Ops!'}
                    titleAttemptFailed={'PIN incorreto!'}
                    finishProcess={async () => {
                        Actions.home({ type: 'reset' });
                    }} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }

})
