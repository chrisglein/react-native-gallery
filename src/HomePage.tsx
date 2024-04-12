'use strict';
import {StyleSheet, View, Text, Pressable, ScrollView, Image} from 'react-native';
import React from 'react';
import {useTheme, useIsFocused} from '@react-navigation/native';
import RNGalleryList from './RNGalleryList';
import {ScreenWrapper} from './components/ScreenWrapper';
import {TileGallery} from './TileGallery';
import LinearGradient from 'react-native-linear-gradient';

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
      paddingLeft: 24,
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
      paddingRight: 10,
      paddingLeft: 10,
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

const HomeComponentTile = (props: {index: number; navigation}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        RNGalleryList[props.index].key === 'Button'
          ? 'Button1 control'
          : RNGalleryList[props.index].key + ' control'
      }
      accessibilityHint={
        'click to view the ' + RNGalleryList[props.index].key + ' sample page'
      }
      style={({pressed}) => [
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
          borderBottomWidth: pressed ? 1 : 2,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 4,
          alignItems: 'center',
          flexDirection: 'row',
          marginRight: 5,
          marginBottom: 5,
        },
      ]}
      onPress={() => {
        props.navigation.navigate(RNGalleryList[props.index].key);
      }}>
      <Text style={styles.icon}>{RNGalleryList[props.index].icon}</Text>
      <Text style={[styles.text, {paddingRight: 10}]}>
        {RNGalleryList[props.index].key}
      </Text>
    </Pressable>
  );
};

const RenderHomeComponentTiles = (indicies: number[], navigation) => {
  var homeComponentTiles = [];
  for (var i = 0; i < indicies.length; i++) {
    homeComponentTiles.push(
      <HomeComponentTile
        key={indicies[i]}
        index={indicies[i]}
        navigation={navigation}
      />,
    );
  }
  return homeComponentTiles;
};

const RenderPageContent = ({navigation}) => {
  var basicInput = [];
  var dateAndTime = [];
  var dialogsAndFlyouts = [];
  var layout = [];
  var text = [];
  var statusAndInfo = [];
  var media = [];
  for (var i = 0; i < RNGalleryList.length; i++) {
    if (RNGalleryList[i].type === 'Basic Input') {
      basicInput.push(i);
    } else if (RNGalleryList[i].type === 'Date and Time') {
      dateAndTime.push(i);
    } else if (RNGalleryList[i].type === 'Dialogs and Flyouts') {
      dialogsAndFlyouts.push(i);
    } else if (RNGalleryList[i].type === 'Layout') {
      layout.push(i);
    } else if (RNGalleryList[i].type === 'Text') {
      text.push(i);
    } else if (RNGalleryList[i].type === 'Status and Info') {
      statusAndInfo.push(i);
    } else if (RNGalleryList[i].type === 'Media') {
      media.push(i);
    }
  }
  return (
    <View>
      <HomeContainer heading="Basic Input">
        {RenderHomeComponentTiles(basicInput, navigation)}
      </HomeContainer>
      <HomeContainer heading="Date and Time">
        {RenderHomeComponentTiles(dateAndTime, navigation)}
      </HomeContainer>
      <HomeContainer heading="Dialogs and Flyouts">
        {RenderHomeComponentTiles(dialogsAndFlyouts, navigation)}
      </HomeContainer>
      <HomeContainer heading="Layout">
        {RenderHomeComponentTiles(layout, navigation)}
      </HomeContainer>
      <HomeContainer heading="Text">
        {RenderHomeComponentTiles(text, navigation)}
      </HomeContainer>
      <HomeContainer heading="Status and Info">
        {RenderHomeComponentTiles(statusAndInfo, navigation)}
      </HomeContainer>
      <HomeContainer heading="Media">
        {RenderHomeComponentTiles(media, navigation)}
      </HomeContainer>
    </View>
  );
};

export const HomePage: React.FunctionComponent<{}> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const isScreenFocused = useIsFocused();

  return isScreenFocused ? (
    <View>
      <ScreenWrapper>
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
