import { BARx1, BARx2, BARx3, Cherry, ModeRandom, Seven } from './constants.js';
import { Easing } from 'https://unpkg.com/@tweenjs/tween.js@23.1.3/dist/tween.esm.js';
import { AssetLoader } from './loader.mjs';
import { Slot } from './slot.mjs';
import { Engine } from './engine.mjs';
import { configureTweakPane } from './gui.mjs';
import { payTable } from './payTable.mjs';
import { createPayTable } from './utils.mjs';

/**
 * @import {ReelSymbols} from './reel.mjs';
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnasC7RgdNyyQusYASd93bBgi1B6_P0rs",
  authDomain: "itlernen-a0aa0.firebaseapp.com",
  projectId: "itlernen-a0aa0",
  storageBucket: "itlernen-a0aa0.firebasestorage.app",
  messagingSenderId: "570000726737",
  appId: "1:570000726737:web:bc7f437a708d8577a4c3f0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db=getFirestore();
let coins = 0;

onAuthStateChanged(auth, (user)=>{
  const loggedInUserId=localStorage.getItem('loggedInUserId');
  if(loggedInUserId){
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
        .then((docSnap)=>{
          if(docSnap.exists()){
            const userData=docSnap.data();
            document.getElementById('coinsshow-text').innerText=userData.coins + " Chips";
            coins = userData.coins;

const config = {
  assets: [],
  symbols: [],
  ui: {
    /**
     * @type {HTMLCanvasElement}
     */
    canvas: document.querySelector('#slot'),
    btn: {
      spinManual: document.querySelector('#spin-manual'),
      spinAuto: document.querySelector('#spin-auto'),
      minusBet: document.querySelector('#minus-bet'),
      plusBet: document.querySelector('#plus-bet'),
    },
    text: {
      credits: document.querySelector('#credits'),
      bet: document.querySelector('#bet'),
      winAmount: document.querySelector('#win-amount'),
    },
    modalBody: document.querySelector(`#pay-table-modal .modal-body`),
  },
};

const assetLoader = new AssetLoader([
  './img/1xBAR.png',
  './img/2xBAR.png',
  './img/3xBAR.png',
  './img/Seven.png',
  './img/Cherry.png',
]);

assetLoader.onLoadFinish((assets) => {
  console.info('All assets loaded', assets);

  /**
   * @type {ReelSymbols}
   */
  const symbols = {
    [BARx1]: assets.find(({ name }) => name === BARx1).img,
    [BARx2]: assets.find(({ name }) => name === BARx2).img,
    [BARx3]: assets.find(({ name }) => name === BARx3).img,
    [Seven]: assets.find(({ name }) => name === Seven).img,
    [Cherry]: assets.find(({ name }) => name === Cherry).img,
  };

  const slot = new Slot({
    player: {
      credits: coins,
      bet: 1,
      MAX_BET: 15,
    },
    volume: {
      background: 0.02,
      win: 0.3,
      spin: 0.1,
    },
    canvas: config.ui.canvas,
    buttons: config.ui.btn,
    text: config.ui.text,
    mode: ModeRandom,
    color: {
      background: '#1a1a1a',
      border: '#1f2023',
    },
    reel: {
      rows: 3,
      cols: 5,
      animationTime: 1500,
      animationFunction: Easing.Back.Out,
      padding: {
        x: 1,
      },
    },
    block: {
      width: 141,
      height: 121,
      lineWidth: 0,
      padding: 16,
    },
    symbols,
  });

  const engine = new Engine(slot, { FPS: 60 });

  slot.updateCanvasSize();
  slot.subscribeEvents();

  engine.start();

  // configureTweakPane(slot, engine);
  createPayTable(symbols, payTable, config.ui.modalBody);
});

assetLoader.start();


          }
          else{
            console.log("no document found matching id")
          }
        })
        .catch((error)=>{
          console.log("Error getting document");
        })
  }
  else{
    console.log("User Id not Found in Local storage")
  }
})






console.log("coins", coins);