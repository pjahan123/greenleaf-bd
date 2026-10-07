import React, { useState } from 'react';

import {
  SafeAreaView,
  View,
  Modal,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShopScreen from './src/screens/ShopScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import AccountScreen from './src/screens/AccountScreen';
import PlantCareScreen from './src/screens/PlantCareScreen';
import ProductCareScreen from './src/screens/ProductCareScreen';
import AIChatScreen from './src/screens/AIChatScreen';

import Header from './src/components/Header';
import BottomNav from './src/navigation/BottomNav';

import { PRODUCTS } from './src/data/products';
import { C } from './src/styles/theme';


export default function App() {

  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('Home');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Plants');

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  const [product, setProduct] = useState(null);

  const [menu, setMenu] = useState(false);
  const [auth, setAuth] = useState(false);
  const [ai, setAI] = useState(false);


  /* =========================
     CATEGORY
  ========================= */

  const goCategory = (c) => {
    setCategory(c);
    setTab('Shop');
    setMenu(false);
  };


  /* =========================
     CART
  ========================= */

  const add = (p) => {
    setCart((current) => [
      ...current,
      p,
    ]);
  };


  /* =========================
     WISHLIST
  ========================= */

  const wish = (p) => {

    setWishlist((current) => {

      const exists = current.some(
        (item) => item.id === p.id
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== p.id
        );
      }

      return [
        ...current,
        p,
      ];
    });
  };


  /* =========================
     LOGIN
     LOGIN -> HOME
  ========================= */

  const handleLogin = (u) => {

    setUser(u);

    setTab('Home');

    setMenu(false);
  };


  /* =========================
     SIGNUP
     SIGNUP -> HOME
  ========================= */

  const handleSignupSuccess = (u) => {

    setUser(u);

    setTab('Home');

    setAuth(false);

    setMenu(false);
  };


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    setUser(null);

    setTab('Home');

    setCart([]);

    setWishlist([]);

    setMenu(false);
  };


  /* =========================
     LOGIN SCREEN
  ========================= */

  if (!user) {

    return (
      <>
        <LoginScreen
          onLogin={handleLogin}
          onSignup={() => setAuth(true)}
        />

        <Modal
          visible={auth}
          transparent
          animationType="slide"
          onRequestClose={() => setAuth(false)}
        >

          <View style={s.authBack}>

            <View style={s.authBox}>

              <AuthScreen
                onSuccess={handleSignupSuccess}
                onClose={() => setAuth(false)}
              />

            </View>

          </View>

        </Modal>
      </>
    );
  }


  /* =========================
     COMMON PROPS
  ========================= */

  const common = {

    onProduct: setProduct,

    onCart: add,

    onWish: wish,

    wishlist: wishlist.map(
      (item) => item.id
    ),

  };


  /* =========================
     PAGE
  ========================= */

  let body;


  /* HOME */

  if (tab === 'Home') {

    body = (
      <HomeScreen
        {...common}
        onCategory={goCategory}
        onAI={() => setAI(true)}
      />
    );

  }


  /* SHOP */

  else if (tab === 'Shop') {

    body = (
      <ShopScreen
        {...common}
        initialCategory={category}
      />
    );

  }


  /* CART */

  else if (tab === 'Cart') {

    body = (
      <CartScreen
        cart={cart}
        setCart={setCart}

        onBack={() =>
          setTab('Shop')
        }

        onOrder={(order) => {

          setOrders((current) => [
            order,
            ...current,
          ]);

        }}

        onPlaced={() => {
          setTab('Orders');
        }}
      />
    );

  }


  /* WISHLIST */

  else if (tab === 'Wishlist') {

    body = (
      <WishlistScreen
        items={wishlist}

        onAdd={add}

        onOpen={setProduct}

        onWish={wish}

        onBack={() =>
          setTab('Home')
        }
      />
    );

  }


  /* ORDERS */

  else if (tab === 'Orders') {

    body = (
      <OrdersScreen
        orders={orders}

        onBack={() =>
          setTab('Home')
        }
      />
    );

  }


  /* ACCOUNT */

  else if (tab === 'Account') {

    body = (
      <AccountScreen

        user={user}

        onLogout={handleLogout}

        onOrders={() =>
          setTab('Orders')
        }

        onWishlist={() =>
          setTab('Wishlist')
        }

        onCare={() =>
          setTab('Care')
        }

        onAI={() =>
          setAI(true)
        }

      />
    );

  }


  /* CARE */

  else if (tab === 'Care') {

    body = (
      <PlantCareScreen
        onBack={() =>
          setTab('Home')
        }
      />
    );

  }


  /* FALLBACK */

  else {

    body = (
      <HomeScreen
        {...common}
        onCategory={goCategory}
        onAI={() => setAI(true)}
      />
    );

  }


  /* =========================
     MAIN APP
  ========================= */

  return (

    <SafeAreaView style={s.safe}>

      <StatusBar style="dark" />


      {/* HEADER */}

      <Header
        search={search}
        setSearch={setSearch}

        cartCount={cart.length}

        onMenu={() =>
          setMenu(true)
        }

        onCart={() =>
          setTab('Cart')
        }

        onWishlist={() =>
          setTab('Wishlist')
        }

        onSearch={() =>
          setTab('Shop')
        }
      />


      {/* PAGE */}

      <View style={{ flex: 1 }}>
        {body}
      </View>


      {/* BOTTOM NAV */}

      <BottomNav
        tab={tab}
        setTab={setTab}
      />


      {/* AI BUTTON */}

      <Pressable
        style={s.aiFloat}
        onPress={() =>
          setAI(true)
        }
      >

        <View style={s.aiIcon}>

          <Ionicons
            name="sparkles"
            size={21}
            color="#fff"
          />

        </View>

        <Text style={s.aiText}>
          AI
        </Text>

      </Pressable>


      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      <Modal
        visible={!!product}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setProduct(null)
        }
      >

        <View style={s.modalBack}>

          <View style={s.modal}>

            {product && (

              <ProductCareScreen

                product={product}

                onBack={() =>
                  setProduct(null)
                }

                onCart={(p) =>
                  add(p)
                }

                onWish={wish}

                wished={wishlist.some(
                  (x) =>
                    x.id === product.id
                )}

              />

            )}

          </View>

        </View>

      </Modal>


      {/* =========================
          MENU
      ========================= */}

      <Modal
        visible={menu}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setMenu(false)
        }
      >

        <View style={s.menuBack}>

          <View style={s.menu}>

            <View style={s.menuHead}>

              <Pressable
                onPress={() =>
                  setMenu(false)
                }
              >

                <Ionicons
                  name="arrow-back"
                  size={23}
                  color={C.ink}
                />

              </Pressable>


              <Pressable
                onPress={() =>
                  setMenu(false)
                }
              >

                <Ionicons
                  name="close"
                  size={24}
                  color={C.ink}
                />

              </Pressable>

            </View>


            {/* HOME */}

            <Pressable
              style={s.menuItem}
              onPress={() => {

                setMenu(false);
                setTab('Home');

              }}
            >

              <Text style={s.menuText}>
                Home
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* PLANTS */}

            <Pressable
              style={s.menuItem}
              onPress={() =>
                goCategory('Plants')
              }
            >

              <Text style={s.menuText}>
                Plants
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* SEEDS */}

            <Pressable
              style={s.menuItem}
              onPress={() =>
                goCategory('Seeds')
              }
            >

              <Text style={s.menuText}>
                Seeds
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* POTS */}

            <Pressable
              style={s.menuItem}
              onPress={() =>
                goCategory('Pots & Planters')
              }
            >

              <Text style={s.menuText}>
                Pots & Planters
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* WISHLIST */}

            <Pressable
              style={s.menuItem}
              onPress={() => {

                setMenu(false);
                setTab('Wishlist');

              }}
            >

              <Text style={s.menuText}>
                My Wishlist
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* ORDERS */}

            <Pressable
              style={s.menuItem}
              onPress={() => {

                setMenu(false);
                setTab('Orders');

              }}
            >

              <Text style={s.menuText}>
                My Orders
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* CARE */}

            <Pressable
              style={s.menuItem}
              onPress={() => {

                setMenu(false);
                setTab('Care');

              }}
            >

              <Text style={s.menuText}>
                Plant Care
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* ACCOUNT */}

            <Pressable
              style={s.menuItem}
              onPress={() => {

                setMenu(false);
                setTab('Account');

              }}
            >

              <Text style={s.menuText}>
                My Account
              </Text>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />

            </Pressable>


            {/* LOGOUT */}

            <Pressable
              style={s.menuItem}
              onPress={handleLogout}
            >

              <Text
                style={[
                  s.menuText,
                  {
                    color: C.danger,
                  },
                ]}
              >
                Logout
              </Text>

              <Ionicons
                name="log-out-outline"
                size={19}
                color={C.danger}
              />

            </Pressable>

          </View>

        </View>

      </Modal>


      {/* =========================
          AI
      ========================= */}

      <Modal
        visible={ai}
        animationType="slide"
        onRequestClose={() =>
          setAI(false)
        }
      >

        <AIChatScreen
          onClose={() =>
            setAI(false)
          }

          products={PRODUCTS}
        />

      </Modal>

    </SafeAreaView>
  );
}


/* =========================
   STYLES
========================= */

const s = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: C.cream,
  },


  authBack: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.45)',
    justifyContent: 'flex-end',
  },


  authBox: {
    height: '88%',
    backgroundColor: C.cream,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    overflow: 'hidden',
  },


  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.45)',
    justifyContent: 'flex-end',
  },


  modal: {
    height: '94%',
    backgroundColor: C.cream,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    overflow: 'hidden',
  },


  menuBack: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.35)',
  },


  menu: {
    width: '88%',
    height: '100%',

    backgroundColor: '#fff',

    paddingTop: 48,
    paddingHorizontal: 20,
  },


  menuHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 17,

    borderBottomWidth: 1,
    borderColor: C.line,
  },


  menuItem: {
    height: 58,

    borderBottomWidth: 1,
    borderColor: C.line,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  menuText: {
    fontSize: 16,
    fontWeight: '900',
    color: C.ink,
  },


  aiFloat: {
    position: 'absolute',

    right: 18,
    bottom: 95,

    height: 54,

    paddingHorizontal: 8,

    borderRadius: 28,

    backgroundColor: C.deep,

    flexDirection: 'row',
    alignItems: 'center',

    gap: 6,

    elevation: 9,
  },


  aiIcon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: C.green2,

    alignItems: 'center',
    justifyContent: 'center',
  },


  aiText: {
    color: '#fff',
    fontWeight: '900',
    paddingRight: 7,
  },

});