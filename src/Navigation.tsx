import React, {useState} from 'react';
import {
  View,
} from 'react-native';
import type { PropsWithChildren } from 'react';

type NavigationContextType = {
  push: (screen: string, parameters : any, navigateFrom: string) => void,
  pop: () => void,
  navigate: (screen: string, parameters : any) => void,
  currentScreen: string,
  routes: any[],
  parameters: any,
}
const NavigationContext = React.createContext<NavigationContextType>({
  push: () => {},
  pop: () => {},
  navigate: () => {},
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
    navigate: (screen: string, parameters: any) => {
      setRoutes([...routes, {name: screen, key: screen, params: parameters}]);
      setCurrentScreen(screen);
      setParameters(parameters);
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
    push: (screen: string, parameters: any) => {navigationContext.push(screen, parameters, name)},
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
const DrawerNavigator = ({drawerContent, screenOptions, children} : DrawerNavigatorProps) => {
  const navigationContext = React.useContext(NavigationContext);

  const navigation = {
    params: navigationContext.parameters,
    navigate: (screen: string, parameters: any) => {
      console.log("DrawerNavigator navigate to " + screen);
      navigationContext.navigate(screen, parameters);
    },
    getState: () => {return {routeNames: navigationContext.routes, params: navigationContext.parameters}}
  };

  const drawer = drawerContent({navigation});
  return (
    <View>
      {drawer}
      {React.Children.map(children, child => {
        const name = child.props.name;
        if (name !== navigationContext.currentScreen) {
          return null;
        }
        return (
          <View key={name} style={{alignItems: 'stretch'}}>
            {child}
          </View>
        );
      })}
  </View>
  );
};

type DrawerScreenProps = {
  key: string,
  name: string,
  component: ({ navigation, route }: { navigation: any; route: any; }) => JSX.Element,
};
const DrawerScreen = ({key, name, component}: DrawerScreenProps) => {
  const navigationContext = React.useContext(NavigationContext);

  if (navigationContext.parameters === undefined) {
    console.log(navigationContext);
  }

  let myRoute = navigationContext.routes.find((route) => route.name === name);

  const navigation = {
    params: navigationContext.parameters ?? myRoute.parameters,
    navigate: (screen: string, parameters: any) => {
      console.log("DrawerScreen navigate to " + screen);
      navigationContext.navigate(screen, parameters ?? {});
    },
    getState: () => {return {routes: navigationContext.routes, params: navigationContext.parameters}}
  };

  const content = component({navigation: navigation, route: navigation});

  return (
    <View key={key}>
      {content}
    </View>
  );
};

const createDrawerNavigator = () => {
  return {
    Navigator: ({drawerContent, screenOptions, children} : DrawerNavigatorProps) => {
      return (
        <DrawerNavigator drawerContent={drawerContent} screenOptions={screenOptions}>
          {children}
        </DrawerNavigator>
      );
    },
    Screen: ({component, name, key}: DrawerScreenProps) => {
      return (
        <DrawerScreen key={key} name={name} component={component} />
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