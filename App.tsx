import {StatusBar} from 'expo-status-bar';
import {Modal, StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';

import SymptomList from './components/SymptomList';
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import SymptomForm from "./components/SymptomForm";
import {Symptom} from "./models/Symptom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [newSymptomModalIsOpen, setNewSymptomModalIsOpen] = useState(false);
    const [addedSymptomModalIsOpen, setAddedSymptomModalIsOpen] = useState(false);
    const openNewSymptomModal = () => { setNewSymptomModalIsOpen(true) }
    const closeNewSymptomModal = () => { setNewSymptomModalIsOpen(false) }
    const openAddedSymptomModal = () => { setAddedSymptomModalIsOpen(true) }
    const closeAddedSymptomModal = () => { setAddedSymptomModalIsOpen(false) }


    const saveSymptom = async (symptom: Symptom) => {
        const symptoms = await AsyncStorage.getItem('symptoms');
        const symptomList = symptoms ? JSON.parse(symptoms) : [];
        symptomList.push(symptom);
        await AsyncStorage.setItem('symptoms', JSON.stringify(symptomList));
        openAddedSymptomModal()
        setTimeout(() => {
            closeNewSymptomModal()
            closeAddedSymptomModal();
        }, 3000);
        await loadSymptoms()
    };

    const getSymptoms = async () => {
        const symptoms = await AsyncStorage.getItem('symptoms');
        return symptoms ? JSON.parse(symptoms) : [];
    };

    const loadSymptoms = async () => {
        const symptomList = await getSymptoms();
        symptomList.sort((symptom1: Symptom, symptom2: Symptom) => {
            return new Date(symptom2.date).getTime() - new Date(symptom1.date).getTime();
        });
        setSymptoms(symptomList);
    };

    useEffect(() => {
        loadSymptoms()
    }, []);

    return (
        <View style={styles.container}>
            <SymptomList symptoms={symptoms}/>
            <StatusBar style="auto" />
            <View style={styles.actionButtonContainer}>
                <TouchableWithoutFeedback
                    style={styles.actionButton}
                    onPress={() => { openNewSymptomModal() }}
                >
                    <Ionicons name="add" size={48} color="#25292e" />
                </TouchableWithoutFeedback>
            </View>
            <Modal
                animationType="slide"
                visible={newSymptomModalIsOpen}
                onRequestClose={closeNewSymptomModal}
            >
                <SymptomForm onClose={closeNewSymptomModal} onSave={saveSymptom} />
            </Modal>
            <Modal
                animationType="slide"
                visible={addedSymptomModalIsOpen}
                onRequestClose={closeAddedSymptomModal}
            >
                <View style={styles.addedSymptomModalContainer}>
                    <Text style={styles.addedSymptom}>Symptom saved!</Text>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
    },
    actionButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addedSymptomModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
    },
    addedSymptom: {
        fontSize: 20,
        color: '#fff'
    }
});
