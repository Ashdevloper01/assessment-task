import React, {useState} from 'react';
import {View, FlatList, SafeAreaView, Text} from 'react-native';

import styles from './styles';
import {CheckBox} from '../../component';

interface Product {
  id: number;
  category_name?: string;
  brand_name?: string;
  model_name?: string;
  variant_name?: string;
  devices_count?: string | number;
  children?: Product[];
}

interface ProductTreeViewProps {
  data: Product[];
}

const ProductTreeView: React.FC<ProductTreeViewProps> = ({data}) => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [brandExpand, setBrandExpand] = useState<number[]>([]);
  const [modelExpanded, setModelExpanded] = useState<number[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [selectModel, setSelectModel] = useState<Product[]>([]);

  const variantValue = (): string => {
    const modelMap = new Map<number, Product>(
      selectModel?.map(model => [model.id, model]) ?? [],
    );
    return (modelExpanded ?? [])
      .map(modelId => {
        const model = modelMap.get(modelId);
        // eslint-disable-next-line curly
        if (!model) return '';

        const variants = model.children?.filter(variant =>
          selectedVariants.includes(variant.id),
        );
        // eslint-disable-next-line curly
        if (!variants || variants.length === 0) return '';

        const modelName = model.model_name || '';
        const variantNames = variants.map(
          variant => variant.variant_name || '',
        );
        return ` ${modelName} ${variantNames.join(', ')}`;
      })
      .filter(Boolean)
      .join('');
  };

  const handleToggle = (itemId: number) => {
    if (selectedVariants.includes(itemId)) {
      setSelectedVariants(selectedVariants.filter(id => id !== itemId));
    } else {
      setSelectedVariants([...selectedVariants, itemId]);
    }
  };

  const setState = (type: number, itemId: number) => {
    if (type === 1) {
      setExpanded(expandOrCollapse(expanded, itemId));
    } else if (type === 2) {
      setBrandExpand(expandOrCollapse(brandExpand, itemId));
    } else if (type === 3) {
      setModelExpanded(expandOrCollapse(modelExpanded, itemId));
    }
  };

  const expandOrCollapse = (list: number[], itemId: number) => {
    if (list.includes(itemId)) {
      return list.filter(id => id !== itemId);
    } else {
      return [...list, itemId];
    }
  };

  const idAllSelected = (list: Product[] | undefined) => {
    // eslint-disable-next-line curly
    if (!list) return false;
    let isAll = true;
    for (let i = 0; i < list.length; i++) {
      if (!selectedVariants.includes(list[i].id || 0)) {
        isAll = false;
        break;
      }
    }
    return selectedVariants?.length ? isAll : false;
  };

  const checkModelChild = (list: Product[] | undefined) => {
    // eslint-disable-next-line curly
    if (!list) return;
    const idArray = list?.map(item => item.id || 0);
    const tempSelectedData = idAllSelected(list)
      ? selectedVariants.filter(id => !idArray.includes(id))
      : [...selectedVariants, ...idArray];

    setSelectedVariants(tempSelectedData);
  };

  const getSpand = (type: number, itemId: number) => {
    if (type === 1) {
      return expanded.includes(itemId);
    } else if (type === 2) {
      return brandExpand.includes(itemId);
    } else if (type === 3) {
      return modelExpanded.includes(itemId);
    }
    return false;
  };

  const renderItem = ({item}: {item: Product}) => {
    return (
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <CheckBox
            title={item?.category_name}
            expandOnPress={() => setState(1, item?.id || 0)}
            devices_count={item?.devices_count}
            hideCount={getSpand(1, item?.id || 0)}
            testID={'1'}
          />
        </View>
        {getSpand(1, item?.id || 0) &&
          item?.children &&
          item?.children?.map(brand => (
            <React.Fragment key={brand?.id}>
              <View style={styles.brandContainer}>
                <CheckBox
                  title={brand?.brand_name}
                  expandOnPress={() => {
                    setState(2, brand?.id || 0);
                  }}
                  devices_count={brand?.devices_count}
                  hideCount={getSpand(2, brand?.id || 0)}
                  testID={'2'}
                />
              </View>
              {getSpand(2, brand?.id || 0) &&
                brand?.children &&
                brand?.children?.map(model => (
                  <React.Fragment key={model?.id}>
                    <View style={styles.modelContainer}>
                      <CheckBox
                        title={model?.model_name}
                        expandOnPress={() => {
                          setState(3, model?.id || 0);
                          if (modelExpanded.includes(model?.id || 0)) {
                            setSelectModel(
                              selectModel.filter(val => val?.id !== model?.id),
                            );
                          } else {
                            setSelectModel([...selectModel, model]);
                          }
                        }}
                        devices_count={model?.devices_count}
                        hideCount={getSpand(3, model?.id || 0)}
                        checked={idAllSelected(model?.children)}
                        checkOnPress={() => {
                          checkModelChild(model?.children);
                        }}
                        testID={'3'}
                      />
                    </View>
                    {getSpand(3, model?.id || 0) &&
                      model?.children &&
                      model?.children?.map(variant => (
                        <View style={styles.variantContainer} key={variant?.id}>
                          <CheckBox
                            title={variant?.variant_name}
                            checked={selectedVariants.includes(
                              variant?.id || 0,
                            )}
                            checkOnPress={() => handleToggle(variant?.id || 0)}
                            devices_count={variant?.devices_count}
                            testID={'4'}
                          />
                        </View>
                      ))}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      {variantValue()?.length > 0 && (
        <View>
          <Text style={styles.selectVariantText}>Selected Variants</Text>
          <View style={styles.selectVariant}>
            <Text style={styles.variantValue}>{variantValue()?.trim()}</Text>
          </View>
        </View>
      )}
      <Text style={styles.header}>Browse Product</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default ProductTreeView;
