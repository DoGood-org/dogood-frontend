// /app/api/create-customer/route.ts
import { stripe } from '@/lib/stripe';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
  const user = await getServerCurrentUser(); // читає cookie / токен

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if ('isBanned' in user) {
    return NextResponse.json({ error: 'User is banned' }, { status: 403 });
  }

  if (user.stripeCustomerId) {
    return NextResponse.json({ customerId: user.stripeCustomerId });
  }

  // створюємо Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
  });

  // оновлюємо поточного користувача (в current-user / сесії)
  user.stripeCustomerId = customer.id;

  return NextResponse.json({ customerId: customer.id });
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
