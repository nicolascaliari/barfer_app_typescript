import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/Routes';
import CarritoProvider from './src/context/CarritoProvider';
import { UsuarioProvider } from './src/context/UsuarioProvider';

export default function App() {
  return (
    <UsuarioProvider>
    <CarritoProvider>
      <View style={styles.container}>
        <Routes />
      </View>
    </CarritoProvider>
    </UsuarioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
