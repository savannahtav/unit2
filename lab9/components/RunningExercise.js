import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const RunningExercise = ({ exercise }) => {
  const [distance, setDistance] = useState(0);

  const handleIncreaseDistance = () => {
    setDistance(distance + 1);
  };

  const handleResetDistance = () => {
    setDistance(0);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Running Exercise</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        Distance: {distance} km
      </Text>
      <Button
        title="Increase Distance"
        onPress={handleIncreaseDistance}
      />
      <Button
        title="Reset Distance"
        onPress={handleResetDistance}
      />
    </View>
  );
};

export default RunningExercise;
