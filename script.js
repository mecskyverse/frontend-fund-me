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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractaddress, abi, signer);
    const transactionResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
    provider.getBalance(address).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance);
      console.log(`balance: ${balanceInEth} ETH`);
    });
  }
}
