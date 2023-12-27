// "use client";
import React from 'react';
import styles from './LandingPage.module.css';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, Facebook, Twitter, Youtube } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.sectionBackground}>
        <div className={styles.sectionContainer}>
          {/* Left */}
          <div className={styles.leftContainer}>
            {/* Header */}
            <h1 className={styles.headerText}>
              Chat with any PDF document
            </h1>

            <div className={styles.typewriterText}>
              {/* <TypewriterComponent
                options={{
                  strings: [
                    "Books",
                    "Scientific papers",
                    "Financial reports",
                    "User manuals",
                    "Legal documents",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              /> */}
            </div>

            {/* Description */}
            <p className={styles.descriptionText}>
              From legal agreements to financial reports, PDF.ai brings your
              documents to life. You can ask questions, get summaries, find
              information, and more.
            </p>

            {/* CTA */}
            <div>
              {/* Button */}
              <div className={styles.ctaButton}>
                <Button variant="orange">Get started for free</Button>
              </div>

              {/* Customers */}
              <div className={styles.customersContainer}>
                <img
                  className={styles.customerImage}
                  src="user_1.jpeg"
                />
                <img
                  className={styles.customerImage}
                  src="user_2.jpeg"
                />
                <img
                  className={styles.customerImage}
                  src="user_3.jpeg"
                />
                <img
                  className={styles.customerImage}
                  src="user_4.jpeg"
                />
                <img
                  className={styles.customerImage}
                  src="user_5.jpeg"
                />
                <p className={styles.customersText}>
                  Loved by 100,000+ happy users
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={styles.rightContainer}>
            <img src="hero.svg" alt="" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.sectionContainer}>
        <h1 className={styles.featureHeader}>
          How it works
        </h1>
        <div className="text-black grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {/* Feature 1 */}
          <div className={styles.featureItem}>
            <div className={styles.featureImage}>
              <img src="feature_1.svg" />
            </div>
            <p className={styles.featureText}>Upload documents</p>
            <span className="block text-sm text-gray-500 mt-3">
              Easily upload the PDF documents you'd like to chat with.
            </span>
          </div>

          {/* Feature 2 */}
          <div className={styles.featureItem}>
            <div className={styles.featureImage}>
              <img src="feature_2.svg" />
            </div>
            <p className={styles.featureText}>Instant answers</p>
            <span className="block text-sm text-gray-500 mt-3">
              Ask questions, extract information, and summarize documents with AI.
            </span>
          </div>

          {/* Feature 3 */}
          <div className={styles.featureItem}>
            <div className={styles.featureImage}>
              <img src="feature_3.svg" />
            </div>
            <p className={styles.featureText}>Sources included</p>
            <span className="block text-sm text-gray-500 mt-3">
              Every response is backed by sources extracted from the uploaded document.
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaContainer}>
        <h1 className={styles.ctaHeader}>Get started</h1>
        <p className={styles.ctaText}>
          Upload a document and start chatting with it today.
          <br />
          No credit card required.
        </p>

        <div className="w-full max-w-sm mx-auto px-4">
          <Button variant="orange">Sign up for free</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerContainer}>
        <div className="mx-auto max-w-7xl px-8 md:px-6">
          {/* Row 1 */}
          <div className={styles.footerRow}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <BookOpenCheck className={styles.logoIcon} />
              <span className={styles.logoText}>PDF.wisdom</span>
            </div>

            {/* Links */}
            <div className={styles.footerLinks}>
              {/* Col 1 */}
              <div className={styles.footerLinkSection}>
                <h2 className={styles.footerLinkHeader}>Products</h2>
                <div className={styles.footerLinkList}>
                  <a href="#" className={styles.footerLink}>User cases</a>
                  <a href="#" className={styles.footerLink}>Chrome extension</a>
                  <a href="#" className={styles.footerLink}>Blog</a>
                  <a href="#" className={styles.footerLink}>FAQ</a>
                </div>
              </div>

              {/* Col 2 */}
              <div className={styles.footerLinkSection}>
                <h2 className={styles.footerLinkHeader}>Resources</h2>
                <div className={styles.footerLinkList}>
                  <a href="#" className={styles.footerLink}>Learn</a>
                  <a href="#" className={styles.footerLink}>Docs</a>
                  <a href="#" className={styles.footerLink}>Community</a>
                </div>
              </div>

              {/* Col 3 */}
              <div className={styles.footerLinkSection}>
                <h2 className={styles.footerLinkHeader}>Company</h2>
                <div className={styles.footerLinkList}>
                  <a href="#" className={styles.footerLink}>About</a>
                  <a href="#" className={styles.footerLink}>Team</a>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-300 lg:my-8" />

          {/* Row 2 */}
          <div className="text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
            <span>Copyright &copy; 2023, All Rights Reserved</span>
            <div className={styles.footerSocialIcons}>
              <a href="#">
                <Twitter className={styles.socialIcon} />
              </a>
              <a href="#">
                <Facebook className={styles.socialIcon} />
              </a>
              <a href="#">
                <Youtube className={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
