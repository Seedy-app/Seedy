import React from "react";
import { View, FlatList, Text, Image, Dimensions } from "react-native";
import { Card, Avatar } from "react-native-paper";
import Config from "../../config/Config";
import styles from "./CommunitiesStyles";
import Colors from "../../config/Colors";

// Componente para representar cada miembro en la lista
const MemberCard = ({ member }) => (
  <Card style={{ ...styles.listCard, padding: 3 }}>
    <Card.Title
      left={() => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image
              style={styles.midProfilePic}
              source={{ uri: `${Config.API_URL}${member.picture}` }}
            />
          </View>
          <View>
            <Text>{member.username}</Text>
          </View>
        </View>
      )}
      leftStyle={{width:"60%", marginVertical:"5%"}}
      right={() => (
        <View
        style={[
          styles.roleContainer,
          {
            backgroundColor: Colors[member.role],
            marginRight: Dimensions.get("window").scale * 9,
          },
        ]}
        >
          <Text style={styles.roleText}>{member.role_display_name}</Text>
        </View>
      )}
      rightStyle={{width:"40%", alignItems: "center"}}
    />
  </Card>
);
const MembersTab = ({ communityMembers }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={communityMembers}
        renderItem={({ item }) => <MemberCard member={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MembersTab;
