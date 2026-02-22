import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {createAccount} from '../services/auth';

type Props = {
  onGoBack: () => void;
};

const CreateAccountScreen: React.FC<Props> = ({onGoBack}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Missing field', 'Please enter your name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Missing field', 'Please enter your email.');
      return;
    }
    if (!password) {
      Alert.alert('Missing field', 'Please enter a password.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Terms Required', 'Please agree to the Terms of Services.');
      return;
    }
    setLoading(true);
    const {error} = await createAccount(name.trim(), email.trim(), password);
    setLoading(false);
    if (error) {
      Alert.alert('Registration Failed', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={onGoBack}
          disabled={loading}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create An Account</Text>

        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Name:"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="E-mail:"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Password:"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}
              onPress={() => setAgreeTerms(!agreeTerms)}
              disabled={loading}>
              {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Services</Text> and{'\n'}
              <Text style={styles.termsLink}>Privacy Policy.</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              (!agreeTerms || loading) && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!agreeTerms || loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
  },
  backButton: {
    marginTop: 15,
    marginBottom: 10,
    width: 40,
  },
  backArrow: {
    fontSize: 24,
    color: '#8B1A1A',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8B1A1A',
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 30,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#8B1A1A',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#8B1A1A',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },
  termsLink: {
    color: '#8B1A1A',
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#5C1A1A',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateAccountScreen;
