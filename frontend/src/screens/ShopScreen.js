import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable as RNPressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
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

const TOP = [
  ['Plants', 'Plants'],
  ['Seeds', 'Seeds'],
  ['Pots & Planters', 'Pots & Planters'],
];

const SUB = [
  ['All Plants', 'Plants'],
  ['Indoor Plants', 'Indoor Plants'],
  ['Succulents', 'Succulents'],
  ['Flowering Plants', 'Flowering Plants'],
  ['Air-Purifying Plants', 'Air-Purifying Plants'],
];

export default function ShopScreen({
  onProduct,
  onCart,
  onWish,
  wishlist = [],
  initialCategory = 'Plants',
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState(initialCategory);

  const top =
    cat === 'Seeds'
      ? 'Seeds'
      : cat === 'Pots & Planters'
      ? 'Pots & Planters'
      : 'Plants';

  const list = useMemo(() => {
    let a = PRODUCTS;

    if (top === 'Plants') {
      a = a.filter(
        (p) =>
          p.type === 'plant' &&
          (cat === 'Plants' || p.subcategory === cat)
      );
    }

    if (top === 'Seeds') {
      a = a.filter((p) => p.type === 'seed');
    }

    if (top === 'Pots & Planters') {
      a = a.filter(
        (p) => p.category === 'Pots & Planters'
      );
    }

    return a.filter(
      (p) =>
        !q ||
        `${p.name} ${p.category} ${p.subcategory || ''}`
          .toLowerCase()
          .includes(q.toLowerCase())
    );
  }, [q, cat, top]);

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.eyebrow}>
        SHOP GREENLEAF
      </Text>

      <Text style={styles.title}>
        Find something green.
      </Text>

      <Text style={styles.sub}>
        Choose from plants, seeds, pots and planters.
      </Text>

      {/* SEARCH */}
      <View style={styles.search}>
        <Ionicons
          name="search-outline"
          size={20}
          color={C.muted}
        />

        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search products"
          placeholderTextColor="#A5ADA5"
          style={styles.input}
        />
      </View>

      {/* MAIN CATEGORIES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {TOP.map(([label, value]) => (
          <Pressable
            key={value}
            style={[
              styles.filter,
              top === value && styles.active,
            ]}
            onPress={() => setCat(value)}
          >
            <Text
              style={[
                styles.ft,
                top === value && styles.at,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* PLANT SUBCATEGORIES */}
      {top === 'Plants' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subfilters}
        >
          {SUB.map(([label, value]) => (
            <Pressable
              key={value}
              style={[
                styles.subf,
                cat === value && styles.subactive,
              ]}
              onPress={() => setCat(value)}
            >
              <Text
                style={[
                  styles.st,
                  cat === value && styles.sactive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* RESULT COUNT */}
      <View style={styles.result}>
        <Text style={styles.count}>
          {list.length} products
        </Text>
      </View>

      {/* PRODUCT GRID */}
      <View style={styles.grid}>
        {list.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={onProduct}
            onCart={onCart}
            onWish={onWish}
            wished={wishlist.includes(product.id)}
          />
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: C.cream,
    paddingHorizontal: 15,
  },

  pageContent: {
    paddingBottom: 125,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: C.green,
    marginTop: 8,
  },

  title: {
    fontSize: 31,
    fontWeight: '900',
    color: C.ink,
    marginTop: 5,
  },

  sub: {
    fontSize: 14,
    color: C.muted,
    marginTop: 5,
  },

  search: {
    height: 53,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    marginTop: 17,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: C.ink,
  },

  filters: {
    gap: 8,
    paddingVertical: 15,
  },

  filter: {
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.line,
    justifyContent: 'center',
  },

  active: {
    backgroundColor: C.green,
    borderColor: C.green,
  },

  ft: {
    fontSize: 12,
    fontWeight: '900',
    color: C.ink,
  },

  at: {
    color: '#fff',
  },

  subfilters: {
    gap: 8,
    paddingBottom: 14,
  },

  subf: {
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 13,
    backgroundColor: C.sage,
    justifyContent: 'center',
  },

  subactive: {
    backgroundColor: C.deep,
  },

  st: {
    fontSize: 11,
    fontWeight: '900',
    color: C.ink,
  },

  sactive: {
    color: '#fff',
  },

  result: {
    marginBottom: 10,
  },

  count: {
    fontSize: 13,
    fontWeight: '900',
    color: C.ink,
  },

  // IMPORTANT:
  // This creates 2 cards per row.
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    // ONLY vertical gap.
    // No horizontal gap.
    rowGap: 10,
  },
});