import React, {useState} from 'react';
import {GiftedChat, Bubble, Send, ChatInput, LeftAction, SendButton} from 'react-native-gifted-chat';
import useUser from '../../states/UserState';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {dim} from '../../lib/Dimensions';
import useColors from "../../states/ThemeState";

const HEIGHT = dim.height;
const WIDTH = dim.width;
export default function RoomScreen() {
  const user = useUser();
  const colors = useColors();

  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: 'Henlo!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Alyssa Savier',
        avatar:
          'https://static.wikia.nocookie.net/fictionalfighters/images/f/f7/Sasori.png/revision/latest/top-crop/width/360/height/450?cb=20150424203605',
      },
    },
  ]);

  if (!user) {
    return null;
  }

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#FF69B4',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={40} color="#FF69B4" />
        </View>
      </Send>
    );
  }

  // function renderComposer(props) {
  //   return (
  //     <View style={{ backgroundColor: colors.background, height: 200 }}>
  //       <View style={styles.inputContainer}>
  //         <LeftAction {...props} />
  //         <ChatInput {...props} />
  //         <SendButton {...props} />
  //       </View>
  //       <View></View>
  //     </View>
  //   );
  // }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{_id: 1, name: user.name, avatar: user.imgUrl}}
      renderBubble={renderBubble}
      showUserAvatar
      placeholder="Type your message here..."
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
