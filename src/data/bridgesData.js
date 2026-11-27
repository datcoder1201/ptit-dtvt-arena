export const SUBJECTS = {
  phys: {
    id: 'phys',
    code: 'BAS1225',
    name: 'Vật lý 2 & Thí nghiệm',
    shortName: 'Vật lý 2',
    credits: '3–4 TC',
    color: '#f59e0b',
    badgeClass: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    ringClass: 'border-amber-500/50',
    desc: 'Điện trường, Từ trường, Cảm ứng điện từ Faraday, Hệ phương trình Maxwell & Sóng điện từ (kèm nhánh Quang – Lượng tử).',
  },
  circ: {
    id: 'circ',
    code: 'ELE1318',
    name: 'Lý thuyết mạch',
    shortName: 'Lý thuyết mạch',
    credits: '3 TC',
    color: '#06b6d4',
    badgeClass: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
    ringClass: 'border-cyan-500/50',
    desc: 'Thế nút, Dòng vòng, Số phức AC, Hỗ cảm, Cộng hưởng, Quá độ RLC toán tử Laplace và Mạng bốn cực Z/Y/A/H.',
  },
  sig: {
    id: 'sig',
    code: 'TEL1368',
    name: 'Tín hiệu và Hệ thống',
    shortName: 'Tín hiệu & Hệ thống',
    credits: '3 TC',
    color: '#10b981',
    badgeClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    ringClass: 'border-emerald-500/50',
    desc: 'Hệ thống LTI, Tích chập liên tục/rời rạc, Chuỗi & Biến đổi Fourier, Biến đổi Laplace, Biến đổi Z và Miền hội tụ ROC.',
  },
};

export const RLC_PRESETS = [
  {
    id: 'underdamped',
    name: 'Dao động tắt dần (Dưới tới hạn)',
    desc: 'R nhỏ → Cặp cực phức liên hợp bên trái mặt phẳng s → Dao động trao đổi năng lượng điện – từ.',
    R: 8,
    L: 40, // mH
    C: 100, // uF
    omega: 500,
  },
  {
    id: 'resonance',
    name: 'Cộng hưởng hoàn toàn (ω = ω₀)',
    desc: 'ωL = 1/(ωC) → Tổng trở thuần trở Z = R, dòng điện cực đại, năng lượng điện và từ đảo pha chuẩn.',
    R: 12,
    L: 25,
    C: 100,
    omega: 632,
  },
  {
    id: 'overdamped',
    name: 'Quá độ không dao động (Quá tắt)',
    desc: 'R lớn → Hai cực thực âm phân biệt trên trục σ → Mạch tiêu tán nhiệt nhanh, không vọt lố.',
    R: 60,
    L: 20,
    C: 100,
    omega: 400,
  },
  {
    id: 'critical',
    name: 'Tắt dần tới hạn (Cực kép)',
    desc: 'R = 2√(L/C) → Hai nghiệm đặc trưng trùng nhau s₁ = s₂ → Hồi về xác lập nhanh nhất không dao động.',
    R: 40,
    L: 40,
    C: 100,
    omega: 500,
  },
];

export const CONCEPT_BRIDGES = [
  {
    id: 'bridge-maxwell-l-s',
    title: 'Từ Cảm ứng Faraday → Cuộn cảm L → Toán tử Laplace s',
    summary: 'Cùng một bản chất đạo hàm theo thời gian, chỉ đổi ngôn ngữ qua từng môn học.',
    phys: {
      label: 'Vật lý 2 (BAS1225)',
      formula: 'e_c = -\\frac{d\\Phi_B}{dt} = -L\\frac{di}{dt}',
      explain: 'Từ trường biến thiên trong cuộn dây tạo ra điện trường xoáy và suất điện động tự cảm chống lại sự biến thiên dòng điện.',
    },
    circ: {
      label: 'Lý thuyết mạch (ELE1318)',
      formula: '\\dot{U}_L = j\\omega L\\dot{I}, \\quad U_L(p) = pL I(p) - L i_L(0_-)',
      explain: 'Mô hình hóa toàn bộ ống dây thành 1 phần tử tập trung L. Trong miền phức là jωL, trong mạch quá độ thành nguồn sơ kiện + pL.',
    },
    sig: {
      label: 'Tín hiệu & Hệ thống (TEL1368)',
      formula: '\\mathcal{L}\\left\\{\\frac{df(t)}{dt}\\right\\} = sF(s) - f(0_-)',
      explain: 'Phép lấy đạo hàm trong miền thời gian tương ứng với phép nhân s trong miền Laplace — biến phương trình vi phân thành đại số.',
    },
    examTip: 'Nếu nhớ bản chất này, Sếp không bao giờ quên dấu trừ ở nguồn sơ kiện Li_L(0_-) khi chuyển mạch quá độ sang miền p!',
  },
  {
    id: 'bridge-displacement-c',
    title: 'Dòng điện dịch Maxwell → Tụ điện C → Tích phân 1/sC',
    summary: 'Lý giải tại sao dòng xoay chiều vẫn chạy qua lớp điện môi cách điện của tụ.',
    phys: {
      label: 'Vật lý 2 (BAS1225)',
      formula: 'j_d = \\varepsilon\\varepsilon_0 \\frac{\\partial E}{\\partial t} \\implies I_d = C\\frac{du_C}{dt}',
      explain: 'Giữa hai bản tụ không có dòng electron chạy qua, nhưng điện trường biến thiên tạo ra dòng điện dịch khép kín mạch từ trường.',
    },
    circ: {
      label: 'Lý thuyết mạch (ELE1318)',
      formula: '\\dot{Z}_C = \\frac{1}{j\\omega C}, \\quad Z_C(p) = \\frac{1}{pC} \\text{ kèm } \\frac{u_C(0_-)}{p}',
      explain: 'Tụ điện tích trữ năng lượng điện trường W_E = ½Cu_C², ngăn dòng DC xác lập và dẫn tốt tín hiệu tần số cao.',
    },
    sig: {
      label: 'Tín hiệu & Hệ thống (TEL1368)',
      formula: '\\mathcal{L}\\left\\{\\int_0^t f(\\tau)d\\tau\\right\\} = \\frac{F(s)}{s}',
      explain: 'Tích phân dòng điện tạo điện áp trên tụ tương ứng phép chia cho s, sinh ra một cực (pole) lọc thông thấp tự nhiên.',
    },
    examTip: 'Ở bài quá độ Lý thuyết mạch, sơ đồ toán tử của tụ điện luôn có tụ 1/(pC) nối tiếp nguồn áp u_C(0_-)/p cùng chiều sụt áp!',
  },
  {
    id: 'bridge-resonance-poles',
    title: 'Dao động LC tự do → Cộng hưởng mạch → Cực trên trục ảo jω',
    summary: 'Cơ chế sinh dao động điện từ và bộ lọc chọn tần trong Viễn thông.',
    phys: {
      label: 'Vật lý 2 (BAS1225)',
      formula: '\\frac{d^2q}{dt^2} + \\omega_0^2 q = 0, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}',
      explain: 'Năng lượng điện trường trong tụ chuyển hóa tuần hoàn sang năng lượng từ trường trong cuộn cảm với chu kỳ T₀ = 2π√(LC).',
    },
    circ: {
      label: 'Lý thuyết mạch (ELE1318)',
      formula: 'X_L = X_C \\iff \\omega_0 L = \\frac{1}{\\omega_0 C}, \\quad \\dot{Z} = R',
      explain: 'Khi cộng hưởng nối tiếp, cảm kháng triệt tiêu dung kháng, dòng điện đạt cực đại và cùng pha với điện áp nguồn.',
    },
    sig: {
      label: 'Tín hiệu & Hệ thống (TEL1368)',
      formula: 'H(s) = \\frac{\\omega_0^2}{s^2 + 2\\zeta\\omega_0 s + \\omega_0^2}',
      explain: 'Khi R = 0 (ζ = 0), hai điểm cực nằm đúng trên trục ảo s = ±jω₀ → hệ ở biên giới ổn định (dao động điều hòa vĩnh cửu).',
    },
    examTip: 'Trong Tín hiệu hệ thống, chỉ cần thấy đa thức mẫu s² + ω₀² là biết ngay hệ dao động cộng hưởng tại ω₀ và không ổn định BIBO.',
  },
  {
    id: 'bridge-frequency-response',
    title: 'Đáp ứng tần số mạch lọc → Phổ Fourier H(jω)',
    summary: 'Thay s = jω trong hàm truyền mạch điện để ra ngay hàm truyền đạt tần số.',
    phys: {
      label: 'Vật lý 2 (BAS1225)',
      formula: 'S(t) = A\\cos(\\omega t + \\varphi)',
      explain: 'Mọi sóng điện từ mang thông tin đều có thể phân tích thành chồng chập các thành phần sóng hài tần số ω khác nhau.',
    },
    circ: {
      label: 'Lý thuyết mạch (ELE1318)',
      formula: '\\dot{K}(j\\omega) = \\frac{\\dot{U}_{ra}}{\\dot{U}_{vào}} = |K(\\omega)|e^{j\\varphi(\\omega)}',
      explain: 'Chương 4 & 6 Lý thuyết mạch dùng tỷ số phức biên độ ngõ ra/vào để vẽ đặc tuyến biên-tần và pha-tần của mạch lọc RC, RL.',
    },
    sig: {
      label: 'Tín hiệu & Hệ thống (TEL1368)',
      formula: 'Y(j\\omega) = H(j\\omega)\\cdot X(j\\omega) \\iff y(t) = h(t)*x(t)',
      explain: 'Định lý tích chập: Tích chập phức tạp trong miền thời gian biến thành phép nhân đơn giản ở miền tần số Fourier!',
    },
    examTip: 'Điều kiện để H(jω) tồn tại từ H(s) là ROC của H(s) phải chứa trục ảo Re(s) = 0 (tức hệ thống phải ổn định).',
  },
  {
    id: 'bridge-mutual-coupled',
    title: 'Từ thông móc vòng → Mạch Hỗ cảm → Hệ thống ghép kênh',
    summary: 'Cách hai mạch tách rời truyền năng lượng không cần dây nối trực tiếp.',
    phys: {
      label: 'Vật lý 2 (BAS1225)',
      formula: '\\Phi_{21} = M\\cdot I_1 \\implies e_{21} = -M\\frac{di_1}{dt}',
      explain: 'Dòng biến thiên ở cuộn 1 sinh từ thông xuyên qua cuộn 2, gây ra suất điện động hỗ cảm tỷ lệ hệ số hỗ cảm M.',
    },
    circ: {
      label: 'Lý thuyết mạch (ELE1318)',
      formula: '\\dot{U}_1 = j\\omega L_1 \\dot{I}_1 \\pm j\\omega M \\dot{I}_2',
      explain: 'Áp dụng quy tắc dấu chấm cực cùng tên: hai dòng cùng vào (hoặc cùng ra) dấu chấm thì lấy dấu +, ngược lại lấy dấu −.',
    },
    sig: {
      label: 'Tín hiệu & Hệ thống (TEL1368)',
      formula: 'H_{12}(s) = \\frac{\\pm sM}{Z_{\\text{tải}}(s) + sL_2}',
      explain: 'Biến áp hỗ cảm đóng vai trò một mạng 2 cửa tuyến tính bất biến, truyền đạt thành phần biến thiên (AC) và chặn thành phần 1 chiều (DC).',
    },
    examTip: 'Thi tự luận Lý thuyết mạch rất hay bẫy chiều dòng điện I₁, I₂ đi vào/ra dấu chấm — luôn khoanh tròn 2 dấu chấm trước khi viết KVL!',
  },
  {
    id: 'bridge-discrete-sampling',
    title: 'Tín hiệu liên tục (Laplace s) → Lấy mẫu số (Biến đổi Z)',
    summary: 'Cầu nối chuyển từ mạch tương tự sang bộ xử lý tín hiệu số (DSP).',
    phys: {
      label: 'Vật lý 2 (BAS1225)',
      formula: 'x(t) \\xrightarrow{\\text{ADC, chu kỳ } T_s} x[n] = x(nT_s)',
      explain: 'Sóng điện từ và điện áp cảm biến trong tự nhiên luôn liên tục theo thời gian và biên độ.',
    },
    circ: {
      label: 'Lý thuyết mạch (ELE1318)',
      formula: 's = \\sigma + j\\omega \\quad (\\text{Miền ổn định: } \\sigma < 0)',
      explain: 'Mạch RLC vật lý cho đáp ứng hàm mũ e^{st}, hội tụ khi phần thực σ < 0 (nửa trái mặt phẳng s).',
    },
    sig: {
      label: 'Tín hiệu & Hệ thống (TEL1368)',
      formula: 'z = e^{sT_s} \\implies |z| = e^{\\sigma T_s} < 1 \\text{ khi } \\sigma < 0',
      explain: 'Ánh xạ z = e^{sT_s} biến nửa trái mặt phẳng s thành bên trong vòng tròn đơn vị |z| < 1. Đó là lý do hệ rời rạc ổn định khi mọi cực nằm trong |z| = 1!',
    },
    examTip: 'Nhớ công thức ánh xạ z = e^{sT_s} thì không bao giờ nhầm giữa "nửa trái trục ảo" (Laplace) và "trong vòng tròn đơn vị" (Z)!',
  },
];
