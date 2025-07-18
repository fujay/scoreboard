// import { readKeyConfig } from "@/lib/config";
// import { getWeatherData } from "@/lib/weather";
// import { NextResponse } from "next/server";

// const { location } = await readKeyConfig("weather");

// export async function GET() {
//   try {
//     const weatherData = await getWeatherData(location);
//     return NextResponse.json(weatherData);
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch weather data" },
//       { status: 500 },
//     );
//   }
// }
