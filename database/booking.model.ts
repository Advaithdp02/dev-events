import { Schema, model, models, Document, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Index for faster eventId-based queries
BookingSchema.index({ eventId: 1 });

// Compound index to prevent duplicate bookings for same email and event
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Pre-save hook to validate that the referenced event exists
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isModified('eventId')) {
    // Check if Event model is registered
    const Event = models.Event;
    
    if (!Event) {
      throw new Error('Event model is not registered. Import Event model before using Booking.');
    }
    
    const eventExists = await Event.findById(booking.eventId);
    
    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  }
});

// Prevent model recompilation in development (Next.js hot reload)
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
