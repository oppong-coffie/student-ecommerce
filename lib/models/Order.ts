import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isDigital: boolean;
  digitalFile?: string;
  downloadCount?: number;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  paymentMethod: 'card' | 'mobile_money' | 'bank_transfer';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentReference?: string;
  paymentDetails?: {
    provider: string;
    transactionId: string;
    paidAt: Date;
    metadata?: Record<string, unknown>;
  };
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  statusHistory: {
    status: string;
    timestamp: Date;
    note?: string;
    updatedBy?: mongoose.Types.ObjectId;
  }[];
  notes?: string;
  customerNotes?: string;
  isDigitalOrder: boolean;
  deliveryDate?: Date;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: String,
  isDigital: {
    type: Boolean,
    default: false,
  },
  digitalFile: String,
  downloadCount: {
    type: Number,
    default: 0,
  },
});

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const StatusHistorySchema = new Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: String,
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [OrderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    paymentMethod: {
      type: String,
      enum: ['card', 'mobile_money', 'bank_transfer'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentReference: String,
    paymentDetails: {
      provider: String,
      transactionId: String,
      paidAt: Date,
      metadata: Schema.Types.Mixed,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },
    statusHistory: [StatusHistorySchema],
    notes: String,
    customerNotes: String,
    isDigitalOrder: {
      type: Boolean,
      default: false,
    },
    deliveryDate: Date,
    trackingNumber: String,
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
OrderSchema.pre('save', async function () {
  if (!this.orderNumber) {
    const date = new Date();
    const prefix = `ORD${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
    const count = await mongoose.models.Order.countDocuments({
      orderNumber: new RegExp(`^${prefix}`),
    });
    this.orderNumber = `${prefix}${String(count + 1).padStart(5, '0')}`;
  }
  
  // Check if all items are digital
  this.isDigitalOrder = this.items.every(item => item.isDigital);
  
  // Add to status history if status changed
  if (this.isModified('orderStatus')) {
    this.statusHistory.push({
      status: this.orderStatus,
      timestamp: new Date(),
    });
  }
});

// Index for queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ orderNumber: 1 });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
