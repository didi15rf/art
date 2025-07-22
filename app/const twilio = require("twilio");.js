const twilio = require("twilio");

const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  const { to } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);

  try {
    await client.messages.create({
      body: `Your verification code is ${code}`,
      from: "YOUR_TWILIO_PHONE_NUMBER",
      to,
    });
    res.status(200).json({ success: true, code }); // Save code in DB/session for verification
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}