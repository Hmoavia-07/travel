import { NextRequest, NextResponse } from "next/server";

interface BookingRequestBody {
  destination?: string;
  departureDate?: string;
  guests?: number;
  promoCode?: string;
  totalPrice?: number;
  userName?: string;
  userEmail?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingRequestBody = await req.json();

    const { destination, departureDate, guests, promoCode, totalPrice, userName, userEmail } = body;

    // Strict validation
    if (!destination || typeof destination !== "string" || destination.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please specify a valid destination." },
        { status: 400 }
      );
    }

    if (!departureDate || typeof departureDate !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a valid departure date." },
        { status: 400 }
      );
    }

    const parsedGuests = Number(guests);
    if (isNaN(parsedGuests) || parsedGuests < 1 || parsedGuests > 20) {
      return NextResponse.json(
        { success: false, error: "Number of guests must be between 1 and 20." },
        { status: 400 }
      );
    }

    const bookingRef = `JD-BK-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully with instant voucher generation.",
        booking: {
          id: bookingRef,
          destination: destination.trim(),
          departureDate,
          guests: parsedGuests,
          promoCode: promoCode ? promoCode.trim().toUpperCase() : null,
          totalPrice: totalPrice || 3850,
          userName: userName || "Valued Traveler",
          userEmail: userEmail || "traveler@example.com",
          status: "Confirmed",
          createdAt: new Date().toISOString(),
        }
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process booking reservation. Please try again." },
      { status: 500 }
    );
  }
}
