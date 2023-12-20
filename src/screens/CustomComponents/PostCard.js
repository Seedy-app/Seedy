import React from "react";
import { View, Image, Text } from "react-native";
import { Card, Paragraph, useTheme } from "react-native-paper";
import styles from "../../config/CommonStyles";
import Config from "../../config/Config";
import Colors from "../../config/Colors";
import FontSizes from "../../config/FontSizes";
import { capitalizeFirstLetter } from "../../utils/device";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ post, community_id, userRole, onLongPressAction }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Card
      style={{ ...styles.listCard }}
      onPress={() => navigation.navigate(t("view_post"), { post_id: post.id, community_id: community_id, userRole })}
      onLongPress={() => {
        if (onLongPressAction) {
          onLongPressAction(post);
        }
      }}
    >
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: Config.API_URL + post.user.picture }}
              style={styles.smallProfilePic}
            />
          </View>
          <View style={{ maxWidth: "80%" }}>
            <Paragraph
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: FontSizes.regular }}
            >
              {capitalizeFirstLetter(post.title)}
            </Paragraph>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: FontSizes.xsmall }}>
                {capitalizeFirstLetter(post.category.name)}
              </Text>
              <Text style={{ fontSize: FontSizes.xsmall }}> | </Text>
              <Text
                style={{
                  color: theme.colors.secondary,
                  fontSize: FontSizes.xsmall,
                }}
              >
                {new Date(post.createdAt).toLocaleDateString(t.language, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <Text style={{ fontSize: FontSizes.xsmall }}> | </Text>
              <Text
                style={{
                  color: Colors[post.user.userCommunities[0].role.name],
                  fontSize: FontSizes.xsmall,
                }}
              >
                {post.user.username}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
