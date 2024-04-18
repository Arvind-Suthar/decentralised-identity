module.exports = {
  networks: {
      development: {
          host: "127.0.0.1", // Ganache runs locally on this host
          port: 7545, // Default port for Ganache
          network_id: "*", // Any network id
      },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match your contract's pragma statement
      settings: {
          optimizer: {
              enabled: true,
              runs: 200
          },
      }
    }
  }
};
