import React from 'react'
import { Text, View } from 'react-native'
import { t } from 'i18next';

export const HomeOrders = (props) => {
    const pp = props.props
    console.log('or - ', pp)
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={{ alignItems: 'center', marginTop: 50, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Last Orders')}</Text>
            {

            }
        </View>
    )
}
