const express = require("express");
const generatePairCode = require("./pair");
const { botName } = require("./config");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`${botName} Pairing Server Running`);
});

app.get("/pair", async (req, res) => {
  const number = req.query.number;

  if (!number)
    return res.send("Weka namba mfano: /pair?number=2557XXXXXXXX");

  try {
    const code = await generatePairCode(number);
    res.send(`
      <h2>${botName} Pairing Code</h2>
      <p>Number: ${number}</p>
      <h1>${code}</h1>
      <p>WhatsApp → Linked Devices → Link a Device → Weka code hii</p>
    `);
  } catch (e) {
    res.send("Imeshindikana kutengeneza pairing code.");
  }
});

app.listen(3000, () => {
  console.log("PAIR SERVER RUNNING ON PORT 3000");
});
