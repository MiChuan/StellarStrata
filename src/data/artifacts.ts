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

const artifacts: Artifact[] = [
  {
    id: "1",
    name: "司母戊鼎",
    era: "商代晚期",
    discoveryDate: "1939年3月19日",
    month: 3,
    day: 19,
    location: "河南省安阳市武官村",
    description: "中国商代晚期王室祭祀用的青铜方鼎，是目前已知中国古代最重的青铜器，重达832.84公斤。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20Chinese%20bronze%20ding%20vessel%20Shang%20dynasty%20museum%20quality%20photography&image_size=square"
  },
  {
    id: "2",
    name: "兵马俑",
    era: "秦朝",
    discoveryDate: "1974年3月29日",
    month: 3,
    day: 29,
    location: "陕西省西安市临潼区",
    description: "秦始皇陵的陪葬坑，出土了数千个真人大小的陶制士兵和战马，被誉为世界第八大奇迹。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=terracotta%20warriors%20Qin%20dynasty%20ancient%20Chinese%20museum%20photography&image_size=square"
  },
  {
    id: "3",
    name: "三星堆青铜面具",
    era: "古蜀文明",
    discoveryDate: "1986年7月23日",
    month: 7,
    day: 23,
    location: "四川省广汉市",
    description: "三星堆遗址出土的青铜面具，造型奇特，具有极高的艺术价值和历史研究价值。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sanxingdui%20bronze%20mask%20ancient%20Chinese%20mysterious%20archaeology%20museum&image_size=square"
  },
  {
    id: "4",
    name: "马王堆汉墓帛画",
    era: "西汉",
    discoveryDate: "1972年1月16日",
    month: 1,
    day: 16,
    location: "湖南省长沙市",
    description: "长沙马王堆汉墓出土的彩绘帛画，描绘了天上、人间、地下的景象，是中国古代绘画艺术的珍品。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20Chinese%20silk%20painting%20Han%20dynasty%20colorful%20museum%20exhibit&image_size=square"
  },
  {
    id: "5",
    name: "越王勾践剑",
    era: "春秋时期",
    discoveryDate: "1965年12月",
    month: 12,
    day: 1,
    location: "湖北省荆州市望山楚墓群",
    description: "春秋时期越国君主勾践的佩剑，历经两千多年依然锋利无比，被誉为天下第一剑。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20Chinese%20bronze%20sword%20Goujian%20Spring%20Autumn%20period%20museum&image_size=square"
  },
  {
    id: "6",
    name: "敦煌壁画",
    era: "北魏至元代",
    discoveryDate: "1900年6月22日",
    month: 6,
    day: 22,
    location: "甘肃省敦煌市莫高窟",
    description: "敦煌莫高窟的壁画艺术，涵盖了多个朝代的绘画风格，是世界上现存规模最大的佛教艺术宝库。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dunhuang%20mural%20painting%20Buddhist%20cave%20temple%20ancient%20Chinese%20art&image_size=square"
  },
  {
    id: "7",
    name: "曾侯乙编钟",
    era: "战国时期",
    discoveryDate: "1978年5月",
    month: 5,
    day: 1,
    location: "湖北省随州市擂鼓墩",
    description: "战国时期曾国国君乙的陪葬品，是中国迄今发现的最完整、最大的一套青铜编钟。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20Chinese%20bronze%20bells%20chime%20warring%20states%20museum%20exhibit&image_size=square"
  },
  {
    id: "8",
    name: "甲骨文",
    era: "商代",
    discoveryDate: "1899年",
    month: 1,
    day: 1,
    location: "河南省安阳市殷墟",
    description: "中国已发现的古代文字中年代最早、体系较为完整的文字，刻在龟甲兽骨上，主要用于占卜。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oracle%20bone%20script%20ancient%20Chinese%20characters%20Shang%20dynasty&image_size=square"
  },
  {
    id: "9",
    name: "四羊方尊",
    era: "商代",
    discoveryDate: "1938年",
    month: 1,
    day: 1,
    location: "湖南省宁乡市",
    description: "商代晚期的青铜礼器，造型独特，四角各有一只羊，是中国古代青铜器中的精品。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Four%20Goat%20Square%20Zun%20ancient%20Chinese%20bronze%20vessel%20Shang%20museum&image_size=square"
  },
  {
    id: "10",
    name: "金缕玉衣",
    era: "西汉",
    discoveryDate: "1968年7月",
    month: 7,
    day: 1,
    location: "河北省满城县",
    description: "西汉中山靖王刘胜的殓服，由2000多片玉片用金丝编缀而成，是中国古代丧葬制度的重要实物。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gold%20thread%20jade%20suit%20Han%20dynasty%20ancient%20Chinese%20funeral%20artifact&image_size=square"
  },
  {
    id: "11",
    name: "龙门石窟",
    era: "北魏至唐代",
    discoveryDate: "持续发掘中",
    month: 1,
    day: 1,
    location: "河南省洛阳市",
    description: "中国四大石窟之一，现存窟龛2345个，造像11万余尊，是中国古代石窟艺术的代表。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Longmen%20Grottoes%20Buddhist%20sculpture%20ancient%20Chinese%20stone%20carving&image_size=square"
  },
  {
    id: "12",
    name: "青花瓷",
    era: "元代",
    discoveryDate: "20世纪",
    month: 1,
    day: 1,
    location: "江西省景德镇市",
    description: "元代景德镇窑烧制的青花瓷，以其清新淡雅的色彩和精湛的绘画技艺著称于世。",
    imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20and%20white%20porcelain%20Yuan%20dynasty%20Chinese%20ceramic%20art&image_size=square"
  }
];

export function getArtifactsByDate(month: number, day: number): Artifact[] {
  return artifacts.filter(artifact => artifact.month === month && artifact.day === day);
}

export function getRandomArtifacts(count: number): Artifact[] {
  const shuffled = [...artifacts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
