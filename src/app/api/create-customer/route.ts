import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { mockUser } from '@/data/mockUser';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, email } = await req.json();

  const { customerId } = mockUser;

  try {
    if (!customerId) {
      const customer = await stripe.customers.create({
        name,
        email,
      });
      return NextResponse.json({ customerId: customer.id });
    } else {
      return NextResponse.json({ customerId });
    }

    // return NextResponse.json({ customerId: customer.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ------ VARIANT WITH BACKEND ----- //

// import { stripe } from '@/lib/stripe';
// import { NextRequest, NextResponse } from 'next/server';
// import { getUserByEmail, saveCustomerIdForUser } from '@/lib/db';

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   const { name, email } = await req.json();

//   // 1. Перевіряємо чи вже є кастомер у БД
//   const existingCustomer = await getUserByEmail(email); // повертає { customerId, ... }

//   if (existingCustomer?.customerId) {
//     return NextResponse.json({ customerId: existingCustomer.customerId });
//   }

//   // 2. Якщо нема — створюємо в Stripe
//   const customer = await stripe.customers.create({ name, email });

//   // 3. Зберігаємо в БД
//   await saveCustomerIdForUser(email, customer.id);

//   return NextResponse.json({ customerId: customer.id });
// }

// ------BACKEND EXAMPLE----- //

// import { prisma } from './prisma'; // інстанс Prisma client

// export async function getUserByEmail(email: string) {
//   return prisma.user.findUnique({
//     where: { email },
//     select: {
//       id: true,
//       email: true,
//       name: true,
//       stripeCustomerId: true,
//     },
//   });
// }

// export async function saveCustomerIdForUser(email: string, customerId: string) {
//   return prisma.user.update({
//     where: { email },
//     data: {
//       stripeCustomerId: customerId,
//     },
//   });
// }
