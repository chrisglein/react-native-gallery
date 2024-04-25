'use strict';
import React from 'react';
import {Example} from '../components/Example';
import {Page} from '../components/Page';
import Video, {VideoRef} from 'react-native-video';

export const VideoExamplePage: React.FunctionComponent<{}> = () => {
  const example1jsx = `<Video 
  source={require('../../assets/SampleMedia/ladybug.mp4')}
  onBuffer={() => console.log('buffering')}
  onError={() => console.log('error')}               
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }}
/>`;
  return (
    <Page
      title="Video"
      description="Playback video media."
      componentType="Community"
      pageCodeUrl="https://github.com/microsoft/react-native-gallery/blob/main/src/examples/VideoExamplePage.tsx"
      documentation={[
        {
          label: 'Video',
          url: 'https://github.com/react-native-video/react-native-video',
        },
      ]}>
      <Example title="Simple playback example" code={example1jsx}>
      <Video 
        source={require('../../assets/SampleMedia/ladybug.mp4')}
        onBuffer={() => console.log('buffering')}
        onError={() => console.log('error')}               
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      </Example>
    </Page>
  );
};
