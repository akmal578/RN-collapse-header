import React, {useRef} from 'react';
import {Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import {generateData} from './data';
import AnimatedHeader from './components/AnimatedHeader';

const App = () => {
  const data = generateData(50);
  const [handleSnap, handleScroll, Ref, translateY] = AnimatedHeader();

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#1c1c1c" style="light" /> */}

      <Animated.View style={{...styles.header, transform: [{translateY}]}}>
        <Header />
      </Animated.View>

      <Animated.FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: 120}}
        onScroll={handleScroll}
        ref={Ref}
        onMomentumScrollEnd={handleSnap}
        data={data}
        renderItem={ListItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    left: 0,
    right: 0,
    zIndex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
