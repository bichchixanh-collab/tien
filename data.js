// ════════════════════════════════════════════════════════════════════
//  DATA.JS — Tiên Hiệp Truyền Kỳ · Game Data Layer
//  Chỉnh sửa file này để thêm quái, NPC, nhiệm vụ, vật phẩm...
//  Không chứa logic game — chỉ chứa dữ liệu thuần.
// ════════════════════════════════════════════════════════════════════

// ─── MAP CONSTANTS ───────────────────────────────────────────────────
const WORLD_W   = 1024;
const WORLD_H   = 1024;
const TILE_SIZE = 32;

// ════════════════════════════════════════════════════════════════════
//  NPC_DATA — Danh sách NPC trên map
//  id:     ID duy nhất (bắt đầu từ 10)
//  x, y:   Tọa độ world
//  name:   Tên hiển thị
//  color:  Màu highlight
//  size:   Bán kính sprite (pixel)
//  quests: Danh sách id nhiệm vụ NPC này giao/nhận
// ════════════════════════════════════════════════════════════════════
const NPC_DATA = [
  {
    id: 10, x: WORLD_W/2 - 160, y: WORLD_H/2,
    name: 'Trưởng Lão Thanh Vân', color: '#FFD040', size: 10, speed: 0,
    quests: [1, 3, 4, 7, 8, 9],
    dialogue: [
      'Đạo Hữu, ta đợi ngươi mãi. Ma Tộc liên tiếp xâm phạm biên giới...',
      'Ta đã già yếu, không thể thân chinh xuất trận. Mong Đạo Hữu thay ta trừ diệt.',
      'Hoàn thành đại nghĩa, ta sẽ tặng Đạo Hữu Thanh Vân Quyết!',
    ],
  },
  {
    id: 11, x: WORLD_W/2 + 160, y: WORLD_H/2,
    name: 'Thương Nhân Lữ Bố', color: '#40D0FF', size: 10, speed: 0,
    quests: [2, 5, 6, 10],
    dialogue: [
      'Chào tiên hữu! Ta có nhiều linh vật quý hiếm muốn nhờ thu thập...',
      'Đổi lại, ta sẽ trả thù lao hậu hĩ bằng Linh Thạch thượng hạng!',
    ],
  },
  {
    id: 12, x: 230, y: 740,
    name: 'Thám Tử Vô Danh', color: '#C080FF', size: 10, speed: 0,
    quests: [4],
    dialogue: [
      'Phế tích kia ẩn chứa bí mật từ thời Thượng Cổ...',
      'Ngươi dám vào điều tra không? Coi chừng Phế Tích Thú hung hãn lắm.',
    ],
  },
];

// Map nhanh id → NPC (dùng trong game logic)
const NPC_COORDS = Object.fromEntries(
  NPC_DATA.map(n => [n.id, { x: n.x, y: n.y, name: n.name }])
);

// ════════════════════════════════════════════════════════════════════
//  MOB_GROUPS — Nhóm quái theo khu vực
//  Mỗi group sinh ra nhiều con tại vị trí scatter quanh (cx, cy)
//
//  mobType:  Loại quái (ảnh hưởng sprite vẽ)
//    'wolf'        — Sói Xám
//    'water_demon' — Thủy Yêu
//    'white_tiger' — Bạch Hổ Tinh
//    'ruin_beast'  — Phế Tích Thú
//    'dark_soldier'— Hắc Lâm Ác Binh
//    'fire_spirit' — Hỏa Linh
//    'demon'       — Tà Binh (default mob)
// ════════════════════════════════════════════════════════════════════
const MOB_GROUPS = [
  // ── Lv1-5: Sói Xám — Tây Bắc Sơn Lâm ─────────────────────────
  { mobType:'wolf',        cx:250, cy:280, count:8, scatter:60,
    hp:3000,  name:'Sói Xám',        color:'#A0A0A0', size:8,  speed:1.0, lv:3  },

  // ── Lv8: Thủy Yêu — Tây Hà ────────────────────────────────────
  { mobType:'water_demon', cx:190, cy:512, count:8, scatter:50,
    hp:5500,  name:'Thủy Yêu',       color:'#40C8FF', size:9,  speed:0.9, lv:8  },

  // ── Lv11-15: Tà Binh — Trung Tâm Chiến Trường ─────────────────
  { mobType:'demon',       cx:WORLD_W/2+30, cy:WORLD_H/2-60, count:6, scatter:90,
    hp:5000,  name:'Tà Binh',        color:'#FF6060', size:9,  speed:0.8, lv:11 },

  // ── Lv5: Phế Tích Thú — Phế Tích Tây Nam ──────────────────────
  { mobType:'ruin_beast',  cx:290, cy:740, count:5, scatter:55,
    hp:4000,  name:'Phế Tích Thú',   color:'#B08060', size:9,  speed:0.7, lv:5  },

  // ── Lv14: Bạch Hổ Tinh — Đông Bắc Lĩnh ───────────────────────
  { mobType:'white_tiger', cx:780, cy:240, count:8, scatter:70,
    hp:8000,  name:'Bạch Hổ Tinh',   color:'#E0E0FF', size:10, speed:1.2, lv:14 },

  // ── Lv21: Hỏa Linh — Bắc Cực Hỏa Sơn ─────────────────────────
  { mobType:'fire_spirit', cx:512, cy:190, count:6, scatter:55,
    hp:12000, name:'Hỏa Linh',       color:'#FF8020', size:9,  speed:0.8, lv:21 },

  // ── Lv25: Hắc Lâm Ác Binh — Đông Nam Hắc Lâm ─────────────────
  { mobType:'dark_soldier',cx:790, cy:790, count:7, scatter:65,
    hp:15000, name:'Hắc Lâm Ác Binh',color:'#8040C0', size:10, speed:1.0, lv:25 },

  // ── Lv18: Cổ Tự Hộ Pháp — Nam Bộ Cổ Tự ──────────────────────
  { mobType:'ruin_beast',  cx:512, cy:820, count:5, scatter:60,
    hp:10000, name:'Cổ Tự Hộ Pháp', color:'#C0A060', size:10, speed:0.6, lv:18 },
];

// Sinh INITIAL_ENTITIES từ MOB_GROUPS + boss + NPC_DATA
// (Dùng seed cố định để tọa độ không đổi mỗi lần load)
function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

(function buildEntities() {
  const rand = seededRand(42);
  const entities = [];

  // Boss
  entities.push({
    id:0, type:'boss', mobType:'boss',
    x: WORLD_W/2, y: WORLD_H/2 - 60,
    hp:234500, maxHp:234500,
    name:'Nguyên Soái Ma Tộc', color:'#FF2020', size:18, speed:0, aggro:false, lv:30,
  });

  // Mobs từ MOB_GROUPS
  let nextId = 20;
  for (const g of MOB_GROUPS) {
    for (let i = 0; i < g.count; i++) {
      const angle = rand() * Math.PI * 2;
      const r     = rand() * g.scatter;
      entities.push({
        id: nextId++, type:'mob', mobType: g.mobType,
        x: g.cx + Math.cos(angle) * r,
        y: g.cy + Math.sin(angle) * r,
        homeX: g.cx, homeY: g.cy,
        hp: g.hp, maxHp: g.hp,
        name: g.name, color: g.color,
        size: g.size, speed: g.speed, lv: g.lv,
      });
    }
  }

  // NPCs
  for (const n of NPC_DATA) {
    entities.push({ ...n, type:'npc', mobType:'npc', maxHp:1 });
  }

  window.INITIAL_ENTITIES = entities;
})();

// ════════════════════════════════════════════════════════════════════
//  QUEST_FARM_ZONES — Tọa độ khu vực làm nhiệm vụ
//  Phải trỏ đúng vào vị trí cx,cy của MOB_GROUPS tương ứng
// ════════════════════════════════════════════════════════════════════
const QUEST_FARM_ZONES = {
  1:  { x:250,          y:280,          desc:'Tây Bắc Sơn Lâm (Sói Xám)'       },
  2:  { x:700,          y:700,          desc:'Đông Nam Thảo Nguyên (Linh Thảo)' },
  3:  { x:WORLD_W/2+30, y:WORLD_H/2-60, desc:'Trung Tâm Chiến Trường (Tà Binh)' },
  4:  { x:290,          y:740,          desc:'Phế Tích Cổ Đại (Tây Nam)'        },
  5:  { x:780,          y:240,          desc:'Đông Bắc Bạch Hổ Lĩnh'            },
  6:  { x:512,          y:190,          desc:'Bắc Cực Hỏa Sơn (Linh Thạch)'     },
  7:  { x:WORLD_W/2,    y:WORLD_H/2-60, desc:'Trung Tâm — Boss Nguyên Soái'     },
  8:  { x:790,          y:790,          desc:'Hắc Lâm Trận Địa (Đông Nam)'      },
  9:  { x:190,          y:512,          desc:'Tây Hà — Thủy Yêu Sào Huyệt'      },
  10: { x:512,          y:820,          desc:'Nam Bộ Cổ Tự (Linh Phù)'          },
};

// ════════════════════════════════════════════════════════════════════
//  QUESTS — Danh sách nhiệm vụ
//  reqLevel: Cấp độ tối thiểu để nhận
//  npcId:    NPC giao/nhận nhiệm vụ (phải có trong NPC_DATA)
// ════════════════════════════════════════════════════════════════════
const QUESTS = [
  // ── Luyện Khí (Lv 1–10) ─────────────────────────────────────────
  { id:1,  name:'Tiêu diệt Sói Xám',      reqLevel:1,  npcId:10,
    desc:'Tiêu diệt 10 con Sói Xám tại Tây Bắc Sơn Lâm',
    progress:7, total:10, done:false,
    reward:{ gold:15000, exp:30000, items:'Đại Hoàn Đan x3' } },

  { id:2,  name:'Thu thập Linh Thảo',      reqLevel:1,  npcId:11,
    desc:'Hái 5 cây Linh Thảo ở Đông Nam Thảo Nguyên',
    progress:5, total:5,  done:true,
    reward:{ gold:8000,  exp:15000, items:'Hồi Linh Đan x5' } },

  { id:4,  name:'Điều tra Phế Tích',       reqLevel:5,  npcId:12,
    desc:'Khám phá Phế Tích Cổ Đại ở Tây Nam, tiêu diệt Phế Tích Thú',
    progress:0, total:5,  done:false,
    reward:{ gold:12000, exp:20000, items:'Ngọc Bội Nhỏ x1' } },

  { id:9,  name:'Diệt Thủy Yêu',           reqLevel:8,  npcId:10,
    desc:'Tiêu diệt 8 Thủy Yêu quấy phá Tây Hà',
    progress:3, total:8,  done:false,
    reward:{ gold:18000, exp:32000, items:'Hàn Thiết Khoáng x5' } },

  // ── Trúc Cơ (Lv 11–20) ──────────────────────────────────────────
  { id:3,  name:'Đột phá Tà Binh trận',    reqLevel:11, npcId:10,
    desc:'Tiêu diệt 10 Tà Binh ở trung tâm chiến trường',
    progress:0, total:10, done:false,
    reward:{ gold:25000, exp:50000, items:'Tử Tinh Thạch x2' } },

  { id:5,  name:'Săn Bạch Hổ Tinh',        reqLevel:14, npcId:11,
    desc:'Tiêu diệt 8 Bạch Hổ Tinh hung hãn ở Đông Bắc Lĩnh',
    progress:2, total:8,  done:false,
    reward:{ gold:30000, exp:60000, items:'Hổ Cốt Tinh x3' } },

  { id:10, name:'Thu Linh Phù Cổ Tự',      reqLevel:18, npcId:11,
    desc:'Thu thập 5 Linh Phù tại Nam Bộ Cổ Tự, tiêu diệt Hộ Pháp',
    progress:0, total:5,  done:false,
    reward:{ gold:22000, exp:45000, items:'Phù Lục Thượng Cấp x2' } },

  // ── Kim Đan (Lv 21+) ────────────────────────────────────────────
  { id:6,  name:'Hỏa Tinh Thạch',          reqLevel:21, npcId:11,
    desc:'Khai thác 6 Hỏa Tinh Thạch, tiêu diệt Hỏa Linh bảo vệ',
    progress:0, total:6,  done:false,
    reward:{ gold:50000, exp:80000,  items:'Hỏa Tinh Thạch x6' } },

  { id:8,  name:'Phá Trận Hắc Lâm',        reqLevel:25, npcId:10,
    desc:'Tiêu diệt Hắc Lâm Ác Binh, phá 3 Ma Trận ở Đông Nam',
    progress:1, total:7,  done:false,
    reward:{ gold:45000, exp:75000,  items:'Tà Ma Hồn Ngọc x4' } },

  { id:7,  name:'Thảo phạt Nguyên Soái',   reqLevel:30, npcId:10,
    desc:'Tiêu diệt Nguyên Soái Ma Tộc tại Trung Tâm Thanh Vân Sơn',
    progress:0, total:1,  done:false,
    reward:{ gold:100000,exp:200000, items:'Thanh Vân Quyết (Bí Kíp)' } },
];

// ════════════════════════════════════════════════════════════════════
//  INVENTORY_ITEMS
// ════════════════════════════════════════════════════════════════════
const INVENTORY_ITEMS = [
  { id:'e_sword_5', type:'sword',    rarity:5, name:'Thanh Hồng Kiếm',   count:1  },
  { id:'e_chest_4', type:'chest',    rarity:4, name:'Huyền Quy Giáp',    count:1  },
  { id:'e_ring_4',  type:'ring',     rarity:4, name:'Bích Ngọc Hoàn',    count:1  },
  { id:'p_great_heal',type:'pill',   rarity:3, name:'Đại Hoàn Đan',      count:12 },
  { id:'b_sword',   type:'book',     rarity:5, name:'Ngự Kiếm Quyết',    count:1  },
  { id:'m_purple_crystal',type:'material',rarity:4,name:'Tử Tinh Thạch', count:5  },
  { id:'m_dark_iron',type:'material',rarity:3, name:'Hắc Thiết',         count:30 },
  { id:'p_heal',    type:'pill',     rarity:2, name:'Hồi Linh Đan',      count:8  },
  { id:'e_sword_3', type:'sword',    rarity:3, name:'Huyền Tinh Kiếm',   count:1  },
  { id:'m_water_core',type:'material',rarity:3,name:'Thủy Nguyên Hạch',  count:3  },
  { id:'m_spirit_stone',type:'material',rarity:1,name:'Linh Thạch Mảnh', count:99 },
  { id:'p_small_heal',type:'pill',   rarity:1, name:'Tiểu Hồi Linh Đan', count:5  },
];

// ════════════════════════════════════════════════════════════════════
//  SKILLS
// ════════════════════════════════════════════════════════════════════
const SKILLS = [
  { type:'sword',   name:'Ngự Kiếm Trảm',   key:'Q', baseCd:3  },
  { type:'fire',    name:'Liệt Diễm Quyết', key:'W', baseCd:8  },
  { type:'thunder', name:'Lôi Đình Kích',   key:'E', baseCd:7  },
  { type:'ice',     name:'Hàn Băng Phong',  key:'R', baseCd:12 },
  { type:'wind',    name:'Tật Phong Bộ',    key:'A', baseCd:5  },
  { type:'light',   name:'Hộ Thể Quang',    key:'S', baseCd:10 },
  { type:'earth',   name:'Địa Liệt Kích',   key:'Z', baseCd:6  },
  { type:'dark',    name:'Ám Ảnh Thuật',    key:'X', baseCd:9  },
];

// ════════════════════════════════════════════════════════════════════
//  CHARACTER STATS
// ════════════════════════════════════════════════════════════════════
const CHAR_STATS = [
  { label:'Cảnh Giới',  value:'Kim Đan Kỳ · Tam Trọng' },
  { label:'Công Kích',  value:'18.450' },
  { label:'Phòng Ngự',  value:'9.820'  },
  { label:'Pháp Lực',   value:'24.100' },
  { label:'Tốc Độ',     value:'3.200'  },
  { label:'Bạo Kích',   value:'35%'    },
  { label:'Mệnh Trúng', value:'98%'    },
  { label:'Ngộ Tính',   value:'Tuyệt Phẩm' },
];

// ════════════════════════════════════════════════════════════════════
//  EQUIPMENT
// ════════════════════════════════════════════════════════════════════
const EQUIP_SLOT_DEFS = [
  { key:'weapon',  label:'Vũ Khí'   },
  { key:'offhand', label:'Phù Khí'  },
  { key:'belt',    label:'Đai Lưng' },
  { key:'boots',   label:'Giày'     },
  { key:'helm',    label:'Mũ Giáp'  },
  { key:'chest',   label:'Áo Giáp'  },
  { key:'legs',    label:'Quần Giáp'},
  { key:'ring',    label:'Nhẫn'     },
];

const DEFAULT_EQUIP = {
  weapon:  { type:'sword', rarity:5, name:'Thanh Hồng Kiếm', atk:1840, def:0,   hp:0,   mp:0,   desc:'Bảo kiếm đúc từ ngọc hồng tinh, chém vạn ma thiên hạ.' },
  offhand: null,
  belt:    null,
  boots:   null,
  helm:    null,
  chest:   { type:'armor', rarity:4, name:'Huyền Quy Giáp',  atk:0,    def:980, hp:500, mp:0,   desc:'Giáp bằng huyền kim tinh luyện.' },
  legs:    null,
  ring:    { type:'ring',  rarity:4, name:'Bích Ngọc Hoàn',  atk:200,  def:150, hp:200, mp:300, desc:'Ngọc bích tinh chế, hộ thể toàn diện.' },
};

const SELL_PRICE       = { 5:80000, 4:25000, 3:8000, 2:2000, 1:500 };
const EQUIP_TYPE_SLOT  = { sword:'weapon', armor:'chest', ring:'ring' };
const CONSUMABLE_TYPES = ['pill'];

// ════════════════════════════════════════════════════════════════════
//  INITIAL CHAT
// ════════════════════════════════════════════════════════════════════
const INITIAL_CHAT = [
  { id:1, name:'Hệ Thống',        text:'Nguyên Soái Ma Tộc đã xuất hiện tại Thanh Vân Sơn!', color:'#FF8060' },
  { id:2, name:'Thanh Vân Tử',   text:'Ma Tộc lại đến! Mọi người tập hợp!',                color:'#FFD060' },
  { id:3, name:'Thiên Kiếm Khách',text:'Đã vào vị trí, sẵn sàng chiến đấu!',               color:'#80D0FF' },
  { id:4, name:'Lăng Tiêu Tiên', text:'Tôi sẽ trị liệu, cứ xông thôi!',                   color:'#80FF80' },
  { id:5, name:'Kiếm Ma',         text:'Haha, hôm nay nhất định chém đầu ma!',              color:'#C880FF' },
];
