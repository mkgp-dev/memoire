import localforage from "localforage";

localforage.config({
    name: "memoryGame",
    storeName: "gameStorage",
    description: "Web Storage API powered by localForage",
});

export default localforage;