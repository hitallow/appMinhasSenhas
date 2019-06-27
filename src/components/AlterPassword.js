import React, { Component } from 'react'

import { AsyncStorage, View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
//import { AsyncStorage } from 'react-native-comunity/async-storage'

import { Actions } from 'react-native-router-flux'
import PINCode from '@haskkor/react-native-pincode'
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <SCLAlert
                    show={this.state.showModal}
                    onRequestClose={() => { this.setState({ showPassword: false }) }}
                    theme="info"
                    title="Tudo ok"
                    subtitle='Seu pin foi alterado com sucesso!'
                    slideAnimationDuration={500}
                    headerIconComponent={<Icon type='FontAwesome5' name="key" size={32} color="white" />}
                >
                    <SCLAlertButton theme="info" onPress={() => { Actions.pop() }}>OK</SCLAlertButton>
                </SCLAlert>
                <PINCode
                    status={'choose'}
                    storePin={async (pin) => {
                        await AsyncStorage.setItem('senha', pin);
                        this.setState({ showModal: true });
                    }}
                    colorPassword={'#000'}
                    subtitleChoose={'Digite um PIN'}
                    subtitleError={'Por favor, tente novamente'}
                    subtitleConfirm={'Confirme seu PIN'}
                />

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
