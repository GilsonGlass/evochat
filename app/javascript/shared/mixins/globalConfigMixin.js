export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/Evochat/g, installationName);
    },
  },
};
