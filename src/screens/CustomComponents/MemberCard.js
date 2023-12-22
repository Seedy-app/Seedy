import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import Config from "../../config/Config";
import styles from "../../config/CommonStyles";
import Colors from "../../config/Colors";

const MemberCard = ({ member, onLongPressAction }) => (
  <Card
    style={{ ...styles.listCard, padding: 3 }}
    onLongPress={() => onLongPressAction(member)}
  >
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
      leftStyle={{ width: "60%", marginVertical: "5%" }}
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
      rightStyle={{ width: "40%", alignItems: "center" }}
    />
  </Card>
);

export default MemberCard;
