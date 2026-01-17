import { ExerciseDefinitionSheetItem } from '@/data/local/types';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import ActionSheet, { FlatList, useSheetPayload } from 'react-native-actions-sheet';

function Payload() {
  const payload = useSheetPayload("payload");

  const renderItem = useCallback(
    ({item}: {item: ExerciseDefinitionSheetItem}) => (
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          height: 40,
          verticalAlign: 'middle',
          width: '100%',
        }}>
        {item.name}
      </Text>
    ),
    [],
  );


  return (
    <ActionSheet
      gestureEnabled={true}
      containerStyle={{
        height: '100%',
      }}>
        <View
        style={{
          paddingHorizontal: 12,
          height: 400,
          alignItems: 'center',
          paddingTop: 20,
          gap: 10,
          width: '100%',
        }}>
        <FlatList
          data={payload}
          style={{
            width: '100%',
          }}
          ListHeaderComponent={
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                width: '100%',
                paddingBottom: 10,
              }}>
              Vegetables
            </Text>
          }
          // keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
        {/* <Button
          title="Close"
          onPress={() => {
            ref.current.hide();
          }}
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        /> */}
      </View>
    </ActionSheet>
  );
}

export default Payload;
