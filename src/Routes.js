import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import commonStyles from './Styles/Styles'
/* Componentes desenvolvidos*/

import Home from './components/Home'
import Register from './components/Register'
import Auth from './components/Auth'
import AlterPassword from './components/AlterPassword'
import Splash from './components/Splash'
import EditSenha from './components/EditSenha'


export default class Routes extends Component {

    render() {
        return (
            /** Rotas da aplicação */
            <Router navigationBarStyle={{ backgroundColor: commonStyles.primaryColor.color }} titleStyle={{ color: '#fff' }}>
                <Scene key='root'>
                    <Scene key='splash' hideNavBar initial={true} component={Splash} title='splash' />
                    <Scene key='auth' hideNavBar initial={false} component={Auth} title='Auth' />
                    <Scene key='home' hideNavBar initial={false} component={Home} title='Home' />
                    <Scene key='register' component={Register} title='register' />
                    <Scene key='alterpassword' component={AlterPassword} title='Alteração de PIN' />
                    <Scene key='editpassword' hideNavBar component={EditSenha} title='Edição de senha' />
                </Scene>
            </Router>
        )
    }
}