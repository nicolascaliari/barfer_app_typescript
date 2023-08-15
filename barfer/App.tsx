import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import Routes from './src/routes/Routes';
import CarritoProvider from './src/context/CarritoProvider';
import { UsuarioProvider } from './src/context/UsuarioProvider';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <UsuarioProvider>
    <CarritoProvider>
        <Routes />
    </CarritoProvider>
    </UsuarioProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
