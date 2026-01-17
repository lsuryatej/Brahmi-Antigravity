"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { FadeIn } from "@/lib/motion/primitives";
import { sendContactEmail } from "@/app/actions/contact";

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
}

export const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^[+]?[\d\s()-]{10,}$/;
        return re.test(phone);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.subject) {
            newErrors.subject = "Please select a subject";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await sendContactEmail(formData);

            if (result.success) {
                console.log("Form submitted successfully");
                setIsSubmitted(true);

                // Reset form after 5 seconds
                setTimeout(() => {
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                    });
                    setIsSubmitted(false);
                }, 5000);
            } else {
                setSubmitError(result.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            setSubmitError("An unexpected error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        field: keyof FormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    if (isSubmitted) {
        return (
            <FadeIn className="flex flex-col items-center justify-center py-24 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Thank you for reaching out!</h3>
                <p className="text-muted-foreground">We&apos;ll get back to you soon.</p>
            </FadeIn>
        );
    }

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">
                            Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 6969696969"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2">
                        <Label htmlFor="subject">
                            Subject <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            value={formData.subject}
                            onValueChange={(value) => handleChange("subject", value)}
                        >
                            <SelectTrigger
                                className={errors.subject ? "border-destructive" : ""}
                            >
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="partnerships">Partnerships</SelectItem>
                                <SelectItem value="order-support">Order Support</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.subject && (
                            <p className="text-sm text-destructive">{errors.subject}</p>
                        )}
                    </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                    <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                        <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                </div>

                {/* Error Message */}
                {submitError && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive"
                    >
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-medium">{submitError}</p>
                    </motion.div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                    {isSubmitting ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="mr-2"
                            >
                                <Send className="h-4 w-4" />
                            </motion.div>
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                        </>
                    )}
                </Button>
            </form>
        </FadeIn>
    );
};
