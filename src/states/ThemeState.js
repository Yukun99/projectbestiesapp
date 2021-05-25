import {useTheme} from '@react-navigation/native';

function useColors() {
  const {colors} = useTheme();

  return colors;
}

export default useColors;
