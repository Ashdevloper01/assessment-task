import {StyleSheet} from 'react-native';
import {BLACK_COLOR, LIGHT_GRAY_COLOR, WHITE_COLOR} from '../../utils/colors';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    margin: '4%',
  },
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: '3%',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    paddingVertical: '3%',
    alignItems: 'center',
    paddingLeft: '6%',
  },
  modelContainer: {
    flexDirection: 'row',
    paddingVertical: '3%',
    alignItems: 'center',
    paddingLeft: '12%',
  },
  variantContainer: {
    flexDirection: 'row',
    paddingVertical: '3%',
    alignItems: 'center',
    paddingLeft: '17%',
  },
  header: {
    color: BLACK_COLOR,
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectVariant: {
    flexDirection: 'row',
    marginVertical: '2%',
    borderRadius: 8,
    borderColor: BLACK_COLOR,
    borderWidth: 1,
    backgroundColor: LIGHT_GRAY_COLOR,
    alignItems: 'center',
    padding: '3%',
    alignSelf: 'flex-start',
  },
  variantValue: {
    color: BLACK_COLOR,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
  variantName: {
    color: BLACK_COLOR,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  variantAllCatagories: {
    color: BLACK_COLOR,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectVariantText: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
  },
});

export default styles;
