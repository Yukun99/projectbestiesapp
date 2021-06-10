import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {dim} from '../../lib/Dimensions';
import ThemedText from '../../components/ThemedText';
import ThemedTextInput from '../../components/ThemedTextInput';
import {setUser} from '../../states/UserState';
import auth from '@react-native-firebase/auth';
import ThemedButton from '../../components/ThemedButton';
import useColors from '../../states/ThemeState';
import PersonalityTest from './PersonalityTest';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function SignUp({user, update}) {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(auth().currentUser.email);
  const [age, setAge] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [imgUrl, setImgUrl] = useState(null);
  const [projects, setProjects] = useState([]);
  const colors = useColors();
  const [delay, setDelay] = useState(true);
  const [registered, setRegistered] = useState(false);
  let button = (
    <ThemedButton
      label={'Submit'}
      style={styles.submitButton}
      disabled={true}
      onPress={() => {
        setUser(name, email, age, year, imgUrl, projects);
      }}
    />
  );

  useEffect(() => {
    const timeout = setTimeout(() => setDelay(false), 2000);
    if (user && user.testResults) {
      update();
    }
    return () => clearTimeout(timeout);
  }, [update, user]);

  if (delay) {
    return null;
  }

  if (name && email && age && year) {
    button = (
      <ThemedButton
        label={'Submit'}
        style={styles.submitButton}
        onPress={() => {
          setUser(name, email, age, year, imgUrl, projects);
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
            <ThemedText text={'Profile Image URL'} style={styles.inputText} />
            <ThemedTextInput
              label={'Image URL'}
              onChangeText={data => setImgUrl(data)}
              value={imgUrl}
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

  return <PersonalityTest update={update}/>;
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
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
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
  submitButton: {
    height: 0.05 * HEIGHT,
    width: 0.5 * WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
