import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      message,
      preferredDate,
      preferredTime,
      serviceType,
    } = body;

    // Validate required fields
    if (!name || !email || !serviceType) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, and serviceType are required",
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

    // Format the appointment details
    const appointmentDetails = `
      <h2>New Appointment Request - UrSafeSpace</h2>

      <h3>Client Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
      </ul>

      <h3>Appointment Details:</h3>
      <ul>
        <li><strong>Service Type:</strong> ${serviceType}</li>
        <li><strong>Preferred Date:</strong> ${preferredDate || "Not specified"}</li>
        <li><strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</li>
      </ul>

      ${
        message
          ? `
      <h3>Additional Notes:</h3>
      <p>${message}</p>
      `
          : ""
      }

      <hr>
      <p><em>This appointment request was submitted through the UrSafeSpace website.</em></p>
    `;

    // Email options for owner
    const ownerMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
      subject: `New Appointment Request - ${name}`,
      html: appointmentDetails,
    };

    // Email options for client confirmation
    const clientMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Appointment Request Received - UrSafeSpace",
      html: `
        <h2>Thank You for Your Appointment Request</h2>

        <p>Dear ${name},</p>

        <p>We have received your appointment request for <strong>${serviceType}</strong>. Our team will review your request and contact you within 24 hours to confirm the details.</p>

        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Service Type:</strong> ${serviceType}</li>
          <li><strong>Preferred Date:</strong> ${preferredDate || "Not specified"}</li>
          <li><strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</li>
        </ul>

        <p>If you have any immediate questions or need to make changes to your request, please contact us at:</p>
        <ul>
          <li><strong>Email:</strong> hello@serenityminds.com</li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
        </ul>

        <p>We look forward to supporting you on your healing journey.</p>

        <p>Warm regards,<br>
        The UrSafeSpace Team</p>

        <hr>
        <p><em>This is an automated confirmation email from UrSafeSpace.</em></p>
      `,
    };

    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json(
      {
        message: "Appointment request sent successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending appointment request:", error);

    return NextResponse.json(
      {
        error: "Failed to send appointment request. Please try again later.",
        success: false,
      },
      { status: 500 },
    );
  }
}
