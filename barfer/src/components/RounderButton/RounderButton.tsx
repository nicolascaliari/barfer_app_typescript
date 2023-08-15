import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface Props {
    text: string,
    onPress: () => void
}

export const RoundedButton = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity
        style={ styles.roundedButton }
        onPress={() => onPress()}
    >
        <Text style={ styles.textButton }>{ text }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    textButton: {
        color: 'white',
        // fontWeight: 'bold'
    }
});
