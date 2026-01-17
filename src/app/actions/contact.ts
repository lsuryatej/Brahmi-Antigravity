"use server";

import { Resend } from "resend";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export async function sendContactEmail(data: ContactFormData) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
        return { error: "Resend API Key is not configured in .env.local." };
    }

    const resend = new Resend(apiKey);

    try {
        const { name, email, phone, subject, message } = data;

        const result = await resend.emails.send({
            from: "Brahmi Contact Form <onboarding@resend.dev>",
            to: process.env.RESEND_RECIPIENT_EMAIL || "hello@brahmi.com",
            subject: `New Inquiry: ${subject} from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                        <p style="margin-top: 0; font-weight: bold;">Message:</p>
                        <p style="white-space: pre-wrap;">${message}</p>
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
