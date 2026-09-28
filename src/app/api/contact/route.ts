import { NextRequest, NextResponse } from "next/server";

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();

    const { name, email, subject, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const cleanSubject = subject && typeof subject === "string" ? subject.trim() : "General Inquiry";

    // Successful response simulation with ticket reference
    const ticketId = `JD-TKT-${Date.now().toString().slice(-6)}`;

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully received. A travel specialist will contact you within 2 hours.",
        ticketId,
        inquiry: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: cleanSubject,
          receivedAt: new Date().toISOString(),
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "An internal server error occurred while processing your request. Please try again later."
      },
      { status: 500 }
    );
  }
}
