module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:5173"],
      collect: {
        numberOfRuns: 5,
      },
    },
    upload: {
      startServerComment: "yarn dev",
      target: "temporary-public-storage",
    },
  },
};
