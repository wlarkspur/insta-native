import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interface";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_QUERY = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

// 스타일링된 Input 컴포넌트
const MessageContainer = styled.View`
  justify-content: center;
  align-content: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
  margin: 0 auto;
`;
const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

// Search 화면의 navigation prop의 타입 정의
type SearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Search"
>;

interface SearchProps {
  navigation: SearchNavigationProp;
}

export default function Search({ navigation }: SearchProps) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_QUERY);
  const onValid = ({ keyword }: any) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    // SearchBox를 headerTitle로 설정
    navigation.setOptions({
      headerTitle: () => <SearchBox />,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, [navigation]);
  const renderItem = ({ item: photo }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Photo", {
          photoId: photo.id,
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            ></FlatList>
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
