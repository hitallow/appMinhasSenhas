import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import Db from '../dao/Db'
import AwesomeAlert from 'react-native-awesome-alerts';
import SweetAlert from 'react-native-sweet-alert';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

const bd = new Db();

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            alertsShow: false
        }
    }

    hideAlert = () => {
        this.setState({ alertsShow: false });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput placeholder='seu nome' onChangeText={name => this.setState({ name })} />
                <TextInput placeholder='seu username' onChangeText={username => this.setState({ username })} />
                <TextInput placeholder='sua senha' onChangeText={password => this.setState({ password })} />

                <TouchableOpacity style={{ margin: 20 }} onPress={() => bd.insertUser({ ...this.state })} >
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 20 }} onPress={() => bd.getAllUSers()} >
                    <Text>ver todo mundo</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.setState({ alertsShow: !this.state.alertsShow })
                    // SweetAlert.showAlertWithOptions({
                    //     title: 'Tudo certo!',
                    //     subTitle: 'Você acabou de ser cadastrado!',
                    //     //confirmButtonTitle: 'Continuar',
                    //     confirmButtonColor: '#000',
                    //     otherButtonTitle: 'Cancel',
                    //     otherButtonColor: '#7F3F97',
                    //     style: 'success',
                    //     cancellable: true,

                    // },
                    //     callback => console.log('callback')),
                    //     callback => console.log("oi")
                }}>
                    <Text>CLICAR AQUI</Text>
                </TouchableOpacity>

                <SCLAlert
                    show={this.state.alertsShow}
                    onRequestClose={this.hideAlert}
                    theme="danger"
                    title="Tudo ok meu rei"
                    subtitle="Agora da pra você trampar de boas!"
                    slideAnimationDuration={500}
                    headerIconComponent={<Icon name="rocket" size={32} color="white" />}
                >
                    <SCLAlertButton containerStyle={{backgroundColor:'#7F3F97' }} theme="success" onPress={this.hideAlert}>Continuar</SCLAlertButton>
                
                </SCLAlert>


                <AwesomeAlert
                    show={this.state.alertsShow1}
                    showProgress={false}
                    Overlay style
                    title="Você acabou de ser cadastrado!"
                    message="Clique para continuar"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Continuar"
                    confirmButtonColor="#7F3F97"
                    messageStyle={{
                        color: 'red',
                    }}
                    overlayStyle={{

                    }}
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />


            </View>
        )
    }

}