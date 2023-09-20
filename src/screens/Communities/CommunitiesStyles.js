import { StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";
import FontSizes from "../../config/FontSizes";
import Colors from "../../config/Colors";

const communitiesStyles = StyleSheet.create({
    ...commonStyles,
    communitiesContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10
    },
    communityPic: {
        width: 60,
        height: 60,
        borderRadius: 25
    },
    communityCard: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    communityShortInfo: {
        paddingLeft: 20
    },
    communityName: {
        fontSize: FontSizes.large,
        fontWeight: 'bold'
    },
    communityDescription: {
        marginTop: 5
    },
    tab: {
        backgroundColor: Colors.white,
    },
    tabLabel: {
        color: Colors.black,
    },
    


});

export default communitiesStyles;
