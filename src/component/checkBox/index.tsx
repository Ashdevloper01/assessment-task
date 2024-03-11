import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import {CHECK_ICON} from '../../assets/icons';

interface CustomCheckIconProps {
  checked?: boolean;
  checkOnPress?: () => void;
  expandOnPress?: () => void;
  title?: string;
  devices_count?: string | number;
  hideCount?: boolean;
  testID?: string;
}

const CustomCheckIcon: React.FC<CustomCheckIconProps> = ({
  checked,
  checkOnPress,
  expandOnPress,
  title,
  devices_count,
  hideCount,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity onPress={checkOnPress} activeOpacity={0.9}>
        <View style={styles.icon}>
          {checked && <Image source={CHECK_ICON} style={styles.image} />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={expandOnPress} activeOpacity={0.9}>
        <Text style={styles.title}>{title}</Text>
        {!hideCount && devices_count && (
          <Text style={styles.devices_count}>{devices_count}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomCheckIcon;
