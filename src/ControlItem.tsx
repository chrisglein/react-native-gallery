'use strict';
import {StyleSheet, View, Text, PlatformColor, Pressable, Image} from 'react-native';
import React from 'react';
import type {ImageSourcePropType} from 'react-native';
import {useTheme} from '@react-navigation/native';

const createStyles = (colors: any) =>
  StyleSheet.create({
    textIcon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
      width: 72,
      textAlign: 'center',
    },
    controlItem: {
      padding: 10,
    },
    controlItemIcon: {
      marginHorizontal: 12,
      width: 48,
      height: 72,
      resizeMode: 'contain',
    },
    controlItemTitle: {
      // BodyStrongTextBlockStyle
      fontWeight: '500', // SemiBold
    },
    controlItemDescription: {
      // CaptionTextBlockStyle
      color: PlatformColor('TextFillColorSecondaryBrush'),
      fontSize: 12
    }
  });

type HomeComponentTileProps = {
  pageKey: string;
  description?: string;
  textIcon: string;
  imageIcon?: ImageSourcePropType;
  navigation: any;
};
const HomeComponentTile = ({pageKey, description, textIcon, imageIcon, navigation}: HomeComponentTileProps) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressing, setIsPressing] = React.useState(false);

  return (
    // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/ItemTemplates.xaml#L7
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        pageKey === 'Button'
          ? 'Button1 control'
          : pageKey + ' control'
      }
      accessibilityHint={
        'click to view the ' + pageKey + ' sample page'
      }
      style={({pressed}) => [
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
          borderBottomWidth: pressed ? 1 : 2,
          padding: 8,
          borderRadius: 4,
          alignItems: 'center',
          flexDirection: 'row',
          marginRight: 5,
          marginBottom: 5,
          gap: 16,
          width: 360,
          height: 90,
        },
      ]}
      onPress={() => {
        navigation.navigate(pageKey);
      }}
      onPressIn={() => setIsPressing(true)}
      onPressOut={() => setIsPressing(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}>
      {imageIcon ?
        <Image source={imageIcon} style={styles.controlItemIcon}/> :
        <Text style={styles.textIcon}>{textIcon}</Text>
      }
      <View style={{flexShrink: 1}}>
        <Text
          style={styles.controlItemTitle}>
          {pageKey}
        </Text>
        <Text style={styles.controlItemDescription}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export {HomeComponentTile};