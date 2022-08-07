import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractaddress } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

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
async function fund(ethAmount) {
  ethAmount = "27";
  console.log(`funding with ${ethAmount}...`);
  if (typeof window.ethereum !== "undefined") {
    //provider connection to the blockchain
    //signer / wallet connection /someone with some gas
    //contract that we are interacting with
    //ABI & private key

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractaddress, abi, signer);
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done.....");
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash} .... `);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations`
      );
    });
  });
}
