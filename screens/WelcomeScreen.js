import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import Colors from '../utils/colors';
import * as Yup from 'yup';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import { auth, user } from '../components/Firebase/firebase';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  FiraSans_500Medium,
} from '@expo-google-fonts/fira-sans';
import { SocialIcon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
export const isAndroid = () => Platform.OS === 'android';
import * as Location from 'expo-location';
import * as Facebook from 'expo-facebook';
import { FacebookAuthProvider } from "firebase/auth";




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


export default function WelcomeScreen() {
  const [id, setId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  if (user) {
    var currentId = user.uid;
  }

  useEffect(() => {
    setId(currentId);
  }, [currentId]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      var json = JSON.stringify(location);
      var parsed = JSON.parse(json)
      var latitude = parsed.coords.latitude
      var longitude = parsed.coords.longitude
      setLatitude(latitude)
      setLongitude(longitude)
    })();
  }, []);
  

  async function facebookLogIn() {
    try {
      await Facebook.initializeAsync({
        appId: '455260959363572',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?&access_token=${token}`);
          const profile = await response.json();
          console.log('response', response);
          console.log('profile', profile);
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
        // Get the user's name using Facebook's Graph APIs
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // const result = JSON.stringify(response);
        // console.log(result);
        const credential = firebase.auth.FacebookAuthProvider.credential( //Set the tokens to Firebase
          token
        );
        auth
          .signInWithCredential(credential) //Login to Firebase
          .catch((error) => {
            console.log(error);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  

  const logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  }
  


  const Glogin = async () => {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({ //return an object with result token and user
        iosClientId: '808890948090-t5uqqi9hp5619mmnllpf3aa7j53jckbr.apps.googleusercontent.com', //From app.json//From app.json
      });
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        auth
          .signInWithCredential(credential) //Login to Firebase
          .catch((error) => {
            console.log(error);
          });
        var string = JSON.stringify(result);
        var parse = JSON.parse(string).user;
        var email = parse.email;
        var name = parse.name;
        var photoUrl = parse.photoUrl;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Safe\"\n        },\n      \"company\": {\n            \"stringValue\": \"Company\"\n        },\n        \"city\": {\n            \"stringValue\": \"City\"\n        },\n     \"manager\": {\n            \"stringValue\": \"Manager\"\n        },\n      \"building\": {\n            \"stringValue\": \"Building\"\n        },\n           \"radius\": {\n            \"integerValue\": \"0\"\n        },\n        \"location\": {\n            \"geoPointValue\": {\n                \"latitude\": "+latitude+",\n                \"longitude\": "+longitude+"\n            }\n        },\n        \"uid\": {\n            \"stringValue\": \"0\"\n        },\n        \"email\": {\n            \"stringValue\": \"" + email + "\"\n        },\n        \"name\": {\n            \"stringValue\": \"" + name + "\"\n        },\n    \"photoUrl\": {\n            \"stringValue\": \""+photoUrl+"\"\n        }\n   }\n}";

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4", requestOptions)
          .then(response => response.text())
          // .then(result => console.log(result))
          .catch(error => console.log('error', error));
      } else {
        //CANCEL
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  // const handleGoogleSignIn = () => {
  //   const config = {
  //     iosClientId: '808890948090-t5uqqi9hp5619mmnllpf3aa7j53jckbr.apps.googleusercontent.com',
  //     scopes: ['profile', 'email']
  //   };
  //   Google.logInAsync(config).then((result) => {
  //     var data = JSON.parse(JSON.stringify(result));
  //     var idToken = data.id
  //     console.log(data);
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // };

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
            <Image source={require('../assets/camera.png')} style={{ height: 47, width: 47 }} />
          </TouchableOpacity>

        </View>
        <View style={{ backgroundColor: '#FFFFFF', width: '100%', position: 'absolute' }}>
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
              <FormButton title={'Log In'} />
              {<FormErrorMessage error={loginError} visible={true} />}
            </Form>
            <Text style={styles.subhead}>
              Or you can log in with
            </Text>
            <TouchableOpacity onPress={Glogin}>
              <SocialIcon
                title='Sign in with Google'
                button
                type='google'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={facebookLogIn}>
            <SocialIcon
              title='Sign in with Facebook'
              button
              type='facebook'
            />
            </TouchableOpacity>

          
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
  subhead: {
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
