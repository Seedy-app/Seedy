import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }
    const response = await fetch('http://192.168.0.242:3000/register', {
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
      // La cuenta ha sido creada y puedes navegar a la pantalla de inicio de sesión
      navigation.navigate('Login');
    } else {
      console.log('There was a problem registering the account.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" onChangeText={text => setUsername(text)} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={text => setConfirmPassword(text)} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButton}>Log in</Text>
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    marginRight: 10,
    fontSize: 16,
  },
  loginButton: {
    fontSize: 16,
    color: 'blue',
  },
});
