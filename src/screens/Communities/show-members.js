import React from "react";
import { TouchableOpacity, View, Text, Image, FlatList } from "react-native";
import Config from "../../config/Config";
import styles from "./CommunitiesStyles";
import Colors from "../../config/Colors";

// Componente para representar cada miembro en la lista
const MemberCard = ({ member }) => (
  <TouchableOpacity style={styles.listCard}>
    <Image style={styles.midProfilePic} source={{ uri: `${Config.API_URL}${member.picture}` }} />
    <View>
      <Text style={styles.subtitle}>{member.username}</Text>
    </View>
    <View style={[styles.roleContainer, { backgroundColor: Colors[member.role] }]}>
      <Text style={styles.roleText}>{member.role_display_name}</Text>
    </View>
  </TouchableOpacity>
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
