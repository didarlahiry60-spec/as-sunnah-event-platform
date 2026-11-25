/**
 * Bangladesh Administrative Divisions and Districts
 * For As-Sunnah Foundation demographic registration and quota scoring.
 */

export interface DistrictInfo {
  nameBn: string;
  nameEn: string;
  isPriority?: boolean;
}

export interface DivisionInfo {
  nameBn: string;
  nameEn: string;
  districts: DistrictInfo[];
}

export const BD_DIVISIONS: DivisionInfo[] = [
  {
    nameBn: "ঢাকা",
    nameEn: "Dhaka",
    districts: [
      { nameBn: "ঢাকা", nameEn: "Dhaka" },
      { nameBn: "গাজীপুর", nameEn: "Gazipur" },
      { nameBn: "নারায়ণগঞ্জ", nameEn: "Narayanganj" },
      { nameBn: "মুন্সিগঞ্জ", nameEn: "Munshiganj" },
      { nameBn: "মানিকগঞ্জ", nameEn: "Manikganj" },
      { nameBn: "নরসিংদী", nameEn: "Narsingdi" },
      { nameBn: "টাঙ্গাইল", nameEn: "Tangail" },
      { nameBn: "কিশোরগঞ্জ", nameEn: "Kishoreganj" },
      { nameBn: "ফরিদপুর", nameEn: "Faridpur" },
      { nameBn: "গোপালগঞ্জ", nameEn: "Gopalganj" },
      { nameBn: "মাদারীপুর", nameEn: "Madaripur" },
      { nameBn: "শরীয়তপুর", nameEn: "Shariatpur" },
      { nameBn: "রাজবাড়ী", nameEn: "Rajbari" },
    ],
  },
  {
    nameBn: "চট্টগ্রাম",
    nameEn: "Chattogram",
    districts: [
      { nameBn: "চট্টগ্রাম", nameEn: "Chattogram" },
      { nameBn: "কক্সবাজার", nameEn: "Cox's Bazar", isPriority: true },
      { nameBn: "কুমিল্লা", nameEn: "Cumilla" },
      { nameBn: "ফেনী", nameEn: "Feni" },
      { nameBn: "ব্রাহ্মণবাড়িয়া", nameEn: "Brahmanbaria" },
      { nameBn: "নোয়াখালী", nameEn: "Noakhali" },
      { nameBn: "লক্ষ্মীপুর", nameEn: "Lakshmipur" },
      { nameBn: "চাঁদপুর", nameEn: "Chandpur" },
      { nameBn: "বান্দরবান", nameEn: "Bandarban", isPriority: true },
      { nameBn: "রাঙ্গামাটি", nameEn: "Rangamati", isPriority: true },
      { nameBn: "খাগড়াছড়ি", nameEn: "Khagrachhari", isPriority: true },
    ],
  },
  {
    nameBn: "রাজশাহী",
    nameEn: "Rajshahi",
    districts: [
      { nameBn: "রাজশাহী", nameEn: "Rajshahi" },
      { nameBn: "বগুড়া", nameEn: "Bogura" },
      { nameBn: "পাবনা", nameEn: "Pabna" },
      { nameBn: "সিরাজগঞ্জ", nameEn: "Sirajganj" },
      { nameBn: "নওগাঁ", nameEn: "Naogaon" },
      { nameBn: "নাটোর", nameEn: "Natore" },
      { nameBn: "চাঁপাইনবাবগঞ্জ", nameEn: "Chapai Nawabganj" },
      { nameBn: "জয়পুরহাট", nameEn: "Joypurhat" },
    ],
  },
  {
    nameBn: "খুলনা",
    nameEn: "Khulna",
    districts: [
      { nameBn: "খুলনা", nameEn: "Khulna" },
      { nameBn: "যশোর", nameEn: "Jashore" },
      { nameBn: "সাতক্ষীরা", nameEn: "Satkhira", isPriority: true },
      { nameBn: "বাগেরহাট", nameEn: "Bagerhat" },
      { nameBn: "কুষ্টিয়া", nameEn: "Kushtia" },
      { nameBn: "ঝিনাইদহ", nameEn: "Jhenaidah" },
      { nameBn: "চুয়াডাঙ্গা", nameEn: "Chuadanga" },
      { nameBn: "মেহেরপুর", nameEn: "Meherpur" },
      { nameBn: "নড়াইল", nameEn: "Narail" },
      { nameBn: "মাগুরা", nameEn: "Magura" },
    ],
  },
  {
    nameBn: "বরিশাল",
    nameEn: "Barishal",
    districts: [
      { nameBn: "বরিশাল", nameEn: "Barishal" },
      { nameBn: "পটুয়াখালী", nameEn: "Patuakhali", isPriority: true },
      { nameBn: "ভোলা", nameEn: "Bhola", isPriority: true },
      { nameBn: "বরগুনা", nameEn: "Barguna", isPriority: true },
      { nameBn: "পিরোজপুর", nameEn: "Pirojpur" },
      { nameBn: "ঝালকাঠি", nameEn: "Jhalokati" },
    ],
  },
  {
    nameBn: "সিলেট",
    nameEn: "Sylhet",
    districts: [
      { nameBn: "সিলেট", nameEn: "Sylhet" },
      { nameBn: "সুনামগঞ্জ", nameEn: "Sunamganj", isPriority: true },
      { nameBn: "মৌলভীবাজার", nameEn: "Moulvibazar" },
      { nameBn: "হবিগঞ্জ", nameEn: "Habiganj", isPriority: true },
    ],
  },
  {
    nameBn: "রংপুর",
    nameEn: "Rangpur",
    districts: [
      { nameBn: "রংপুর", nameEn: "Rangpur" },
      { nameBn: "কুড়িগ্রাম", nameEn: "Kurigram", isPriority: true },
      { nameBn: "গাইবান্ধা", nameEn: "Gaibandha", isPriority: true },
      { nameBn: "নীলফামারী", nameEn: "Nilphamari" },
      { nameBn: "দিনাজপুর", nameEn: "Dinajpur" },
      { nameBn: "লালমনিরহাট", nameEn: "Lalmonirhat", isPriority: true },
      { nameBn: "ঠাকুরগাঁও", nameEn: "Thakurgaon" },
      { nameBn: "পঞ্চগড়", nameEn: "Panchagarh" },
    ],
  },
  {
    nameBn: "ময়মনসিংহ",
    nameEn: "Mymensingh",
    districts: [
      { nameBn: "ময়মনসিংহ", nameEn: "Mymensingh" },
      { nameBn: "জামালপুর", nameEn: "Jamalpur", isPriority: true },
      { nameBn: "নেত্রকোণা", nameEn: "Netrokona", isPriority: true },
      { nameBn: "শেরপুর", nameEn: "Sherpur" },
    ],
  },
];
