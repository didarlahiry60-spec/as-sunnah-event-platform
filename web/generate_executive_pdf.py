import os
import base64
import subprocess

ARTIFACTS_DIR = "/home/didar-lahiry/.gemini/antigravity/brain/9e764540-43bf-469c-ac5f-42f9192a11d9"
PUBLIC_DIR = "/home/didar-lahiry/Antigravity/Event management/web/public"
OUTPUT_HTML = "/home/didar-lahiry/Downloads/As_Sunnah_Executive_Report.html"
OUTPUT_PDF = "/home/didar-lahiry/Downloads/As_Sunnah_Platform_Executive_Report_BN.pdf"

def get_base64_img(path):
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as f:
        data = f.read()
    mime = "image/png"
    if path.endswith(".svg"):
        mime = "image/svg+xml"
    elif path.endswith(".jpg") or path.endswith(".jpeg"):
        mime = "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"

logo_b64 = get_base64_img(os.path.join(PUBLIC_DIR, "as-sunnah-logo-light.svg"))
hero_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "localhost_no_sparkles.png"))
events_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "events_screenshot.png"))
apply_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "apply_screenshot.png"))
checkin_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "checkin_loaded.png"))
admin_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "admin_applications_loaded.png"))
login_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "login_screenshot.png"))
portal_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "portal_dashboard_screenshot.png"))
verify_img = get_base64_img(os.path.join(ARTIFACTS_DIR, "verify_cert_clean.png"))

html_content = f"""<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<title>আস-সুন্নাহ ফাউন্ডেশন - প্ল্যাটফর্ম পরিকল্পনা ও অগ্রগতি প্রতিবেদন</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Noto+Serif+Bengali:wght@600;700&display=swap');

  @page {{
    size: A4 portrait;
    margin: 0;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Noto Sans Bengali', 'SolaimanLipi', sans-serif;
    color: #1A281F;
    background: #FFFFFF;
    line-height: 1.5;
    font-size: 10pt;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }}

  h1, h2, h3, h4 {{
    font-family: 'Noto Serif Bengali', 'Noto Sans Bengali', serif;
    color: #07261A;
    font-weight: 700;
  }}

  .page {{
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    page-break-after: always;
    page-break-inside: avoid;
    padding: 16mm 18mm 14mm 18mm;
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .page:last-child {{
    page-break-after: auto;
  }}

  /* Header bar for internal pages */
  .running-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #8DC63F;
    padding-bottom: 6px;
    margin-bottom: 14px;
  }}
  .running-header .brand {{
    font-size: 9.5pt;
    font-weight: 700;
    color: #07261A;
  }}
  .running-header .topic {{
    font-size: 8.5pt;
    color: #556B5C;
  }}

  /* Page Footer */
  .page-footer {{
    border-top: 1px solid #D6E2D5;
    padding-top: 6px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: #6C7D72;
  }}

  /* Cover Page */
  .page.cover-page {{
    padding: 24mm 22mm 20mm 22mm;
    background: linear-gradient(180deg, #04180F 0%, #07261A 65%, #0D3B28 100%);
    color: #F8FAF3;
  }}
  .cover-header {{
    display: flex;
    align-items: center;
    gap: 16px;
  }}
  .cover-logo {{
    width: 64px;
    height: 64px;
    background: #04180F;
    border: 2px solid #8DC63F;
    border-radius: 50%;
    padding: 6px;
  }}
  .cover-brand-title {{
    font-size: 20pt;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.5px;
  }}
  .cover-brand-sub {{
    font-size: 10.5pt;
    color: #8DC63F;
    font-weight: 500;
  }}
  .cover-badge {{
    display: inline-block;
    background: rgba(141, 198, 63, 0.15);
    border: 1px solid #8DC63F;
    color: #B7DE7A;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 9.5pt;
    font-weight: 600;
    margin-top: 40px;
  }}
  .cover-title {{
    font-size: 27pt;
    line-height: 1.25;
    color: #FFFFFF;
    margin-top: 16px;
    font-family: 'Noto Serif Bengali', serif;
  }}
  .cover-title span {{
    color: #F0922B;
  }}
  .cover-desc {{
    font-size: 11.5pt;
    color: #E0EADE;
    margin-top: 16px;
    line-height: 1.6;
    max-width: 580px;
  }}
  .cover-pillars {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 36px;
  }}
  .cover-pillar {{
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(141, 198, 63, 0.3);
    border-radius: 8px;
    padding: 10px 12px;
  }}
  .cover-pillar-title {{
    font-size: 9.5pt;
    font-weight: 700;
    color: #8DC63F;
    margin-bottom: 2px;
  }}
  .cover-pillar-desc {{
    font-size: 8pt;
    color: #D2E2D5;
  }}
  .cover-footer {{
    border-top: 1px solid rgba(141, 198, 63, 0.3);
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
    color: #C3D5C5;
  }}
  .cover-footer strong {{
    color: #FFFFFF;
  }}

  /* Content Elements */
  .content-body {{
    flex: 1;
  }}
  .section-title {{
    font-size: 15pt;
    color: #07261A;
    border-bottom: 2px solid #8DC63F;
    padding-bottom: 4px;
    margin-bottom: 10px;
  }}
  .sub-title {{
    font-size: 11.5pt;
    color: #0D3B28;
    margin-top: 10px;
    margin-bottom: 4px;
  }}
  p {{
    margin-bottom: 8px;
    text-align: justify;
    line-height: 1.5;
  }}
  ul, ol {{
    margin-left: 18px;
    margin-bottom: 10px;
  }}
  li {{
    margin-bottom: 4px;
  }}

  /* Feature Grid */
  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 10px;
  }}
  .card {{
    background: #F8FAF3;
    border: 1px solid #D6E2D5;
    border-radius: 6px;
    padding: 10px 12px;
  }}
  .card h4 {{
    font-size: 10pt;
    color: #07261A;
    margin-bottom: 3px;
  }}

  /* Screenshots showcase */
  .screenshot-box {{
    border: 1px solid #CBD5E1;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    background: #FAFAFA;
  }}
  .screenshot-box img {{
    width: 100%;
    display: block;
    max-height: 180px;
    object-fit: cover;
    object-position: top;
  }}
  .screenshot-caption {{
    padding: 5px 8px;
    font-size: 8pt;
    font-weight: 600;
    color: #07261A;
    background: #EDF1E3;
    border-top: 1px solid #D6E2D5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}

  /* Tables */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 8.5pt;
  }}
  th, td {{
    border: 1px solid #D6E2D5;
    padding: 6px 8px;
    text-align: left;
  }}
  th {{
    background: #07261A;
    color: #FFFFFF;
    font-weight: 600;
  }}
  tr:nth-child(even) td {{
    background: #F8FAF3;
  }}

  .alert-box {{
    background: #EDF7E7;
    border-left: 4px solid #8DC63F;
    padding: 8px 12px;
    margin: 10px 0;
    border-radius: 0 4px 4px 0;
    font-size: 9pt;
  }}
  .alert-box strong {{
    color: #07261A;
  }}

  .status-pill {{
    display: inline-block;
    padding: 2px 7px;
    border-radius: 10px;
    font-size: 7.5pt;
    font-weight: 700;
  }}
  .status-done {{
    background: #D1FAE5;
    color: #065F46;
  }}
  .status-active {{
    background: #FEF3C7;
    color: #92400E;
  }}
  .status-upcoming {{
    background: #E0E7FF;
    color: #3730A3;
  }}
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="page cover-page">
  <div>
    <div class="cover-header">
      <img class="cover-logo" src="{logo_b64}" alt="As-Sunnah Foundation Seal" />
      <div>
        <div class="cover-brand-title">আস-সুন্নাহ ফাউন্ডেশন</div>
        <div class="cover-brand-sub">দ্বীনি ও মানবকল্যাণমুখী স্থায়ী প্রাতিষ্ঠানিক প্ল্যাটফর্ম</div>
      </div>
    </div>

    <div class="cover-badge">নির্বাহী পরিকল্পনা ও চলমান অগ্রগতি প্রতিবেদন (Executive Dossier)</div>
    
    <h1 class="cover-title">
      ইভেন্ট ম্যানেজমেন্ট ও<br>
      <span>স্বয়ংক্রিয় ফলো-আপ প্ল্যাটফর্ম</span>
    </h1>

    <p class="cover-desc">
      সারা দেশের ইমাম, খতিব, মাদরাসা শিক্ষক ও স্বেচ্ছাসেবকদের প্রশিক্ষণ আয়োজন, উন্মুক্ত আবেদন গ্রহণ, স্বয়ংক্রিয় স্ক্রিনিং, কিউআর ভেন্যু প্রবেশপত্র, ডিজিটাল সনদ যাচাই এবং প্রশিক্ষণ-পরবর্তী মাঠপর্যায়ের কার্যক্রম ট্র্যাকিংয়ের সমন্বিত আধুনিক সিস্টেম।
    </p>

    <div class="cover-pillars">
      <div class="cover-pillar">
        <div class="cover-pillar-title">স্তর ১: পাবলিক পোর্টাল</div>
        <div class="cover-pillar-desc">স্বচ্ছ প্রশিক্ষণ ঘোষণা ও ১০০-পয়েন্ট স্বয়ংক্রিয় স্ক্রিনিং।</div>
      </div>
      <div class="cover-pillar">
        <div class="cover-pillar-title">স্তর ২: ট্রেইনি ইন্টারফেস</div>
        <div class="cover-pillar-desc">পাসওয়ার্ডহীন লগইন, খুতবা ও ডিজিটাল সনদ।</div>
      </div>
      <div class="cover-pillar">
        <div class="cover-pillar-title">স্তর ৩: রোবট ফলো-আপ</div>
        <div class="cover-pillar-desc">স্বয়ংক্রিয় খুতবা পুশ, আমল ট্র্যাকিং ও ত্রাণ বার্তা।</div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <div>
      <div><strong>প্রতিবেদন প্রস্তুতকরণ:</strong> কারিগরি ও সিস্টেম ডেভেলপমেন্ট টিম</div>
      <div><strong>প্রযুক্তি আর্কিটেকচার:</strong> Next.js 15, React 19, Tailwind CSS v4, Prisma 6, TypeScript</div>
    </div>
    <div style="text-align: right;">
      <div><strong>পর্যালোচনায়:</strong> পরিচালনা পর্ষদ ও চেয়ারম্যান মহোদয়</div>
      <div><strong>তারিখ:</strong> নভেম্বর ২০২৬ | ঢাকা, বাংলাদেশ</div>
    </div>
  </div>
</div>

<!-- PAGE 2: EXECUTIVE SUMMARY & 3-TIER MODEL -->
<div class="page">
  <div class="content-body">
    <div class="running-header">
      <div class="brand">আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা</div>
      <div class="topic">১. নির্বাহী সারসংক্ষেপ ও ৩ স্তরের মডেল</div>
    </div>

    <h2 class="section-title">১. নির্বাহী সারসংক্ষেপ ও সিস্টেমের মূল দর্শন</h2>
    <p>
      আস-সুন্নাহ ফাউন্ডেশন দেশজুড়ে ইমাম প্রশিক্ষণ, কর্মশালা ও সমাজসেবামূলক সেমিনার পরিচালনা করে থাকে। এই কার্যক্রমগুলোকে কেবল একটি সাধারণ ওয়েবসাইটের মধ্যে সীমাবদ্ধ না রেখে—<strong>প্রশিক্ষণপূর্ব প্রস্তুতি, প্রশিক্ষণকালীন স্বাচ্ছন্দ্য এবং প্রশিক্ষণ-পরবর্তী দীর্ঘমেয়াদি স্বয়ংক্রিয় যোগাযোগ</strong> নিশ্চিত করার লক্ষ্যে এই পূর্ণাঙ্গ প্ল্যাটফর্মটি তৈরি করা হয়েছে।
    </p>

    <div class="alert-box">
      <strong>প্রধান লক্ষ্য:</strong> ম্যানুয়াল ফোন কল বা কাগজের রিপোর্টের ওপর নির্ভরতা কমিয়ে প্রযুক্তির মাধ্যমে হাজার হাজার ইমাম ও স্বেচ্ছাসেবককে একটি সুশৃঙ্খল, সক্রিয় ও দীর্ঘমেয়াদি ডিজিটাল নেটওয়ার্কে যুক্ত রাখা।
    </div>

    <h3 class="sub-title">সিস্টেমের ৩ স্তরের সমন্বিত কর্মপদ্ধতি (Three-Tier Architecture)</h3>
    
    <div class="grid-2">
      <div class="card" style="border-top: 3px solid #8DC63F;">
        <h4>স্তর ১: পাবলিক ওয়েবসাইট ও ওপেন আবেদন</h4>
        <p style="font-size: 8.5pt; margin-bottom: 0;">
          যে কেউ আসন্ন প্রশিক্ষণ দেখতে পারবেন। কোনো পাসওয়ার্ড ছাড়াই সহজে জাতীয় পরিচয়পত্র/মোবাইল দিয়ে আবেদন করা যায়। সিস্টেম স্বয়ংক্রিয়ভাবে প্রার্থীর যোগ্যতা যাচাই করে তাৎক্ষণিক ১০০ পয়েন্টের মূল্যায়ন ও কিউআর প্রবেশপত্র প্রস্তুত করে।
        </p>
      </div>

      <div class="card" style="border-top: 3px solid #F0922B;">
        <h4>স্তর ২: পাসওয়ার্ডহীন প্রশিক্ষণার্থী পোর্টাল</h4>
        <p style="font-size: 8.5pt; margin-bottom: 0;">
          প্রশিক্ষণপ্রাপ্ত ইমাম ও শিক্ষকদের জটিল পাসওয়ার্ড মনে রাখতে হবে না। এসএমএস ওয়ান-টাইম পাসওয়ার্ড (OTP) অথবা সুরক্ষিত <strong>ম্যাজিক লিংকে</strong> এক ট্যাপেই পোর্টালে ঢুকে সিলেবাস, খুতবার পিডিএফ, ক্লাসের ভিডিও ও ডিজিটাল সনদ পাবেন।
        </p>
      </div>
    </div>

    <div class="card" style="border-top: 3px solid #07261A; margin-bottom: 10px;">
      <h4>স্তর ৩: ফলো-আপ অটোমেশন ও কেন্দ্রীয় মনিটরিং কনসোল (অ্যাডমিন)</h4>
      <p style="font-size: 8.5pt; margin-bottom: 0;">
        রোবট ওয়ার্কারের মাধ্যমে প্রতি মঙ্গলবার স্বয়ংক্রিয় খুতবা প্রেরণ, মাসিক আমল ও পরিষ্কার-পরিচ্ছন্নতা কার্যক্রমের ছবি সংগ্রহ এবং আকস্মিক দুর্যোগকালে ১ ক্লিকে নির্দিষ্ট জেলার প্রশিক্ষণপ্রাপ্ত ইমামদের স্বেচ্ছাসেবক হিসেবে সক্রিয় করার কমান্ড সেন্টার।
      </p>
    </div>

    <h3 class="sub-title">ডিজাইন নীতি: আস-সুন্নাহ স্বকীয়তা ও সারল্য</h3>
    <ul>
      <li><strong>কৃত্রিম এআই-ভাবমুক্ত:</strong> কোনো অপ্রাসঙ্গিক বা কার্টুনিশ এআই আইকন রাখা হয়নি; আস-সুন্নাহ ফাউন্ডেশনের অফিশিয়াল সিলমোহর, বন-সবুজ (#07261A), লোগো লাইম (#8DC63F) ও সোনালী আভা সংবলিত ইসলামিক পরিচ্ছন্ন আবহ।</li>
      <li><strong>এক-আঙুলে সহজ ব্যবহার (One-Thumb Usability):</strong> ইমাম ও প্রত্যন্ত অঞ্চলের শিক্ষকদের সুবিধার্থে বাংলা ভাষায় বড় বাটন ও সর্বনিম্ন ট্যাপে কার্যক্রম সম্পন্ন করার সুবিধা।</li>
    </ul>
  </div>

  <div class="page-footer">
    <span>আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা ও অগ্রগতি প্রতিবেদন</span>
    <span>পৃষ্ঠা ২</span>
  </div>
</div>

<!-- PAGE 3: PHASE 1 & 2 ACHIEVEMENTS -->
<div class="page">
  <div class="content-body">
    <div class="running-header">
      <div class="brand">আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা</div>
      <div class="topic">২. বাস্তবায়িত মডিউল (স্প্রিন্ট ১ ও ২)</div>
    </div>

    <h2 class="section-title">২. সম্পন্ন হওয়া কাজ: পাবলিক প্ল্যাটফর্ম ও ইভেন্ট ক্যালেন্ডার</h2>
    <p>
      প্রকল্পের প্রথম দুই ধাপে ওয়েবসাইটের মৌলিক অবকাঠামো ও পাবলিক ইন্টারফেস সফলভাবে সম্পন্ন করা হয়েছে।
    </p>

    <div class="screenshot-box">
      <img src="{hero_img}" alt="হোম পেজ ও হিরো ব্যানার" />
      <div class="screenshot-caption">
        <span>হোম পেজ: আস-সুন্নাহ সিলমোহর, ইসলামিক জ্যামিতিক টেক্সচার ও লাইভ কাউন্টডাউন</span>
        <span class="status-pill status-done">সম্পন্ন ও লাইভ</span>
      </div>
    </div>

    <div class="screenshot-box">
      <img src="{events_img}" alt="ইভেন্ট ক্যালেন্ডার" />
      <div class="screenshot-caption">
        <span>ইভেন্ট ক্যালেন্ডার: বাংলা বারের নাম, ফিল্টারিং ও আসন্ন প্রশিক্ষণ তালিকা</span>
        <span class="status-pill status-done">সম্পন্ন ও লাইভ</span>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h4>মূল ফিচারসমূহ:</h4>
        <ul style="font-size: 8.5pt; margin-left: 14px; margin-bottom: 0;">
          <li>সম্পূর্ণ বাংলা সংখ্যা ও ঢাকা টাইমজোন সমন্বিত কাউন্টডাউন।</li>
          <li>মোবাইল রেসপনসিভ মেগা মেনু ও অফিশিয়াল কালার স্কিম।</li>
          <li>আসন্ন ও সমাপ্ত প্রশিক্ষণের আর্কাইভ এবং পূর্ণাঙ্গ সিলেবাস।</li>
        </ul>
      </div>
      <div class="card">
        <h4>প্রযুক্তিগত পারফরম্যান্স:</h4>
        <ul style="font-size: 8.5pt; margin-left: 14px; margin-bottom: 0;">
          <li>Next.js 15 টার্বোপ্যাক প্রযুক্তির ফলে পেজ লোডিং ১ সেকেন্ডের নিচে।</li>
          <li>লোকাল ও মোবাইল ডাটাতে দ্রুত ব্যবহারের উপযোগী ক্যাশিং।</li>
          <li>সার্চ ইঞ্জিন অপ্টিমাইজড (SEO) ও সামাজিক শেয়ারিং কার্ড।</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা ও অগ্রগতি প্রতিবেদন</span>
    <span>পৃষ্ঠা ৩</span>
  </div>
</div>

<!-- PAGE 4: PHASE 3 ACHIEVEMENTS -->
<div class="page">
  <div class="content-body">
    <div class="running-header">
      <div class="brand">আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা</div>
      <div class="topic">৩. বাস্তবায়িত মডিউল (স্প্রিন্ট ৩)</div>
    </div>

    <h2 class="section-title">৩. সম্পন্ন হওয়া কাজ: আবেদন, স্ক্রিনিং ও কিউআর চেক-ইন</h2>
    <p>
      প্রশিক্ষণে অংশগ্রহণের আবেদন গ্রহণ ও ভেন্যুতে প্রবেশের আধুনিক ডিজিটাল ব্যবস্থাপনা সম্পন্ন হয়েছে।
    </p>

    <div class="screenshot-box">
      <img src="{apply_img}" alt="আবেদন ফরম ও ১০০ পয়েন্ট স্ক্রিনিং" />
      <div class="screenshot-caption">
        <span>আবেদন ফরম: ১০০ পয়েন্ট স্বয়ংক্রিয় স্ক্রিনিং (বয়স, শিক্ষাগত যোগ্যতা, জেলা কোটা ও অভিজ্ঞতা)</span>
        <span class="status-pill status-done">সম্পন্ন ও লাইভ</span>
      </div>
    </div>

    <div class="grid-2">
      <div class="screenshot-box">
        <img src="{checkin_img}" alt="কিউআর স্ক্যানার" style="max-height: 140px;" />
        <div class="screenshot-caption">
          <span>ভেন্যু গেট কিউআর চেকার</span>
          <span class="status-pill status-done">সম্পন্ন</span>
        </div>
      </div>
      <div class="screenshot-box">
        <img src="{admin_img}" alt="অ্যাডমিন আবেদন তালিকা" style="max-height: 140px;" />
        <div class="screenshot-caption">
          <span>অ্যাডমিন স্ক্রিনিং ও এসএমএস ডিসপ্যাচ</span>
          <span class="status-pill status-done">সম্পন্ন</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h4>স্বয়ংক্রিয় স্ক্রিনিং অ্যালগরিদম (১০০ পয়েন্ট স্কেল):</h4>
      <p style="font-size: 8.5pt; margin-bottom: 0;">
        সিস্টেম প্রার্থীর শিক্ষাগত যোগ্যতা (দাওরায়ে হাদিস ৩০ পয়েন্ট), ইমামতির অভিজ্ঞতা (২০ পয়েন্ট), কম্পিউটার দক্ষতা ও পিছিয়ে পড়া উপকূলীয়/সীমান্তবর্তী জেলা কোটা (২০ পয়েন্ট) স্বয়ংক্রিয়ভাবে হিসাব করে। ৭০ বা তার বেশি পয়েন্ট পেলে স্বয়ংক্রিয়ভাবে শর্টলিস্টে চলে যায়। গেট স্ক্যানারে ক্যামেরা বা বারকোড গান দ্বারা স্ক্যান করলে ১ সেকেন্ডে প্রবেশ নিশ্চিত হয় এবং ডুপ্লিকেট এন্ট্রি শনাক্ত করে লাল সতর্কতা দেখায়।
      </p>
    </div>
  </div>

  <div class="page-footer">
    <span>আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা ও অগ্রগতি প্রতিবেদন</span>
    <span>পৃষ্ঠা ৪</span>
  </div>
</div>

<!-- PAGE 5: PHASE 4 ACHIEVEMENTS -->
<div class="page">
  <div class="content-body">
    <div class="running-header">
      <div class="brand">আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা</div>
      <div class="topic">৪. বাস্তবায়িত মডিউল (স্প্রিন্ট ৪)</div>
    </div>

    <h2 class="section-title">৪. সম্পন্ন হওয়া কাজ: প্রশিক্ষণার্থী পোর্টাল ও ডিজিটাল সনদ</h2>
    <p>
      প্রশিক্ষণার্থীদের সাথে নিয়মিত সংযোগ এবং তাদের সনদ যাচাইয়ের বিশ্বমানের প্রযুক্তি যুক্ত করা হয়েছে।
    </p>

    <div class="screenshot-box">
      <img src="{portal_img}" alt="ট্রেইনি ড্যাশবোর্ড" />
      <div class="screenshot-caption">
        <span>প্রশিক্ষণার্থী পোর্টাল: মোট পয়েন্ট, সিলেবাস, খুতবার পিডিএফ ও অনলাইন ক্লাস এটেনডেন্স</span>
        <span class="status-pill status-done">সম্পন্ন ও লাইভ</span>
      </div>
    </div>

    <div class="grid-2">
      <div class="screenshot-box">
        <img src="{login_img}" alt="মোবাইল ওয়ান-ট্যাপ ও ম্যাজিক লিংক লগইন" style="max-height: 140px;" />
        <div class="screenshot-caption">
          <span>পাসওয়ার্ডহীন ওটিপি ও ম্যাজিক লিংক</span>
          <span class="status-pill status-done">সম্পন্ন</span>
        </div>
      </div>
      <div class="screenshot-box">
        <img src="{verify_img}" alt="সনদ ভেরিফিকেশন কনসোল" style="max-height: 140px;" />
        <div class="screenshot-caption">
          <span>পাবলিক ডিজিটাল সনদ যাচাই</span>
          <span class="status-pill status-done">সম্পন্ন</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h4>ডিজিটাল সনদের গ্রহণযোগ্যতা ও কিউআর ভেরিফিকেশন:</h4>
      <p style="font-size: 8.5pt; margin-bottom: 0;">
        প্রতিটি সনদে স্বয়ংক্রিয় ইউনিক সনদ নম্বর (যেমন: <code>CERT-ASF-2026-0814</code>) ও কিউআর কোড থাকে। দেশ-বিদেশের যেকোনো প্রতিষ্ঠান বা ব্যক্তি কিউআর স্ক্যান করলেই আস-সুন্নাহ ফাউন্ডেশনের অফিশিয়াল সার্ভার থেকে সনদধারীর নাম, শিক্ষকের স্বাক্ষর ও সত্যায়ন দেখতে পাবেন। জাল সনদের কোনো সুযোগ নেই।
      </p>
    </div>
  </div>

  <div class="page-footer">
    <span>আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা ও অগ্রগতি প্রতিবেদন</span>
    <span>পৃষ্ঠা ৫</span>
  </div>
</div>

<!-- PAGE 6: AUTOMATION & SECURITY INVARIANTS -->
<div class="page">
  <div class="content-body">
    <div class="running-header">
      <div class="brand">আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা</div>
      <div class="topic">৫. ফলো-আপ অটোমেশন ও নিরাপত্তা নীতি</div>
    </div>

    <h2 class="section-title">৫. ফলো-আপ অটোমেশন ইঞ্জিন ও রুটিন</h2>
    <p>
      প্রশিক্ষণ সমাপ্তির পর ইমাম ও ভলান্টিয়ারদের সক্রিয় রাখতে সার্ভারে স্বয়ংক্রিয় শিডিউলার নির্ধারিত সময়ে স্বয়ংক্রিয় নোটিফিকেশন পাঠাবে:
    </p>

    <table>
      <thead>
        <tr>
          <th style="width: 25%;">সময়সূচি</th>
          <th style="width: 35%;">স্বয়ংক্রিয় কার্যক্রম</th>
          <th style="width: 40%;">উদ্দেশ্য ও মাধ্যম</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>প্রতি মঙ্গলবার সকাল ১০:০০</strong></td>
          <td>জুমার খুতবার সমকালীন গাইড ও পিডিএফ পুশ</td>
          <td>খতিব সাহেবরা জুমার ২ দিন আগে বিষয়ভিত্তিক নির্ভরযোগ্য তথ্য ও বয়ান গাইড পান। (এসএমএস ও হোয়াটসঅ্যাপ)</td>
        </tr>
        <tr>
          <td><strong>রবি ও বুধবার</strong></td>
          <td>সাপ্তাহিক আমল ও তালিম অনুস্মারক</td>
          <td>মসজিদে মুসল্লিদের নিয়ে দ্বীনি তালিম ও নৈতিক শিক্ষার উৎসাহ।</td>
        </tr>
        <tr>
          <td><strong>আরবি ১২ তারিখ</strong></td>
          <td>আইয়ামে বিজের রোজা পালনের স্মরণবার্তা</td>
          <td>সুন্নাহ অনুযায়ী ১৩, ১৪ ও ১৫ তারিখের রোজা পালনে ইমাম ও মুসল্লিদের উদ্বুদ্ধকরণ। (চাঁদ দেখা সমন্বয় সুবিধা)</td>
        </tr>
        <tr>
          <td><strong>মাসের ২৫ তারিখ</strong></td>
          <td>মাসিক সমাজসেবা ও রিপোর্ট জমাদান তাগিদ</td>
          <td>মসজিদ পরিষ্কার-পরিচ্ছন্নতা, বৃক্ষরোপণ ইত্যাদির ছবি পোর্টালে আপলোড করার রিমাইন্ডার।</td>
        </tr>
        <tr>
          <td><strong>জরুরি দুর্যোগকালে</strong></td>
          <td>আকস্মিক বন্যা বা ত্রাণ উদ্ধার কল</td>
          <td>নির্দিষ্ট অঞ্চলের ইমামদের কাছে তাৎক্ষণিক এসএমএস: <em>[১ চাপুন: হ্যাঁ, প্রস্তুত] / [২ চাপুন: না]</em>।</td>
        </tr>
      </tbody>
    </table>

    <h2 class="section-title" style="margin-top: 14px;">৬. প্রশাসনিক নিরাপত্তা ও গোপনীয়তার অলঙ্ঘনীয় নীতি</h2>
    
    <div class="alert-box" style="border-left-color: #07261A; background: #F1F5F2;">
      <strong>নিরাপত্তা মূলনীতি (Strict Invariants):</strong> কর্তৃপক্ষের নিজস্ব মূল্যায়ন ট্রেইনি বা জনসাধারণের কাছ থেকে শতভাগ গোপন থাকবে।
    </div>

    <div class="grid-2">
      <div class="card">
        <h4>গোপন স্টার রেটিং (Internal 1-5 Stars)</h4>
        <p style="font-size: 8.5pt; margin-bottom: 0;">
          কর্তৃপক্ষ প্রশিক্ষণার্থীদের কার্যক্রম ও বিশ্বস্ততার ওপর ভিত্তি করে ১ থেকে ৫ তারকা রেটিং দেবেন। এটি শুধু অ্যাডমিন দেখতে পাবেন। কোনো ট্রেইনি তার নিজস্ব পোর্টালে এই রেটিং দেখতে পারবে না।
        </p>
      </div>
      <div class="card">
        <h4>রেড ফ্ল্যাগ ও কল লগ ট্র্যাকিং (Red Flag)</h4>
        <p style="font-size: 8.5pt; margin-bottom: 0;">
          টানা ৬০ দিন নিষ্ক্রিয় থাকলে স্বয়ংক্রিয়ভাবে 'রেড ফ্ল্যাগ' সতর্কতা তৈরি হয়। কেন্দ্রীয় টিম তাদের সাথে যোগাযোগ করে 'কল লগ' সংরক্ষণ করে। এই তথ্যও সম্পূর্ণ অভ্যন্তরীণ ও এনক্রিপ্টেড।
        </p>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা ও অগ্রগতি প্রতিবেদন</span>
    <span>পৃষ্ঠা ৬</span>
  </div>
</div>

<!-- PAGE 7: ROADMAP & LIVE VERIFICATION -->
<div class="page">
  <div class="content-body">
    <div class="running-header">
      <div class="brand">আস-সুন্নাহ ফাউন্ডেশন • সিস্টেম পরিকল্পনা</div>
      <div class="topic">৬. বাস্তবায়ন রোডম্যাপ ও লাইভ লিংক</div>
    </div>

    <h2 class="section-title">৭. বাস্তবায়ন রোডম্যাপ (স্প্রিন্টভিত্তিক অগ্রগতি)</h2>

    <table>
      <thead>
        <tr>
          <th style="width: 15%;">স্প্রিন্ট</th>
          <th style="width: 50%;">কার্যক্রম ও মডিউল</th>
          <th style="width: 20%;">স্ট্যাটাস</th>
          <th style="width: 15%;">টেস্ট কভারেজ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>স্প্রিন্ট ১</strong></td>
          <td>ডিজাইন টোকেন, অফিশিয়াল ব্র্যান্ডিং, সিলমোহর ও হোমপেজ</td>
          <td><span class="status-pill status-done">১০০% সম্পন্ন</span></td>
          <td>পাস (১০৩ টেস্ট)</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ২</strong></td>
          <td>পাবলিক সাইট, ইভেন্ট ক্যালেন্ডার, নোটিশ ও গ্যালারি</td>
          <td><span class="status-pill status-done">১০০% সম্পন্ন</span></td>
          <td>পাস (১০৩ টেস্ট)</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ৩</strong></td>
          <td>আবেদন ফরম, ১০০-পয়েন্ট স্ক্রিনিং, কিউআর পাস ও স্ক্যানার</td>
          <td><span class="status-pill status-done">১০০% সম্পন্ন</span></td>
          <td>পাস (১০৩ টেস্ট)</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ৪</strong></td>
          <td>পাসওয়ার্ডহীন পোর্টাল, ম্যাজিক লিংক ও ডিজিটাল সনদ যাচাই</td>
          <td><span class="status-pill status-done">১০০% সম্পন্ন</span></td>
          <td>পাস (১০৩ টেস্ট)</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ৫</strong></td>
          <td>মাঠপর্যায়ের ছবি ও রিপোর্ট আপলোড, পয়েন্ট সংযোজন ইঞ্জিন</td>
          <td><span class="status-pill status-active">বর্তমানে চলমান</span></td>
          <td>প্রস্তুতি সম্পন্ন</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ৬</strong></td>
          <td>ব্যাকগ্রাউন্ড রোবট অটোমেশন (খুতবা, আইয়ামে বিজ রিমাইন্ডার)</td>
          <td><span class="status-pill status-upcoming">পরবর্তী ধাপ</span></td>
          <td>পরিকল্পিত</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ৭</strong></td>
          <td>লাইভ ফটো ওয়াল, সিক্রেট রেটিং ও দুর্যোগকালীন ত্রাণ ব্রডকাস্ট</td>
          <td><span class="status-pill status-upcoming">পরবর্তী ধাপ</span></td>
          <td>পরিকল্পিত</td>
        </tr>
        <tr>
          <td><strong>স্প্রিন্ট ৮</strong></td>
          <td>চূড়ান্ত মোবাইল স্পিড অপ্টিমাইজেশন ও সিকিউরিটি লঞ্চ</td>
          <td><span class="status-pill status-upcoming">চূড়ান্ত ধাপ</span></td>
          <td>পরিকল্পিত</td>
        </tr>
      </tbody>
    </table>

    <h2 class="section-title" style="margin-top: 14px;">৮. কম্পিউটারে সরাসরি পরিদর্শনের লাইভ লিংক</h2>
    <p>
      বর্তমান সার্ভারটি লোকালহোস্টে সচল রয়েছে। নিম্নের লিংকগুলো ব্যবহার করে প্রতিটি মডিউল নিজে যাচাই করা যাবে:
    </p>

    <div class="card" style="background: #F8FAF3;">
      <ul style="font-size: 8.5pt; margin-bottom: 0;">
        <li><strong>মূল ওয়েবসাইট:</strong> <code>http://localhost:3000</code></li>
        <li><strong>ইভেন্ট ক্যালেন্ডার:</strong> <code>http://localhost:3000/events</code></li>
        <li><strong>অনলাইন আবেদন ও কিউআর পাস:</strong> <code>http://localhost:3000/events/imam-training-2026/apply</code></li>
        <li><strong>ভেন্যু কিউআর স্ক্যানার:</strong> <code>http://localhost:3000/checkin</code></li>
        <li><strong>অ্যাডমিন স্ক্রিনিং ড্যাশবোর্ড:</strong> <code>http://localhost:3000/admin/applications</code></li>
        <li><strong>ট্রেইনি ওটিপি লগইন:</strong> <code>http://localhost:3000/portal/login</code> (টেস্ট ওটিপি: <code>123456</code>)</li>
        <li><strong>১-ট্যাপ ডেমো ম্যাজিক লিংক:</strong> <code>http://localhost:3000/m/demo</code></li>
        <li><strong>ডিজিটাল সনদ যাচাই:</strong> <code>http://localhost:3000/verify-certificate?certNo=CERT-ASF-2026-0814</code></li>
      </ul>
    </div>
  </div>

  <div class="page-footer">
    <span>আস-সুন্নাহ ফাউন্ডেশন • সর্বস্বত্ব সংরক্ষিত ২০২৬</span>
    <span>পৃষ্ঠা ৭</span>
  </div>
</div>

</body>
</html>
"""

with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated HTML at {OUTPUT_HTML}")

# Render to PDF using google-chrome without default headers/footers
cmd = [
    "google-chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    f"--print-to-pdf={OUTPUT_PDF}",
    OUTPUT_HTML
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    print(f"Successfully generated Executive PDF at {OUTPUT_PDF}")
else:
    print(f"Error generating PDF: {res.stderr}")
