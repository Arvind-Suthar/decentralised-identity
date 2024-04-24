module.exports = {
  networks: {
      development: {
          host: "127.0.0.1", // Ganache runs locally on this host
          port: 7545, // Default port for Ganache
          network_id: "*", 
      },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
          optimizer: {
              enabled: true,
              runs: 200
          },
      }
    }
  }
};
