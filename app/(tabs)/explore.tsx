import { StyleSheet, Image, Platform, TextInput, Button, Alert, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

export default function RegisterScreen() {
  const [handle, setHandle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/register', {
        handle,
        name,
        email,
        password,
      });

      // Si el registro es exitoso, muestra un mensaje
      Alert.alert('Éxito', 'Registro exitoso', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      // Si hay un error, muestra un mensaje de error
      Alert.alert('Error', 'Error en el registro', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

      // console.error('Error en el registro:', error.response?.data || error.message);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Registro</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          placeholder="Handle"
          value={handle}
          onChangeText={(text) => setHandle(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
        <Button title="Registrarse" onPress={handleRegister} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff', // Fondo blanco para los inputs
  },
});