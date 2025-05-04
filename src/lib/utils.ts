import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ENCRYPTION
const algorithm = 'aes-256-cbc';
const key = Buffer.from('12345678901234567890123456789012');;
const iv = Buffer.from('1234567890123456');;

export function encryptJSON(data: object) {
  const json = JSON.stringify(data);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(json), cipher.final()]);
  return encrypted.toString('hex');
}

export function decryptJSON(encryptedHex: string) {
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final()
  ]);
  return JSON.parse(decrypted.toString());
}