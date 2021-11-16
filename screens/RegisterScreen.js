import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Name'),
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required')
});

export default function RegisterScreen({ navigation }) {
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const { name, email, password } = values;
    try {
      await registerWithEmail(email, password);
    } catch (error) {
      setRegisterError(error.message);
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Safe\"\n        },\n        \"radius\": {\n            \"integerValue\": \"0\"\n        },\n        \"location\": {\n            \"geoPointValue\": {\n                \"latitude\": 0,\n                \"longitude\": 0\n            }\n        },\n        \"uid\": {\n            \"stringValue\": \"0\"\n        },\n        \"email\": {\n            \"stringValue\": \""+email+"\"\n        },\n        \"name\": {\n            \"stringValue\": \""+name+"\"\n        }\n    },\n}";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }

  return (
    <SafeView style={styles.container}>
      <Text style={styles.head}>Signup to Bant.AI</Text>
      <Form
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSignUp(values)}
      >
        <FormField
          name="name"
          leftIcon="account"
          placeholder="Enter name"
          autoFocus={true}
        />
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
        />
        <FormButton title={'Register'} />
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.primary}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white"
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  head: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 31,
    fontWeight: "700",
    alignSelf: "center",
    color: "#1296D4",
    padding: 20
  }
});
