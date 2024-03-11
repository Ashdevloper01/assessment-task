import {StyleSheet} from 'react-native';
import {BLACK_COLOR, GREEN_COLOR} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 15,
    width: 15,
    alignSelf: 'center',
    tintColor: GREEN_COLOR,
  },
  title: {
    color: BLACK_COLOR,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  devices_count: {
    color: BLACK_COLOR,
    marginLeft: 8,
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: BLACK_COLOR,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
