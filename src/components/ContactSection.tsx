'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { submitContactMessage } from '@/lib/data';

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sender_name || !formData.sender_email || !formData.message) {
      setStatusMessage('Mohon lengkapi Name, Email, dan Message ❌');
      return;
    }

    setLoading(true);
    setStatusMessage('');

    try {
      const res = await submitContactMessage({
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        subject: `New message from ${formData.sender_name}`,
        message: formData.message,
      });

      if (res.success) {
        setStatusMessage('Message sent successfully ✅');
        setFormData({ sender_name: '', sender_email: '', message: '' });
      } else {
        setStatusMessage('Message not sent (service error) ❌');
      }
    } catch {
      setStatusMessage('Message not sent (service error) ❌');
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section__title reveal-init">
        Contact <span>Me</span>
      </h2>

      <div className="contact__container container grid reveal-init">
        {/* Left Column: Bedimcode Bianca Form */}
        <form onSubmit={handleSubmit} className="contact__form grid" id="contact-form">
          <div className="contact__group">
            <input
              type="text"
              name="user_name"
              placeholder="Name"
              required
              value={formData.sender_name}
              onChange={(e) =>
                setFormData({ ...formData, sender_name: e.target.value })
              }
              className="contact__input"
            />
          </div>

          <div className="contact__group">
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              required
              value={formData.sender_email}
              onChange={(e) =>
                setFormData({ ...formData, sender_email: e.target.value })
              }
              className="contact__input"
            />
          </div>

          <div className="contact__group">
            <textarea
              name="user_message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="contact__input"
            />
          </div>

          {statusMessage && (
            <p className="text-sm text-[var(--white-color)] font-medium">
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="contact__button button"
          >
            <span>{loading ? 'Sending...' : 'Send Message'}</span>
            <i className="ri-arrow-right-line" />
          </button>
        </form>

        {/* Right Column: Bedimcode Bianca Pill Contact Cards */}
        <div className="contact__content grid">
          <div className="contact__card">
            <i className="ri-mail-line contact__icon" />
            <div className="contact__data">
              <h3 className="contact__title">Email</h3>
              <span className="contact__address">{profile.email}</span>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="contact__link"
              aria-label="Send email"
            >
              <i className="ri-arrow-right-up-line" />
            </a>
          </div>

          <div className="contact__card">
            <i className="ri-phone-line contact__icon" />
            <div className="contact__data">
              <h3 className="contact__title">Phone number</h3>
              <span className="contact__address">{profile.phone || '085794770824'}</span>
            </div>
            <a
              href="https://wa.me/6285794770824"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
              aria-label="WhatsApp"
            >
              <i className="ri-arrow-right-up-line" />
            </a>
          </div>

          <div className="contact__card">
            <i className="ri-instagram-line contact__icon" />
            <div className="contact__data">
              <h3 className="contact__title">Instagram</h3>
              <span className="contact__address">@dimsswijanark_</span>
            </div>
            <a
              href="https://instagram.com/dimsswijanark_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
              aria-label="Instagram"
            >
              <i className="ri-arrow-right-up-line" />
            </a>
          </div>

          <div className="contact__card">
            <i className="ri-map-pin-line contact__icon" />
            <div className="contact__data">
              <h3 className="contact__title">Location</h3>
              <span className="contact__address">{profile.location || 'Jakarta, Indonesia'}</span>
            </div>
            <a
              href="https://maps.google.com/?q=Jakarta,Indonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
              aria-label="Google Maps"
            >
              <i className="ri-arrow-right-up-line" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
