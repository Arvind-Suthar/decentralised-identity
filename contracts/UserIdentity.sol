// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityManagement {

    struct User {
        string name;
        uint age;
        string aadharNumber;
        string homeAddress; // Residential address of the user
        bytes32 passcodeHash; // Hashed passcode for protection
        bool isRegistered;
        string test;
    }

    mapping(address => User) public users;
    mapping(string => address) public aadharToUserAddress;

    event IdentityStored(address indexed userAddress, string name, uint age, string aadharNumber, string homeAddress);

    // Function to store identity information
    function storeIdentity(string memory name, uint age, string memory aadharNumber, string memory homeAddress, string memory passcode) public {
        // Check if the Aadhaar number is already associated with a user
        require(aadharToUserAddress[aadharNumber] == address(0), "Aadhaar number already registered");

        // Hash the passcode
        bytes32 passcodeHash = keccak256(abi.encodePacked(passcode));

        users[msg.sender] = User(name, age, aadharNumber, homeAddress, passcodeHash, true);
        // Associate the Aadhaar number with the user address
        aadharToUserAddress[aadharNumber] = msg.sender;

        emit IdentityStored(msg.sender, name, age, aadharNumber, homeAddress);
    }

    // Function to retrieve identity information with a passcode
    function retrieveIdentity(string memory passcode) public view returns (string memory, uint, string memory, string memory) {
        // Ensure the user is registered
        require(users[msg.sender].isRegistered, "User not registered");

        // Hash the provided passcode
        bytes32 passcodeHash = keccak256(abi.encodePacked(passcode));

        // Verify the passcode
        require(users[msg.sender].passcodeHash == passcodeHash, "Invalid passcode");

        // Retrieve the user's identity information
        User memory user = users[msg.sender];
        return (user.name, user.age, user.aadharNumber, user.homeAddress);
    }
}
