
import { StyleSheet } from "react-native";

export const messagestyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#414C60',
    },
    header: {
        // backgroundColor: '#1e88e5',
        paddingHorizontal: 8,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'Lobster-Regular',
        fontSize: 25,
        marginBottom: 4,
        marginRight: 10
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    chatBubble: {
        backgroundColor: '#373E4E',
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        maxWidth: '80%',
        alignSelf: 'flex-start'
    },
    chatText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Nunito-Regular'
    },
    chatBubbleMine: {
        backgroundColor: '#EFD3D7',
        alignSelf: 'flex-end',
    },
    chatTextMine: {
        color: '#000',
        fontFamily: 'Nunito-Regular'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#EFD3D7',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        marginRight: 16,
        backgroundColor: '#EFD3D7',
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#EFD3D7',
        borderRadius: 24,
        paddingVertical: 6,
        paddingHorizontal: 6,
    },
    sendButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timestamp: {
        alignSelf: 'flex-end',
        color: '#EFD3D7',
        fontFamily: 'Nunito-Regular',
        marginTop: 5
    },
    timestampMine: {
        color: '#414C60'
    },
    chatListItem: {
        width: '100%',
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 17
    },

    chatListItemActive: {
        width: '100%',
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#8E9AAF',
        borderRadius: 17
    },

    alltext: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        left: -20
    },

    text: {
        alignSelf: 'center',
        flexDirection: 'column',
    },

    textReverse: {
        position: 'absolute',
        right: -10,
        top: -15,
        alignItems: 'flex-end',
    },
    circle: {
        backgroundColor: '#D9D9D9',
        borderRadius: 52,
        fontFamily: 'Nunito-Bold',
        fontSize: 11,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#414C60',
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        marginTop: 5
    },
    timeText:{
        // position: 'absolute',
        // right: -10

        fontFamily: 'Nunito-Regular',
        fontSize: 12,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'flex-end',
        textTransform: 'capitalize',
        color: '#FFF',
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    textName: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 17,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'flex-end',
        textTransform: 'capitalize',

        color: '#ffffff'
    },
    textNameActive: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 17,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'flex-end',
        textTransform: 'capitalize',
        color: '#414C60'
    },
    bodyNameActive: {
        fontFamily: 'Nunito-Regular',
        fontSize: 17,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'flex-end',
        textTransform: 'capitalize',
        color: '#414C60'
    },
    bodyName: {
        fontFamily: 'Nunito-Regular',
        fontSize: 17,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'flex-end',
        textTransform: 'capitalize',
        color: '#8E9AAF',
        marginTop: 10
    }


});
