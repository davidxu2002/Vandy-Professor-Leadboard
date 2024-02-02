import {getFirestore} from "@firebase/firestore";

import clientApp from "./";

const db = getFirestore(clientApp);

export default db;