import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';

const SslPinning: React.FC = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetch('https://api.github.com/users/ismaelsousa')
      .then(async response => setUser(await response.json()))
      .catch(() => Alert.alert('Error', 'Error fetching user'));
  }, []);

  return (
    <View style={style.container}>
      {user && <Image style={style.img} source={{uri: user.avatar_url}} />}
      {user && <Text>{user.name}</Text>}
      {!user && <Text>Loading...</Text>}
    </View>
  );
};

export default SslPinning;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
