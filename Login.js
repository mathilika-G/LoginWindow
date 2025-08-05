import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity,
ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      Alert.alert("Login Successfully");
      navigation.navigate("Geopage");
    } else {
      Alert.alert("Login Failed");
    }
  }

  return (
    <ImageBackground
      source={require('./assets/bgimage2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#555"  // Optional: improveplaceholder visibility
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#555"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.register}>Register</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 30,
    backgroundColor: 'rgba(232, 241, 241, 0.8)',  // semi-transparentoverlay to improve readability
    margin: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2c3e50',
  },
  inputBox: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 15,
  },
  input: {
    color: '#2c3e50',
    fontSize: 16,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#19a2f1ff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#eedf14ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signup: {
    padding: 15,
    marginTop: 15,
  },
  signupText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  register: {
    color: '#e92323ff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

