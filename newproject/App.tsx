import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {onAuthStateChanged, AuthUser, signOut} from './services/auth';
import SignInScreen from './screens/SignInScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import KidsCollectionScreen, {Product} from './screens/KidsCollectionScreen';
import ProductDetailScreen, {CartItem} from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CustomersScreen from './screens/CustomersScreen';

type UnauthScreen = 'signIn' | 'createAccount';
type AuthScreen = 'home' | 'category' | 'kidsCollection' | 'productDetail' | 'cart' | 'customers';

function App() {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);
  const [unauthScreen, setUnauthScreen] = useState<UnauthScreen>('signIn');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChanged(firebaseUser => {
        setUser(firebaseUser);
        if (firebaseUser) {
          setAuthScreen('home');
        }
      });
    } catch (e) {
      console.error('Firebase not initialized:', e);
      setUser(null);
    }
    return () => unsubscribe?.();
  }, []);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.findIndex(
        c =>
          c.product.id === item.product.id &&
          c.selectedSize === item.selectedSize,
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          ...updated[existing],
          qty: updated[existing].qty + item.qty,
        };
        return updated;
      }
      return [...prev, item];
    });
    setAuthScreen('cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAuthScreen('kidsCollection');
  };


  if (user === undefined) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#5C1A1A" />
      </View>
    );
  }

  if (!user) {
    if (unauthScreen === 'createAccount') {
      return <CreateAccountScreen onGoBack={() => setUnauthScreen('signIn')} />;
    }
    return (
      <SignInScreen onCreateAccount={() => setUnauthScreen('createAccount')} />
    );
  }

  if (authScreen === 'customers') {
    return (
      <CustomersScreen onGoBack={() => setAuthScreen('home')} />
    );
  }

  if (authScreen === 'cart') {
    return (
      <CartScreen
        cartItems={cartItems}
        onGoBack={() => setAuthScreen('kidsCollection')}
        onClearCart={handleClearCart}
      />
    );
  }

  if (authScreen === 'productDetail' && selectedProduct) {
    return (
      <ProductDetailScreen
        product={selectedProduct}
        onGoBack={() => setAuthScreen('kidsCollection')}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (authScreen === 'kidsCollection') {
    return (
      <KidsCollectionScreen
        onGoBack={() => setAuthScreen('category')}
        onSelectProduct={(product: Product) => {
          setSelectedProduct(product);
          setAuthScreen('productDetail');
        }}
        onGoToCart={() => setAuthScreen('cart')}
      />
    );
  }

  if (authScreen === 'category') {
    return (
      <CategoryScreen
        onGoBack={() => setAuthScreen('home')}
        onSelectCollection={(collectionId: string) => {
          if (collectionId === '3') {
            setAuthScreen('kidsCollection');
          }
        }}
        onGoToCart={() => setAuthScreen('cart')}
      />
    );
  }

  return (
    <HomeScreen
      onNavigateToCategory={() => setAuthScreen('category')}
      onNavigateToCustomers={() => setAuthScreen('customers')}
      onNavigateToCart={() => setAuthScreen('cart')}
      onSignOut={signOut}
    />
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
  },
});

export default App;
