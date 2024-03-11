import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProductTreeView} from './src/screens';
import productData from './src/utils/productData/productData.json';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProductTreeView data={productData} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
