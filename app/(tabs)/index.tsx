import React, { useState } from 'react';
import { Image, StyleSheet, Platform, TextInput, Button, Alert, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });

      // Si el login es exitoso, muestra un mensaje
      Alert.alert('Éxito', 'Inicio de sesión exitoso', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      // Si hay un error, muestra un mensaje de error
      Alert.alert('Error', 'Credenciales incorrectas', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

      // console.error('Error en el login:', error.response?.data || error.message);
    }
  };

  const handleRegisterRedirect = () => {
    // Aquí puedes agregar la navegación a la pantalla de registro
    Alert.alert('Registro', 'Redirigiendo a la pantalla de registro...');
    console.log('Redirigiendo a la pantalla de registro');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Iniciar Sesión</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} />

        {/* Botón de registro */}
        <TouchableOpacity onPress={handleRegisterRedirect}>
          <ThemedText style={styles.registerText}>
            ¿No tienes cuenta? <ThemedText style={styles.registerLink}>Regístrate aquí</ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 16,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff', // Fondo blanco para los inputs
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666', // Color del texto
  },
  registerLink: {
    color: '#007BFF', // Color del enlace
    fontWeight: 'bold',
  },
});