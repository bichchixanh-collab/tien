// ════════════════════════════════════════════════════════════════════
//  ITEMS.JS — Hệ thống vật phẩm · Tiên Hiệp Truyền Kỳ
//  Thêm vật phẩm mới: thêm vào ITEMS + DROP_TABLES tương ứng.
//  Không chứa logic game.
// ════════════════════════════════════════════════════════════════════

// ─── PHẨM CHẤT ──────────────────────────────────────────────────────
const ITEM_RARITY = {
  1: { name:'Thường',      color:'#AAAAAA', glow:'rgba(170,170,170,0.3)' },
  2: { name:'Tốt',         color:'#40CC40', glow:'rgba(64,204,64,0.3)'  },
  3: { name:'Hiếm',        color:'#4080FF', glow:'rgba(64,128,255,0.3)' },
  4: { name:'Sử Thi',      color:'#B040F0', glow:'rgba(176,64,240,0.3)' },
  5: { name:'Huyền Thoại', color:'#FF8000', glow:'rgba(255,128,0,0.35)' },
  6: { name:'Thần Khí',    color:'#FF2020', glow:'rgba(255,32,32,0.4)'  },
};

// ─── ITEM TYPE → SLOT MAP ────────────────────────────────────────────
const ITEM_TYPE_SLOT = {
  sword:'weapon', dao:'weapon', staff:'weapon', bow:'weapon',
  helm:'helm', chest:'chest', legs:'legs', boots:'boots', belt:'belt',
  ring:'ring', necklace:'necklace', offhand:'offhand',
};

// ─── FULL ITEM DATABASE ──────────────────────────────────────────────
// stackable: true  → nguyên liệu / đan dược (cộng dồn khi nhặt)
// stackable: false → trang bị / bí kíp (chiếm 1 ô riêng)
// atk/def/hp/mp chỉ dùng cho trang bị
const ITEMS = {

  // ══════════════════════════════════════════════════════
  //  NGUYÊN LIỆU (Materials)
  // ══════════════════════════════════════════════════════

  // Sói Xám drops
  m_wolf_fur:      { id:'m_wolf_fur',      name:'Sói Mao',           type:'material', rarity:1, stackable:true,  desc:'Lông sói xám thô, dùng luyện giáp cấp thấp.' },
  m_wolf_fang:     { id:'m_wolf_fang',     name:'Sói Nha',           type:'material', rarity:2, stackable:true,  desc:'Răng nanh sói sắc bén, nguyên liệu luyện khí cơ bản.' },
  m_wolf_blood:    { id:'m_wolf_blood',    name:'Huyết Sói',         type:'material', rarity:2, stackable:true,  desc:'Huyết dịch Sói Xám, hàm lượng linh khí thấp.' },

  // Thủy Yêu drops
  m_spirit_water:  { id:'m_spirit_water',  name:'Linh Thủy',         type:'material', rarity:2, stackable:true,  desc:'Nước linh thiêng tiết ra từ Thủy Yêu.' },
  m_water_core:    { id:'m_water_core',    name:'Thủy Nguyên Hạch',  type:'material', rarity:3, stackable:true,  desc:'Hạt nhân Thủy Yêu chứa linh lực thủy hành thuần khiết.' },

  // Bạch Hổ Tinh drops
  m_tiger_bone:    { id:'m_tiger_bone',    name:'Hổ Cốt Tinh',       type:'material', rarity:3, stackable:true,  desc:'Xương Bạch Hổ cứng như kim cương, luyện giáp thượng cấp.' },
  m_tiger_claw:    { id:'m_tiger_claw',    name:'Hổ Trảo',           type:'material', rarity:3, stackable:true,  desc:'Vuốt Bạch Hổ sắc bén, có thể xé toạc thép dày.' },
  m_tiger_pelt:    { id:'m_tiger_pelt',    name:'Bạch Hổ Bì',        type:'material', rarity:4, stackable:true,  desc:'Da Bạch Hổ Tinh, hiếm gặp — luyện giáp cấp cao.' },

  // Phế Tích Thú drops
  m_ruin_dust:     { id:'m_ruin_dust',     name:'Phế Tích Trần',     type:'material', rarity:1, stackable:true,  desc:'Bụi đất Phế Tích Cổ Đại, gần như vô dụng.' },
  m_ancient_stone: { id:'m_ancient_stone', name:'Cổ Thạch Phiến',    type:'material', rarity:2, stackable:true,  desc:'Đá cổ đại từ Phế Tích, khắc trận pháp mờ nhạt.' },
  m_ruin_core:     { id:'m_ruin_core',     name:'Phế Tích Hạch',     type:'material', rarity:3, stackable:true,  desc:'Cốt lõi của Phế Tích Thú, chứa ký ức chiến trận cổ xưa.' },

  // Hỏa Linh drops
  m_ember_ash:     { id:'m_ember_ash',     name:'Hỏa Linh Mạt',      type:'material', rarity:2, stackable:true,  desc:'Tro của Hỏa Linh, dùng luyện đan hỏa hành.' },
  m_fire_crystal:  { id:'m_fire_crystal',  name:'Hỏa Tinh Thạch',    type:'material', rarity:4, stackable:true,  desc:'Tinh thể lửa thuần khiết của Hỏa Linh, nhiệt độ cực cao.' },
  m_flame_essence: { id:'m_flame_essence', name:'Hỏa Nguyên Tinh',   type:'material', rarity:5, stackable:true,  desc:'Tinh hoa lửa thượng cổ, cực kỳ hiếm có.' },

  // Hắc Lâm Ác Binh drops
  m_dark_iron:     { id:'m_dark_iron',     name:'Hắc Thiết',         type:'material', rarity:3, stackable:true,  desc:'Kim loại đen của Ma Tộc, cực kỳ bền chắc.' },
  m_soul_fragment: { id:'m_soul_fragment', name:'Linh Hồn Mảnh',     type:'material', rarity:4, stackable:true,  desc:'Mảnh linh hồn Ma Tộc, phát ánh sáng u ám.' },
  m_dark_crystal:  { id:'m_dark_crystal',  name:'Hắc Tinh Thạch',    type:'material', rarity:4, stackable:true,  desc:'Tinh thạch đen của Hắc Lâm, cô đặc sát khí.' },

  // Boss drops
  m_demon_core:    { id:'m_demon_core',    name:'Ma Hạch',           type:'material', rarity:5, stackable:true,  desc:'Hạt nhân Ma Tộc Nguyên Soái, chứa lực lượng hủy diệt.' },
  m_demon_blood:   { id:'m_demon_blood',   name:'Ma Huyết Nguyên',   type:'material', rarity:5, stackable:true,  desc:'Huyết nguyên Boss Ma Tộc, nguyên liệu đỉnh cấp.' },
  m_demon_soul:    { id:'m_demon_soul',    name:'Nguyên Soái Hồn Ngọc',type:'material',rarity:6,stackable:true,  desc:'Hồn ngọc của Nguyên Soái Ma Tộc, thiên cổ kỳ trân.' },

  // Nguyên liệu chung
  m_spirit_stone:  { id:'m_spirit_stone',  name:'Linh Thạch Mảnh',   type:'material', rarity:1, stackable:true,  desc:'Mảnh linh thạch nhỏ, có thể đổi lấy vật phẩm thường.' },
  m_herb_basic:    { id:'m_herb_basic',    name:'Linh Thảo',         type:'material', rarity:1, stackable:true,  desc:'Thảo dược linh khí thấp, luyện đan cơ bản.' },
  m_herb_rare:     { id:'m_herb_rare',     name:'Tiên Thảo',         type:'material', rarity:3, stackable:true,  desc:'Thảo dược quý, nguyên liệu đan dược thượng phẩm.' },
  m_purple_crystal:{ id:'m_purple_crystal',name:'Tử Tinh Thạch',     type:'material', rarity:4, stackable:true,  desc:'Tinh thạch tím cao cấp, dùng luyện trang bị Sử Thi.' },

  // ══════════════════════════════════════════════════════
  //  ĐAN DƯỢC (Pills / Consumables)
  // ══════════════════════════════════════════════════════
  p_small_heal:    { id:'p_small_heal',    name:'Tiểu Hồi Linh Đan', type:'pill', rarity:1, stackable:true, hp_restore:15, desc:'Hồi phục 15% HP.' },
  p_heal:          { id:'p_heal',          name:'Hồi Linh Đan',      type:'pill', rarity:2, stackable:true, hp_restore:30, desc:'Hồi phục 30% HP.' },
  p_great_heal:    { id:'p_great_heal',    name:'Đại Hoàn Đan',      type:'pill', rarity:3, stackable:true, hp_restore:50, mp_restore:30, desc:'Hồi 50% HP và 30% MP.' },
  p_supreme:       { id:'p_supreme',       name:'Thượng Phẩm Hoàn Đan',type:'pill',rarity:4,stackable:true, hp_restore:80, mp_restore:60, desc:'Hồi 80% HP và 60% MP.' },
  p_mp:            { id:'p_mp',            name:'Tụ Linh Đan',       type:'pill', rarity:2, stackable:true, mp_restore:40, desc:'Hồi phục 40% MP.' },
  p_exp:           { id:'p_exp',           name:'Tu Vi Đan',         type:'pill', rarity:3, stackable:true, desc:'Uống vào tức thì nhận được một lượng Tu Vi.' },

  // ══════════════════════════════════════════════════════
  //  VŨ KHÍ — KIẾM (Sword)
  // ══════════════════════════════════════════════════════
  e_sword_1: { id:'e_sword_1', name:'Thiết Kiếm',           type:'sword', rarity:1, stackable:false, atk:120,  def:0,   hp:0,    mp:0,   desc:'Kiếm sắt thô sơ, phù hợp tu sĩ mới nhập môn.' },
  e_sword_2: { id:'e_sword_2', name:'Luyện Khí Kiếm',       type:'sword', rarity:2, stackable:false, atk:280,  def:0,   hp:50,   mp:0,   desc:'Kiếm Luyện Khí Kỳ, chứa linh khí sơ cấp.' },
  e_sword_3: { id:'e_sword_3', name:'Huyền Tinh Kiếm',      type:'sword', rarity:3, stackable:false, atk:550,  def:0,   hp:120,  mp:80,  desc:'Kiếm đúc từ Huyền Tinh Thạch, khắc trận pháp tăng lực.' },
  e_sword_4: { id:'e_sword_4', name:'Tử Tinh Kiếm',         type:'sword', rarity:4, stackable:false, atk:980,  def:100, hp:300,  mp:200, desc:'Kiếm Tử Tinh bậc Sử Thi, chém vạn ma chướng.' },
  e_sword_5: { id:'e_sword_5', name:'Thanh Hồng Kiếm',      type:'sword', rarity:5, stackable:false, atk:1840, def:200, hp:600,  mp:400, desc:'Bảo kiếm đúc từ Hồng Tinh Ngọc, huyền thoại truyền đời.' },
  e_sword_6: { id:'e_sword_6', name:'Thiên Kiếm Thanh Vân', type:'sword', rarity:6, stackable:false, atk:3200, def:400, hp:1000, mp:800, desc:'Thần khí truyền thừa Thanh Vân Môn, oai lực vô song.' },

  // ── ĐAO ─────────────────────────────────────────────────────────
  e_dao_2: { id:'e_dao_2', name:'Trúc Cơ Đao',   type:'dao', rarity:2, stackable:false, atk:320,  def:20,  hp:80,  mp:0,   desc:'Đao lớn phù hợp tu sĩ Trúc Cơ Kỳ, nặng và chắc.' },
  e_dao_3: { id:'e_dao_3', name:'Hắc Thiết Đao', type:'dao', rarity:3, stackable:false, atk:620,  def:50,  hp:200, mp:0,   desc:'Đao Hắc Thiết Ma Tộc, mang sát khí nặng nề.' },
  e_dao_4: { id:'e_dao_4', name:'Long Nha Đao',  type:'dao', rarity:4, stackable:false, atk:1100, def:150, hp:450, mp:100, desc:'Đao hình răng rồng, mỗi nhát chém mang theo sấm sét.' },
  e_dao_5: { id:'e_dao_5', name:'Huyết Ma Đao',  type:'dao', rarity:5, stackable:false, atk:1950, def:250, hp:750, mp:200, desc:'Đao Huyết Ma huyền thoại, uống máu địch mà lớn mạnh.' },

  // ── TRƯỢNG (Staff) ───────────────────────────────────────────────
  e_staff_2: { id:'e_staff_2', name:'Linh Mộc Trượng', type:'staff', rarity:2, stackable:false, atk:200, def:0,  hp:100, mp:150, desc:'Gậy linh mộc, tăng cường pháp thuật cơ bản.' },
  e_staff_3: { id:'e_staff_3', name:'Tà Phong Trượng', type:'staff', rarity:3, stackable:false, atk:400, def:0,  hp:200, mp:350, desc:'Trượng Ma Tộc từ Hắc Lâm, linh lực tà ác.' },
  e_staff_4: { id:'e_staff_4', name:'Thiên Lôi Trượng',type:'staff', rarity:4, stackable:false, atk:750, def:80, hp:350, mp:600, desc:'Trượng dẫn thiên lôi, một kích rung chuyển đất trời.' },
  e_staff_5: { id:'e_staff_5', name:'Vạn Pháp Côn',   type:'staff', rarity:5, stackable:false, atk:1400,def:150,hp:600, mp:1200,desc:'Trượng huyền thoại, thông suốt vạn pháp thiên hạ.' },

  // ── CUNG (Bow) ───────────────────────────────────────────────────
  e_bow_3: { id:'e_bow_3', name:'Linh Phong Cung', type:'bow', rarity:3, stackable:false, atk:480, def:0,  hp:150, mp:200, desc:'Cung linh phong, tên bắn theo luồng gió linh.' },
  e_bow_4: { id:'e_bow_4', name:'Hỏa Hồng Cung',  type:'bow', rarity:4, stackable:false, atk:900, def:50, hp:280, mp:350, desc:'Cung lửa Sử Thi, tên mang ngọn lửa thiêu đốt.' },
  e_bow_5: { id:'e_bow_5', name:'Thần Tiễn Cung',  type:'bow', rarity:5, stackable:false, atk:1700,def:100,hp:500, mp:600, desc:'Cung huyền thoại, bắn ra mũi tên ánh sáng không thể né.' },

  // ══════════════════════════════════════════════════════
  //  PHÒNG CỤ
  // ══════════════════════════════════════════════════════

  // ── MŨ GIÁP (Helm) ──────────────────────────────────────────────
  e_helm_1: { id:'e_helm_1', name:'Thiết Mũ',           type:'helm', rarity:1, stackable:false, atk:0, def:80,   hp:100,  mp:0,   desc:'Mũ sắt thô sơ, bảo vệ đầu khỏi đòn thường.' },
  e_helm_2: { id:'e_helm_2', name:'Luyện Khí Quan',     type:'helm', rarity:2, stackable:false, atk:0, def:180,  hp:200,  mp:50,  desc:'Quan mũ Luyện Khí Kỳ, tập trung linh khí lên đỉnh đầu.' },
  e_helm_3: { id:'e_helm_3', name:'Huyền Tinh Quan',    type:'helm', rarity:3, stackable:false, atk:0, def:350,  hp:400,  mp:150, desc:'Quan mũ Huyền Tinh, hỗ trợ tu luyện trong chiến đấu.' },
  e_helm_4: { id:'e_helm_4', name:'Hộ Đầu Kim Quan',   type:'helm', rarity:4, stackable:false, atk:50, def:600, hp:700,  mp:300, desc:'Quan mũ vàng Sử Thi, trí tuệ tăng theo linh lực.' },
  e_helm_5: { id:'e_helm_5', name:'Thanh Vân Quan',     type:'helm', rarity:5, stackable:false, atk:100,def:900, hp:1200, mp:600, desc:'Quan mũ huyền thoại Thanh Vân Môn, trí tuệ vô song.' },
  e_helm_6: { id:'e_helm_6', name:'Thiên Đế Linh Quan', type:'helm', rarity:6, stackable:false, atk:200,def:1500,hp:2000, mp:1200,desc:'Thần mũ tương truyền của Thiên Đế, người đội tựa như tiên.' },

  // ── ÁO GIÁP (Chest) ─────────────────────────────────────────────
  e_chest_1: { id:'e_chest_1', name:'Bố Y Giáp',              type:'chest', rarity:1, stackable:false, atk:0,  def:150,  hp:200,  mp:0,    desc:'Áo vải thô, phòng thủ cơ bản cho tu sĩ mới.' },
  e_chest_2: { id:'e_chest_2', name:'Thủy Tinh Giáp',         type:'chest', rarity:2, stackable:false, atk:0,  def:320,  hp:400,  mp:100,  desc:'Giáp Thủy Tinh, nhẹ nhàng nhưng bền chắc.' },
  e_chest_3: { id:'e_chest_3', name:'Hắc Thiết Giáp',         type:'chest', rarity:3, stackable:false, atk:0,  def:620,  hp:700,  mp:200,  desc:'Giáp Hắc Thiết Ma Tộc, hấp thụ đòn vật lý cực tốt.' },
  e_chest_4: { id:'e_chest_4', name:'Huyền Quy Giáp',         type:'chest', rarity:4, stackable:false, atk:0,  def:980,  hp:1100, mp:400,  desc:'Giáp Kim Đan Sử Thi, cứng như rùa huyền vạn tuổi.' },
  e_chest_5: { id:'e_chest_5', name:'Kim Cang Giáp',           type:'chest', rarity:5, stackable:false, atk:0,  def:1600, hp:1800, mp:700,  desc:'Giáp Kim Cang huyền thoại, gần như bất hoại.' },
  e_chest_6: { id:'e_chest_6', name:'Bất Hoại Kim Thân Giáp', type:'chest', rarity:6, stackable:false, atk:100,def:2800, hp:3000, mp:1000, desc:'Thần giáp truyền thừa, người mặc gần như bất tử.' },

  // ── QUẦN GIÁP (Legs) ─────────────────────────────────────────────
  e_legs_1: { id:'e_legs_1', name:'Bố Y Khố',     type:'legs', rarity:1, stackable:false, atk:0,  def:100, hp:150, mp:0,   desc:'Quần vải thô, gần như không có tác dụng phòng thủ.' },
  e_legs_2: { id:'e_legs_2', name:'Linh Vận Khố', type:'legs', rarity:2, stackable:false, atk:0,  def:220, hp:300, mp:80,  desc:'Quần giáp vải linh, tăng nhẹ tốc độ di chuyển.' },
  e_legs_3: { id:'e_legs_3', name:'Hắc Thiết Khố',type:'legs', rarity:3, stackable:false, atk:0,  def:430, hp:550, mp:150, desc:'Quần giáp Hắc Thiết, nặng nhưng rất bền.' },
  e_legs_4: { id:'e_legs_4', name:'Phong Thần Khố',type:'legs', rarity:4, stackable:false, atk:60, def:700, hp:850, mp:300, desc:'Quần giáp Phong Thần, di chuyển để lại ảo ảnh.' },
  e_legs_5: { id:'e_legs_5', name:'Vân Long Khố', type:'legs', rarity:5, stackable:false, atk:120,def:1100,hp:1400,mp:550, desc:'Quần giáp Vân Long huyền thoại, khinh công phi thường.' },

  // ── GIÀY (Boots) ─────────────────────────────────────────────────
  e_boots_1: { id:'e_boots_1', name:'Bố Lý',        type:'boots', rarity:1, stackable:false, atk:0, def:60,  hp:100, mp:0,   desc:'Giày vải thô, không có gì đặc biệt.' },
  e_boots_2: { id:'e_boots_2', name:'Linh Vân Lý',  type:'boots', rarity:2, stackable:false, atk:0, def:160, hp:250, mp:60,  desc:'Giày linh vân, bước đi nhẹ như mây trên không.' },
  e_boots_3: { id:'e_boots_3', name:'Thiên Túc Lý', type:'boots', rarity:3, stackable:false, atk:0, def:300, hp:400, mp:120, desc:'Giày thiên túc, giảm tiếng động khi di chuyển.' },
  e_boots_4: { id:'e_boots_4', name:'Phi Vân Lý',   type:'boots', rarity:4, stackable:false, atk:0, def:520, hp:650, mp:250, desc:'Giày Phi Vân Sử Thi, có thể đạp mây mà đi.' },
  e_boots_5: { id:'e_boots_5', name:'Thiên Phong Lý',type:'boots',rarity:5, stackable:false, atk:80,def:800, hp:1000,mp:450, desc:'Giày huyền thoại, di chuyển như gió thiên thượng.' },

  // ── ĐAI LƯNG (Belt) ──────────────────────────────────────────────
  e_belt_2: { id:'e_belt_2', name:'Linh Lực Đai',   type:'belt', rarity:2, stackable:false, atk:80,  def:100, hp:200, mp:150, desc:'Đai lưng linh lực, trợ giúp tu luyện toàn diện.' },
  e_belt_3: { id:'e_belt_3', name:'Hắc Kim Đai',    type:'belt', rarity:3, stackable:false, atk:150, def:200, hp:350, mp:250, desc:'Đai lưng Hắc Kim, tập trung linh lực toàn thân.' },
  e_belt_4: { id:'e_belt_4', name:'Thiên Long Đai', type:'belt', rarity:4, stackable:false, atk:280, def:380, hp:600, mp:400, desc:'Đai Long Sử Thi, hình rồng thiêng bảo hộ.' },
  e_belt_5: { id:'e_belt_5', name:'Cửu Long Đai',   type:'belt', rarity:5, stackable:false, atk:500, def:600, hp:1000,mp:700, desc:'Đai Cửu Long huyền thoại, chín rồng quấn quanh eo.' },

  // ══════════════════════════════════════════════════════
  //  PHỤ KIỆN
  // ══════════════════════════════════════════════════════

  // ── NHẪN (Ring) ──────────────────────────────────────────────────
  e_ring_1: { id:'e_ring_1', name:'Đồng Nhẫn',        type:'ring', rarity:1, stackable:false, atk:30,  def:30,  hp:80,   mp:50,   desc:'Nhẫn đồng đơn giản.' },
  e_ring_2: { id:'e_ring_2', name:'Linh Ngọc Hoàn',   type:'ring', rarity:2, stackable:false, atk:80,  def:80,  hp:200,  mp:150,  desc:'Nhẫn ngọc linh, tăng nhẹ toàn bộ thuộc tính.' },
  e_ring_3: { id:'e_ring_3', name:'Hỏa Ngọc Nhẫn',    type:'ring', rarity:3, stackable:false, atk:180, def:120, hp:350,  mp:280,  desc:'Nhẫn hỏa hành, tăng sức mạnh pháp thuật lửa.' },
  e_ring_4: { id:'e_ring_4', name:'Bích Ngọc Hoàn',   type:'ring', rarity:4, stackable:false, atk:280, def:220, hp:600,  mp:450,  desc:'Nhẫn Sử Thi, cân bằng hoàn hảo công thủ.' },
  e_ring_5: { id:'e_ring_5', name:'Long Ngọc Nhẫn',   type:'ring', rarity:5, stackable:false, atk:500, def:400, hp:1000, mp:800,  desc:'Nhẫn Long Ngọc huyền thoại, chứa long uy.' },
  e_ring_6: { id:'e_ring_6', name:'Thần Ngọc Hoàn',   type:'ring', rarity:6, stackable:false, atk:900, def:700, hp:1800, mp:1400, desc:'Thần nhẫn, đeo vào như được thần linh gia hộ.' },

  // ── VÒNG CỔ (Necklace) ───────────────────────────────────────────
  e_neck_2: { id:'e_neck_2', name:'Bạc Anh Lạc',      type:'necklace', rarity:2, stackable:false, atk:60,  def:60,  hp:180, mp:120, desc:'Vòng cổ bạc giản dị, tăng nhẹ linh lực.' },
  e_neck_3: { id:'e_neck_3', name:'Linh Châu Anh Lạc', type:'necklace', rarity:3, stackable:false, atk:120, def:100, hp:300, mp:350, desc:'Vòng cổ ngọc châu linh, nâng cao linh lực toàn diện.' },
  e_neck_4: { id:'e_neck_4', name:'Hỏa Long Anh Lạc',  type:'necklace', rarity:4, stackable:false, atk:250, def:180, hp:500, mp:600, desc:'Vòng cổ hình rồng lửa, tinh tế và uy mãnh.' },
  e_neck_5: { id:'e_neck_5', name:'Thiên Long Anh Lạc',type:'necklace', rarity:5, stackable:false, atk:480, def:350, hp:900, mp:1000,desc:'Vòng cổ Thiên Long huyền thoại, long uy lan tỏa.' },

  // ── PHÙ KHÍ (Offhand) ────────────────────────────────────────────
  e_off_2: { id:'e_off_2', name:'Phù Lục Trung Cấp', type:'offhand', rarity:2, stackable:false, atk:60,  def:40,  hp:100, mp:200, desc:'Phù lục tăng cường pháp thuật, dùng song song vũ khí.' },
  e_off_3: { id:'e_off_3', name:'Hắc Ma Phù Lục',    type:'offhand', rarity:3, stackable:false, atk:100, def:80,  hp:200, mp:400, desc:'Phù lục đen Ma Tộc, hút linh lực địch về mình.' },
  e_off_4: { id:'e_off_4', name:'Thiên Đạo Phù Lục', type:'offhand', rarity:4, stackable:false, atk:200, def:150, hp:400, mp:700, desc:'Phù lục thiên đạo, chứa quy luật căn bản vũ trụ.' },
  e_off_5: { id:'e_off_5', name:'Thái Cực Phù Lục',  type:'offhand', rarity:5, stackable:false, atk:380, def:280, hp:700, mp:1100,desc:'Phù lục huyền thoại Thái Cực, âm dương hòa hợp.' },

  // ══════════════════════════════════════════════════════
  //  BÍ KÍP (Books)
  // ══════════════════════════════════════════════════════
  b_basic:  { id:'b_basic',  name:'Bí Kíp Nhập Môn',     type:'book', rarity:2, stackable:false, desc:'Bí kíp cơ bản cho tu sĩ mới, học xong tăng 1 điểm kỹ năng.' },
  b_fire:   { id:'b_fire',   name:'Liệt Diễm Tâm Pháp',  type:'book', rarity:4, stackable:false, desc:'Tâm pháp hỏa hành bậc cao, luyện thành có thể hóa thân lửa.' },
  b_dark:   { id:'b_dark',   name:'Hắc Ám Huyền Công',   type:'book', rarity:4, stackable:false, desc:'Công pháp Ma Tộc, uy lực cực mạnh nhưng dễ tâm ma.' },
  b_sword:  { id:'b_sword',  name:'Ngự Kiếm Quyết',      type:'book', rarity:5, stackable:false, desc:'Tuyệt học Ngự Kiếm của Thanh Vân Môn, trăm năm không ai học được.' },
  b_thunder:{ id:'b_thunder',name:'Thiên Lôi Trận Pháp', type:'book', rarity:5, stackable:false, desc:'Trận pháp thiên lôi, triển khai giam giữ muôn ma.' },
};

// ════════════════════════════════════════════════════════════════════
//  DROP TABLES — Bảng drop theo loại quái
//  chance: 0–1 (xác suất rơi)
//  count: [min, max] số lượng rơi
// ════════════════════════════════════════════════════════════════════
const DROP_TABLES = {

  wolf: [
    { itemId:'m_wolf_fur',    chance:0.85, count:[1,3] },
    { itemId:'m_wolf_fang',   chance:0.40, count:[1,2] },
    { itemId:'m_wolf_blood',  chance:0.20, count:[1,1] },
    { itemId:'m_spirit_stone',chance:0.30, count:[1,3] },
    { itemId:'p_small_heal',  chance:0.12, count:[1,2] },
    { itemId:'e_sword_1',     chance:0.04, count:[1,1] },
    { itemId:'e_chest_1',     chance:0.03, count:[1,1] },
    { itemId:'e_ring_1',      chance:0.03, count:[1,1] },
    { itemId:'e_helm_1',      chance:0.02, count:[1,1] },
  ],

  water_demon: [
    { itemId:'m_spirit_water', chance:0.80, count:[1,3] },
    { itemId:'m_water_core',   chance:0.35, count:[1,2] },
    { itemId:'m_herb_basic',   chance:0.25, count:[1,3] },
    { itemId:'p_heal',         chance:0.15, count:[1,2] },
    { itemId:'p_mp',           chance:0.15, count:[1,2] },
    { itemId:'e_staff_2',      chance:0.05, count:[1,1] },
    { itemId:'e_ring_2',       chance:0.04, count:[1,1] },
    { itemId:'e_boots_2',      chance:0.03, count:[1,1] },
    { itemId:'e_neck_2',       chance:0.02, count:[1,1] },
  ],

  ruin_beast: [
    { itemId:'m_ruin_dust',    chance:0.90, count:[1,4] },
    { itemId:'m_ancient_stone',chance:0.55, count:[1,3] },
    { itemId:'m_ruin_core',    chance:0.20, count:[1,2] },
    { itemId:'p_small_heal',   chance:0.12, count:[1,2] },
    { itemId:'e_chest_2',      chance:0.05, count:[1,1] },
    { itemId:'e_helm_2',       chance:0.04, count:[1,1] },
    { itemId:'e_legs_2',       chance:0.03, count:[1,1] },
    { itemId:'e_belt_2',       chance:0.02, count:[1,1] },
  ],

  demon: [
    { itemId:'m_spirit_stone', chance:0.70, count:[1,3] },
    { itemId:'m_herb_basic',   chance:0.30, count:[1,2] },
    { itemId:'p_heal',         chance:0.15, count:[1,2] },
    { itemId:'e_sword_2',      chance:0.05, count:[1,1] },
    { itemId:'e_chest_2',      chance:0.04, count:[1,1] },
    { itemId:'e_ring_2',       chance:0.04, count:[1,1] },
    { itemId:'e_dao_2',        chance:0.03, count:[1,1] },
    { itemId:'b_basic',        chance:0.01, count:[1,1] },
  ],

  white_tiger: [
    { itemId:'m_tiger_bone',   chance:0.70, count:[1,2] },
    { itemId:'m_tiger_claw',   chance:0.50, count:[1,2] },
    { itemId:'m_tiger_pelt',   chance:0.15, count:[1,1] },
    { itemId:'p_heal',         chance:0.20, count:[1,3] },
    { itemId:'e_sword_3',      chance:0.06, count:[1,1] },
    { itemId:'e_chest_3',      chance:0.05, count:[1,1] },
    { itemId:'e_boots_3',      chance:0.05, count:[1,1] },
    { itemId:'e_ring_3',       chance:0.04, count:[1,1] },
    { itemId:'e_neck_3',       chance:0.03, count:[1,1] },
    { itemId:'b_basic',        chance:0.02, count:[1,1] },
  ],

  fire_spirit: [
    { itemId:'m_fire_crystal', chance:0.55, count:[1,2] },
    { itemId:'m_ember_ash',    chance:0.75, count:[1,3] },
    { itemId:'m_flame_essence',chance:0.08, count:[1,1] },
    { itemId:'m_herb_rare',    chance:0.20, count:[1,2] },
    { itemId:'p_great_heal',   chance:0.20, count:[1,2] },
    { itemId:'e_sword_4',      chance:0.06, count:[1,1] },
    { itemId:'e_staff_4',      chance:0.05, count:[1,1] },
    { itemId:'e_ring_4',       chance:0.04, count:[1,1] },
    { itemId:'e_belt_4',       chance:0.03, count:[1,1] },
    { itemId:'b_fire',         chance:0.02, count:[1,1] },
  ],

  dark_soldier: [
    { itemId:'m_dark_iron',    chance:0.80, count:[1,3] },
    { itemId:'m_soul_fragment',chance:0.45, count:[1,2] },
    { itemId:'m_dark_crystal', chance:0.25, count:[1,2] },
    { itemId:'p_great_heal',   chance:0.22, count:[1,3] },
    { itemId:'e_dao_4',        chance:0.06, count:[1,1] },
    { itemId:'e_chest_4',      chance:0.05, count:[1,1] },
    { itemId:'e_helm_4',       chance:0.04, count:[1,1] },
    { itemId:'e_legs_4',       chance:0.04, count:[1,1] },
    { itemId:'e_off_4',        chance:0.03, count:[1,1] },
    { itemId:'b_dark',         chance:0.02, count:[1,1] },
  ],

  boss: [
    // Guaranteed drops
    { itemId:'m_demon_core',   chance:1.00, count:[1,1] },
    { itemId:'m_demon_blood',  chance:0.90, count:[1,2] },
    { itemId:'p_supreme',      chance:1.00, count:[2,4] },
    // Equipment Huyền Thoại (rarity 5)
    { itemId:'e_sword_5',      chance:0.30, count:[1,1] },
    { itemId:'e_dao_5',        chance:0.20, count:[1,1] },
    { itemId:'e_chest_5',      chance:0.25, count:[1,1] },
    { itemId:'e_helm_5',       chance:0.20, count:[1,1] },
    { itemId:'e_ring_5',       chance:0.25, count:[1,1] },
    { itemId:'e_neck_5',       chance:0.15, count:[1,1] },
    // Equipment Thần Khí (rarity 6) — rất hiếm
    { itemId:'e_sword_6',      chance:0.05, count:[1,1] },
    { itemId:'e_chest_6',      chance:0.04, count:[1,1] },
    { itemId:'e_helm_6',       chance:0.03, count:[1,1] },
    { itemId:'e_ring_6',       chance:0.03, count:[1,1] },
    // Bí kíp
    { itemId:'b_sword',        chance:0.15, count:[1,1] },
    { itemId:'b_thunder',      chance:0.10, count:[1,1] },
    { itemId:'m_demon_soul',   chance:0.50, count:[1,1] },
  ],
};

// ════════════════════════════════════════════════════════════════════
//  GOLD DROP — Linh Thạch rơi theo level quái
// ════════════════════════════════════════════════════════════════════
function getGoldRange(level) {
  if (level <= 5)  return [200,   800];
  if (level <= 10) return [500,   2000];
  if (level <= 15) return [1500,  5000];
  if (level <= 20) return [4000,  12000];
  if (level <= 25) return [10000, 30000];
  return                  [25000, 80000];
}

// ════════════════════════════════════════════════════════════════════
//  rollDrops(mobType, mobLevel) → { items: [...], gold: number }
//  Gọi khi quái chết — trả về danh sách item rơi + gold
// ════════════════════════════════════════════════════════════════════
function rollDrops(mobType, mobLevel) {
  const table = DROP_TABLES[mobType] || DROP_TABLES['demon'];
  const dropped = [];

  for (const entry of table) {
    if (Math.random() < entry.chance) {
      const count = entry.count[0] + Math.floor(Math.random() * (entry.count[1] - entry.count[0] + 1));
      const item  = ITEMS[entry.itemId];
      if (item) dropped.push({ ...item, count });
    }
  }

  const [min, max] = getGoldRange(mobLevel || 1);
  const gold = min + Math.floor(Math.random() * (max - min + 1));

  return { items: dropped, gold };
}

// Expose to window so index.html can call
window.ITEMS       = ITEMS;
window.ITEM_RARITY = ITEM_RARITY;
window.ITEM_TYPE_SLOT = ITEM_TYPE_SLOT;
window.rollDrops   = rollDrops;
