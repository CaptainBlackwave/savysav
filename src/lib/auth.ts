/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import { db } from './db';
import { users } from '@/db/schema';
import { eq as drizzleEq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const ADMIN_COOKIE = 'savysav_admin_session';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createAdminSession(adminId: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, adminId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return session?.value || null;
}

export async function getAdminUser() {
  const sessionId = await getAdminSession();
  if (!sessionId) return null;

  const result = await db.select().from(users).where(
    drizzleEq(users.id, sessionId)
  ).limit(1);

  return result[0] || null;
}

export async function authenticateAdmin(email: string, password: string) {
  const result = await db.select().from(users).where(
    drizzleEq(users.email, email)
  ).limit(1);
  
  const user = result[0];

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return null;
  }

  await createAdminSession(user.id);
  return user;
}
