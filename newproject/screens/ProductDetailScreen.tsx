import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Product} from './KidsCollectionScreen';

const {width} = Dimensions.get('window');

export type CartItem = {
  product: Product;
  qty: number;
  selectedSize: string;
};

type Props = {
  product: Product;
  onGoBack: () => void;
  onAddToCart: (item: CartItem) => void;
};

const AVAILABLE_SIZES = ['XS', 'M', 'L', 'XL', 'XXL'];

const ProductDetailScreen: React.FC<Props> = ({
  product,
  onGoBack,
  onAddToCart,
}) => {
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0] || 'M',
  );

  const increment = () => setQty(prev => prev + 1);
  const decrement = () => {
    if (qty > 1) {
      setQty(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({product, qty, selectedSize});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kids Collection</Text>
          <View style={{width: 40}} />
        </View>

        {/* Search bar placeholder for consistency */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search Products</Text>
          </View>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>Kid Dress</Text>

          <Text style={styles.priceLabel}>
            Price: Rs.{product.price}
          </Text>

          <View style={styles.sizeRow}>
            <Text style={styles.sizeLabel}>Size: </Text>
            {AVAILABLE_SIZES.map(s => (
              <TouchableOpacity
                key={s}
                onPress={() => setSelectedSize(s)}
                style={[
                  styles.sizeOption,
                  selectedSize === s && styles.sizeSelected,
                ]}>
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === s && styles.sizeTextSelected,
                  ]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.qtyHeading}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={decrement}
              activeOpacity={0.6}>
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={increment}
              activeOpacity={0.6}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleAddToCart}
            activeOpacity={0.7}>
            <Text style={styles.actionText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}>
            <Text style={styles.actionText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 40,
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  searchWrap: {
    paddingHorizontal: 18,
    marginBottom: 14,
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
  searchPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 40,
  },
  productImage: {
    width: width - 80,
    height: width - 80,
    borderRadius: 8,
  },
  infoSection: {
    paddingHorizontal: 22,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 14,
  },
  priceLabel: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  sizeLabel: {
    fontSize: 15,
    color: '#333',
    marginRight: 4,
  },
  sizeOption: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    borderRadius: 4,
  },
  sizeSelected: {
    backgroundColor: '#8B1A1A',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  sizeTextSelected: {
    color: '#fff',
  },
  qtyHeading: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    gap: 18,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 22,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    minWidth: 24,
    textAlign: 'center',
  },
  actionBtn: {
    paddingVertical: 12,
    marginBottom: 6,
  },
  actionText: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },
});

export default ProductDetailScreen;
