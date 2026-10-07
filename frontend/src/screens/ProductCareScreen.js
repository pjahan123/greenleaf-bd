import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable as RNPressable,
  StyleSheet,
  useWindowDimensions,
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
          transform: [{ scale: 0.97 }],
        },
      ];
    }}
  />
);

export default function ProductCareScreen({
  product,
  onBack,
  onCart,
  onWish,
  wished,
}) {
  const { width } = useWindowDimensions();

  if (!product) return null;

  // Desktop / web layout
  const isDesktop = width >= 768;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.page}
      >

        {/* ============================= */}
        {/* PRODUCT SECTION */}
        {/* ============================= */}

        <View
          style={[
            s.productSection,
            isDesktop
              ? s.productSectionDesktop
              : s.productSectionMobile,
          ]}
        >

          {/* ============================= */}
          {/* LEFT - PRODUCT IMAGE */}
          {/* ============================= */}

          <View
            style={[
              s.imageColumn,
              isDesktop
                ? s.imageColumnDesktop
                : s.imageColumnMobile,
            ]}
          >

            <View
              style={[
                s.imageBox,
                isDesktop
                  ? s.imageBoxDesktop
                  : s.imageBoxMobile,
              ]}
            >

              <Image
                source={{ uri: product.image }}
                style={s.productImage}
                resizeMode="contain"
              />

              {/* BACK BUTTON */}

              <Pressable
                style={s.backButton}
                onPress={onBack}
              >
                <Ionicons
                  name="arrow-back"
                  size={21}
                  color={C.ink}
                />
              </Pressable>

              {/* WISHLIST BUTTON */}

              <Pressable
                style={s.heartButton}
                onPress={() => onWish(product)}
              >
                <Ionicons
                  name={
                    wished
                      ? 'heart'
                      : 'heart-outline'
                  }
                  size={21}
                  color={
                    wished
                      ? C.danger
                      : C.ink
                  }
                />
              </Pressable>

            </View>
          </View>


          {/* ============================= */}
          {/* RIGHT - PRODUCT INFORMATION */}
          {/* ============================= */}

          <View
            style={[
              s.infoColumn,
              isDesktop
                ? s.infoColumnDesktop
                : s.infoColumnMobile,
            ]}
          >

            <Text style={s.category}>
              {product.subcategory ||
                product.category}
            </Text>

            <Text style={s.name}>
              {product.name}
            </Text>


            {/* PRICE */}

            <View style={s.priceRow}>

              <Text style={s.price}>
                ৳{product.price}
              </Text>

              {product.oldPrice && (
                <Text style={s.oldPrice}>
                  ৳{product.oldPrice}
                </Text>
              )}

            </View>


            {/* DESCRIPTION */}

            {product.description && (
              <Text style={s.description}>
                {product.description}
              </Text>
            )}


            {/* ADD TO CART */}

            <Pressable
              style={s.cartButton}
              onPress={() => onCart(product)}
            >

              <Ionicons
                name="bag-add-outline"
                size={20}
                color="#fff"
              />

              <Text style={s.cartText}>
                Add to Cart
              </Text>

            </Pressable>

          </View>

        </View>


        {/* ============================= */}
        {/* PLANT CARE */}
        {/* ============================= */}

        {product.care && (
          <View
            style={[
              s.careWrapper,
              isDesktop
                ? s.careWrapperDesktop
                : s.careWrapperMobile,
            ]}
          >

            <View style={s.careBox}>

              <Text style={s.careTitle}>
                Plant Care
              </Text>


              {product.care.light && (
                <CareItem
                  icon="sunny-outline"
                  title="Light"
                  text={product.care.light}
                />
              )}


              {product.care.watering && (
                <CareItem
                  icon="water-outline"
                  title="Watering"
                  text={product.care.watering}
                />
              )}


              {product.care.soil && (
                <CareItem
                  icon="leaf-outline"
                  title="Soil"
                  text={product.care.soil}
                />
              )}


              {product.care.temperature && (
                <CareItem
                  icon="thermometer-outline"
                  title="Temperature"
                  text={
                    product.care.temperature
                  }
                />
              )}


              {product.care.fertilizer && (
                <CareItem
                  icon="flask-outline"
                  title="Fertilizer"
                  text={
                    product.care.fertilizer
                  }
                />
              )}


              {product.care.repotting && (
                <CareItem
                  icon="repeat-outline"
                  title="Repotting"
                  text={
                    product.care.repotting
                  }
                />
              )}


              {product.care.pests && (
                <CareItem
                  icon="bug-outline"
                  title="Pests"
                  text={
                    product.care.pests
                  }
                />
              )}

            </View>

          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}


/* ================================= */
/* CARE ITEM */
/* ================================= */

function CareItem({
  icon,
  title,
  text,
}) {
  return (
    <View style={s.careItem}>

      <View style={s.careIcon}>

        <Ionicons
          name={icon}
          size={19}
          color={C.green}
        />

      </View>


      <View style={s.careTextBox}>

        <Text style={s.careItemTitle}>
          {title}
        </Text>

        <Text style={s.careItemText}>
          {text}
        </Text>

      </View>

    </View>
  );
}


/* ================================= */
/* STYLES */
/* ================================= */

const s = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: C.cream,
  },

  page: {
    paddingBottom: 45,
  },


  /* ================================= */
  /* PRODUCT SECTION */
  /* ================================= */

  productSection: {
    width: '100%',
  },

  productSectionDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 25,
    gap: 45,
  },

  productSectionMobile: {
    flexDirection: 'column',
    paddingHorizontal: 18,
    paddingTop: 10,
  },


  /* ================================= */
  /* IMAGE COLUMN */
  /* ================================= */

  imageColumn: {
    alignItems: 'center',
  },

  imageColumnDesktop: {
    flex: 1,
    alignItems: 'flex-start',
  },

  imageColumnMobile: {
    width: '100%',
  },


  /* ================================= */
  /* IMAGE CARD */
  /* ================================= */

  imageBox: {
    backgroundColor: '#edf1ea',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  imageBoxDesktop: {
    width: '100%',
    maxWidth: 520,
    height: 430,
    borderRadius: 22,
  },

  imageBoxMobile: {
    width: '100%',
    height: 280,
    borderRadius: 20,
  },


  /* ================================= */
  /* PRODUCT IMAGE */
  /* ================================= */

  productImage: {
    width: '90%',
    height: '90%',
  },


  /* ================================= */
  /* BACK BUTTON */
  /* ================================= */

  backButton: {
    position: 'absolute',

    left: 12,
    top: 12,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },


  /* ================================= */
  /* WISHLIST BUTTON */
  /* ================================= */

  heartButton: {
    position: 'absolute',

    right: 12,
    top: 12,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },


  /* ================================= */
  /* PRODUCT INFO */
  /* ================================= */

  infoColumn: {
  },

  infoColumnDesktop: {
    flex: 1,
    maxWidth: 520,
    paddingTop: 35,
  },

  infoColumnMobile: {
    width: '100%',
    paddingTop: 18,
  },


  category: {
    fontSize: 11,
    fontWeight: '900',
    color: C.green,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },


  name: {
    fontSize: 34,
    fontWeight: '900',
    color: C.ink,
    marginTop: 7,
  },


  /* ================================= */
  /* PRICE */
  /* ================================= */

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },

  price: {
    fontSize: 25,
    fontWeight: '900',
    color: C.green,
  },

  oldPrice: {
    fontSize: 14,
    color: C.muted,
    textDecorationLine: 'line-through',
  },


  /* ================================= */
  /* DESCRIPTION */
  /* ================================= */

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: C.muted,
    marginTop: 18,
  },


  /* ================================= */
  /* ADD TO CART */
  /* ================================= */

  cartButton: {
    height: 54,

    borderRadius: 14,

    backgroundColor: C.green,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 8,

    marginTop: 25,

    width: '100%',
  },

  cartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },


  /* ================================= */
  /* CARE WRAPPER */
  /* ================================= */

  careWrapper: {
    width: '100%',
  },

  careWrapperDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  careWrapperMobile: {
    paddingHorizontal: 18,
    marginTop: 20,
  },


  /* ================================= */
  /* CARE BOX */
  /* ================================= */

  careBox: {
    backgroundColor: '#fff',

    borderRadius: 18,

    borderWidth: 1,

    borderColor: C.line,

    padding: 18,
  },


  careTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: C.ink,
    marginBottom: 15,
  },


  /* ================================= */
  /* CARE ITEM */
  /* ================================= */

  careItem: {
    flexDirection: 'row',
    marginBottom: 17,
  },


  careIcon: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#edf5eb',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },


  careTextBox: {
    flex: 1,
  },


  careItemTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: C.ink,
    marginBottom: 3,
  },


  careItemText: {
    fontSize: 12,
    lineHeight: 18,
    color: C.muted,
  },

});