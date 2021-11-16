import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import * as Yup from 'yup';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  FiraSans_500Medium,
} from '@expo-google-fonts/fira-sans';
import * as GoogleSignIn from 'expo-google-sign-in';
import { SocialIcon } from 'react-native-elements'


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password')
});



export default function WelcomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    FiraSans_500Medium,
  });
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/bantai-logo.png')} style={styles.logo} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E21F13' }]}
          >
            <Image source={require('../assets/camera.png')} style={{ height: 47, width: 47}}/>
          </TouchableOpacity>
         
        </View>
        <View style={{backgroundColor: '#FFFFFF', width: '100%', position: 'absolute'}}>
        <SafeView style={styles.loginContainer}>
          <Text style={styles.head}>Log in to your account</Text>
        <Form
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handleOnLogin(values)}
        >
          <FormField
            name="email"
            leftIcon="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
          />
          <FormField
            name="password"
            leftIcon="lock"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <FormButton title={'Log In'}/>
          {<FormErrorMessage error={loginError} visible={true} />}
        </Form>
        <Text style={styles.subhead}>
          Or you can log in with
        </Text>
        <SocialIcon
          title='Sign in with Google'
          button
          type='google'
        />
        <SocialIcon
          title='Sign in with Facebook'
          button
          type='facebook'
        />
        <View>
        <Text style={styles.subhead}>
          Don't have an account? <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text>Sign up here</Text></TouchableOpacity>
        </Text>
        </View>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color="#fff"
          size={30}
          onPress={() => navigation.goBack()}
        />

      </SafeView>
        {/* <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
          <AppButton
            title="Register"
            color="secondary"
            onPress={() => navigation.navigate('Register')}
          /> */}
        </View>
  
  
      </View>
    );
  }

}

const styles = StyleSheet.create({
  subhead : {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 14,
    color: "black",
    opacity: 0.5,
    alignSelf: "center",
    marginVertical: 10
  },
  head: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 31,
    fontWeight: "700",
    alignSelf: "center",
    color: "#1296D4",
    padding: 20
  },
  loginContainer: {
    padding: 15,
    backgroundColor: 'white'
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#1296D4'
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    left: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  logo: {
    width: 120,
    height: 138
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  },
  button: {
    width: 74,
    height: 50,
    marginLeft: 150.77,
    borderRadius: 15.13,
    shadowColor: '#00000040',
    shadowOffset: { width: 2.6399998664855957, height: 2.6399998664855957 },
    shadowRadius: 15.13,  
    alignItems: 'center'
  }
});
