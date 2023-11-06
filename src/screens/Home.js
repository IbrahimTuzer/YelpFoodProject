import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "../redux/dataSlice";
import { HorizontalFlatList, VerticalFlatList } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isDataFetched } = useSelector((state) => state.data);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!isDataFetched) {
      dispatch(fetchDataAsync());
    }
  }, [dispatch, isDataFetched]);

  const filterByCategory = (categoryName) => {
    return data.filter((item) => {
      const categories = item.categories.map((value) => value.title);
      const filtered = categories.includes(categoryName);

      return filtered;
    });
  };

  const handleCategoryFilter = (value) => {
    const result = filterByCategory(value);
    setFilteredData(result);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>Restaurants Near By</Text>

      <View style={styles.popularFlatList}>
        <Text style={styles.popularText}>Popular</Text>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const img = item?.image_url;

              return <HorizontalFlatList data={item} img={item.image_url} />;
            }}
          />
        </View>
      </View>

      <View style={styles.lineContainer} />

      <View style={styles.verticalContainer}>
        <Text style={styles.reviewedText}> Best Reviewed</Text>

        <View style={styles.categoryFlatListContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const categories = item?.categories[0]?.title;
              return (
                <Pressable
                  style={({ pressed }) => [
                    { transform: [{ translateY: pressed ? 3 : 0 }] },
                    styles.categoryContainer,
                  ]}
                  onPress={() => handleCategoryFilter(item.categories[0].title)}
                >
                  <Text style={styles.categoryText}>{categories}</Text>
                </Pressable>
              );
            }}
          />
        </View>

        <View>
          <FlatList
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            data={filteredData.length > 0 ? filteredData : data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const image = item?.image_url;
              return <VerticalFlatList data={item} image={item.image_url} />;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A0040",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  popularFlatList: {
    flex: 5,
    width: "90%",
    marginBottom: 8,
  },
  popularText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  lineContainer: {
    width: "90%",
    borderColor: "white",
    marginVertical: 20,
  },
  verticalContainer: {
    width: "90%",
    flex: 6,
  },
  reviewedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  categoryFlatListContainer: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 5,
  },
  categoryContainer: {
    width: 150,
    borderWidth: 2,
    marginRight: 10,
    borderColor: "white",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
