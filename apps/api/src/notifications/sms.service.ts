import axios from "axios";

const TERMII_BASE_URL = "https://api.ng.termii.com/api";

interface SendSMSOptions {
  to: string;
  message: string;
}

export const sendSMS = async ({ to, message }: SendSMSOptions) => {
  try {
    // Normalize phone number to international format
    let phone = to.replace(/\s/g, "");
    if (phone.startsWith("0")) {
      phone = "234" + phone.slice(1);
    }
    if (phone.startsWith("+")) {
      phone = phone.slice(1);
    }

    const response = await axios.post(`${TERMII_BASE_URL}/sms/send`, {
      to: phone,
      from: process.env.TERMII_SENDER_ID,
      sms: message,
      type: "plain",
      api_key: process.env.TERMII_API_KEY,
      channel: "generic",
    });

    console.log(`SMS sent to ${phone}:`, response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("SMS send failed:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};