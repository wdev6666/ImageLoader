import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text, Image } from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Images() {
    const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://api.slingacademy.com/v1/sample-data/photos");
    const data = await resp.json();
    setData(data.photos);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
        <TouchableOpacity onPress={
            () => navigation.navigate(
                `ImageDetail`, 
                {
                    id: item.id,
                    title: item.title,
                    url: item.url,
                    description: item.description
                })}>
            <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
                <Image
                alt={item.title}
                style={styles.image}
                source={{
                uri: item.url,
                }}
            />
                <Text style={styles.titleText}>{item.title}</Text>
                <Text>{item.description}</Text>
            </Box>
        </TouchableOpacity>

    );
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
      <Box> Images</Box>
        {loading && <Box>Loading..</Box>}
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Center>
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