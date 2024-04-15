'use strict';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {useTheme, useIsFocused} from '@react-navigation/native';
import RNGalleryList from './RNGalleryList';
import {ScreenWrapper} from './components/ScreenWrapper';
import {TileGallery} from './TileGallery';
import LinearGradient from 'react-native-linear-gradient';
import {HomeComponentTile} from './ControlItem';

const createStyles = (colors: any) =>
  StyleSheet.create({
    heading: {
      marginTop: 30,
      marginBottom: 10,
      fontSize: 23,
      color: colors.text,
    },
    text: {
      paddingTop: 5,
      paddingBottom: 5,
      color: colors.text,
    },
    container: {
      padding: 10,
      paddingBottom: 40,
      paddingLeft: 36,
      alignSelf: 'stretch',
      height: '100%',
      alignContent: 'flex-start',
    },
    scrollView: {
      paddingRight: 20,
    },
    homeContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
    },
    heroGradient : {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    heroBackgroundImage: {
      position: 'absolute',
      resizeMode: 'cover',
      width: '100%',
      height: '99%',
      opacity: 0.9,
    },
    pageHeader: {
      paddingLeft: 36,
    },
    pageTitleContainer: {
      height: 204,
      justifyContent: 'center',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 40,
      fontWeight: "600", // SemiBold
    },
  });

  
const PageTitle = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/Controls/HomePageHeaderImage.xaml#L19
    <View>
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={['#CED8E4', '#D5DBE3']}
        style={styles.heroGradient}/>
      <Image
        source={require('../assets/GalleryHeaderImage.png')}
        style={styles.heroBackgroundImage}/>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 0, y: 1.5}}
        colors={['#f9f9f900', '#f9f9f9FF']}
        style={styles.heroGradient}/>
      <View style={styles.pageHeader}>
        <View style={styles.pageTitleContainer}>
          <Text
            accessible
            accessibilityRole={'header'}
            style={styles.pageTitle}>
            React Native Gallery
          </Text>
        </View>
        <TileGallery/>
      </View>
    </View>
  );
};
  

const HomeContainer = (props: {heading: string; children: React.ReactNode}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  return (
    <View accessibilityLabel={props.heading + 'components'}>
      <Text accessibilityRole="header" style={styles.heading}>
        {props.heading}
      </Text>
      <View style={styles.homeContainer}>{props.children}</View>
    </View>
  );
};

const RenderHomeComponentTiles = (indicies: number[], navigation) => {
  var homeComponentTiles = [];
  for (var i = 0; i < indicies.length; i++) {
    let index = indicies[i];
    homeComponentTiles.push(
      <HomeComponentTile
        key={indicies[i]}
        pageKey={RNGalleryList[index].key}
        subtitle={RNGalleryList[index].subtitle}
        textIcon={RNGalleryList[index].textIcon}
        imageIcon={RNGalleryList[index].imageIcon}
        navigation={navigation}
      />,
    );
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
      {homeComponentTiles}
    </View>
  )
};

const RenderPageContent = ({navigation}) => {
  let categories = [
    'Basic Input',
    'Date and Time',
    'Dialogs and Flyouts',
    'Layout',
    'Text',
    'Status and Info',
    'Media',
  ];
  let categoryMap = new Map();
  categories.forEach((category) => {
    categoryMap.set(category, []);
  });

  RNGalleryList.forEach((item, index) => {
    let category = item.type;
    let categoryList = categoryMap.get(category);
    categoryList?.push(index);
  });
  
  return (
    <View>
      {
        categories.map((category) => 
          <HomeContainer heading={category}>
            {RenderHomeComponentTiles(categoryMap.get(category), navigation)}
          </HomeContainer>
        )
      }
    </View>
  );
};

export const HomePage: React.FunctionComponent<{}> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const isScreenFocused = useIsFocused();

  return isScreenFocused ? (
    <View>
      <ScreenWrapper doNotInset={true}>
        <ScrollView>
          <PageTitle/>
          <View style={styles.container}>
            <RenderPageContent navigation={navigation}/>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  ) : (
    <View />
  );
};
