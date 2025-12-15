import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  category: mongoose.Types.ObjectId;
  images: string[];
  thumbnail?: string;
  sku?: string;
  barcode?: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  isDigital: boolean;
  digitalFile?: string;
  downloadLimit?: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  attributes: {
    name: string;
    value: string;
  }[];
  ratings: {
    average: number;
    count: number;
  };
  soldCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare at price cannot be negative'],
    },
    costPrice: {
      type: Number,
      min: [0, 'Cost price cannot be negative'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    images: [{
      type: String,
    }],
    thumbnail: {
      type: String,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    barcode: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
    trackInventory: {
      type: Boolean,
      default: true,
    },
    isDigital: {
      type: Boolean,
      default: false,
    },
    digitalFile: {
      type: String,
    },
    downloadLimit: {
      type: Number,
      default: -1, // -1 means unlimited
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    attributes: [{
      name: { type: String, required: true },
      value: { type: String, required: true },
    }],
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from name before saving
ProductSchema.pre('save', async function () {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Set thumbnail to first image if not set
  if (this.images.length > 0 && !this.thumbnail) {
    this.thumbnail = this.images[0];
  }
});

// Index for search
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Index for filtering
ProductSchema.index({ category: 1, isActive: 1, price: 1 });
ProductSchema.index({ isFeatured: 1, isActive: 1 });
ProductSchema.index({ soldCount: -1 });

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Virtual for stock status
ProductSchema.virtual('stockStatus').get(function () {
  if (!this.trackInventory) return 'in_stock';
  if (this.stock <= 0) return 'out_of_stock';
  if (this.stock <= this.lowStockThreshold) return 'low_stock';
  return 'in_stock';
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
