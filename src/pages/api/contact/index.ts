// Assuming axiosInstance is correctly set up to include the base URL and any necessary configurations

import axiosInstance from "@/hooks/axios";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed." });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const response = await axios.post(
      "https://topgeniuses.tanuweb.cloud/api/v1/forgetPassword",
      { email }
    );
    const opt = response.data.data.opt;
    // console.log(opt);
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.mn", // Use environment variables
      auth: {
        user: "info@top-genius.mn",
        pass: "Topgenius_2024@",
      },
    });

    const mailOptions = {
      from: "info@top-genius.mn", // Use environment variables
      to: email,
      subject: "Нууц үг сэргээх",
      html: `
        <img src="https://yourdomain.com/path/to/image.jpg" alt="Image Alt Text" />
        <h2>Сайн байна уу: ${email}</h2>
        <p>Таны нууц үг сэргээх код. ${opt}  </p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email or making API request:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email or make API request." });
  }
}
