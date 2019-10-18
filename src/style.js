import { StyleSheet } from "react-native";


let colors = {
    mainColor : "#000",
    textColor : "#003C50",
    primaryColor :"#ff8f5a",
    primaryColorForeground : "#fff",
    secondaryColor : "#0066ff",
    grey1: "#777",
    grey2: "#ccc",
    lightGray: '#f9f9f9',
    background: '#FCFCFC',
    turquoiseBlue: '#568392'
}

let dimensions = {
    screenPadding : {
        flex:1,
        margin: 20,
    },
    defaultVerticalSpacing : 20,
    title: 20
}

let shadow = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
}
)

export {
    colors,
    dimensions,
    shadow
}