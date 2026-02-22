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
} from 'react-native';

type Props = {
  onGoBack: () => void;
  onSelectCollection: (collectionId: string) => void;
  onGoToCart: () => void;
};

const CategoryScreen: React.FC<Props> = ({onGoBack, onSelectCollection, onGoToCart}) => {
  const [searchText, setSearchText] = useState('');

  const categories = [
    {name: 'Pants', id: '1'},
    {name: 'Kaftans', id: '2'},
    {name: 'Kurtis', id: '3'},
    {name: 'Pajama', id: '4'},
    {name: 'T-shirt', id: '5'},
  ];

  const collections = [
    {name: "Men's Collection", id: '1'},
    {name: "Women's Collection", id: '2'},
    {name: "Kid's Collection", id: '3'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Shop By Category</Text>
          <TouchableOpacity onPress={onGoToCart}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Products"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

  
        <View style={styles.collectionsContainer}>
          {collections.map(collection => (
            <TouchableOpacity
              key={collection.id}
              style={styles.collectionItem}
              onPress={() => onSelectCollection(collection.id)}>
              <Text style={styles.collectionName}>{collection.name}</Text>
              <Text style={styles.collectionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

    
        <View style={styles.bottomBars}>
          <View style={styles.barYellow} />
          <View style={styles.barLightYellow} />
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
  },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backText: {
    fontSize: 15,
    color: '#8B1A1A',
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cartIcon: {
    fontSize: 20,
    color: '#8B1A1A',
  },
 
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8d0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    padding: 0,
  },

  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d0',
  },
  categoryName: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  categoryArrow: {
    fontSize: 22,
    color: '#999',
  },
  
  collectionsContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5e8',
    paddingTop: 5,
    paddingBottom: 10,
  },
  collectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d0',
  },
  collectionName: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  collectionArrow: {
    fontSize: 22,
    color: '#999',
  },
 
  bottomBars: {
    marginTop: 'auto',
    paddingTop: 30,
  },
  barYellow: {
    height: 25,
    backgroundColor: '#F5F5A0',
  },
  barLightYellow: {
    height: 25,
    backgroundColor: '#FAFAD2',
  },
});

export default CategoryScreen;
