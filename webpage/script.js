
const web3 = new Web3('http://localhost:7545');

const contractAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "aadharNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "homeAddress",
        "type": "string"
      }
    ],
    "name": "IdentityStored",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "aadharToUserAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "aadharNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "homeAddress",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "passcodeHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "aadharNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "homeAddress",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "passcode",
        "type": "string"
      }
    ],
    "name": "storeIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "passcode",
        "type": "string"
      }
    ],
    "name": "retrieveIdentity",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = '0x7e6d6DeDFa8d90BE3397B8A73e05B5Dd493E76e3';

// Create a contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to store identity information
async function storeIdentity(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const aadhar = document.getElementById('aadhar').value;
    const homeAddress = document.getElementById('home-address').value;
    const passcode = document.getElementById('passcode').value;

    try {
        // Get the current account from web3
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Call the storeIdentity function in the contract
        await contract.methods.storeIdentity(name, age, aadhar, homeAddress, passcode).send({ from: account, gas: 500000 });

        // Display a success message
        document.getElementById('store-result').innerText = 'Identity stored successfully!';
    } catch (error) {
        // Handle errors and display an error message
        console.error('Error storing identity:', error);
        document.getElementById('store-result').innerText = 'Error storing identity. Check the console for details.';
    }
}

// Function to retrieve identity information
async function retrieveIdentity(event) {
    event.preventDefault(); // Prevent form submission

    // Get the passcode from the form
    const passcode = document.getElementById('retrieve-passcode').value;

    try {
        // Get the current account from web3
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Call the retrieveIdentity function in the contract
        const identity = await contract.methods.retrieveIdentity(passcode).call({ from: account, gas: 500000 });
        console.log(identity);
        // Display the retrieved identity information
        document.getElementById('uname').innerText = identity[0];
        document.getElementById('uage').innerText = identity[1];
        document.getElementById('uaadhar').innerText = identity[2];
        document.getElementById('uadd').innerText = identity[3];
        document.getElementById("forms").style.display = "none";
        document.getElementById("card").style.display = "flex";
    } catch (error) {
        // Handle errors and display an error message
        console.error('Error retrieving identity:', error);
        document.getElementById('retrieve-result').innerText = 'Error retrieving identity. Check the console for details.';
    }
}

if(document.getElementById('store-form')){
  console.log('tf')
  document.getElementById('store-form').addEventListener('submit', storeIdentity);
}
if(document.getElementById('retrieve-form')){
  document.getElementById('retrieve-form').addEventListener('submit', retrieveIdentity);
}

