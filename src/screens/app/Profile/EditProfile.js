import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import useColors from '../../../states/ThemeState';
import ThemedText from '../../../components/ThemedText';
import {getRealmApp, useUserById} from '../../../states/UserState';
import {dim} from '../../../lib/Dimensions';
import ThemedTextInput from '../../../components/ThemedTextInput';
import BackButton from '../../../components/BackButton';
import ThemedButton from '../../../components/ThemedButton';
import {launchImageLibrary} from 'react-native-image-picker';
import ContainButton from '../../../components/ContainButton';
import {Icon} from 'react-native-elements';

const HEIGHT = dim.height;
const WIDTH = dim.width;
const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
};

export default function EditProfile({editProfile, updateUser}) {
  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [imgBase64, setImgBase64] = useState(undefined);
  const [linkedInUrl, setLinkedInUrl] = useState(undefined);
  const projects = [];
  const colors = useColors();
  const user = useUserById(getRealmApp().currentUser.id);
  let button = (
    <ThemedButton
      label={'Submit'}
      style={styles.submitButton}
      disabled={true}
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
    if (user && user.imgBase64) {
      setImgBase64(user.imgBase64);
    }
  }, [user]);

  useEffect(() => {
    if (imgBase64) {
      setDisplayImage(
        <Image
          style={[styles.image, {borderColor: colors.border}]}
          source={{uri: `data:image/png;base64,${imgBase64}`}}
        />,
      );
      setImgBase64(imgBase64);
    }
  }, [colors.border, imgBase64]);

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
  }, [image, colors.border]);

  if (name || age || year || imgBase64) {
    button = (
      <ThemedButton
        label={'Submit'}
        style={styles.submitButton}
        onPress={() => {
          console.log('Updating user...');
          if (name) {
            console.log('New name provided!');
            user.name = name;
          }
          if (age && Number.isInteger(Number.parseInt(age, 10))) {
            console.log('New age provided!');
            user.age = age;
          }
          if (year && Number.isInteger(Number.parseInt(year, 10))) {
            console.log('New year of study provided!');
            user.year = year;
          }
          if (imgBase64) {
            console.log('New imgBase64 provided!');
            user.imgBase64 = imgBase64;
          }
          if (linkedInUrl) {
            console.log('New linkedInUrl provided!');
            user.linkedInUrl = linkedInUrl;
          }
          if (projects[0] || projects[1] || projects[2]) {
            console.log('New projects provided!');
            user.projects = projects;
          }
          console.log('Passing new information to Profile screen...');
          updateUser(user);
          console.log('Closing edit screen...');
          editProfile();
        }}
      />
    );
  }

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
        <BackButton onPress={editProfile} />
        <View style={[styles.topBar, {borderColor: colors.border}]}>
          <ThemedText text={'Edit Profile'} style={styles.title} />
          <ThemedText
            text={'Fill in the fields you would like to edit.'}
            style={styles.subtitle}
          />
        </View>
        <View style={styles.inputContainer}>
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
          <ContainButton
            size={0.1 * HEIGHT}
            style={styles.editButton}
            onPress={() =>
              launchImageLibrary(options, res => {
                setImage(res);
              })
            }
            borderColor={colors.background}
            backgroundColor={colors.border}
            borderWidth={0.004 * HEIGHT}
            content={
              <Icon
                name={'pencil'}
                type={'evilicon'}
                size={0.07 * HEIGHT}
                color={colors.text}
              />
            }
          />
        </View>
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
            label={userProjects[0] ? userProjects[0] : ''}
            onChangeText={data => {
              projects[0] = data;
            }}
            value={projects[0] ? projects[0] : ''}
            autoCorrect={false}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedTextInput
            label={userProjects[1] ? userProjects[1] : ''}
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
            label={userProjects[2] ? userProjects[2] : ''}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: WIDTH,
    alignItems: 'center',
  },
  topBar: {
    height: 0.15 * HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  title: {
    paddingTop: 0.03 * HEIGHT,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    fontSize: 0.1 * WIDTH,
  },
  subtitle: {
    paddingTop: 0.005 * HEIGHT,
    paddingBottom: 0.03 * HEIGHT,
    alignSelf: 'center',
    textAlign: 'center',
    width: '95%',
    fontSize: 0.05 * WIDTH,
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
  editButton: {
    position: 'absolute',
    right: 0.175 * WIDTH,
    bottom: 0,
  },
  inputContainer: {
    paddingTop: 0.015 * HEIGHT,
    paddingBottom: 0.015 * HEIGHT,
    width: '85%',
  },
  inputText: {
    fontSize: 0.05 * WIDTH,
    paddingBottom: 0.01 * HEIGHT,
    paddingLeft: 0.01 * WIDTH,
  },
  inputSubText: {
    fontSize: 0.034 * WIDTH,
    paddingBottom: 0.01 * HEIGHT,
    paddingLeft: 0.01 * WIDTH,
    color: '#999999',
  },
  inputBox: {
    paddingLeft: 0.03 * WIDTH,
    width: '100%',
  },
  submitButton: {
    height: 0.05 * HEIGHT,
    width: 0.5 * WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
