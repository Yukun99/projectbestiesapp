import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {dim} from '../../lib/Dimensions';
import ThemedText from '../../components/ThemedText';
import ThemedTextInput from '../../components/ThemedTextInput';
import {createUser} from '../../states/UserState';
import auth from '@react-native-firebase/auth';
import ThemedButton from '../../components/ThemedButton';
import useColors from '../../states/ThemeState';
import PersonalityTest from './PersonalityTest';
import {launchImageLibrary} from 'react-native-image-picker';
import ContainButton from '../../components/ContainButton';

const HEIGHT = dim.height;
const WIDTH = dim.width;
const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
};

export default function SignUp({user, update}) {
  const [name, setName] = useState(undefined);
  const email = auth().currentUser.email;
  const [age, setAge] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [imgBase64, setImgBase64] = useState(undefined);
  const [linkedInUrl, setLinkedInUrl] = useState(undefined);
  const projects = [];
  const colors = useColors();
  const [delay, setDelay] = useState(true);
  const [registered, setRegistered] = useState(false);
  let button = (
    <ThemedButton
      label={'Submit'}
      style={styles.submitButton}
      disabled={true}
      onPress={() => {
        createUser(name, email, age, year, imgBase64, linkedInUrl, projects);
      }}
    />
  );

  const [displayImage, setDisplayImage] = useState(
    <View style={[styles.image, {borderColor: colors.border}]}>
      <ThemedText
        text={'Upload Image'}
        color={colors.border}
        style={styles.imageText}
      />
    </View>,
  );

  useEffect(() => {
    if (image && image.assets) {
      setDisplayImage(
        <Image
          style={[styles.image, {borderColor: colors.border}]}
          source={{uri: image.assets[0].uri}}
        />,
      );
      setImgBase64(image.assets[0].base64);
    }
  }, [colors.border, image]);

  useEffect(() => {
    const timeout = setTimeout(() => setDelay(false), 3000);
    if (user && user.testResults) {
      update();
    }
    if (user) {
      setRegistered(true);
    }
    return () => clearTimeout(timeout);
  }, [update, user]);

  if (delay) {
    return null;
  }

  if (
    name &&
    email &&
    age &&
    year &&
    Number.isInteger(Number.parseInt(age, 10)) &&
    Number.isInteger(Number.parseInt(year, 10))
  ) {
    button = (
      <ThemedButton
        label={'Submit'}
        style={styles.submitButton}
        onPress={async () => {
          createUser(name, email, age, year, imgBase64, linkedInUrl, projects);
          setRegistered(true);
        }}
      />
    );
  }

  if (!registered) {
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ThemedText
            text={'Welcome to Project Besties!'}
            style={styles.title}
          />
          <ThemedText
            text={'Please fill in the information below to get started.'}
            style={styles.subtitle}
          />
          <ContainButton
            style={styles.image}
            content={displayImage}
            size={0.3 * HEIGHT}
            onPress={() =>
              launchImageLibrary(options, res => {
                setImage(res);
              })
            }
          />
          <View style={styles.inputContainer}>
            <ThemedText
              text={'Full Name (as on Student Card)'}
              style={styles.inputText}
            />
            <ThemedTextInput
              label={'Name'}
              onChangeText={data => setName(data)}
              value={name}
              autoCorrect={false}
              style={styles.inputBox}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText text={'Age'} style={styles.inputText} />
            <ThemedTextInput
              label={'Age'}
              onChangeText={data => setAge(data)}
              value={age}
              autoCorrect={false}
              style={styles.inputBox}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText text={'Year of Study'} style={styles.inputText} />
            <ThemedTextInput
              label={'Year'}
              onChangeText={data => setYear(data)}
              value={year}
              autoCorrect={false}
              style={styles.inputBox}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText text={'LinkedIn URL'} style={styles.inputText} />
            <ThemedTextInput
              label={'LinkedIn URL'}
              onChangeText={data => setLinkedInUrl(data)}
              value={linkedInUrl}
              autoCorrect={false}
              style={styles.inputBox}
              keyboardType={'url'}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText text={'Project List'} style={styles.inputText} />
            <ThemedText
              text={'List out a few of the projects you would like to attempt.'}
              style={styles.inputSubText}
            />
            <ThemedTextInput
              label={'Project 1'}
              onChangeText={data => {
                projects[0] = data;
              }}
              value={projects[0]}
              autoCorrect={false}
              style={styles.inputBox}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedTextInput
              label={'Project 2'}
              onChangeText={data => {
                projects[1] = data;
              }}
              value={projects[1]}
              autoCorrect={false}
              style={styles.inputBox}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedTextInput
              label={'Project 3'}
              onChangeText={data => {
                projects[2] = data;
              }}
              value={projects[2]}
              autoCorrect={false}
              style={styles.inputBox}
            />
          </View>
          <View style={styles.inputContainer}>{button}</View>
        </ScrollView>
      </View>
    );
  }
  return <PersonalityTest update={update} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: WIDTH,
    alignItems: 'center',
  },
  title: {
    paddingTop: 30,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    fontSize: 0.12 * WIDTH,
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 30,
    alignSelf: 'center',
    textAlign: 'center',
    width: '95%',
    fontSize: 0.066 * WIDTH,
    color: '#999999',
  },
  image: {
    width: 0.3 * HEIGHT,
    height: 0.3 * HEIGHT,
    borderRadius: 0.15 * HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2.5,
  },
  imageText: {
    fontSize: 0.045 * WIDTH,
  },
  inputContainer: {
    paddingVertical: 10,
    width: '85%',
  },
  inputText: {
    fontSize: 0.05 * WIDTH,
    paddingBottom: 7,
    paddingLeft: 5,
  },
  inputSubText: {
    fontSize: 0.034 * WIDTH,
    paddingBottom: 7,
    paddingLeft: 5,
    color: '#999999',
  },
  inputBox: {
    margin: 0,
    paddingLeft: 10,
    width: '100%',
  },
  uploadButton: {
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  submitButton: {
    height: 0.05 * HEIGHT,
    width: 0.5 * WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
