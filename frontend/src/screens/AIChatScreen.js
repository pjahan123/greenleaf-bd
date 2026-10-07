import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable as RNPressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../styles/theme';

const Pressable = ({ style, ...props }) => (
  <RNPressable
    {...props}
    style={(state) => {
      const base =
        typeof style === 'function' ? style(state) : style;

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

/* =========================================
   LOCAL PLANT CARE FALLBACK
   Works even when Gemini is unavailable
========================================= */

const fallback = (q) => {
  const x = q.toLowerCase();

  if (
    x.includes('snake plant') ||
    x.includes('sansevieria')
  ) {
    if (x.includes('water')) {
      return (
        'Snake Plants need relatively little water. ' +
        'Let the soil dry out well before watering again. ' +
        'Usually watering every 2–3 weeks is enough indoors, ' +
        'but always check the soil first. Avoid leaving water ' +
        'standing in the pot.'
      );
    }

    if (x.includes('light') || x.includes('sun')) {
      return (
        'Snake Plants tolerate low light, but they grow best ' +
        'in bright, indirect light. Avoid strong direct ' +
        'afternoon sunlight.'
      );
    }

    return (
      'Snake Plant is an easy-care indoor plant. Give it ' +
      'bright indirect light, well-draining soil and water ' +
      'only after the soil has dried out.'
    );
  }

  if (x.includes('monstera')) {
    if (x.includes('water')) {
      return (
        'Water your Monstera when the top 2–5 cm of soil feels ' +
        'dry. Water thoroughly and allow excess water to drain. ' +
        'Avoid keeping the soil constantly wet.'
      );
    }

    if (x.includes('light') || x.includes('sun')) {
      return (
        'Monstera prefers bright, indirect light. Too much ' +
        'strong direct sunlight can burn its leaves.'
      );
    }

    return (
      'Monstera prefers bright indirect light, moderate ' +
      'watering, good drainage and a warm environment. ' +
      'A support pole can help as it grows.'
    );
  }

  if (x.includes('aloe')) {
    return (
      'Aloe Vera prefers bright light and well-draining soil. ' +
      'Let the soil dry completely between watering. ' +
      'Overwatering is one of the most common Aloe Vera problems.'
    );
  }

  if (
    x.includes('pothos') ||
    x.includes('golden pothos')
  ) {
    return (
      'Golden Pothos is beginner-friendly. Keep it in bright ' +
      'indirect light and water when the top layer of soil ' +
      'becomes dry. It can tolerate lower light, although ' +
      'growth may slow.'
    );
  }

  if (x.includes('peace lily')) {
    return (
      'Peace Lily prefers bright indirect light and evenly ' +
      'moist soil. Water when the top layer begins to dry. ' +
      'Repeated overwatering can damage the roots.'
    );
  }

  if (x.includes('yellow')) {
    return (
      'Yellow leaves can have several causes, including ' +
      'overwatering, poor drainage, natural aging, insufficient ' +
      'light or sudden environmental changes. Check the soil ' +
      'moisture before changing your watering routine.'
    );
  }

  if (
    x.includes('water') ||
    x.includes('watering')
  ) {
    return (
      'Check the top layer of soil before watering. If it feels ' +
      'dry, water thoroughly until some water drains from the ' +
      'bottom. Empty excess water and avoid keeping the roots ' +
      'constantly wet.'
    );
  }

  if (
    x.includes('light') ||
    x.includes('sun')
  ) {
    return (
      'Most indoor plants prefer bright, indirect light. ' +
      'Keep them near a bright window while protecting sensitive ' +
      'leaves from harsh direct midday sunlight.'
    );
  }

  if (x.includes('soil')) {
    return (
      'Use a loose, well-draining potting mix. Succulents need ' +
      'faster drainage, while tropical plants generally prefer ' +
      'a moisture-retaining but airy mix.'
    );
  }

  if (
    x.includes('fertilizer') ||
    x.includes('fertilize')
  ) {
    return (
      'Use a balanced, diluted fertilizer during active growth. ' +
      'Avoid heavy feeding when the plant is stressed, recently ' +
      'repotted or showing signs of root problems.'
    );
  }

  if (
    x.includes('pest') ||
    x.includes('insect') ||
    x.includes('bug')
  ) {
    return (
      'First isolate the affected plant. Check leaves and stems ' +
      'for mealybugs, scale or spider mites. Clean affected ' +
      'areas and use a plant-safe treatment according to its label.'
    );
  }

  if (
    x.includes('repot') ||
    x.includes('pot')
  ) {
    return (
      'Repot when roots become crowded, the plant dries out ' +
      'unusually quickly, or roots come through the drainage holes. ' +
      'Choose a pot only slightly larger than the current one ' +
      'and make sure it has drainage holes.'
    );
  }

  if (x.includes('seed')) {
    return (
      'For seeds, use fresh well-draining soil, provide suitable ' +
      'light and keep the growing medium appropriately moist. ' +
      'Avoid keeping the soil constantly soaked because seeds ' +
      'can rot.'
    );
  }

  return (
    'I can help with plant care 🌿\n\n' +
    'Try asking:\n\n' +
    '• How often should I water my Snake Plant?\n' +
    '• Why are my Monstera leaves yellow?\n' +
    '• How much sunlight does Aloe Vera need?\n' +
    '• What soil should I use?\n' +
    '• How do I treat plant pests?\n' +
    '• When should I repot my plant?'
  );
};

export default function AIChatScreen({ onClose }) {
  const [q, setQ] = useState('');

  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text:
        'Hi! I’m GreenLeaf AI 🌿 Ask me about watering, light, soil, pests or any plant.',
    },
  ]);

  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = q.trim();

    if (!text || loading) return;

    setQ('');

    setMessages((m) => [
      ...m,
      {
        from: 'user',
        text,
      },
    ]);

    setLoading(true);

    try {
      const API_URL =
        process.env.EXPO_PUBLIC_API_URL ||
        'http://localhost:5000';

      const response = await fetch(
        `${API_URL}/api/ai/ask`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.success &&
        data.answer
      ) {
        setMessages((m) => [
          ...m,
          {
            from: 'ai',
            text: data.answer,
          },
        ]);
      } else {
        throw new Error('AI unavailable');
      }
    } catch (error) {
      console.log(
        'Gemini unavailable, using local plant-care assistant.'
      );

      setMessages((m) => [
        ...m,
        {
          from: 'ai',
          text: fallback(text),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.page}>

      {/* HEADER */}

      <View style={s.head}>

        <View>
          <Text style={s.title}>
            GreenLeaf AI
          </Text>

          <Text style={s.sub}>
            Plant-care assistant 🌿
          </Text>
        </View>

        <Pressable onPress={onClose}>
          <Ionicons
            name="close"
            size={26}
            color={C.ink}
          />
        </Pressable>

      </View>

      {/* CHAT */}

      <ScrollView
        style={s.chat}
        contentContainerStyle={{
          paddingBottom: 15,
        }}
      >

        {messages.map((m, i) => (

          <View
            key={i}
            style={[
              s.bubble,

              m.from === 'user'
                ? s.user
                : s.bot,
            ]}
          >

            <Text
              style={[
                s.msg,

                m.from === 'user' && {
                  color: '#fff',
                },
              ]}
            >
              {m.text}
            </Text>

          </View>

        ))}

        {loading && (
          <Text style={s.typing}>
            GreenLeaf AI is thinking…
          </Text>
        )}

      </ScrollView>

      {/* INPUT */}

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        <View style={s.inputRow}>

          <TextInput
            value={q}
            onChangeText={setQ}
            onSubmitEditing={send}
            placeholder="Ask about your plant..."
            placeholderTextColor="#999"
            style={s.input}
          />

          <Pressable
            onPress={send}
            style={s.send}
          >

            <Ionicons
              name="arrow-up"
              size={21}
              color="#fff"
            />

          </Pressable>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({

  page: {
    flex: 1,
    backgroundColor: C.cream,
  },

  head: {
    padding: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: C.line,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
    color: C.deep,
  },

  sub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 3,
  },

  chat: {
    flex: 1,
    padding: 16,
  },

  bubble: {
    maxWidth: '88%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
  },

  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.line,
  },

  user: {
    alignSelf: 'flex-end',
    backgroundColor: C.green,
  },

  msg: {
    fontSize: 14,
    lineHeight: 20,
    color: C.ink,
  },

  typing: {
    fontSize: 12,
    color: C.muted,
    padding: 8,
  },

  inputRow: {
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: C.line,

    flexDirection: 'row',
    gap: 8,
  },

  input: {
    flex: 1,
    height: 50,

    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 15,

    paddingHorizontal: 15,

    fontSize: 14,
    color: C.ink,
  },

  send: {
    width: 50,
    height: 50,

    borderRadius: 15,
    backgroundColor: C.green,

    alignItems: 'center',
    justifyContent: 'center',
  },

});