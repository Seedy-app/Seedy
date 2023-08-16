import React, { useState, useContext } from 'react';
import CustomInput from './CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../src/contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  const login = async () => {
    const response = await fetch('http://192.168.0.242:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      const token = await response.text();
      await AsyncStorage.setItem('userToken', token);
      // Actualiza el estado de la aplicación para reflejar que el usuario ha iniciado sesión
      signIn(token);
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput placeholder="Username" onChangeText={text => setUsername(text)} />
      <CustomInput placeholder="Password" isPassword onChangeText={text => setPassword(text)} />  
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>You do not have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerButton}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  eyeIcon: {
    position: 'absolute',
    transform: [{ translateX: 340 }, { translateY: 10 }],
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'limegreen',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText: {
    marginRight: 10,
    fontSize: 16,
  },
  registerButton: {
    fontSize: 16,
    color: 'blue',
  },
});
