"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// Escape HTML special characters to prevent injection in admin emails
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// In-memory rate limit store: IP → { count, resetAt }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;          // max submissions per window
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetAt) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true };
    }

    if (record.count >= RATE_LIMIT) {
        const retryAfter = Math.ceil((record.resetAt - now) / 60000);
        return { allowed: false, retryAfter };
    }

    record.count++;
    return { allowed: true };
}

export async function sendContactEmail(data: ContactFormData) {
    // Rate limiting — 3 submissions per IP per 10 minutes
    const headersList = await headers();
    const ip =
        headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headersList.get("x-real-ip") ||
        "unknown";

    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
        return {
            error: `Too many submissions. Please try again in ${retryAfter} minute${retryAfter === 1 ? "" : "s"}.`,
        };
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
        return { error: "Resend API Key is not configured in .env.local." };
    }

    const resend = new Resend(apiKey);

    try {
        const { name, email, phone, subject, message } = data;

        // Sanitize all user inputs before embedding in HTML
        const safe = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            subject: escapeHtml(subject),
            message: escapeHtml(message),
        };

        const result = await resend.emails.send({
            from: "Brahmi Contact Form <onboarding@resend.dev>",
            to: process.env.RESEND_RECIPIENT_EMAIL || "admin@wearbrahmi.com",
            subject: `New Inquiry: ${safe.subject} from ${safe.name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${safe.name}</p>
                    <p><strong>Email:</strong> ${safe.email}</p>
                    <p><strong>Phone:</strong> ${safe.phone}</p>
                    <p><strong>Subject:</strong> ${safe.subject}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                        <p style="margin-top: 0; font-weight: bold;">Message:</p>
                        <p style="white-space: pre-wrap;">${safe.message}</p>
                    </div>
                    <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #888;">This email was sent from the contact form on Brahmi website.</p>
                </div>
            `,
        });

        if (result.error) {
            console.error("Resend error:", result.error);
            return { error: result.error.message };
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { error: "An unexpected error occurred. Please try again later." };
    }
}
