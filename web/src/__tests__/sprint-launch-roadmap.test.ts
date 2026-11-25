import { describe, it } from "node:test";
import assert from "node:assert";
import { createContactMessage, getAllContactMessages } from "@/lib/contact";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { siteMetadata } from "@/lib/metadata";

describe("Sprint Launch Roadmap Verification", () => {
  describe("Task 1: Custom 404 & Error Boundaries", () => {
    it("not-found component and error components exist and are callable", async () => {
      const notFoundModule = await import("@/app/not-found");
      assert.strictEqual(typeof notFoundModule.default, "function");

      const errorModule = await import("@/app/error");
      assert.strictEqual(typeof errorModule.default, "function");
    });
  });

  describe("Task 2: Homepage Blog & Gallery Preview", () => {
    it("homepage module imports sample blog and gallery datasets", async () => {
      const sampleData = await import("@/lib/sample-data");
      assert.ok(sampleData.SAMPLE_BLOG_POSTS.length >= 3);
      assert.ok(sampleData.SAMPLE_GALLERY.length >= 4);
    });
  });

  describe("Task 3: Contact Form & Footer Newsletter Backend Store", () => {
    it("createContactMessage saves inquiry into persistent store", async () => {
      const msg = await createContactMessage({
        name: "মুহাম্মদ আব্দুল্লাহ",
        phone: "01819998877",
        email: "abdullah@example.com",
        subject: "প্রশিক্ষণ সহায়িকা সংগ্রহ",
        message: "আসসালামু আলাইকুম, আমি কীভাবে প্রশিক্ষণের মুদ্রিত কপি সংগ্রহ করতে পারি?"
      });

      assert.ok(msg.id.startsWith("msg_"));
      assert.strictEqual(msg.name, "মুহাম্মদ আব্দুল্লাহ");
      assert.strictEqual(msg.status, "UNREAD");

      const all = getAllContactMessages();
      const found = all.find(m => m.id === msg.id);
      assert.ok(found);
    });

    it("subscribeToNewsletter correctly validates and saves email", async () => {
      const testEmail = `subscriber_${Date.now()}@example.com`;
      const res = await subscribeToNewsletter(testEmail);
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.subscriber?.emailOrPhone, testEmail);

      // Duplicate check
      const duplicateRes = await subscribeToNewsletter(testEmail);
      assert.strictEqual(duplicateRes.success, true);
      assert.ok(duplicateRes.message.includes("ইতিমধ্যে"));
    });

    it("subscribeToNewsletter correctly validates Bangladeshi phone numbers", async () => {
      const testPhone = "01712345678";
      const res = await subscribeToNewsletter(testPhone);
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.subscriber?.type, "PHONE");
    });

    it("subscribeToNewsletter rejects invalid inputs", async () => {
      const res = await subscribeToNewsletter("not-an-email-or-phone");
      assert.strictEqual(res.success, false);
      assert.ok(res.message.includes("সঠিক ইমেইল"));
    });
  });

  describe("Task 4: Social Meta Tags, OpenGraph & Favicon", () => {
    it("layout metadata contains full OpenGraph specifications", () => {
      assert.ok(siteMetadata.openGraph);
      assert.strictEqual(siteMetadata.openGraph.siteName, "আস-সুন্নাহ ফাউন্ডেশন (As-Sunnah Foundation)");
      assert.strictEqual(siteMetadata.openGraph.locale, "bn_BD");
      assert.ok(siteMetadata.openGraph.images);
    });

    it("layout metadata contains Twitter summary large image card", () => {
      assert.ok(siteMetadata.twitter);
      const twitterCard = typeof siteMetadata.twitter === "object" && "card" in siteMetadata.twitter ? siteMetadata.twitter.card : null;
      assert.strictEqual(twitterCard, "summary_large_image");
    });

    it("layout metadata contains complete icons and manifest", () => {
      assert.strictEqual(siteMetadata.manifest, "/manifest.webmanifest");
      assert.ok(siteMetadata.icons);
    });
  });
});
