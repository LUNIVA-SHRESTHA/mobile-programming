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
  Dimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 55) / 3;

export type Product = {
  id: string;
  name: string;
  sizes: string[];
  price: number;
  image: ImageSourcePropType;
};

const PRODUCTS: Product[] = [
  {id: '1', name: 'Kid Wear', sizes: ['M', 'XL'], price: 1440, image: require('../image/image1.png')},
  {id: '2', name: 'Kid Wear', sizes: ['M', 'XL'], price: 1440, image: require('../image/image2.png')},
  {id: '3', name: 'Kid Wear', sizes: ['M', 'XL'], price: 1440, image: require('../image/image3.png')},
  {id: '4', name: 'Kid Wear', sizes: ['M', 'XL'], price: 1440, image: require('../image/image4.png')},
  {id: '5', name: 'Kid Wear', sizes: ['M'], price: 1440, image: require('../image/5.png')},
  {id: '6', name: 'Kid Wear', sizes: ['XL'], price: 1440, image: require('../image/image1.png')},
];

type Props = {
  onGoBack: () => void;
  onSelectProduct: (product: Product) => void;
  onGoToCart: () => void;
};

const KidsCollectionScreen: React.FC<Props> = ({onGoBack, onSelectProduct, onGoToCart}) => {
  const [searchText, setSearchText] = useState('');

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderGrid = () => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < filtered.length; i += 3) {
      const chunk = filtered.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.row}>
          {chunk.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => onSelectProduct(item)}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardSize}>
                Size: {item.sizes.join(', ')}
              </Text>
              <Text style={styles.cardPrice}>Price: {item.price}</Text>
            </TouchableOpacity>
          ))}
          {chunk.length < 3 &&
            Array.from({length: 3 - chunk.length}).map((_, idx) => (
              <View key={`empty-${idx}`} style={styles.cardEmpty} />
            ))}
        </View>,
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Kids Collection</Text>
          <TouchableOpacity onPress={onGoToCart}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
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

        <View style={styles.grid}>{renderGrid()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
  },
  backBtn: {
    fontSize: 22,
    color: '#8B1A1A',
    fontWeight: '600',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cartIcon: {
    fontSize: 20,
    color: '#8B1A1A',
  },
  searchWrap: {
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  grid: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  cardEmpty: {
    width: CARD_WIDTH,
  },
  cardImage: {
    width: CARD_WIDTH - 6,
    height: CARD_WIDTH - 6,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: '#e8e8e8',
  },
  cardName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#222',
    marginBottom: 2,
  },
  cardSize: {
    fontSize: 11,
    color: '#555',
  },
  cardPrice: {
    fontSize: 12,
    color: '#222',
    fontWeight: '600',
    marginTop: 1,
  },
});

export default KidsCollectionScreen;
