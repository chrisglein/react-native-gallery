import React, {useState} from 'react';
import {
  View,
  Text,
} from 'react-native';
import type { PropsWithChildren } from 'react';

//import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';

type NavigationContextType = {
  push: (screen: string, parameters : any, navigateFrom: string) => void,
  pop: () => void,
  currentScreen: string,
  routes: any[],
  parameters: any,
}
const NavigationContext = React.createContext<NavigationContextType>({
  push: () => {},
  pop: () => {},
  currentScreen: '',
  routes: [],
  parameters: [],
});

type RouteType = {
  name: string,
  key: string,
  params: any,
}

type NavigationContainerProps = PropsWithChildren<{}>;
const NavigationContainer = ({children}: NavigationContainerProps) => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [routes, setRoutes] = useState<RouteType[]>([{name: 'Home', key: 'Home', params: {}}]);
  const [parameters, setParameters] = useState({} as any);
  const navigationContext = {
    push: (screen: string, parameters: any, navigateFrom: string) => {
      setRoutes([...routes, {name: screen, key: screen, params: parameters}]);
      setCurrentScreen(screen);
      setParameters(parameters);
    },
    pop: () => {
      if (routes.length > 1) {
        routes.pop();
        setRoutes(routes);
        setCurrentScreen(routes[routes.length - 1].name);
      }
    },
    currentScreen: currentScreen,
    routes: routes,
    parameters: parameters,
  }
  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
};

type StackNavigatorProps = PropsWithChildren<{
    initialRouteName?: string;
}>;
const StackNavigator = ({children, initialRouteName}: StackNavigatorProps) => {
  const navigationContext = React.useContext(NavigationContext);

  return (
    <View>
      {React.Children.map(children, child => {
        const name = child.props.name;
        if (name !== navigationContext.currentScreen) {
          return null;
        }
        return (
          <View key={name} style={{alignItems: name === 'Search' ? 'center' : 'stretch'}}>
            {child}
          </View>
        );
      })}
    </View>
  );
};

type StackScreenProps = PropsWithChildren<{
    name: string,
    component: ({ navigation, route }: { navigation: any; route: any; }) => JSX.Element,
    options: ({navigation}: {navigation: any}) => any,
}>;
const StackScreen = ({children, name, component, options}: StackScreenProps) => {
  const navigationContext = React.useContext(NavigationContext);

  let myRoute = navigationContext.routes.find((route) => route.name === name);

  const navigation = {
    params: navigationContext.parameters ?? myRoute.parameters,
    push: (screen, parameters) => {navigationContext.push(screen, parameters, name)},
    pop: () => {navigationContext.pop()},
    getState: () => {return {routes: navigationContext.routes, params: navigationContext.parameters}}
  };

  let header = null;
  if (options) {
    const optionsResult = options({navigation});
    header = optionsResult.header();
  }
  const content = component({navigation: navigation, route: navigation});

  return (
    <View>
      {header}
      {content}
    </View>
  );
};

const createNativeStackNavigator = () => {
    return {}
};

type DrawerNavigatorProps = PropsWithChildren<{
    drawerContent: any,
    screenOptions: any,
}>;
type DrawerScreenProps = PropsWithChildren<{
    name: string,
    key: string,
    component: ({ navigation, route }: { navigation: any; route: any; }) => JSX.Element,
    options: ({navigation}: {navigation: any}) => any,
}>;
const createDrawerNavigator = () => {
  const navigation = {
    getState: () => {return {routes: [], params: {}, routeNames: []}},
  };

  return {
    Navigator: ({drawerContent, screenOptions, children} : DrawerNavigatorProps) => {
      const drawer = drawerContent({navigation});
      return (
        <View>
          {children}
          {drawer}
        </View>
      );
    },
    Screen: ({component, name, key}: DrawerScreenProps) => {
      return (
        <View key={key}>
          {component({navigation: navigation, route: navigation})}
        </View>
      )
    },
  }
}

const getDrawerStatusFromState = (state: any) => {
  return undefined;
}

const useIsFocused = () => {
  return true;
}

const useTheme = () => {
  return {colors: {
    primary: '#0066cc',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#505050',
    border: '#E6E6E6',
    notification: 'rgb(255, 59, 48)',
  }};
}

const Theme = {
  colors: {
    primary: '#0066cc',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#505050',
    border: '#E6E6E6',
    notification: 'rgb(255, 59, 48)',
  },
  dark: false,
}

const useNavigation = () => {
  return {push: () => {}, pop: () => {}};
}

const DrawerActions = {
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
}

export { NavigationContainer, StackNavigator, StackScreen, createNativeStackNavigator, createDrawerNavigator, getDrawerStatusFromState, useIsFocused, useTheme, Theme, useNavigation, DrawerActions };