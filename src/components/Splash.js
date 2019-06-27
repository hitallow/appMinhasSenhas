import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native'
import commonStyles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux'
import { Icon } from 'native-base'
export default class Splash extends Component {

    async componentDidMount() {
        await setTimeout(
            () => Actions.auth({ type: 'reset' }),
            5000);
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: commonStyles.primaryColor.color }}>
                <StatusBar backgroundColor={commonStyles.primaryColor.color} />
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ fontSize: 40, color: '#fff', marginLeft: 10 }}>Minhas senhas</Text>
                    <Icon type='FontAwesome5' name='key' size={50} style={{ margin: 10, color: '#fff' }} />
                </View>
            </View>
        )
    }
}