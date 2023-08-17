import React, { useState } from 'react';
import CustomInput from './CustomInput';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const register = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Validación de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(email);
    console.log('fdfsdvgs');
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Validación de contraseña
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    const response = await fetch('http://192.168.0.242:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if (response.ok) {
      // La cuenta ha sido creada y puedes navegar a la pantalla de inicio de sesión
      navigation.navigate('Login');
    } else {
      setError('There was a problem registering the account.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput placeholder="Username" onChangeText={text => setUsername(text)} />
      <CustomInput placeholder="Email" keyboardType="email-address" onChangeText={text => setEmail(text)} />
      <CustomInput placeholder="Password" isPassword onChangeText={text => setPassword(text)} />  
      <CustomInput placeholder="Confirm Password" isConfirmPassword onChangeText={text => setConfirmPassword(text)} />  
      {error && <Text style={{color: 'red'}}>{error}</Text>}
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
