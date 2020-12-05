import React from 'react';
import {ProgressBar, Colors} from 'react-native-paper';
function progressBar({progress, durasi}) {
  return (
    <ProgressBar
      progress={durasi}
      visible={progress}
      color={Colors.purple800}
    />
  );
}
export default React.memo(progressBar);
