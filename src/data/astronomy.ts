/**
 * 星图数据生成
 *
 * 说明：这里用的是「平均要素 + 开普勒方程」的简化星历算法，
 * 忽略行星轨道倾角与主要摄动项，行星黄经误差通常在 1°~2° 以内，
 * 足以呈现「那天行星大致落在哪个星座」，但不适用于占星或天文定位。
 */

export interface Planet {
  name: string;
  /** 所在黄道星座 */
  zodiac: string;
  /** 星座内的度数，0~29 */
  degree: number;
  /** 是否逆行 */
  retrograde: boolean;
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
  moonPhaseIndex: number;
  moonIllumination: number;
  season: Season;
  seasonLabel: string;
  planets: Planet[];
  visibleConstellations: Constellation[];
}

const DAY_MS = 86_400_000;
const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);
const SYNODIC_MONTH = 29.530588853;
/** 2000-01-06 18:14 UTC 的一次新月 */
const KNOWN_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14, 0);

const DEG = Math.PI / 180;

/** 按黄经顺序排列的十二宫，索引 0 为白羊座 0° */
const ECLIPTIC_SIGNS = [
  "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座",
  "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座",
];

const MOON_PHASES = ["新月", "蛾眉月", "上弦月", "盈凸月", "满月", "亏凸月", "下弦月", "残月"];

/** 出生日期对应的太阳星座（按通行的交界日期表，与大众认知一致） */
const ZODIAC_RANGES = [
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
  { name: "射手座", start: { month: 11, day: 23 }, end: { month: 12, day: 21 } },
];

/**
 * 行星平均轨道要素（J2000 历元）
 * a: 半长轴(AU)  e: 离心率  L0: 平黄经  peri: 近日点黄经  n: 每日平黄经变化
 */
const PLANET_ELEMENTS = [
  { name: "水星", a: 0.387098, e: 0.20563, L0: 252.250906, peri: 77.456, n: 4.09233445 },
  { name: "金星", a: 0.723332, e: 0.006773, L0: 181.979801, peri: 131.602, n: 1.60213034 },
  { name: "火星", a: 1.523679, e: 0.093405, L0: 355.433275, peri: 336.06, n: 0.52402068 },
  { name: "木星", a: 5.202561, e: 0.048498, L0: 34.351519, peri: 14.331, n: 0.08308529 },
  { name: "土星", a: 9.554747, e: 0.055508, L0: 50.077444, peri: 93.057, n: 0.03344414 },
  { name: "天王星", a: 19.21814, e: 0.046295, L0: 314.055005, peri: 173.005, n: 0.01172834 },
  { name: "海王星", a: 30.10957, e: 0.008988, L0: 304.348665, peri: 48.124, n: 0.00598103 },
];

/** 四季夜空中较易辨认的星座，按北半球傍晚观测整理 */
const SEASONAL_CONSTELLATIONS: Record<Season, { name: string; visibility: string }[]> = {
  spring: [
    { name: "大熊座", visibility: "清晰可见" },
    { name: "狮子座", visibility: "非常明亮" },
    { name: "室女座", visibility: "良好" },
    { name: "牧夫座", visibility: "非常明亮" },
    { name: "猎犬座", visibility: "较暗" },
    { name: "巨蟹座", visibility: "较暗" },
    { name: "长蛇座", visibility: "较暗" },
  ],
  summer: [
    { name: "天蝎座", visibility: "非常明亮" },
    { name: "人马座", visibility: "良好" },
    { name: "天琴座", visibility: "非常明亮" },
    { name: "天鹰座", visibility: "非常明亮" },
    { name: "天鹅座", visibility: "清晰可见" },
    { name: "武仙座", visibility: "良好" },
    { name: "天龙座", visibility: "较暗" },
  ],
  autumn: [
    { name: "飞马座", visibility: "清晰可见" },
    { name: "仙女座", visibility: "良好" },
    { name: "英仙座", visibility: "良好" },
    { name: "双鱼座", visibility: "较暗" },
    { name: "宝瓶座", visibility: "较暗" },
    { name: "白羊座", visibility: "较暗" },
    { name: "南鱼座", visibility: "良好" },
  ],
  winter: [
    { name: "猎户座", visibility: "非常明亮" },
    { name: "金牛座", visibility: "非常明亮" },
    { name: "双子座", visibility: "清晰可见" },
    { name: "御夫座", visibility: "清晰可见" },
    { name: "大犬座", visibility: "非常明亮" },
    { name: "小犬座", visibility: "良好" },
    { name: "波江座", visibility: "较暗" },
  ],
};

/** 把角度归一化到 [0, 360) */
function normalizeDeg(value: number): number {
  return ((value % 360) + 360) % 360;
}

/** 从 J2000 起算的天数 */
function daysSinceJ2000(date: Date): number {
  return (date.getTime() - J2000_MS) / DAY_MS;
}

function getZodiacSign(month: number, day: number): string {
  for (const sign of ZODIAC_RANGES) {
    const { start, end } = sign;
    if (start.month === end.month) {
      if (month === start.month && day >= start.day && day <= end.day) return sign.name;
    } else if (
      (month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day)
    ) {
      return sign.name;
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

/** 太阳的地心视黄经（含中心差修正） */
function sunLongitude(days: number): number {
  const meanAnomaly = 357.529 + 0.98560028 * days;
  const meanLongitude = 280.459 + 0.98564736 * days;
  return normalizeDeg(
    meanLongitude +
      1.915 * Math.sin(meanAnomaly * DEG) +
      0.02 * Math.sin(2 * meanAnomaly * DEG),
  );
}

/** 解椭圆轨道（开普勒方程），返回真近点角与日心距 */
function solveKepler(meanLongitude: number, perihelion: number, e: number, a: number) {
  const meanAnomaly = normalizeDeg(meanLongitude - perihelion) * DEG;
  let eccentricAnomaly = meanAnomaly;
  for (let i = 0; i < 6; i += 1) {
    eccentricAnomaly -=
      (eccentricAnomaly - e * Math.sin(eccentricAnomaly) - meanAnomaly) /
      (1 - e * Math.cos(eccentricAnomaly));
  }
  const trueAnomaly = Math.atan2(
    Math.sqrt(1 - e * e) * Math.sin(eccentricAnomaly),
    Math.cos(eccentricAnomaly) - e,
  );
  const radius = a * (1 - e * Math.cos(eccentricAnomaly));
  return { trueAnomaly, radius };
}

/** 某行星在某时刻的地心黄经 */
function geocentricLongitude(
  elements: (typeof PLANET_ELEMENTS)[number],
  days: number,
  sunLon: number,
): number {
  const meanLongitude = elements.L0 + elements.n * days;
  const { trueAnomaly, radius } = solveKepler(meanLongitude, elements.peri, elements.e, elements.a);
  const heliocentricLon = trueAnomaly + elements.peri * DEG;

  // 地球的日心黄经 = 太阳地心黄经 + 180°
  const earthLon = (sunLon + 180) * DEG;
  const earthRadius = 1.00014 - 0.01671 * Math.cos((357.529 + 0.98560028 * days) * DEG);

  const x = radius * Math.cos(heliocentricLon) - earthRadius * Math.cos(earthLon);
  const y = radius * Math.sin(heliocentricLon) - earthRadius * Math.sin(earthLon);

  return normalizeDeg(Math.atan2(y, x) / DEG);
}

function longitudeToPosition(longitude: number): { zodiac: string; degree: number } {
  const index = Math.floor(longitude / 30) % 12;
  return {
    zodiac: ECLIPTIC_SIGNS[index],
    degree: Math.round((longitude % 30) * 10) / 10,
  };
}

function generatePlanets(date: Date): Planet[] {
  const days = daysSinceJ2000(date);
  const sunLon = sunLongitude(days);

  return PLANET_ELEMENTS.map((elements) => {
    const longitude = geocentricLongitude(elements, days, sunLon);
    const next = geocentricLongitude(elements, days + 1, sunLongitude(days + 1));
    // 次日黄经变小即视为逆行（跨 0° 时用差值绝对值判断）
    const delta = ((next - longitude + 540) % 360) - 180;

    return {
      name: elements.name,
      ...longitudeToPosition(longitude),
      retrograde: delta < 0,
    };
  });
}

/**
 * 月相：以一次已知新月为起点，按朔望月推进。
 * 取模后必须再归一化，否则 2000 年之前的日期会得到负索引。
 */
function getMoonPhase(date: Date): {
  name: string;
  index: number;
  illumination: number;
} {
  const elapsed = (date.getTime() - KNOWN_NEW_MOON_MS) / DAY_MS;
  const phase = ((elapsed / SYNODIC_MONTH) % 1 + 1) % 1;
  const index = Math.round(phase * 8) % 8;
  const illumination = Math.round(((1 - Math.cos(phase * 2 * Math.PI)) / 2) * 100);

  return { name: MOON_PHASES[index], index, illumination };
}

/** 同一日期永远返回同一组星座，避免刷新后结果跳变 */
function generateVisibleConstellations(date: Date, season: Season): Constellation[] {
  const pool = SEASONAL_CONSTELLATIONS[season];
  const seed =
    date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
  const start = seed % pool.length;
  const count = Math.min(5, pool.length);

  return Array.from({ length: count }, (_, i) => pool[(start + i) % pool.length]);
}

export function generateStarChart(date: Date): StarChart {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const { season, seasonLabel } = getSeason(month);
  const moon = getMoonPhase(date);

  return {
    date: `${year}年${month}月${day}日`,
    zodiacSign: getZodiacSign(month, day),
    moonPhase: moon.name,
    moonPhaseIndex: moon.index,
    moonIllumination: moon.illumination,
    season,
    seasonLabel,
    planets: generatePlanets(date),
    visibleConstellations: generateVisibleConstellations(date, season),
  };
}
