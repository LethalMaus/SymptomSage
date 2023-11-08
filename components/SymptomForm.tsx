import React, {useState} from "react";

import {View, Text, Pressable, StyleSheet, TextInput} from "react-native";
import {Picker} from "@react-native-picker/picker";
import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Symptom} from "../models/Symptom";

const SymptomForm = ({ onClose, onSave }: { onClose: () => void, onSave: (symptom: Symptom) => void}) => {

    const [symptom, setSymptom] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("medium");
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, date?: Date) => {
        const currentDate = date;
        setShow(false);
        if (currentDate) {
            setDate(currentDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.modalContainer}>
            <Text style={[styles.title, styles.textColor]}>New Symptom</Text>
            <View>
                <Text style={styles.textColor}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    value={symptom}
                    onChangeText={setSymptom}
                />
            </View>
            <View>
                <Text style={styles.textColor}>Date</Text>
                <Pressable style={styles.calenderInput} onPress={showDatepicker}>
                    <Text style={styles.textColor}>{date.toLocaleDateString()}</Text>
                </Pressable>
                {show && (
                    <RNDateTimePicker
                        value={date}
                        mode='date'
                        onChange={onChange}
                    />
                )}
            </View>
            <View>
                <Text style={styles.textColor}>Description</Text>
                <TextInput
                    style={styles.textInputMultiline}
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View>
                <Text style={styles.textColor}>Severity</Text>
                <View style={styles.pickerInput}>
                <Picker
                    style={styles.textColor}
                    dropdownIconColor='#fff'
                    selectedValue={severity}
                    onValueChange={setSeverity}
                >
                    <Picker.Item label="Low" value="low" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="High" value="high" />
                </Picker>
                </View>
            </View>
            <View style={styles.row}>
                <Pressable style={styles.button} onPress={onClose}>
                    <Text style={styles.textColor}>Cancel</Text>
                </Pressable>
                <Pressable disabled={!symptom || symptom.trim().length === 0} style={[
                    styles.button,
                    {opacity: !symptom || symptom.trim().length === 0 ? 0.5 : 1,}
                ]} onPress={() => onSave(new Symptom(symptom, description, severity, date))}>
                    <Text style={styles.textColor}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SymptomForm;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
        color: '#fff'
    },
    row: {
        flexDirection: 'row'
    },
    textColor: {
        color: '#fff'
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
    textInputContainer: {
        width: 210,
        height: 40,
        margin: 5,
    },
    calenderInput: {
        width: 210,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 8,
    },
    pickerInput: {
        width: 210,
        height: 60,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
    },
    textInput: {
        width: 210,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 8,
        color: '#fff'
    },
    textInputMultiline: {
        width: 210,
        minHeight: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 8,
        color: '#fff'
    },
    button: {
        backgroundColor: '#25292e',
        borderColor: '#fff',
        borderWidth: 1,
        width: 100,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
});