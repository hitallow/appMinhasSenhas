import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon} from 'native-base'


import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'
import { Actions } from 'react-native-router-flux';


export default class Senhas extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            categoria: props.categoria,
            login: props.login,
            senha: props.senha,
            descricao: props.descricao,
            titulo: props.titulo,
            showPassword: false,
            alertsShow: false,
            adcionadoEm: props.adcionadoEm,
            nomeBanco: props.nomeBanco,
            dono: props.dono,
            endereco: props.endereco
        }
    }

    hideAlert = () => {
        this.setState({ alertsShow: false });
    }

    render() {
        let value = null;
        if (this.state.categoria === 'banco') {
            value = (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Icon type='FontAwesome' name='bank' />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{this.state.titulo} </Text>
                            <Text style={{ fontSize: 10 }}>{this.state.adcionadoEm}</Text>
                        </View>

                        <Text>Banco : {this.state.nomeBanco}</Text>
                        <Text>Titular: {this.state.dono}</Text>
                    </View>
                </View>
            )
        } else if (this.state.categoria === 'website') {
            value = (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Icon type='FontAwesome5' name='internet-explorer' />
                </View>
                <View style={{ paddingLeft: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>{this.state.titulo} </Text>
                        <Text style={{ fontSize: 10 }}>{this.state.adcionadoEm}</Text>
                    </View>

                    <Text>Login : {this.state.login}</Text>
                    <Text>Endereço : {this.state.endereco}</Text>
                </View>
            </View>)
        } else if (this.state.categoria === 'wifi') {
            value = (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Icon type='FontAwesome5' name='wifi' />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{this.state.titulo} </Text>
                            <Text style={{ fontSize: 10 }}>{this.state.adcionadoEm}</Text>
                        </View>
                        <Text>Rede : {this.state.login}</Text>
                    </View>
                </View>
            )
        } else if (this.state.categoria === 'outro') {
            value = (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Icon type='FontAwesome5' name='question-circle' />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{this.state.titulo} </Text>
                            <Text style={{ fontSize: 10 }}>{this.state.adcionadoEm}</Text>
                        </View>
                        <Text>Login : {this.state.login}</Text>
                    </View>
                </View>
            )
        }

        //<Text>descrição: {this.state.descricao}</Text>
        return (
            <View style={styles.container}>
                <SCLAlert
                    show={this.state.alertsShow}
                    onRequestClose={this.hideAlert}
                    theme="danger"
                    title="Cuidado"
                    subtitle="Você tem certeza que quer excluir este registro?"
                    slideAnimationDuration={500}
                    headerIconComponent={<Icon type='FontAwesome5' name="trash" size={32} color="white" />}
                >
                    <SCLAlertButton theme="danger" onPress={() => this.props.delete(this.state.id)}>Confirmar</SCLAlertButton>
                    <SCLAlertButton theme="info" onPress={this.hideAlert}>Cancelar</SCLAlertButton>

                </SCLAlert>
                <SCLAlert
                    show={this.state.showPassword}
                    onRequestClose={() => { this.setState({ showPassword: false }) }}
                    theme="info"
                    title={this.state.descricao}
                    subtitle={this.state.senha}
                    slideAnimationDuration={500}
                    headerIconComponent={<Icon type='FontAwesome5' name="key" size={32} color="white" />}
                >
                    <SCLAlertButton theme="info" onPress={() => { this.setState({ showPassword: false }) }}>OK</SCLAlertButton>
                </SCLAlert>
                {value}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                    <TouchableOpacity onPress={() => Actions.editpassword({ ...this.state })} style={styles.button} >
                        <Icon type='FontAwesome5' size={20} name='pen' />
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                        <Icon type='FontAwesome5' name={'eye'} />
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ alertsShow: true })}>
                        <Icon type='FontAwesome5' name='trash' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        margin: 5
    },
    container: {
        borderColor: '#000',
        borderWidth: 2,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        //height: Dimensions.get('window').height * 10 / 100,
        padding: 10,
        fontSize: 24,
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: 'gray',
        justifyContent: 'space-between',
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    prove: {
        borderColor: '#000', borderWidth: 2
    }
})
