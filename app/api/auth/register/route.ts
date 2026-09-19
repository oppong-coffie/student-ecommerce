import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import nodemailer from 'nodemailer';

// Generate a random 4-digit PIN
function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send email with PIN
// async function sendVerificationEmail(email: string, name: string, pin: string): Promise<boolean> {
//   try {
//     // If SMTP credentials are not set or contain placeholders, log and return immediately for development
//     const isPlaceholder =
//       !process.env.SMTP_USER ||
//       !process.env.SMTP_PASSWORD ||
//       process.env.SMTP_USER.includes('oppong') ||
//       process.env.SMTP_PASSWORD.includes('your-app-password');

//     if (isPlaceholder) {
//       console.log('📧 [DEV MODE] Verification PIN for', email, ':', pin);
//       return true;
//     }

//     // Create transporter with short timeouts to prevent hanging
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.gmail.com',
//       port: parseInt(process.env.SMTP_PORT || '587'),
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//       connectionTimeout: 5000,
//       greetingTimeout: 5000,
//       socketTimeout: 5000,
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM || 'StudentShop <noreply@studentshop.com>',
//       to: email,
//       subject: 'Your StudentShop Verification Code',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
//           <div style="text-align: center; margin-bottom: 30px;">
//             <h1 style="color: #32CD32; margin: 0;">StudentShop</h1>
//           </div>
//           <h2 style="color: #333;">Hi ${name}!</h2>
//           <p style="color: #666; font-size: 16px;">
//             Thank you for registering with StudentShop. Use the code below to verify your email address:
//           </p>
//           <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0;">
//             <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #32CD32;">
//               ${pin}
//             </span>
//           </div>
//           <p style="color: #999; font-size: 14px;">
//             This code expires in 10 minutes. If you didn't create an account, please ignore this email.
//           </p>
//         </div>
//       `,
//     });

//     console.log('✅ Verification email sent to:', email);
//     return true;
//   } catch (error) {
//     console.error('❌ Email send error:', error);
//     // Still return true in development - PIN is logged to console
//     console.log('📧 [FALLBACK] Verification PIN for', email, ':', pin);
//     return true;
//   }
// }

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Registration request received');
    
    // Connect to database
    try {
      await connectDB();
      console.log('✅ Database connected');
    } catch (dbError: any) {
      console.error('❌ Database connection error:', dbError.message);
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please try again later.' },
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body parsed:', { name: body.name, email: body.email });
    } catch (parseError) {
      console.error('❌ Body parse error:', parseError);
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 8) {
      console.log('❌ Password too short');
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Generate verification PIN
    const verificationPin = generatePin();
    console.log('🔑 Generated PIN for', email, ':', verificationPin);

    // Create new user (password will be hashed by the pre-save hook in the model)
    console.log('📝 Creating user...');
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'customer',
      isVerified: true, // Email verification commented out
    });

    console.log('✅ User created successfully:', user._id);

    // Send verification email
    // await sendVerificationEmail(email, name, verificationPin);

    // Return success with PIN (client will store it)
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        verificationPin, // Send PIN to client for verification
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Registration error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Registration failed: ${error.message}` },
      { status: 500 }
    );
  }
}
