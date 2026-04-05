const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

async function generatePairCode(number) {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false
  });

  return new Promise(async (resolve, reject) => {
    try {
      const code = await sock.requestPairingCode(number);
      resolve(code);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = generatePairCode;
