import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  PlatformColor,
  Pressable,
  useColorScheme,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const createStyles = (colorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      backgroundColor: colorScheme === 'light' ? '#f9f9f9' : '#262626',
    },
    navBar: {
      backgroundColor: PlatformColor('NavigationViewDefaultPaneBackground'),
      width: 48,
      height: '100%',
      paddingBottom: 20,
    },
    navItem: {
      flexGrow: 1,
      flexShrink: 1,
      height: '100%',
      alignSelf: 'stretch',
      borderTopLeftRadius: 8,
      borderColor: PlatformColor('SurfaceStrokeColorFlyoutBrush'),
      borderLeftWidth: 1,
    },
    insetNavItem: {
      paddingLeft: 36,
    },
    menu: {
      margin: 5,
      height: 34,
      width: 38,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
      color: PlatformColor('TextControlForeground'),
    },
  });

type HamburgerButtonProps = {
  expanded: boolean;
  navigation: any;
};
const HamburgerButton = ({navigation, expanded}: HamburgerButtonProps) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  return (
    // requires react-native-gesture-handler to be imported in order to pass testing.
    // blocked by #125
    //accessibilityState={{expanded: useIsDrawerOpen()}}
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        expanded ? 'Navigation bar expanded' : 'Navigation bar hamburger icon'
      }
      {...{tooltip: expanded ? 'Collapse Menu' : 'Expand Menu'}}
      style={styles.menu}
      onPress={() =>
        expanded
          ? navigation.closeDrawer()
          : navigation.dispatch(DrawerActions.openDrawer())
      }>
      <Text style={styles.icon}>&#xE700;</Text>
    </Pressable>
  );
};

type ScreenWrapperProps = React.PropsWithChildren<{
  doNotInset?: boolean;
}>;
function ScreenWrapper({
  children,
  doNotInset,
}: ScreenWrapperProps): JSX.Element {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Navigation bar"
        // requires react-native-gesture-handler to be imported in order to pass testing.
        // blocked by #125
        /*accessibilityState={{
          expanded: useIsDrawerOpen(),
        }}*/
        style={styles.navBar}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}>
        <View>
          <HamburgerButton navigation={navigation} expanded={false} />
        </View>
      </Pressable>
      <View style={[styles.navItem, doNotInset ? {} : styles.insetNavItem]}>
        {children}
      </View>
    </View>
  );
}

export default ScreenWrapper;
export {ScreenWrapper, HamburgerButton};
