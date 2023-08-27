import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../api/moviedb';

let { width, height } = Dimensions.get('window');
const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row justify-between items-center mx-4">
        <Text className="text-white text-xl mx-4 mb-5">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-xl mx-4 mb-5">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-3">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
