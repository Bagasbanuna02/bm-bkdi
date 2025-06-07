/* eslint-disable @typescript-eslint/no-unused-vars */
// /app/api/solat/route.ts
import { createRequire } from "module";
import { NextResponse } from "next/server";
import { toHijri } from "hijri-converter";

const require = createRequire(import.meta.url);
const { PrayTime } = require("praytime");

// Daftar nama hari dalam Bahasa Indonesia
const dayNames = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dayNamesArab = [
  "Al-Ahad", // Minggu
  "Al-Itsnayn", // Senin
  "Ath-Thulatha'", // Selasa
  "Al-Arba‘a’", // Rabu
  "Al-Khamīs", // Kamis
  "Al-Jum‘ah", // Jumat
  "As-Sabt", // Sabtu
];

export async function GET(request: Request) {
  try {
    const prayTime = new PrayTime("Tehran");

    // Metode hisab (contoh: Muslim World League)
    prayTime.calcMethod = PrayTime.MWL;

    // Sesuaikan offset waktu (dalam menit)
    prayTime.offsets = {
      fajr: -20, // Subuh mundur 10 menit
      sunrise: 2, // Terbit matahari maju 2 menit
      dhuhr: 5, // Dzuhur maju 5 menit
      asr: 0,
      maghrib: 3, // Maghrib maju 3 menit
      isha: 0,
    };

    // Atur jenis Asr (0 = Shafi'i, 1 = Hanafi)
    prayTime.adjustImam = 1; // Hanafi

    // Koordinat Denpasar
    const latitude = -8.692;
    const longitude = 115.2228;
    const timezone = 8; // UTC+8

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const times = prayTime.getTimes(date, [latitude, longitude], timezone);
console.log("times >>", times)
    // Konversi ke Hijriyah
    const hijri = toHijri(year, month, day);

    const islamicMonthNames = [
      "Muharram",
      "Safar",
      "Rabi'ul Awal",
      "Rabi'ul Akhir",
      "Jumadil Awal",
      "Jumadil Akhir",
      "Rajab",
      "Syaban",
      "Ramadan",
      "Syawal",
      "Dzul Qidah",
      "Dzul Hijjah",
    ];

    const islamicMonth = islamicMonthNames[hijri.hm - 1];

    // Ambil nama hari
    const dayName = dayNames[date.getDay()]; // <-- Menambahkan nama hari
    const dayNameArab = dayNamesArab[date.getDay()]; // <-- Menambahkan nama hari

    return NextResponse.json({
      gregorian_date: `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`,
      day_name: dayName, // ✅ Nama hari ditambahkan di sini
      day_name_arab: dayNameArab,
      hijri_date: `${hijri.hy}-${hijri.hm}-${hijri.hd}`,
      hijri_month: islamicMonth,
      timings: {
        Subuh: times.fajr,
        Terbit: times.sunrise,
        Dzuhur: times.dhuhr,
        Ashar: times.asr,
        Maghrib: times.maghrib,
        Isya: times.isha,
      },
    });
  } catch (error) {
    console.error("Error calculating prayer times:", error);
    return NextResponse.json(
      { error: "Gagal menghitung waktu solat" },
      { status: 500 }
    );
  }
}
