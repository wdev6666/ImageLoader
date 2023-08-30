import React, { useState, useEffect } from "react";
import { Box, NativeBaseProvider, Text, Image } from "native-base";
import { StyleSheet } from "react-native";


export default function ImageDetail({route, navigation}) {
    const {id, title, url, description} = route.params;
    return(
        <NativeBaseProvider>
        <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
            <Image
                alt={title}
                style={styles.image}
                source={{
                uri: url,
                }}
            />
            <Text style={styles.titleText}>{title}</Text>
            <Text>{description}</Text>
        </Box>
        </NativeBaseProvider>
    );

}
const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'Cochin',
        fontSize: 20,
        fontWeight: 'bold',
      },

      image: {
        width: 200,
        height: 200,
      },
});