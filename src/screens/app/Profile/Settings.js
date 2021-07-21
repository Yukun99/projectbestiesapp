import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {dim} from '../../../lib/Dimensions';
import useColors from '../../../states/ThemeState';
import ThemedText from '../../../components/ThemedText';
import BackButton from '../../../components/BackButton';
import ThemedButton from '../../../components/ThemedButton';
import {deleteUser, getRealmApp} from '../../../states/UserState';
import useChats, {deleteChats} from '../../../states/ChatState';
import {deleteMessages} from '../../../states/MessageState';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Settings({editSettings}) {
  const colors = useColors();
  const [confirm, setConfirm] = useState(false);
  const [visible, setVisible] = useState(false);
  const chats = useChats();

  useEffect(() => {
    if (confirm) {
      deleteUser();
      deleteMessages(chats);
      deleteChats();
      getRealmApp()
        .currentUser.logOut()
        .then(() => {});
    }
  });

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <BackButton onPress={editSettings} />
      <View style={[styles.topBar, {borderColor: colors.border}]}>
        <ThemedText text={'Settings'} style={styles.title} />
      </View>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={[styles.popup, {borderColor: colors.border}]}>
          <ThemedText text={'Warning'} style={styles.popupTitle} />
          <ThemedText
            text={
              'All your data will be deleted from the server. Are you sure?'
            }
            style={styles.popupText}
          />
          <View style={styles.popupButtonContainer}>
            <ThemedButton
              style={styles.popupButtonYes}
              label={'Confirm'}
              onPress={() => {
                setVisible(!visible);
                setConfirm(true);
              }}
            />
            <ThemedButton
              style={styles.popupButtonNo}
              label={'Go Back'}
              onPress={() => {
                setVisible(!visible);
              }}
            />
          </View>
        </View>
      </Modal>
      <ThemedButton
        label={'Delete Profile'}
        style={styles.button}
        onPress={() => {
          setVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 0.1 * HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    fontSize: 0.1 * WIDTH,
  },
  button: {
    marginTop: 0.03 * HEIGHT,
    marginBottom: 0.03 * HEIGHT,
    height: 0.05 * HEIGHT,
    width: 0.5 * WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  popup: {
    height: 0.3 * HEIGHT,
    width: 0.9 * WIDTH,
    alignSelf: 'center',
    top: 0.35 * HEIGHT,
    position: 'absolute',
    padding: 0.03 * HEIGHT,
    borderRadius: 0.02 * HEIGHT,
    borderWidth: 2,
    backgroundColor: '#27c1bf',
  },
  popupTitle: {
    fontSize: 0.06 * HEIGHT,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 0.025 * HEIGHT,
    textAlign: 'center',
  },
  popupButtonContainer: {
    width: 0.7 * WIDTH,
    alignSelf: 'center',
    bottom: 0.03 * HEIGHT,
    position: 'absolute',
  },
  popupButtonYes: {
    height: 0.05 * HEIGHT,
    width: 0.3 * WIDTH,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  popupButtonNo: {
    height: 0.05 * HEIGHT,
    width: 0.3 * WIDTH,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
