import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {fetch} from 'react-native-ssl-pinning';

const SslPinning: React.FC = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetch('https://api.github.com/users/ismaelsousa', {
      method: 'GET',
      pkPinning: true,
      // disableAllSecurity: true,
      sslPinning: {
        certs: ['sha256/r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E='],
      },
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        e_platform: 'mobile',
      },
    })
      .then(async response => setUser(await response.json()))
      .catch(() => Alert.alert('Error', 'Error fetching user'));
  }, []);

  // openssl s_client -servername api.github.com -connect api.github.com:443 | openssl x509 -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

  //openssl s_client -servername api.github.com -connect api.github.com:443 </dev/null | sed -n -e '/-.BEGIN/,/-.END/ p' > mycert.pem
  //openssl x509 -in mycert.pem -outform der -out mycert.cer
  return (
    <View style={style.container}>
      {user && <Image style={style.img} source={{uri: user.avatar_url}} />}
      {user && <Text>{user.name}</Text>}
      {!user && <Text>Loading...</Text>}
    </View>
  );
};
//openssl x509 -in mycert.pem -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

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
