import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {dim} from '../../lib/Dimensions';
import ThemedText from '../../components/ThemedText';
import useUser, {updateUser} from '../../states/UserState';
import ThemedButton from '../../components/ThemedButton';
import useColors from '../../states/ThemeState';
import ScaleButtons from '../../components/ScaleButtons';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function PersonalityTest({update}) {
  const colors = useColors();
  const user = useUser();
  const [q1, setQ1] = useState(undefined);
  const [q2, setQ2] = useState(undefined);
  const [q3, setQ3] = useState(undefined);
  const [q4, setQ4] = useState(undefined);
  const [q5, setQ5] = useState(undefined);
  const [q6, setQ6] = useState(undefined);
  const [q7, setQ7] = useState(undefined);
  const [q8, setQ8] = useState(undefined);
  const [q9, setQ9] = useState(undefined);
  const [q10, setQ10] = useState(undefined);
  const [q11, setQ11] = useState(undefined);
  const [q12, setQ12] = useState(undefined);

  let button = (
    <ThemedButton
      label={'Submit'}
      style={styles.submitButton}
      disabled={true}
    />
  );

  if (!user) {
    return null;
  }

  if (q1 && q2 && q3 && q4 && q5 && q6 && q7 && q8 && q9 && q10 && q11 && q12) {
    button = (
      <ThemedButton
        label={'Submit'}
        style={styles.submitButton}
        onPress={() => {
          const scores = [
            // logic
            q1 + q5 + q9,
            // organisation
            q2 + q6 + q10,
            // supportive
            q3 + q7 + q11,
            // big picture
            q4 + q8 + q12,
          ];
          let max = scores[0];
          let category = 0;

          for (let i = 0; i < 4; i++) {
            if (scores[i] > max) {
              max = scores[i];
              category = i;
            }
          }
          let workStyle = '';

          switch (category) {
            case 0:
              workStyle = 'Logical';
              break;
            case 1:
              workStyle = 'Organised';
              break;
            case 2:
              workStyle = 'Supportive';
              break;
            case 3:
              workStyle = 'Big Picture';
              break;
            default:
              break;
          }

          updateUser(user._id, {testResults: workStyle});
          update();
        }}
      />
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ThemedText text={'Welcome to Project Besties!'} style={styles.title} />
        <ThemedText
          text={
            'Please take this short personality test below to determine your workstyle.'
          }
          style={styles.subtitle}
        />

        {/*Q1 - Logic*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={'1. I like analysing data.'}
            style={styles.inputText}
          />
          <ScaleButtons answer={q1} setAnswer={setQ1} />
        </View>

        {/*Q2 - Organ*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={'2. My strengths are in establishing order and structure.'}
            style={styles.inputText}
          />
          <ScaleButtons answer={q2} setAnswer={setQ2} />
        </View>
        {/*<View style={styles.inputContainer}>{button}</View>*/}

        {/*Q3 - Support*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '3. My strengths are in building meaningful relationships and facilitating team interaction.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q3} setAnswer={setQ3} />
        </View>

        {/*Q4 - BigPic*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '4. My strengths are in catalysing change, and ideating/inventing solutions to problems.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q4} setAnswer={setQ4} />
        </View>

        {/*Q5 - Logic*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={'5. I like solving complex problems.'}
            style={styles.inputText}
          />
          <ScaleButtons answer={q5} setAnswer={setQ5} />
        </View>

        {/*Q6 - Organ*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '6. I like organising and planning, and I am detail oriented.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q6} setAnswer={setQ6} />
        </View>

        {/*Q7 - Support*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={'7. I am good at persuading or selling ideas.'}
            style={styles.inputText}
          />
          <ScaleButtons answer={q7} setAnswer={setQ7} />
        </View>

        {/*Q8 - BigPic*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '8. I like synthesising ideas together which may seem unrelated at first.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q8} setAnswer={setQ8} />
        </View>

        {/*Q9 - Logic*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '9. Meeting goal-oriented outcomes and staying on budget makes me feel rewarded.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q9} setAnswer={setQ9} />
        </View>

        {/*Q10 - Organ*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '10. I like completing tasks accurately and feel rewarded by having meticulously constructed plans.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q10} setAnswer={setQ10} />
        </View>

        {/*Q11 - Support*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '11. Communicating effectively with my teammates makes me feel rewarded.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q11} setAnswer={setQ11} />
        </View>

        {/*Q12 - BigPic*/}
        <View style={styles.inputContainer}>
          <ThemedText
            text={
              '12. Seeing the big picture and having a variety of ideas, thought and execution makes me feel rewarded.'
            }
            style={styles.inputText}
          />
          <ScaleButtons answer={q12} setAnswer={setQ12} />
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
    fontSize: 0.05 * WIDTH,
    color: '#999999',
  },
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '85%',
  },
  inputText: {
    fontSize: 0.045 * WIDTH,
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
