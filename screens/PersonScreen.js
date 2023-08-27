import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchPeronMovies, fetchPersonDetails, image342 } from '../api/moviedb';

let { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [personDetails, setPersondetails] = useState({});
  const staticImage = 'https://links.papareact.com/wru';
  useEffect(() => {
    setLoading(true);
    // console.log('PERSON GOATS: ', item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);
  const toggleFavour = () => {
    setFavourite(!isFavourite);
  };

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPersondetails(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPeronMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
    // console.log('GOAT PEROSN MOVIES: ' , data);
  };
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 48 }}
    >
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between items-center px-4 ' +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavour}>
          <HeartIcon size={35} color={!isFavourite ? 'white' : 'red'} />
        </TouchableOpacity>
      </SafeAreaView>
      {/*person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center "
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={
                  { uri: image342(personDetails?.profile_path) } || staticImage
                }
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDetails?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {personDetails?.place_of_birth}
            </Text>
          </View>
          <View className="p-4 mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-x-2">
            <Text className="text-white text-lg">
              <Text className="text-neutral-400 tracking-wide">
                {personDetails?.biography || 'N/A'}
              </Text>
            </Text>
          </View>
          {/*movies */}
          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
