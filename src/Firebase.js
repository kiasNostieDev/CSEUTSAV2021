import firebase from 'firebase'

export default function Firebase() {
    return (null)
}

var firebaseConfig = {
    apiKey: "AIzaSyBUoSkiMgftfiozKKzebTlLMk4fQXINhu8",
    authDomain: "cseutsav2021.firebaseapp.com",
    projectId: "cseutsav2021",
    storageBucket: "cseutsav2021.appspot.com",
    messagingSenderId: "745088104626",
    appId: "1:745088104626:web:5bbfdd2ba1e27a1f4f71ab",
    measurementId: "G-7NER57ENS7"
};
export const fbref = firebase.initializeApp(firebaseConfig)