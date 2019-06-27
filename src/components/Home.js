import React, { Component } from 'react';
import { StyleSheet, StatusBar, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Container, Left, Button, Body, Title, Icon, Content, Right } from 'native-base';
import ActionButton from 'react-native-action-button';


/** Styles */
import commomStyles from '../Styles/Styles'
import Senhas from './Senhas.js';
import AddSenha from './AddSenha'

import Db from '../dao/Db'

const bd = new Db();

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addSenha: false,
            refresheSenhas: false,
            senhas: []
        }

        this.getSenhas();
    }


    excluirSenha = async (id) => {
        await bd.deleteSenha(id);
        let senhas = this.state.senhas.filter(senha => {
            if (senha.id !== id)
                return senha;
        });
        this.setState({ senhas });
    }

    async getSenhas() {
        let senhas = await bd.getAllSenhas();
        this.setState({ senhas, refresheSenhas: !this.state.refresheSenhas });
    }
    adcionarSenha = async (senha) => {
        //alert(JSON.stringify(senha));
        let { insertId } = await bd.insertSenha(senha);
        let senhas = this.state.senhas;
        senha.id = insertId;
        senhas.push(senha);
        this.setState({ senhas, addSenha: false }, this.rerender, this.rerender);
    }

    rerender() {
        this.setState({ refresheSenhas: !this.state.refresheSenhas })
    }

    render() {

        return (

            <Container>
                <Header style={styles.header} rounded>

                    <Body style={{ marginLeft: 0 }}>
                        <Title>Minhas senhas</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Actions.alterpassword()}>
                            <Icon type='FontAwesome5' name='key' />
                        </Button>
                        <Button transparent onPress={() => this.getSenhas()}>
                            <Icon type='FontAwesome5' name='redo' />
                        </Button>
                    </Right>
                </Header>
                <StatusBar backgroundColor={commomStyles.primaryColor.color} />
                <Content style={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
                    <AddSenha isVisible={this.state.addSenha}
                        onSave={this.adcionarSenha}
                        onCancel={() => this.setState({ addSenha: false })} />
                    <FlatList
                        extraData={this.state}
                        data={this.state.senhas}
                        renderItem={({ item }) => <Senhas delete={(id) => this.excluirSenha(id)} {...item} />}
                        keyExtractor={item => `${item.id}`}
                    />
                </Content>
                <ActionButton buttonColor={'green'} onPress={() => this.setState({ addSenha: true })} />
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: commomStyles.primaryColor.color,
        color: '#7F3F97',
    }
})