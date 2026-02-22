import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {CartItem} from './ProductDetailScreen';

const DELIVERY_CHARGE = 100;

type Props = {
  cartItems: CartItem[];
  onGoBack: () => void;
  onClearCart: () => void;
};

const CartScreen: React.FC<Props> = ({cartItems, onGoBack, onClearCart}) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );
  const total = subtotal + DELIVERY_CHARGE;

  const handleProceed = () => {
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => onClearCart(),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{width: 28}} />
        </View>

        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Products"
              placeholderTextColor="#999"
              editable={false}
            />
          </View>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <Image source={item.product.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>Kid Dress</Text>
                  <Text style={styles.itemPrice}>
                    RS.{item.product.price}
                  </Text>
                  <Text style={styles.itemQty}>Quantity:{item.qty}</Text>
                </View>
              </View>
            ))}

            {/* Divider */}
            <View style={styles.divider} />

            {/* Shipping Details */}
            <View style={styles.shippingSection}>
              <Text style={styles.shippingTitle}>Shipping Details</Text>

              <View style={styles.shippingRow}>
                <Text style={styles.shippingLabel}>Sub Total ---{'>'}</Text>
                <Text style={styles.shippingValue}>Rs.{subtotal}</Text>
              </View>

              <View style={styles.shippingRow}>
                <Text style={styles.shippingLabel}>
                  Delivery Charge---{'>'}</Text>
                <Text style={styles.shippingValue}>Rs.{DELIVERY_CHARGE}</Text>
              </View>

              <View style={styles.shippingRow}>
                <Text style={styles.shippingLabel}>Total---{'>'}</Text>
                <Text style={styles.shippingValue}>Rs. {total}</Text>
              </View>
            </View>

            {/* Proceed Button */}
            <View style={styles.proceedWrap}>
              <TouchableOpacity
                style={styles.proceedBtn}
                onPress={handleProceed}
                activeOpacity={0.75}>
                <Text style={styles.proceedText}>Proceed To Pay</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  cartItem: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 6,
    marginRight: 14,
    backgroundColor: '#eee',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  itemQty: {
    fontSize: 13,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 18,
    marginTop: 16,
    marginBottom: 20,
  },
  shippingSection: {
    paddingHorizontal: 22,
  },
  shippingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
  },
  shippingRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  shippingLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  shippingValue: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  proceedWrap: {
    paddingHorizontal: 30,
    marginTop: 28,
  },
  proceedBtn: {
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  proceedText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

export default CartScreen;
