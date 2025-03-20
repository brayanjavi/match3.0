import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const initialMessages = [
  { id: '1', text: 'Hola!', sender: 'other', matchId: '1' },
  { id: '2', text: 'Cómo estás?', sender: 'other', matchId: '1' },
  { id: '3', text: 'Bien, gracias! Y tú?', sender: 'me', matchId: '1' },
  { id: '4', text: 'Todo bien por aquí.', sender: 'other', matchId: '2' },
];

export default function Conversations({ route, navigation }) {
  const { match } = route.params;

  const [messages, setMessages] = useState(initialMessages.filter(msg => msg.matchId === match.id));
  const [newMessageText, setNewMessageText] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessageText.trim() !== '') {
      const newMessage = {
        id: String(messages.length + 1),
        text: newMessageText,
        sender: 'me',
        matchId: match.id
      };
      setMessages([...messages, newMessage]);
      setNewMessageText('');
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.1 : 0}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={width * (width > 375 ? 0.07 : 0.08)} color="#FF7A00" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            {match.image ? (
              <Image source={match.image} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text>{match.name.charAt(0).toUpperCase()}</Text>
              </View>
            )}
            <Text style={styles.userName}>{match.name}</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={width * 0.07} color="#FF7A00" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={width * 0.07} color="#FF7A00" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Área de Mensajes */}
        <ScrollView
          style={styles.messagesContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'me' ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Área de Entrada de Texto */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Aa"
            value={newMessageText}
            onChangeText={setNewMessageText}
          />
          <TouchableOpacity style={styles.gifButton}>
            <Text style={styles.gifText}>GIF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={width * 0.07} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={width * 0.07} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={width * 0.07} color="orange" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: width * 0.03,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
  },
  profileImagePlaceholder: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  userName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FF7A00',
  },
  headerActions: {
    flexDirection: 'row',
  },
  messagesContainer: {
    flex: 1,
    padding: width * 0.03,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: width * 0.03,
    borderRadius: width * 0.05,
    marginBottom: height * 0.01,
  },
  myMessage: {
    backgroundColor: '#FF7A00',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: width * 0.04,
    color: 'white',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.006,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: width * 0.02,
    fontSize: width * 0.04,
  },
  gifButton: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginRight: width * 0.02,
  },
  gifText: {
    fontSize: width * 0.04,
  },
  cameraButton: {
    marginRight: width * 0.02,
  },
  micButton: {
    marginRight: width * 0.02,
  },
  sendButton: {
    marginLeft: width * 0.02,
  },
});