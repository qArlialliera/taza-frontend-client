
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
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});
