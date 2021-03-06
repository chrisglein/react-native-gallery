# React Native Gallery

Welocome to React Native Gallery. A React Native Windows application which displays the range of React Native components with Windows support.

# Building React Native Gallery

If you wish to build React Native Gallery on your computer locally, follow the following steps:

1. Clone the repository.
2. In the root directory of the repository on your device, run `yarn`.
3. In the same directory run `npx react-native run-windows`.

# Installing React Native Gallery

If you would prefer to avoid building the project from scratch, you can install and run the .appx for the app. Follow the following steps:

1. Clone the repository.
2. Checkout the v0.64.0-preview.5 branch.
3. Run `yarn start`.
4. Open windows/rngallery_1.0.2.0_Win32_Test/rngallery_1.0.2.0_Win32.appx.
5. Install app and launch.

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

For addtional information about contributing to React Native Gallery visit [here](https://github.com/microsoft/react-native-gallery/wiki/Contributing-to-React-Native-Gallery).

# Adding Sample Pages

To add a sample page:

1. Author your page as a standard RN component and export the component. See https://github.com/microsoft/RNGallery/tree/main/src/examples for existing sample pages
2. Add an entry to the array in the [RNGalleryList](https://github.com/microsoft/RNGallery/blob/f592dac5969f054dad4837929d214c2fd63495a5/src/RNGalleryList.ts#L1)

```
import {FooExamplePage} from './examples/FooExamplePage';

export const RNGalleryList: Array<IRNGalleryExample> = [
  ...
  {
    key: 'FooExamplePage',
    component: FooExamplePage,
  },
];
```

It's that simple! The app will pick up your new sample page, add an item in the navigation draw for it, and navigate to your page when the user clicks on it. If you want a more detailed set of instructions on how to add a page visit [here](https://github.com/microsoft/react-native-gallery/wiki/Add-a-Component-Page).
