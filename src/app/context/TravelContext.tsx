'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ConfirmedBooking {
  id: string;
  destination: string;
  departureDate: string;
  guests: number;
  totalPrice: number;
  status: "Confirmed" | "Ongoing" | "Completed";
  createdAt: string;
  image?: string;
}

export interface BookingDraft {
  destination: string;
  departureDate: string;
  guests: number;
  basePrice: number;
  promoCode: string;
  promoApplied: boolean;
}

interface ToastNotification {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface TravelContextType {
  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => boolean;
  isInWishlist: (id: string) => boolean;

  // Bookings list
  bookings: ConfirmedBooking[];
  addBooking: (booking: Omit<ConfirmedBooking, "id" | "createdAt" | "status">) => Promise<ConfirmedBooking>;
  cancelBooking: (id: string) => void;

  // Booking Modal & Draft
  isBookingModalOpen: boolean;
  openBookingModal: (prefill?: Partial<BookingDraft>) => void;
  closeBookingModal: () => void;
  bookingDraft: BookingDraft;
  updateBookingDraft: (updates: Partial<BookingDraft>) => void;

  // My Bookings Drawer
  isMyBookingsOpen: boolean;
  openMyBookings: () => void;
  closeMyBookings: () => void;

  // Toast
  toast: ToastNotification | null;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

const WISHLIST_KEY = "jadoo_travel_wishlist";
const BOOKINGS_KEY = "jadoo_travel_confirmed_bookings";

const DEFAULT_BOOKINGS: ConfirmedBooking[] = [
  {
    id: "JD-BK-482910",
    destination: "Trip To Rome, Italy",
    departureDate: "2026-07-20",
    guests: 2,
    totalPrice: 4200,
    status: "Ongoing",
    createdAt: "2026-05-10T14:30:00.000Z",
    image: "/images/destination-4.jpg"
  }
];

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(["rome", "santorini"]);
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(DEFAULT_BOOKINGS);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    destination: "Trip To Greece",
    departureDate: "2026-06-14",
    guests: 2,
    basePrice: 3850,
    promoCode: "",
    promoApplied: false
  });

  // Client hydration safely reading from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedBookings = localStorage.getItem(BOOKINGS_KEY);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(DEFAULT_BOOKINGS));
      }
    } catch {
      // Graceful fallback for non-storage environments
    }
  }, []);

  const showToast = useCallback((message: string, type: "success" | "info" | "error" = "success") => {
    const newToast = { id: Date.now(), message, type };
    setToast(newToast);
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 3200);
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    let nowSaved = false;
    setWishlist((prev) => {
      const exists = prev.includes(id);
      nowSaved = !exists;
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      } catch {
        // Safe fallback
      }
      return updated;
    });

    showToast(
      nowSaved ? "Added to your travel wishlist!" : "Removed from your travel wishlist.",
      nowSaved ? "success" : "info"
    );
    return nowSaved;
  }, [showToast]);

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const updateBookingDraft = useCallback((updates: Partial<BookingDraft>) => {
    setBookingDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const openBookingModal = useCallback((prefill?: Partial<BookingDraft>) => {
    if (prefill) {
      setBookingDraft((prev) => ({ ...prev, ...prefill }));
    }
    setIsBookingModalOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  const openMyBookings = useCallback(() => {
    setIsMyBookingsOpen(true);
  }, []);

  const closeMyBookings = useCallback(() => {
    setIsMyBookingsOpen(false);
  }, []);

  const addBooking = useCallback(async (
    bookingData: Omit<ConfirmedBooking, "id" | "createdAt" | "status">
  ): Promise<ConfirmedBooking> => {
    try {
      // Call backend API for validation and reference creation
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();

      const newBooking: ConfirmedBooking = {
        id: data?.booking?.id || `JD-BK-${Math.floor(100000 + Math.random() * 900000)}`,
        destination: bookingData.destination,
        departureDate: bookingData.departureDate,
        guests: bookingData.guests,
        totalPrice: bookingData.totalPrice,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        image: bookingData.image || "/images/Rectangle 17.jpg"
      };

      setBookings((prev) => {
        const updated = [newBooking, ...prev];
        try {
          localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
        } catch {
          // Safe fallback
        }
        return updated;
      });

      showToast(`Booking ${newBooking.id} successfully reserved!`, "success");
      return newBooking;
    } catch {
      // Fallback offline generation
      const fallbackBooking: ConfirmedBooking = {
        id: `JD-BK-${Math.floor(100000 + Math.random() * 900000)}`,
        destination: bookingData.destination,
        departureDate: bookingData.departureDate,
        guests: bookingData.guests,
        totalPrice: bookingData.totalPrice,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        image: bookingData.image || "/images/Rectangle 17.jpg"
      };

      setBookings((prev) => {
        const updated = [fallbackBooking, ...prev];
        try {
          localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
        } catch {
          // Safe fallback
        }
        return updated;
      });

      showToast(`Booking ${fallbackBooking.id} confirmed!`, "success");
      return fallbackBooking;
    }
  }, [showToast]);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
      } catch {
        // Safe fallback
      }
      return updated;
    });
    showToast("Booking reservation cancelled.", "info");
  }, [showToast]);

  return (
    <TravelContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        bookings,
        addBooking,
        cancelBooking,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        bookingDraft,
        updateBookingDraft,
        isMyBookingsOpen,
        openMyBookings,
        closeMyBookings,
        toast,
        showToast
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
}
