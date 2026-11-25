import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SAMPLE_EVENTS,
  SAMPLE_NOTICES,
  SAMPLE_BLOG_POSTS,
  SAMPLE_GALLERY,
  TRAINER_PROFILES,
  CONTACT_INFO,
} from "../lib/sample-data";
import { getEventsData, getEventBySlug } from "../lib/events-data";
import { messages } from "../lib/messages";
import {
  toEnglishDigits,
  normalizeBdPhone,
  formatBengaliDate,
  getDhakaDateKey,
  getDateKeysBetween,
} from "../lib/format";

describe("Sprint 2 Sample Events Data Integrity", () => {
  it("contains both UPCOMING and COMPLETED events", () => {
    const upcoming = SAMPLE_EVENTS.filter(e => e.status === "UPCOMING");
    const completed = SAMPLE_EVENTS.filter(e => e.status === "COMPLETED");
    assert.ok(upcoming.length >= 3, "Should have at least 3 upcoming events");
    assert.ok(completed.length >= 1, "Should have at least 1 completed event");
  });

  it("ensures each event has a unique slug and valid structure", () => {
    const slugs = new Set<string>();
    for (const ev of SAMPLE_EVENTS) {
      assert.ok(ev.slug, "Event must have a slug");
      assert.ok(!slugs.has(ev.slug), `Duplicate slug found: ${ev.slug}`);
      slugs.add(ev.slug);

      assert.ok(ev.title.length > 5, "Title must be descriptive");
      assert.ok(ev.description.length > 20, "Description must be detailed");
      assert.ok(ev.venue.length > 0, "Venue must be defined");
      assert.ok(typeof ev.seats === "number" && ev.seats > 0, "Seats must be a positive number");

      const startDate = new Date(ev.startsAt);
      const endDate = new Date(ev.endsAt);
      assert.ok(!isNaN(startDate.getTime()), "startsAt must be valid date");
      assert.ok(!isNaN(endDate.getTime()), "endsAt must be valid date");
      assert.ok(startDate <= endDate, "startsAt must precede or equal endsAt");

      assert.ok(Array.isArray(ev.eligibility) && ev.eligibility.length > 0, "Must have eligibility criteria");
      assert.ok(Array.isArray(ev.courseOutline) && ev.courseOutline.length > 0, "Must have course outline");
      assert.ok(Array.isArray(ev.trainers) && ev.trainers.length > 0, "Must have trainers defined");
    }
  });

  it("finds events correctly by slug with graceful fallback", async () => {
    const event = await getEventBySlug("imam-training-dhaka-2027");
    assert.ok(event, "Should find imam training event");
    assert.equal(event?.slug, "imam-training-dhaka-2027");
    assert.ok(event?.title.includes("ইমাম"));

    const notFoundEvent = await getEventBySlug("non-existent-slug-xyz");
    assert.equal(notFoundEvent, null, "Should return null for non-existent slug");
  });

  it("getEventsData returns non-empty list of events", async () => {
    const all = await getEventsData();
    assert.ok(Array.isArray(all) && all.length > 0);
  });
});

describe("Sprint 2 Notices Hub Data", () => {
  it("contains notices across required categories", () => {
    assert.ok(SAMPLE_NOTICES.length >= 4);
    const categories = new Set(SAMPLE_NOTICES.map(n => n.category));
    assert.ok(categories.has("বিজ্ঞপ্তি"));
    assert.ok(categories.has("ফলাফল"));
    assert.ok(categories.has("সময়সূচি"));
  });

  it("contains valid publication dates and summaries", () => {
    for (const notice of SAMPLE_NOTICES) {
      assert.ok(!isNaN(new Date(notice.publishedAt).getTime()));
      assert.ok(notice.title.length > 5);
      assert.ok(notice.summary.length > 15);
      assert.ok(notice.content.length > 20);
    }
  });
});

describe("Sprint 2 Blog Articles & Gallery Media", () => {
  it("contains authentic blog articles with author information and reading times", () => {
    assert.ok(SAMPLE_BLOG_POSTS.length >= 3);
    for (const post of SAMPLE_BLOG_POSTS) {
      assert.ok(post.title.length > 5);
      assert.ok(post.author.name.length > 0);
      assert.ok(post.readTimeMinutes > 0);
      assert.ok(post.content.length >= 2);
    }
  });

  it("contains photo and video items in gallery", () => {
    assert.ok(SAMPLE_GALLERY.length >= 6);
    const photos = SAMPLE_GALLERY.filter(m => m.type === "photo");
    const videos = SAMPLE_GALLERY.filter(m => m.type === "video");
    assert.ok(photos.length >= 4);
    assert.ok(videos.length >= 2);
    for (const vid of videos) {
      assert.ok(vid.videoDuration, "Video must specify duration");
    }
  });
});

describe("Sprint 2 Trainer Profiles & Contact Information", () => {
  it("includes Shaykh Ahmadullah and expert instructors in About profiles", () => {
    const shaykh = TRAINER_PROFILES.find(t => t.name.includes("আহমাদুল্লাহ"));
    assert.ok(shaykh, "Shaykh Ahmadullah must be in trainer profiles");
    assert.ok(shaykh?.role.includes("চেয়ারম্যান"));
    assert.ok(shaykh?.specialization.length > 0);
  });

  it("contains complete contact details and phone numbers", () => {
    assert.ok(CONTACT_INFO.address.includes("আফতাবনগর"));
    assert.ok(CONTACT_INFO.phoneNumbers.length >= 2);
    assert.ok(CONTACT_INFO.emails.length >= 2);
    assert.ok(CONTACT_INFO.officeHours.length >= 2);
  });
});

describe("Sprint 2 Messages Dictionary Completeness", () => {
  it("has all required Bengali messages for eventsPage", () => {
    assert.ok(messages.eventsPage.title.length > 0);
    assert.ok(messages.eventsPage.tabUpcoming.length > 0);
    assert.ok(messages.eventsPage.tabPast.length > 0);
    assert.ok(messages.eventsPage.calendarTitle.length > 0);
    assert.ok(messages.eventsPage.detailsAndApply.length > 0);
  });

  it("has all required Bengali messages for notices, about, blog, gallery, and contact", () => {
    assert.ok(messages.noticesPage.title.length > 0);
    assert.ok(messages.aboutPage.title.length > 0);
    assert.ok(messages.blogPage.title.length > 0);
    assert.ok(messages.galleryPage.title.length > 0);
    assert.ok(messages.contactPage.title.length > 0);
    assert.ok(messages.contactPage.submitButton.length > 0);
    assert.ok(messages.contactPage.categoryOptions.length >= 4);
  });
});

describe("Sprint 2 Phone Normalization & Bengali Script Inputs", () => {
  it("converts Bengali digits to English digits accurately", () => {
    assert.equal(toEnglishDigits("০১২৩৪৫৬৭৮৯"), "0123456789");
    assert.equal(toEnglishDigits("০১৭১২৩৪৫৬৭৮"), "01712345678");
  });

  it("normalizes Bangladeshi phone numbers across diverse input scripts", () => {
    // Standard 11 digit
    assert.equal(normalizeBdPhone("01712345678"), "01712345678");
    // Bengali digits
    assert.equal(normalizeBdPhone("০১৭১২৩৪৫৬৭৮"), "01712345678");
    // With +88 prefix
    assert.equal(normalizeBdPhone("+8801712345678"), "01712345678");
    // With 88 prefix
    assert.equal(normalizeBdPhone("8801712345678"), "01712345678");
    // With +৮৮ prefix
    assert.equal(normalizeBdPhone("+৮৮০১৭১২৩৪৫৬৭৮"), "01712345678");
    // With spaces and hyphens
    assert.equal(normalizeBdPhone("01712-345 678"), "01712345678");
    assert.equal(normalizeBdPhone("  ০১৭১২-৩৪৫ ৬৭৮  "), "01712345678");
  });

  it("passes valid BD phone regex after normalization", () => {
    const bdRegex = /^01[3-9]\d{8}$/;
    assert.ok(bdRegex.test(normalizeBdPhone("০১৭১২৩৪৫৬৭৮")));
    assert.ok(bdRegex.test(normalizeBdPhone("+8801812345678")));
    assert.ok(bdRegex.test(normalizeBdPhone("০১৯১২৩৪৫৬৭৮")));
    assert.ok(!bdRegex.test(normalizeBdPhone("01234567890"))); // Invalid operator 2
    assert.ok(!bdRegex.test(normalizeBdPhone("0171234567"))); // Only 10 digits
  });
});

describe("Sprint 2 Calendar Timezone & Date Calculations", () => {
  it("formatBengaliDate safely handles null and invalid dates", () => {
    assert.equal(formatBengaliDate(null), "");
    assert.equal(formatBengaliDate(undefined), "");
    assert.equal(formatBengaliDate("invalid-date-string"), "");
    assert.equal(formatBengaliDate(new Date("invalid")), "");
  });

  it("extracts exact Asia/Dhaka YYYY-MM-DD date keys", () => {
    const key = getDhakaDateKey("2027-04-15T09:00:00.000Z");
    assert.equal(key, "2027-04-15");

    // Even if startsAt is early morning UTC (e.g. 02:00 UTC = 08:00 AM Dhaka)
    const earlyKey = getDhakaDateKey("2027-04-15T02:00:00.000Z");
    assert.equal(earlyKey, "2027-04-15");
  });

  it("generates date spans accurately for multi-day events", () => {
    const span = getDateKeysBetween(
      "2027-04-15T09:00:00.000Z",
      "2027-04-17T17:00:00.000Z"
    );
    assert.deepEqual(span, ["2027-04-15", "2027-04-16", "2027-04-17"]);
  });

  it("single day event returns array with single date key", () => {
    const span = getDateKeysBetween(
      "2027-06-05T08:30:00.000Z",
      "2027-06-05T17:30:00.000Z"
    );
    assert.deepEqual(span, ["2027-06-05"]);
  });
});
