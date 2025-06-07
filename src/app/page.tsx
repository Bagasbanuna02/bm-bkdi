"use client";

// app/page.tsx

import { COLOR } from "@/lib/color-palet";
import { Carousel } from "@mantine/carousel";
import { BackgroundImage, Box, Paper, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";

interface PrayerTime {
  gregorian_date: string;
  day_name: string;
  day_name_arab: string;
  hijri_date: string;
  hijri_month: string;
  timings: {
    Subuh: string;
    Terbit: string;
    Dzuhur: string;
    Ashar: string;
    Maghrib: string;
    Isya: string;
  };
}

export default function Home() {
  const [data, setData] = useState<PrayerTime | null>(null);
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useShallowEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      await fetch("/api/solat")
        .then((res) => res.json())
        .then((data) => {
          console.log("data >>", data);
          setData(data);
        })
        .catch((err) => console.error("Error fetching prayer times:", err));
    } catch (error) {
      console.log("error", error);
    }
  }

  const listSholatTimes = [
    {
      label: data && data?.timings.Subuh ? "Subuh" : "-",
      value: data && data?.timings.Subuh ? data?.timings.Subuh : "-",
    },
    {
      label: data && data?.timings.Terbit ? "Terbit" : "-",
      value: data && data?.timings.Terbit ? data?.timings.Terbit : "-",
    },
    {
      label: data && data?.timings.Dzuhur ? "Dzuhur" : "-",
      value: data && data?.timings.Dzuhur ? data?.timings.Dzuhur : "-",
    },
    {
      label: data && data?.timings.Ashar ? "Ashar" : "-",
      value: data && data?.timings.Ashar ? data?.timings.Ashar : "-",
    },
    {
      label: data && data?.timings.Maghrib ? "Maghrib" : "-",
      value: data && data?.timings.Maghrib ? data?.timings.Maghrib : "-",
    },
    {
      label: data && data?.timings.Isya ? "Isya" : "-",
      value: data && data?.timings.Isya ? data?.timings.Isya : "-",
    },
  ];

  return (
    <>
      <Stack>
        <Paper radius={"xl"}>
          <BackgroundImage
            style={{
              borderRadius: "5px",
            }}
            src="/assets/bg-home.jpg"
            onLoad={() => {
              <Box h={200}></Box>;
            }}
          >
            <Box h={200} py="lg">
              <Stack
                align="center"
                style={{
                  color: COLOR.white,
                }}
              >
                <Title order={1}>
                  {data && data?.hijri_month ? data?.hijri_month : "-"}
                </Title>

                {/* LAMA */}
                <Carousel
                  slideSize="90%"
                  w="100%"
                  height={70}
                  slideGap={"sm"}
                  emblaOptions={{
                    loop: true,
                    dragFree: false,
                    align: "center",
                  }}
                  withControls={false}
                  withIndicators={false}
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={() => autoplay.current.play()}
                  styles={
                    {
                      // viewport: {
                      //   overflow: "visible", // agar efek shadow terlihat
                      // },
                      // slide: {
                      // transform: "scale(0.95)",
                      // transition: "transform 0.3s ease",
                      // "&:hover": {
                      //   transform: "scale(1)",
                      //   zIndex: 1,
                      // },
                      // },
                    }
                  }
                  // emblaOptions={{
                  //   loop: true,
                  //   dragFree: false,
                  //   align: "center",
                  //   duration: 25,
                  //   skipSnaps: true,
                  //   slidesToScroll: 1,
                  // }}
                >
                  {listSholatTimes.map((item, index) => (
                    <Carousel.Slide key={index}>
                      <Box
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: 12,
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Text fw={700} c="white" fz="lg">
                          {item.label}
                        </Text>
                        <Text c="white" fz="sm">
                          {item.value}
                        </Text>
                      </Box>
                    </Carousel.Slide>
                  ))}
                </Carousel>

                {data ? (
                  <Text fw={"bold"} fz={"xs"}>
                    {data?.day_name}, {data?.gregorian_date} |{" "}
                    {data?.day_name_arab}, {data?.hijri_date}
                  </Text>
                ) : (
                  "-"
                )}
              </Stack>
            </Box>
          </BackgroundImage>
        </Paper>

        {!data ? (
          <p>Loading...</p>
        ) : (
          Array.from({ length: 30 }).map((_, index) => (
            <Paper withBorder p={"sm"} mb={"xs"} key={index}>
              Produk {index + 1}
            </Paper>
          ))
        )}
      </Stack>
    </>
  );
}
