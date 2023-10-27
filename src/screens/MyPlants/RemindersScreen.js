import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';


function RemindersScreen() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  const addReminder = () => {
    if (title && dateTime) {
      setReminders([
        ...reminders,
        {
          title,
          description,
          dateTime,
        },
      ]);
      setTitle('');
      setDescription('');
      setDateTime('');
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  return (
    <View>
      <Text>Recordatorios</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder="Fecha y hora"
        value={dateTime}
        onChangeText={(text) => setDateTime(text)}
      />
      <Button title="Agregar Recordatorio" onPress={addReminder} />
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.dateTime}</Text>
            <Button title="Eliminar" onPress={() => deleteReminder(index)} />
          </View>
        )}
      />
    </View>
  );
}

export default RemindersScreen;
