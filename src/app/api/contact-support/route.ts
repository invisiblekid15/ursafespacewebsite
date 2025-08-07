import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, and message are required",
        },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Format the contact message
    const contactDetails = `
      <h2>New Contact Support Request - UrSafeSpace</h2>

      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
      </ul>

      <h3>Message:</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>

      <hr>
      <p><em>This support request was submitted through the UrSafeSpace website.</em></p>
    `;

    // Email options for owner
    const ownerMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
      subject: `New Support Request - ${name}`,
      html: contactDetails,
    };

    // Email options for client confirmation
    const clientMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Support Request Received - UrSafeSpace",
      html: `
        <h2>Thank You for Contacting Us</h2>

        <p>Dear ${name},</p>

        <p>We have received your support request and appreciate you reaching out to us. Our support team will review your message and respond within 24 hours.</p>

        <h3>Your Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>

        <p>If you have any urgent questions or need immediate assistance, please contact us directly at:</p>
        <ul>
          <li><strong>Email:</strong> hello@serenityminds.com</li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
        </ul>

        <p>We're here to help and support you.</p>

        <p>Best regards,<br>
        The UrSafeSpace Support Team</p>

        <hr>
        <p><em>This is an automated confirmation email from UrSafeSpace.</em></p>
      `,
    };

    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json(
      {
        message: "Support request sent successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending support request:", error);

    return NextResponse.json(
      {
        error: "Failed to send support request. Please try again later.",
        success: false,
      },
      { status: 500 },
    );
  }
}
