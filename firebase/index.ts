import {initializeApp } from '@firebase/app';

import {firebaseConfig} from "@/firebase/config";

// Initialize Firebase
const clientApp = initializeApp(firebaseConfig);

export default clientApp;