import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {Mail} from 'lucide-react-native';

const {width} = Dimensions.get('window');

type Announcement = {id: string; title: string; body: string; date: string};

const CARD_WIDTH = Math.round(width * 0.78);

const AnnouncementCarousel: React.FC<{items: Announcement[]}> = ({items}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{marginBottom: 14}}>
      <Animated.FlatList
        data={items}
        keyExtractor={i => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={{paddingLeft: 6}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + 12),
            index * (CARD_WIDTH + 12),
            (index + 1) * (CARD_WIDTH + 12),
          ];
          const scale = scrollX.interpolate({inputRange, outputRange: [0.9, 1, 0.9], extrapolate: 'clamp'});
          const rotateY = scrollX.interpolate({inputRange, outputRange: ['8deg', '0deg', '-8deg'], extrapolate: 'clamp'});

          return (
            <Animated.View style={[styles.card, {transform: [{perspective: 1000}, {scale}, {rotateY}] }]}>
              <View style={styles.left}><Mail size={18} color="#fff" /></View>
              <View style={styles.body}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text} numberOfLines={2}>{item.body}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
      <View style={styles.dotsRow}>
        {items.map((_, i) => {
          const inputRange = [(i - 1) * (CARD_WIDTH + 12), i * (CARD_WIDTH + 12), (i + 1) * (CARD_WIDTH + 12)];
          const dotScale = scrollX.interpolate({inputRange, outputRange: [0.85, 1.6, 0.85], extrapolate: 'clamp'});
          const opacity = scrollX.interpolate({inputRange, outputRange: [0.35, 1, 0.35], extrapolate: 'clamp'});
          const bg = scrollX.interpolate({inputRange, outputRange: ['rgba(37,99,235,0.3)', 'rgba(37,99,235,1)', 'rgba(37,99,235,0.3)'], extrapolate: 'clamp'});
          return (
            <Animated.View key={i} style={[styles.dot, {transform: [{scale: dotScale}], opacity, backgroundColor: bg}]} />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.78,
    marginRight: 12,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 12},
    shadowRadius: 24,
  },
  left: {width: 52, height: 52, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center', marginRight: 12},
  body: {flex: 1},
  title: {color: '#fff', fontWeight: '900', fontSize: 16},
  text: {color: '#e6eefc', marginTop: 8, fontSize: 13, lineHeight: 18},
  date: {color: 'rgba(255,255,255,0.88)', marginTop: 10, fontSize: 12, opacity: 0.9},
  dotsRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12},
  dot: {width: 10, height: 10, borderRadius: 6, backgroundColor: '#2563EB', marginHorizontal: 6},
});

export default AnnouncementCarousel;
