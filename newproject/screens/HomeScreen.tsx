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
  Modal,
  Image,
  ImageSourcePropType,
} from 'react-native';

const {width} = Dimensions.get('window');

const PRODUCT_IMAGES: ImageSourcePropType[] = [
  require('../image/image1.png'),
  require('../image/image2.png'),
  require('../image/image3.png'),
  require('../image/image4.png'),
  require('../image/5.png'),
];

type Props = {
  onNavigateToCategory: () => void;
  onNavigateToCustomers: () => void;
  onNavigateToCart: () => void;
  onSignOut: () => void | Promise<void>;
};

const HomeScreen: React.FC<Props> = ({onNavigateToCategory, onNavigateToCustomers, onNavigateToCart, onSignOut}) => {
  const [searchText, setSearchText] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const renderProductGrid = (count: number) => {
    const rows = [];
    for (let i = 0; i < count; i += 3) {
      const rowItems = [];
      for (let j = i; j < Math.min(i + 3, count); j++) {
        rowItems.push(
          <View key={j} style={styles.productItem}>
            <Image
              source={PRODUCT_IMAGES[j % PRODUCT_IMAGES.length]}
              style={styles.productImage}
            />
          </View>,
        );
      }
      rows.push(
        <View key={i} style={styles.productRow}>
          {rowItems}
        </View>,
      );
    }
    return rows;
  };

  const SidebarMenu = () => (
    <Modal
      visible={sidebarVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSidebarVisible(false)}>
      <View style={styles.sidebarOverlay}>
        <View style={styles.sidebarContainer}>
      
          <View style={styles.sidebarHeader}>
            <TouchableOpacity onPress={() => setSidebarVisible(false)}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <View style={styles.welcomeBadge}>
              <Text style={styles.welcomeText}>WELCOME</Text>
            </View>
          </View>

          <View style={styles.sidebarTitleContainer}>
            <Text style={styles.sidebarTitle}>Your Sidebar</Text>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Home</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setSidebarVisible(false);
                onNavigateToCustomers();
              }}>
              <Text style={styles.menuText}>Customers</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setSidebarVisible(false);
                onNavigateToCategory();
              }}>
              <Text style={styles.menuText}>Products</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

                        <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setSidebarVisible(false);
                onNavigateToCart();
              }}>
              <Text style={styles.menuText}>Cart</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sidebarFooter}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setSidebarVisible(false);
                onSignOut();
              }}>
              <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e8e8e8" />
      <SidebarMenu />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Text style={styles.hamburgerIcon}>☰</Text>
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.goButton}>
              <Text style={styles.goButtonText}>Go!</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.topBrandName}>Cotton Co.</Text>
        </View>

   
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shopping Items</Text>
            <TouchableOpacity onPress={onNavigateToCategory}>
              <Text style={styles.exploreMore}>Explore More</Text>
            </TouchableOpacity>
          </View>
          {renderProductGrid(5)}
        </View>


        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Most Loved Items</Text>
            <TouchableOpacity onPress={onNavigateToCategory}>
              <Text style={styles.exploreMore}>Explore More</Text>
            </TouchableOpacity>
          </View>
          {renderProductGrid(5)}
        </View>


        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity onPress={onNavigateToCategory}>
              <Text style={styles.exploreMore}>Explore More</Text>
            </TouchableOpacity>
          </View>
          {renderProductGrid(3)}
        </View>

        <View style={styles.bottomSpace} />
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
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: '#333',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    color: '#333',
  },
  goButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#999',
  },
  goButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  topBrandName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B1A1A',
  },

  section: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  exploreMore: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  productItem: {
    width: (width - 60) / 3,
    aspectRatio: 1,
  },
  productImage: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  bottomSpace: {
    height: 30,
  },

  sidebarOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarContainer: {
    width: '70%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: 'flex-start',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 15,
  },
  closeIcon: {
    fontSize: 20,
    color: '#333',
  },
  welcomeBadge: {
    backgroundColor: '#F5F5A0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  welcomeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  sidebarTitleContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  menuArrow: {
    fontSize: 20,
    color: '#999',
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default HomeScreen;
