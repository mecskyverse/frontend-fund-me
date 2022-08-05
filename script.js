import { ethers } from "./ethers-5.6.esm.min.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;

async function connect() {
  console.log("its working");
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("connected");
    connectButton.innerHTML = "Connected";
  } else {
    connectButton.innerHTML = "Please connect to Metamask";
  }
}
