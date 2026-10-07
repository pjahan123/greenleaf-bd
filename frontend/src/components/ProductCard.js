import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable as RNPressable,
  StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { C } from '../styles/theme';

const Pressable = ({ style, ...props }) => (
  <RNPressable
    {...props}
    style={(state) => {
      const base =
        typeof style === 'function'
          ? style(state)
          : style;

      return [
        base,
        state.pressed && {
          opacity: 0.82,
          transform: [{ scale: 0.97 }]
        }
      ];
    }}
  />
);

export default function ProductCard({
  product,
  onPress,
  onCart,
  onWish,
  wished
}) {
  // Compact mobile card
  const cardWidth = 155;

  return (
    <View style={[s.card, { width: cardWidth }]}>

      {/* PRODUCT AREA */}
      <Pressable
        onPress={() => onPress(product)}
      >

        {/* IMAGE */}
        <View style={s.picWrap}>

          <Image
            source={{ uri: product.image }}
            style={s.pic}
            resizeMode="cover"
          />

          {/* WISHLIST BUTTON */}
          <Pressable
            style={s.heart}
            onPress={(e) => {
              e.stopPropagation?.();
              onWish(product);
            }}
          >
            <Ionicons
              name={
                wished
                  ? 'heart'
                  : 'heart-outline'
              }
              size={18}
              color={
                wished
                  ? C.danger
                  : C.ink
              }
            />
          </Pressable>

        </View>

        {/* CATEGORY */}
        <Text style={s.cat}>
          {product.subcategory ||
            product.category}
        </Text>

        {/* NAME */}
        <Text
          style={s.name}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        {/* PRICE */}
        <View style={s.priceRow}>

          <Text style={s.price}>
            ৳{product.price}
          </Text>

          <Text style={s.old}>
            ৳{product.oldPrice}
          </Text>

        </View>

      </Pressable>

      {/* ADD TO CART */}
      <Pressable
        style={s.add}
        onPress={() => onCart(product)}
      >

        <Ionicons
          name="bag-add-outline"
          size={15}
          color="#fff"
        />

        <Text style={s.addText}>
          Add to Cart
        </Text>

      </Pressable>

    </View>
  );
}

const s = StyleSheet.create({

  /* CARD */
  card: {
    backgroundColor: '#fff',

    borderRadius: 16,

    padding: 7,

    marginBottom: 8,

    borderWidth: 1,

    borderColor: C.line
  },

  /* PRODUCT IMAGE */
  picWrap: {
    width: '100%',

    height: 135,

    borderRadius: 12,

    overflow: 'hidden',

    backgroundColor: '#edf1ea'
  },

  pic: {
    width: '100%',

    height: '100%'
  },

  /* WISHLIST */
  heart: {
    position: 'absolute',

    right: 6,

    top: 6,

    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor: '#fff',

    alignItems: 'center',

    justifyContent: 'center',

    elevation: 2,

    shadowOpacity: 0.12,

    shadowRadius: 4
  },

  /* CATEGORY */
  cat: {
    fontSize: 8,

    fontWeight: '800',

    color: C.muted,

    marginTop: 7
  },

  /* PRODUCT NAME */
  name: {
    fontSize: 12,

    fontWeight: '900',

    color: C.ink,

    marginTop: 3,

    minHeight: 32
  },

  /* PRICE ROW */
  priceRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 5,

    marginTop: 2
  },

  price: {
    fontSize: 14,

    fontWeight: '900',

    color: C.green
  },

  old: {
    fontSize: 9,

    color: C.muted,

    textDecorationLine:
      'line-through'
  },

  /* ADD TO CART */
  add: {
    height: 34,

    borderRadius: 9,

    backgroundColor: C.green,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 4,

    marginTop: 7
  },

  addText: {
    fontSize: 10,

    fontWeight: '900',

    color: '#fff'
  }

});