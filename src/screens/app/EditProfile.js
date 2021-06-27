import React, {useState} from 'react';
import {View, StyleSheet, Button, ScrollView} from 'react-native';
import useColors from '../../states/ThemeState';
import ThemedText from '../../components/ThemedText';
import useUser, {updateUser} from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import ContainButton from '../../components/ContainButton';
import {Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import ThemedTextInput from '../../components/ThemedTextInput';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function EditProfile({editInfo}) {
  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [imgUrl, setImgUrl] = useState(null);
  const projects = [];
  const colors = useColors();
  const user = useUser();

  if (!user) {
    return null;
  }

  const userName = user.name;
  const userAge = user.age;
  const userYear = user.year;
  const userProjects = user.projects;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ContainButton
          size={0.07 * HEIGHT}
          style={styles.backButton}
          borderColor={colors.background}
          onPress={editInfo}
          content={
            <Icon
              name={'arrow-back'}
              type={'material'}
              size={35}
              color={'#FF69B4'}
            />
          }
        />
        <ThemedText text={'Edit Profile'} style={styles.title} />
        <ThemedText
          text={'Fill in the fields you would like to edit.'}
          style={styles.subtitle}
        />
        <View style={styles.inputContainer}>
          <ThemedText
            text={'Full Name (as on Student Card)'}
            style={styles.inputText}
          />
          <ThemedTextInput
            label={`${userName}`}
            onChangeText={data => {
              setName(data);
            }}
            value={name}
            autoCorrect={false}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText text={'Age'} style={styles.inputText} />
          <ThemedTextInput
            label={`${userAge}`}
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
            label={`${userYear}`}
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
            label={`${userProjects[0]}`}
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
            label={`${userProjects[1]}`}
            onChangeText={data => {
              projects[1] = data;
              console.log(!projects[1]);
            }}
            value={projects[1]}
            autoCorrect={false}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedTextInput
            label={`${userProjects[2]}`}
            onChangeText={data => {
              projects[2] = data;
            }}
            value={projects[2]}
            autoCorrect={false}
            style={styles.inputBox}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              if (name) {
                updateUser(user._id, {name: name});
              }
              if (age) {
                updateUser(user._id, {age: age});
              }
              if (year) {
                updateUser(user._id, {year: year});
              }
              if (imgUrl) {
                updateUser(user._id, {imgUrl: imgUrl});
              }
              if (projects[0] || projects[1] || projects[2]) {
                updateUser(user._id, {projects: projects});
              }
              editInfo();
            }}
            title="Done"
            color="#ff69b4"
          />
        </View>
      </ScrollView>
    </View>
  );
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
  backButton: {
    zIndex: 1,
    left: 0.02 * HEIGHT,
    top: 0.02 * HEIGHT,
    position: 'absolute',
  },
});
