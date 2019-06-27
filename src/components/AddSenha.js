import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { Picker, Form, Button, Label } from 'native-base'

import commomStyles from '../Styles/Styles'

import ImagePicker from 'react-native-image-picker'

export default class AddTask extends Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }


    getInitialState = () => {
        return {
            titulo: '',
            categoria: 'banco',
            login: '',
            senha: '',
            descricao: '',
            imagem: null,
            nomeBanco: '',
            dono: '',
            endereco: '',

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

    save = () => {
        if (!this.state.descricao.trim()) {
            Alert.alert('Dados inválidos', 'Infome uma descrição válida amigão')
            return
        }
        if (!this.state.senha.trim()) {
            Alert.alert('Dados inválidos', 'Infome uma senha')
            return
        }
        if (!this.state.titulo.trim()) {
            Alert.alert('Dados inválidos', 'Infome um titulo')
            return
        }

        const data = { ...this.state }
        this.props.onSave(data)
        this.setState({ ...this.getInitialState() })
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
            <Modal onRequestClose={this.props.onCancel} visible={this.props.isVisible}
                animationType='slide' transparent={true} onShow={() => this.setState({ ...this.getInitialState })}>
                <TouchableWithoutFeedback onPress={this.props.onCancel} >
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
                <View style={styles.container} >
                    <Text style={styles.header}>
                        Nova senha
                    </Text>
                    <Form>
                        <Picker style={styles.button} note mode='dropdown' selectedValue={this.state.categoria} onValueChange={(categoria) => this.setState({ categoria })}>
                            <Picker.Item label='Banco' value='banco' />
                            <Picker.Item label='Website' value='website' />
                            <Picker.Item label='Wifi' value='wifi' />
                            <Picker.Item label='Outro' value='outro' />
                        </Picker>

                        {inputs}
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                            <TouchableOpacity style={styles.btnCancel} onPress={this.props.onCancel}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnConfirm}onPress={this.save}>
                                <Text style={styles.textButton}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </Form>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel} >
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
            </Modal>
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