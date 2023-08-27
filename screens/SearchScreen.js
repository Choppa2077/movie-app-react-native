import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { debounce } from 'debounce';
import { image185, searchMovies } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      // console.log('value', value);
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false);
        // console.log('GOt SEARCH MOVIE:', data);
        if(data && data.results) setResults(data.results)
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 mt-6 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-2">
            Results {results.length}
          </Text>
          <View className="flex-row justify-center flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}
                >
                  <View className="space-y-2 m-2 mb-4">
                    <Image
                      source = {{uri: image185(item.poster_path)}}
                      className="rounded-3xl"
                      style={{
                        width: width * 0.42,
                        height: height * 0.3,
                      }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/found.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
