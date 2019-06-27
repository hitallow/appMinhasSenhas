import React, { Component } from 'react'
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { Form, Button, Label, Container, Content, Header, Body, Title, Icon, Left } from 'native-base'

import { Actions } from 'react-native-router-flux';
import commomStyles from '../Styles/Styles';

import ImagePicker from 'react-native-image-picker';

import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

import Db from '../dao/Db'
const bd = new Db();

export default class AddTask extends Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }


    getInitialState = () => {
        return {
            titulo: this.props.titulo,
            categoria: this.props.categoria,
            login: this.props.login,
            senha: this.props.senha,
            descricao: this.props.senha,
            imagem: null,
            nomeBanco: this.props.nomeBanco,
            dono: this.props.dono,
            endereco: this.props.endereco,
            showModal: false,
            id: this.props.id

        }
    }

    pickImage = () => {
        ImagePicker.showImagePicker({
            title: 'Escolha sua imagem',
            maxHeight: 600,
            maxWidth: 800,
        }, (res) => {
            if (!res.didCancel) {
                this.setState({ imagem: { uri: res.uri, base64: res.data } })
            }
        })
    }

    alterDados = async () => {
        await bd.editSenha({ ...this.state });
        this.setState({ showModal: true });

    }
    render() {

        let inputs = null;
        if (this.state.categoria === 'banco') {
            inputs = (
                <View>
                    <TextInput style={styles.button} value={this.state.titulo} maxLength={15} onChangeText={(titulo) => this.setState({ titulo })} placeholder='Adcione um titulo' />
                    <TextInput style={styles.button} value={this.state.nomeBanco} onChangeText={(nomeBanco) => this.setState({ nomeBanco })}
                        placeholder='Nome do banco' />
                    <TextInput style={styles.button} placeholder='Titular da conta' value={this.state.dono} onChangeText={(dono) => this.setState({ dono })} />
                    <TextInput style={styles.button} value={this.state.senha} onChangeText={(senha) => this.setState({ senha })} placeholder='Digite a senha' />
                    <TextInput style={styles.button} value={this.state.descricao} onChangeText={(descricao) => this.setState({ descricao })}
                        placeholder='Adcione uma breve descrição...' />
                </View>
            );
        } else if (this.state.categoria === 'website') {
            inputs = (
                <View>
                    <TextInput style={styles.button} value={this.state.titulo} maxLength={15} onChangeText={(titulo) => this.setState({ titulo })} placeholder='Adcione um titulo' />
                    <TextInput style={styles.button} value={this.state.login} onChangeText={(login) => this.setState({ login })}
                        placeholder='Login' />
                    <TextInput style={styles.button} value={this.state.senha} onChangeText={(senha) => this.setState({ senha })} placeholder='Digite a senha' />
                    <TextInput style={styles.button} value={this.state.endereco} onChangeText={(endereco) => this.setState({ endereco })} placeholder='endereço do site' />
                    <TextInput style={styles.button} value={this.state.descricao} onChangeText={(descricao) => this.setState({ descricao })}
                        placeholder='Adcione uma breve descrição...' />
                </View>
            )
        } else if (this.state.categoria === 'wifi') {
            inputs = (
                <View>
                    <TextInput style={styles.button} value={this.state.titulo} maxLength={15} onChangeText={(titulo) => this.setState({ titulo })} placeholder='Adcione um titulo' />
                    <TextInput style={styles.button} value={this.state.login} onChangeText={(login) => this.setState({ login })}
                        placeholder='Nome da rede' />
                    <TextInput style={styles.button} value={this.state.senha} onChangeText={(senha) => this.setState({ senha })} placeholder='Digite a senha' />
                    <TextInput style={styles.button} value={this.state.descricao} onChangeText={(descricao) => this.setState({ descricao })}
                        placeholder='Adcione uma breve descrição...' />
                </View>
            )
        } else if (this.state.categoria === 'outro') {
            inputs = (
                <View>
                    <TextInput style={styles.button} value={this.state.titulo} maxLength={15} onChangeText={(titulo) => this.setState({ titulo })} placeholder='Adcione um titulo' />
                    <TextInput style={styles.button} value={this.state.login} onChangeText={(login) => this.setState({ login })}
                        placeholder='Login/email' />
                    <TextInput style={styles.button} value={this.state.senha} onChangeText={(senha) => this.setState({ senha })} placeholder='Digite a senha' />
                    <TextInput style={styles.button} value={this.state.descricao} onChangeText={(descricao) => this.setState({ descricao })}
                        placeholder='Adcione uma breve descrição...' />
                </View>
            )
        }

        return (
            <Container>
                <Header style={{ backgroundColor: '#7F3F97' }}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon type='FontAwesome5' name='arrow-left' />
                        </Button>
                    </Left>
                    <Body style={{ marginLeft: 0 }}>
                        <Title>Editar senha</Title>
                    </Body>
                </Header>
                <StatusBar backgroundColor={commomStyles.primaryColor.color} />
                <Content>
                    <SCLAlert
                        show={this.state.showModal}
                        onRequestClose={() => { this.setState({ showPassword: false }) }}
                        theme="info"
                        title="Tudo ok"
                        subtitle='Informações alteradas!'
                        slideAnimationDuration={500}
                        headerIconComponent={<Icon type='FontAwesome5' name="key" size={32} color="white" />}
                    >
                        <SCLAlertButton theme="info" onPress={() => { Actions.pop() }}>OK</SCLAlertButton>
                    </SCLAlert>
                    <View style={styles.container} >
                        <Form>
                            {inputs}
                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                                <TouchableOpacity style={styles.btnCancel} onPress={() => Actions.pop()}>
                                    <Text style={styles.textButton}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnConfirm} onPress={() => { this.alterDados() }}>
                                    <Text style={styles.textButton}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </Form>
                    </View>
                </Content>
            </Container>
        )
    }

}
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.default,
        padding: 2,
        borderBottomWidth: 0.8,
        borderBottomColor: "#cccccc",
        fontSize: 20,

    },
    btnConfirm: {
        padding: 20,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    btnCancel: {
        marginRight: 10,
        padding: 20,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    textButton: {
        fontSize: 17, color: '#fff', textAlign: 'center'
    }
    ,
    header: {
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.default,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        width: '90%',
        fontFamily: commomStyles.fontFamily,
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },
    date: {
        fontFamily: commomStyles.fontFamily,
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10
    }
})