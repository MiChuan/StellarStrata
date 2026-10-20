import img1 from "../assets/artifacts/1.jpg";
import img2 from "../assets/artifacts/2.jpg";
import img3 from "../assets/artifacts/3.jpg";
import img4 from "../assets/artifacts/4.jpg";
import img5 from "../assets/artifacts/5.jpg";
import img6 from "../assets/artifacts/6.jpg";
import img7 from "../assets/artifacts/7.jpg";
import img8 from "../assets/artifacts/8.jpg";
import img9 from "../assets/artifacts/9.jpg";
import img10 from "../assets/artifacts/10.jpg";
import img11 from "../assets/artifacts/11.jpg";
import img12 from "../assets/artifacts/12.jpg";

export interface Artifact {
  id: string;
  name: string;
  era: string;
  discoveryDate: string;
  month: number;
  day: number;
  location: string;
  description: string;
  imageUrl: string;
}

export interface ArtifactMatch {
  artifact: Artifact;
  /** 是否与出生日期在同一天出土 */
  exact: boolean;
}

/**
 * 文物图片全部随构建打包，不再引用任何外部接口：
 * 之前的远程文生图地址在线上只会返回「正在生成」占位图。
 */
const artifacts: Artifact[] = [
  {
    id: "1",
    name: "司母戊鼎",
    era: "商代晚期",
    discoveryDate: "1939年3月19日",
    month: 3,
    day: 19,
    location: "河南省安阳市武官村",
    description:
      "中国商代晚期王室祭祀用的青铜方鼎，是目前已知中国古代最重的青铜器，重达832.84公斤，器身饰饕餮纹与云雷纹。",
    imageUrl: img1,
  },
  {
    id: "2",
    name: "兵马俑",
    era: "秦朝",
    discoveryDate: "1974年3月29日",
    month: 3,
    day: 29,
    location: "陕西省西安市临潼区",
    description:
      "秦始皇陵的陪葬坑，出土了数千个真人大小的陶制士兵和战马，每一尊面容都不相同，被誉为世界第八大奇迹。",
    imageUrl: img2,
  },
  {
    id: "3",
    name: "三星堆青铜面具",
    era: "古蜀文明",
    discoveryDate: "1986年7月23日",
    month: 7,
    day: 23,
    location: "四川省广汉市",
    description:
      "三星堆遗址出土的青铜面具，柱状凸目、阔耳大嘴，造型迥异于中原青铜器，是古蜀神权社会的直接见证。",
    imageUrl: img3,
  },
  {
    id: "4",
    name: "马王堆汉墓帛画",
    era: "西汉",
    discoveryDate: "1972年1月16日",
    month: 1,
    day: 16,
    location: "湖南省长沙市",
    description:
      "长沙马王堆汉墓出土的T形彩绘帛画，上绘天庭、中绘人间、下绘幽冥，是中国古代绘画艺术的巅峰之作。",
    imageUrl: img4,
  },
  {
    id: "5",
    name: "越王勾践剑",
    era: "春秋时期",
    discoveryDate: "1965年12月",
    month: 12,
    day: 1,
    location: "湖北省荆州市望山楚墓群",
    description:
      "春秋时期越国君主勾践的佩剑，剑身满饰菱形暗格纹，出土时寒光四射、毫无锈蚀，被誉为「天下第一剑」。",
    imageUrl: img5,
  },
  {
    id: "6",
    name: "敦煌壁画",
    era: "北魏至元代",
    discoveryDate: "1900年6月22日",
    month: 6,
    day: 22,
    location: "甘肃省敦煌市莫高窟",
    description:
      "莫高窟壁画历经十余个朝代持续开凿绘制，飞天、经变、供养人像层层叠压，是世界上现存规模最大的佛教艺术宝库。",
    imageUrl: img6,
  },
  {
    id: "7",
    name: "曾侯乙编钟",
    era: "战国时期",
    discoveryDate: "1978年5月",
    month: 5,
    day: 1,
    location: "湖北省随州市擂鼓墩",
    description:
      "战国时期曾国国君乙的陪葬乐器，65件青铜钟分三层八组悬挂，音域跨五个半八度，至今仍可演奏。",
    imageUrl: img7,
  },
  {
    id: "8",
    name: "甲骨文",
    era: "商代",
    discoveryDate: "1899年",
    month: 1,
    day: 1,
    location: "河南省安阳市殷墟",
    description:
      "刻在龟甲与兽骨上的商代占卜记事文字，是目前已知年代最早、体系较为完整的汉字源头。",
    imageUrl: img8,
  },
  {
    id: "9",
    name: "四羊方尊",
    era: "商代",
    discoveryDate: "1938年",
    month: 1,
    day: 1,
    location: "湖南省宁乡市",
    description:
      "商代晚期青铜礼器，器身四角各铸一只卷角羊首，羊身与器身浑然一体，被誉为「臻于极致的青铜典范」。",
    imageUrl: img9,
  },
  {
    id: "10",
    name: "金缕玉衣",
    era: "西汉",
    discoveryDate: "1968年7月",
    month: 7,
    day: 1,
    location: "河北省满城县",
    description:
      "西汉中山靖王刘胜的殓服，由两千余片玉片以金丝编缀而成，是汉代「玉殓不朽」观念的重要实物。",
    imageUrl: img10,
  },
  {
    id: "11",
    name: "龙门石窟",
    era: "北魏至唐代",
    discoveryDate: "持续营造中",
    month: 1,
    day: 1,
    location: "河南省洛阳市",
    description:
      "中国四大石窟之一，现存窟龛两千余个、造像十万余尊，卢舍那大佛通高17.14米，是唐代石刻艺术的代表。",
    imageUrl: img11,
  },
  {
    id: "12",
    name: "元青花瓷",
    era: "元代",
    discoveryDate: "20世纪",
    month: 1,
    day: 1,
    location: "江西省景德镇市",
    description:
      "元代景德镇窑以进口钴料在瓷胎上绘画，罩透明釉一次高温烧成，蓝白分明、纹饰繁密，开启了中国瓷器的青花时代。",
    imageUrl: img12,
  },
];

/** 用固定年份把「月/日」折算成序数，便于比较两个日期在一年中的距离 */
function dayOfYear(month: number, day: number): number {
  return Math.floor((Date.UTC(2024, month - 1, day) - Date.UTC(2024, 0, 1)) / 86_400_000) + 1;
}

/** 两个日期在一年中的环形距离（跨年时取更短的一侧） */
function circularDistance(a: number, b: number): number {
  const diff = Math.abs(a - b);
  return Math.min(diff, 366 - diff);
}

export function getArtifactsByDate(month: number, day: number): Artifact[] {
  return artifacts.filter((artifact) => artifact.month === month && artifact.day === day);
}

/** 与出生日期最接近的出土文物，顺序稳定、不随机 */
export function getNearestArtifacts(month: number, day: number, count = 2): Artifact[] {
  const target = dayOfYear(month, day);
  return [...artifacts]
    .map((artifact) => ({
      artifact,
      distance: circularDistance(target, dayOfYear(artifact.month, artifact.day)),
    }))
    .sort((a, b) => a.distance - b.distance || a.artifact.id.localeCompare(b.artifact.id))
    .slice(0, count)
    .map((entry) => entry.artifact);
}

/**
 * 优先取「同一天出土」的文物；没有则取日期最接近的。
 * 结果对同一天完全确定，刷新不会变。
 */
export function getArtifactsForDate(date: Date, count = 2): ArtifactMatch[] {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const exact = getArtifactsByDate(month, day).slice(0, count);

  if (exact.length > 0) {
    return exact.map((artifact) => ({ artifact, exact: true }));
  }

  return getNearestArtifacts(month, day, count).map((artifact) => ({
    artifact,
    exact: false,
  }));
}
