import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const SslPinning: React.FC = () => {
  const [show, setShow] = useState<any>();
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows/526')
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
