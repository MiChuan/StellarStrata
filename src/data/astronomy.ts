export interface Planet {
  name: string;
  position: string;
  zodiac: string;
}

export interface Constellation {
  name: string;
  visibility: string;
}

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface StarChart {
  date: string;
  zodiacSign: string;
  moonPhase: string;
  season: Season;
  seasonLabel: string;
  planets: Planet[];
  visibleConstellations: Constellation[];
}

const zodiacSigns = [
  { name: "摩羯座", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  { name: "水瓶座", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  { name: "双鱼座", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
  { name: "白羊座", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  { name: "金牛座", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  { name: "双子座", start: { month: 5, day: 21 }, end: { month: 6, day: 21 } },
  { name: "巨蟹座", start: { month: 6, day: 22 }, end: { month: 7, day: 22 } },
  { name: "狮子座", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  { name: "处女座", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  { name: "天秤座", start: { month: 9, day: 23 }, end: { month: 10, day: 23 } },
  { name: "天蝎座", start: { month: 10, day: 24 }, end: { month: 11, day: 22 } },
  { name: "射手座", start: { month: 11, day: 23 }, end: { month: 12, day: 21 } }
];

const moonPhases = [
  "新月", "蛾眉月", "上弦月", "盈凸月", "满月", "亏凸月", "下弦月", "残月"
];

const planets = ["水星", "金星", "火星", "木星", "土星", "天王星", "海王星"];

const constellations = [
  { name: "猎户座", visibility: "非常明亮" },
  { name: "大熊座", visibility: "清晰可见" },
  { name: "小熊座", visibility: "清晰可见" },
  { name: "仙后座", visibility: "良好" },
  { name: "英仙座", visibility: "良好" },
  { name: "金牛座", visibility: "非常明亮" },
  { name: "双子座", visibility: "良好" },
  { name: "巨蟹座", visibility: "较暗" },
  { name: "狮子座", visibility: "良好" },
  { name: "室女座", visibility: "良好" },
  { name: "天秤座", visibility: "较暗" },
  { name: "天蝎座", visibility: "非常明亮" },
  { name: "射手座", visibility: "良好" },
  { name: "摩羯座", visibility: "较暗" },
  { name: "水瓶座", visibility: "较暗" },
  { name: "双鱼座", visibility: "较暗" }
];

function getZodiacSign(month: number, day: number): string {
  for (const sign of zodiacSigns) {
    if (sign.start.month === sign.end.month) {
      if (month === sign.start.month && day >= sign.start.day && day <= sign.end.day) {
        return sign.name;
      }
    } else {
      if ((month === sign.start.month && day >= sign.start.day) ||
          (month === sign.end.month && day <= sign.end.day)) {
        return sign.name;
      }
    }
  }
  return "摩羯座";
}

function getSeason(month: number): { season: Season; seasonLabel: string } {
  if (month >= 3 && month <= 5) return { season: "spring", seasonLabel: "春" };
  if (month >= 6 && month <= 8) return { season: "summer", seasonLabel: "夏" };
  if (month >= 9 && month <= 11) return { season: "autumn", seasonLabel: "秋" };
  return { season: "winter", seasonLabel: "冬" };
}

function getMoonPhase(date: Date): string {
  const baseDate = new Date("2000-01-06T18:14:00");
  const diffTime = date.getTime() - baseDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const cyclePosition = diffDays % 29.530588853;
  const phaseIndex = Math.floor((cyclePosition / 29.530588853) * 8);
  return moonPhases[phaseIndex];
}

function generatePlanets(date: Date): Planet[] {
  const seed = date.getFullYear() + date.getMonth() + date.getDate();
  return planets.map((name, index) => {
    const randomOffset = ((seed + index * 17) % 12);
    const zodiacIndex = (zodiacSigns.findIndex(s => s.name === getZodiacSign(date.getMonth() + 1, date.getDate())) + randomOffset) % 12;
    const positions = ["东方", "东南", "南方", "西南", "西方", "西北", "北方", "东北"];
    return {
      name,
      position: positions[(seed + index * 7) % 8],
      zodiac: zodiacSigns[zodiacIndex].name
    };
  });
}

function generateVisibleConstellations(date: Date): Constellation[] {
  const seed = date.getFullYear() + date.getMonth() + date.getDate();
  const shuffled = [...constellations].sort(() => (seed % 7) - Math.random() * 7);
  return shuffled.slice(0, 6);
}

export function generateStarChart(date: Date): StarChart {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  const { season, seasonLabel } = getSeason(month);

  return {
    date: `${year}年${month}月${day}日`,
    zodiacSign: getZodiacSign(month, day),
    moonPhase: getMoonPhase(date),
    season,
    seasonLabel,
    planets: generatePlanets(date),
    visibleConstellations: generateVisibleConstellations(date)
  };
}
