import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {fetch} from 'react-native-ssl-pinning';

const SslPinning: React.FC = () => {
  const [show, setShow] = useState<any>();
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows/526', {
      method: 'GET',
      pkPinning: true,
      // disableAllSecurity: true,
      sslPinning: {
        certs: ['sha256/c/0nAAuHA5w68X9XBR7OcxMVtuBYAPl9QRcDFgm6+QE='],
      },
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        e_platform: 'mobile',
      },
    })
      .then(async response => setShow(await response.json()))
      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <View style={style.container}>
      {show && <Image style={style.img} source={{uri: show.image.medium}} />}
      {show && <Text style={style.text}>{show.name}</Text>}
      {!show && (
        <Text style={style.text}>
          {hasError ? 'Man-in-the-middle' : 'Loading...'}
        </Text>
      )}
    </View>
  );
};
//openssl x509 -in mycert.pem -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

export default SslPinning;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  text: {
    color: 'gray',
    fontSize: 24,
  },
});
