import React from "react";
import { View, FlatList, Text } from "react-native";
import { Card, Avatar } from 'react-native-paper';
import Config from "../../config/Config";
import styles from "./CommunitiesStyles";
import Colors from "../../config/Colors";

// Componente para representar cada miembro en la lista
const MemberCard = ({ member }) => (
  <Card style={{ ...styles.listCard, padding: 10 }}>
    <Card.Title
      title={member.username}
      left={(props) => <Avatar.Image {...props} size={40} source={{ uri: `${Config.API_URL}${member.picture}` }} />}
      right={(props) => (
        <View {...props} style={[styles.roleContainer, { backgroundColor: Colors[member.role] }]}>
          <Text style={styles.roleText}>{member.role_display_name}</Text>
        </View>
      )}
    />
  </Card>
);

const MembersTab = ({ communityMembers }) => {
  return (
    <View>
      <FlatList
        data={communityMembers}
        renderItem={({ item }) => <MemberCard member={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MembersTab;
