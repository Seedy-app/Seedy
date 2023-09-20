import { StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";

const communitiesStyles = StyleSheet.create({
    ...commonStyles,
    communitiesContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10
    },
    communityPic: {
        width: 60,
        height: 60,
        borderRadius: 25
    },
    communityCard: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
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
        fontSize: 18,
        fontWeight: 'bold'
    },
    communityDescription: {
        marginTop: 5
    },
    tab: {
        backgroundColor: '#f4f4f4',
    },
    tabLabel: {
        color: 'black',
    },
    


});

export default communitiesStyles;
