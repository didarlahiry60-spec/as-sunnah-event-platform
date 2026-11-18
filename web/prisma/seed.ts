import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";
const db = new PrismaClient();
const hash = (p: string) => { const s = randomBytes(16).toString("hex"); return `${s}:${scryptSync(p, s, 64).toString("hex")}`; };
const day = 86400000, now = Date.now();

async function main() {
  for (const [code, nameBn, points] of [["KHUTBAH","খুতবা পাঠ",5],["CLEANUP","পরিচ্ছন্নতা অভিযান",20],["TREE","বৃক্ষরোপণ",20],["CLASS","অনলাইন ক্লাস",20],["HALAQA","হালাকা",15]] as const)
    await db.activityType.upsert({ where:{code}, update:{nameBn,points}, create:{code,nameBn,points} });

  await db.setting.upsert({ where:{key:"hijriOffset"}, update:{}, create:{key:"hijriOffset", value:0} });
  await db.adminUser.upsert({ where:{email:"admin@assunnah.local"}, update:{}, create:{ email:"admin@assunnah.local", name:"Super Admin", role:"SUPER_ADMIN", passwordHash: hash("ChangeMe123!") } });

  const ev = [
    { slug:"imam-training-dhaka-2027", title:"ইমাম প্রশিক্ষণ কোর্স (ঢাকা)", type:"প্রশিক্ষণ", off:21 },
    { slug:"madrasa-management-workshop", title:"মাদরাসা পরিচালনা কর্মশালা", type:"কর্মশালা", off:45 },
    { slug:"dawah-seminar-comilla", title:"দাওয়াহ সেমিনার (কুমিল্লা)", type:"সেমিনার", off:70 },
  ];
  for (const e of ev) await db.event.upsert({ where:{slug:e.slug}, update:{}, create:{
    slug:e.slug, title:e.title, type:e.type, description:"ডেমো বিবরণ। অ্যাডমিন প্যানেল থেকে পরিবর্তন করা যাবে।",
    venue:"আস-সুন্নাহ অডিটোরিয়াম", startsAt:new Date(now+e.off*day), endsAt:new Date(now+(e.off+2)*day),
    applyOpensAt:new Date(now-2*day), applyClosesAt:new Date(now+(e.off-5)*day), seats:200,
    formSchema:[{id:"name",label:"পূর্ণ নাম",type:"text",required:true}], status:"UPCOMING" } });
}
main().then(()=>db.$disconnect()).catch(async e=>{ console.error(e); await db.$disconnect(); process.exit(1); });
