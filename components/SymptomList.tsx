import React, { useEffect, useRef, useState } from "react";
import {Animated, View, Text, Pressable, StyleSheet, TextInput} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {Symptom} from "../models/Symptom";

const AnimatedText = Animated.createAnimatedComponent(Text);
const getColorBasedOnSeverity = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'low':
      return '#69f0ae';
    case 'medium':
      return '#ffff8d';
    case 'high':
      return '#e57373';
    default:
      return 'cyan';
  }
};

const SymptomItem = ({ symptom }: { symptom: Symptom }) => {
  const [numberOfLines, setNumberOfLines] = useState(1);

  useEffect(() => {
    setNumberOfLines(1);
  }, [symptom]);

  const toggleDescription = () => {
    if (numberOfLines === 1) {
      setNumberOfLines(100)
    } else {
      setNumberOfLines(1)
    }
  };

  const backgroundColor = getColorBasedOnSeverity(symptom.severity);

  return (
      <Pressable onPress={toggleDescription}>
        <View style={[styles.container, { backgroundColor }]}>
          <View style={styles.row}>
            <Text style={styles.title}>{symptom.name}</Text>
            <Text style={styles.date}>{new Date(symptom.date).toLocaleDateString()}</Text>
          </View>
          <AnimatedText numberOfLines={numberOfLines}> {symptom.description}
          </AnimatedText>
        </View>
      </Pressable>
  );
};

const SymptomList = ({ symptoms }: { symptoms: Symptom[] }) => {
  const flashListRef = useRef<FlashList<Symptom>>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSymptoms = symptoms.filter((symptom) =>
      symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <View style={styles.listContainer}>
        { symptoms.length > 0 ?
            <View style={{ flex: 1 }}>
              <TextInput
                  style={styles.searchBar}
                  placeholder="Search symptoms"
                  placeholderTextColor='#fff'
                  onChangeText={(text) => setSearchQuery(text)}
                  value={searchQuery}
              />
              <FlashList
                  ref={flashListRef}
                  renderItem={({ item }) => <SymptomItem symptom={item} />}
                  estimatedItemSize={150}
                  data={filteredSymptoms}
              />
            </View>
            :
            <View style={styles.emptyView}>
              <Text style={styles.emptyViewText}>No symptoms recorded.</Text>
            </View>
        }
      </View>
  );
};

export default SymptomList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#25292e",
    borderRadius: 10,
    padding: 8,
    justifyContent: "space-around",
  },
  searchBar: {
    height: 40,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'center',
    justifySelf: 'center',
    width: '90%',
    marginTop: 60,
    marginBottom: 90
  },
  row: {
    flexDirection: 'row'
  },
  title: {
    textAlign: 'left',
    fontSize: 20
  },
  date: {
    position: 'absolute',
    fontSize: 20,
    right: 0
  },
  emptyView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewText: {
    color: '#fff'
  }
});