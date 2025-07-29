import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AUTOIMMUNE_DISEASES = [
  'Hashimoto’s Thyroiditis',
  'Rheumatoid Arthritis',
  'Systemic Lupus',
  'Psoriasis',
  'Celiac Disease',
  'Type 1 Diabetes',
  'Multiple Sclerosis',
  'Dermatomyositis',
  'Crohn’s Disease',
  'Ulcerative Colitis',
];

const AddHome: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (disease: string) => {
    setSelected((prev) =>
      prev.includes(disease)
        ? prev.filter((item) => item !== disease)
        : [...prev, disease]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one autoimmune condition.');
    } else {
      // You could save the selection to context, storage, or Firestore here
      navigation.navigate('Home');
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selected.includes(item);
    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item)}
        style={[styles.item, isSelected && styles.itemSelected]}
      >
        <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Autoimmune Condition(s)</Text>
      <FlatList
        data={AUTOIMMUNE_DISEASES}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.footer}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default AddHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
  },
  itemSelected: {
    backgroundColor: '#cceeff',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTextSelected: {
    fontWeight: '600',
    color: '#0077aa',
  },
  footer: {
    marginTop: 12,
  },
});
