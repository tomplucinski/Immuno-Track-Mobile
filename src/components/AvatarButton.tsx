import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const AvatarButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100' }} // You can replace this with a user avatar from Firebase
        style={styles.avatar}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default AvatarButton;
