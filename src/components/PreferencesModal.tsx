import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  email: string;
}

const PreferencesModal: React.FC<Props> = ({ visible, onClose, email }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>User Preferences</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  label: {
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 6,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PreferencesModal;
