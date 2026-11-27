export const CAMPAIGN_STAGES = [
  {
    id: 'stage-1',
    order: 1,
    code: 'SECTOR-01',
    title: 'Trường Tĩnh & Tích Điện',
    subtitle: 'Từ Định lý Gauss → Tụ điện C → Tích phân Laplace 1/s',
    coords: { x: 10, y: 58 },
    bridge: {
      headline: 'Cùng một cơ chế tích trữ năng lượng điện trường qua lớp điện môi.',
      phys: {
        label: 'Vật lý 2 (BAS1225)',
        formula: '\\oint_{(S)} \\vec{E}\\cdot d\\vec{S} = \\frac{q_{\\text{trong}}}{\\varepsilon\\varepsilon_0}, \\quad j_d = \\varepsilon\\varepsilon_0\\frac{\\partial E}{\\partial t}',
        text: 'Điện tích sinh ra điện trường tĩnh (Gauss). Khi điện trường biến thiên trong tụ, xuất hiện dòng điện dịch j_d khép kín mạch.',
      },
      circ: {
        label: 'Lý thuyết mạch (ELE1318)',
        formula: 'i_C(t) = C\\frac{du_C}{dt}, \\quad \\dot{Z}_C = \\frac{1}{j\\omega C}',
        text: 'Gom toàn bộ hình học bản tụ và điện môi ε thành tham số tập trung C. Mạch chặn dòng DC và cho dòng AC đi qua.',
      },
      sig: {
        label: 'Tín hiệu & Hệ thống (TEL1368)',
        formula: '\\mathcal{L}\\left\\{\\int_0^t f(\\tau)d\\tau\\right\\} = \\frac{F(s)}{s}, \\quad H_{\\text{RC}}(s) = \\frac{1}{1 + sRC}',
        text: 'Áp trên tụ tích phân dòng điện (1/s), biến mạch RC thành bộ lọc thông thấp bậc nhất với cực thực âm s = −1/(RC).',
      },
      tip: 'Đi thi Vật lý 2 nhớ đọc kỹ đề là "quả cầu đặc tích điện khối" (bên trong E tỉ lệ r) hay "mặt cầu rỗng" (bên trong E = 0)!',
    },
    shieldTrials: [
      {
        question: 'Trong quả cầu đặc tâm O bán kính R tích điện khối đều Q > 0, cường độ điện trường tại điểm cách tâm r < R có quy luật nào?',
        options: [
          '$E = 0$ vì nằm bên trong vật tích điện',
          '$E = \\frac{Qr}{4\\pi\\varepsilon\\varepsilon_0 R^3}$ (tăng tuyến tính theo $r$)',
          '$E = \\frac{Q}{4\\pi\\varepsilon\\varepsilon_0 r^2}$ (tỉ lệ nghịch với $r^2$)',
        ],
        correctIndex: 1,
        explain: 'Quả cầu đặc tích điện khối có $q_{\\text{trong}} = Q(r/R)^3$. Chia cho $4\\pi r^2$ ta được $E$ tỉ lệ thuận với $r$ khi $r < R$.',
      },
      {
        question: 'Bắt lỗi nhanh: Tụ phẳng điện môi $\\varepsilon = 4$ đặt dưới điện áp $u(t) = U_0\\sin(\\omega t)$. Thí sinh tính mật độ dòng dịch $j_d = \\varepsilon_0\\frac{\\partial E}{\\partial t}$. Thiếu gì?',
        options: [
          'Thiếu nhân thêm hằng số điện môi $\\varepsilon = 4$',
          'Thiếu dấu trừ của định luật Lenz',
          'Không thiếu gì vì dòng dịch chỉ phụ thuộc chân không',
        ],
        correctIndex: 0,
        explain: 'Cảm ứng điện trong điện môi là $D = \\varepsilon\\varepsilon_0 E$, nên $j_d = \\frac{\\partial D}{\\partial t} = \\varepsilon\\varepsilon_0 \\frac{\\partial E}{\\partial t}$.',
      },
      {
        question: 'Liên kết 3 môn: Mạch tích phân dùng tụ $C$ có hàm truyền $H(s) = \\frac{1}{1 + sRC}$. Để mạch là hệ LTI ổn định BIBO, điều kiện của $R, C$ là gì?',
        options: [
          '$RC > 0$ để điểm cực $s = -1/(RC)$ nằm bên trái trục ảo',
          '$RC < 0$ để cực nằm bên phải trục ảo',
          'Mọi giá trị $RC \\neq 0$ đều ổn định',
        ],
        correctIndex: 0,
        explain: 'Cực $s = -1/(RC) < 0$ nằm nửa trái mặt phẳng phức $s$, đảm bảo ROC $\\text{Re}(s) > -1/(RC)$ chứa trục ảo $j\\omega$.',
      },
    ],
    boss: {
      name: 'Boss Tụ Cầu Maxwell',
      subjectLabel: 'Vật lý 2 (BAS1225) • Tự luận 2.0đ',
      statement:
        'Một quả cầu đặc bằng điện môi đồng chất (hằng số điện môi $\\varepsilon$), tâm $O$, bán kính $R$, tích điện đều theo thể tích với mật độ điện khối $\\rho > 0$. Dùng định lý Gauss thiết lập $\\vec{E}$ tại $M$ cách tâm $r$ cho cả 2 miền $r > R$ và $r < R$. Sau đó liên hệ nếu đặt điện áp xoay chiều $u(t) = U_0\\sin(\\omega t)$ lên tụ phẳng điện môi $\\varepsilon$ khoảng cách $d$, biểu thức mật độ dòng dịch $j_d(t)$ bằng bao nhiêu?',
      phases: [
        {
          stepTitle: 'Pha 1: Chọn mặt Gauss & thiết lập điện thông',
          score: '+0.5đ',
          checkpointQuestion: 'Mặt Gauss thích hợp nhất cho bài toán đối xứng cầu là gì?',
          checkpointOptions: [
            'Mặt cầu tâm $O$ bán kính $r$ đi qua điểm $M$',
            'Hình trụ đồng trục bán kính $R$',
            'Mặt phẳng vuông góc bán kính',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Do hệ đối xứng cầu, $\\vec{E}$ hướng xuyên tâm và có độ lớn không đổi trên mặt cầu tâm $O$ bán kính $r$. Chọn mặt Gauss $(S)$ là mặt cầu tâm $O$ bán kính $r$, ta có $\\vec{E} \\parallel d\\vec{S}$:\n$$\\Phi_e = \\oint_{(S)} \\vec{E}\\cdot d\\vec{S} = E \\cdot 4\\pi r^2 = \\frac{\\sum q_{\\text{trong}}}{\\varepsilon\\varepsilon_0}$$',
          trapNote: 'Phải nêu rõ lập luận đối xứng xuyên tâm để đưa $E$ ra ngoài dấu tích phân, nếu viết tắt ngay $E\\cdot 4\\pi r^2$ dễ bị trừ 0.25đ.',
        },
        {
          stepTitle: 'Pha 2: Tính $\\vec{E}$ ở miền ngoài ($r > R$) và miền trong ($r < R$)',
          score: '+1.0đ',
          checkpointQuestion: 'Ở miền trong $r < R$, điện tích $q_{\\text{trong}}$ tính theo $\\rho$ là biểu thức nào?',
          checkpointOptions: [
            '$q_{\\text{trong}} = \\rho\\cdot\\frac{4}{3}\\pi R^3$',
            '$q_{\\text{trong}} = \\rho\\cdot\\frac{4}{3}\\pi r^3$',
            '$q_{\\text{trong}} = \\rho\\cdot 4\\pi r^2$',
          ],
          checkpointCorrectIndex: 1,
          baremSolution:
            '* **Khi $r > R$:** Mặt Gauss bao trọn quả cầu $\\implies q_{\\text{trong}} = \\rho\\cdot\\frac{4}{3}\\pi R^3 \\implies E = \\frac{\\rho R^3}{3\\varepsilon\\varepsilon_0 r^2}$.\n* **Khi $r < R$:** Mặt Gauss chỉ chứa thể tích bán kính $r \\implies q_{\\text{trong}} = \\rho\\cdot\\frac{4}{3}\\pi r^3 \\implies E = \\frac{\\rho r}{3\\varepsilon\\varepsilon_0}$.',
          trapNote: 'Nhớ giữ nguyên $\\varepsilon$ trong mẫu số vì đề bài cho môi trường điện môi $\\varepsilon$, không phải chân không.',
        },
        {
          stepTitle: 'Pha 3: Chốt dòng điện dịch Maxwell trong tụ phẳng',
          score: '+0.5đ',
          checkpointQuestion: 'Với $E(t) = \\frac{U_0}{d}\\sin(\\omega t)$, mật độ dòng điện dịch $j_d(t)$ bằng:',
          checkpointOptions: [
            '$\\varepsilon\\varepsilon_0\\frac{U_0\\omega}{d}\\cos(\\omega t)$',
            '$-\\varepsilon\\varepsilon_0\\frac{U_0}{\\omega d}\\cos(\\omega t)$',
            '$\\frac{U_0\\omega}{d}\\cos(\\omega t)$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Cảm ứng điện $D(t) = \\varepsilon\\varepsilon_0 E(t) = \\varepsilon\\varepsilon_0\\frac{U_0}{d}\\sin(\\omega t)$.\nLấy đạo hàm theo thời gian:\n$$j_d(t) = \\frac{\\partial D}{\\partial t} = \\varepsilon\\varepsilon_0\\frac{U_0\\omega}{d}\\cos(\\omega t)$$',
          trapNote: 'Dòng điện dịch tỉ lệ với $\\omega$, chứng minh dung kháng $X_C = \\frac{1}{\\omega C}$ giảm khi tần số tăng!',
        },
      ],
    },
  },
  {
    id: 'stage-2',
    order: 2,
    code: 'SECTOR-02',
    title: 'Vòng Xoáy Từ Thông & Hỗ Cảm',
    subtitle: 'Từ Faraday–Maxwell → Cuộn cảm L & Hỗ cảm M → Đạo hàm s',
    coords: { x: 26, y: 34 },
    bridge: {
      headline: 'Từ trường biến thiên sinh điện trường xoáy và sức điện động cảm ứng.',
      phys: {
        label: 'Vật lý 2 (BAS1225)',
        formula: '\\oint_{(C)} \\vec{E}\\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}, \\quad \\Phi_{21} = M I_1',
        text: 'Từ thông biến thiên xuyên qua mạch kín sinh điện trường xoáy. Hai cuộn dây đặt gần nhau có từ thông móc vòng tạo hỗ cảm M.',
      },
      circ: {
        label: 'Lý thuyết mạch (ELE1318)',
        formula: '\\dot{U}_1 = j\\omega L_1\\dot{I}_1 \\pm j\\omega M\\dot{I}_2, \\quad L_{\\text{tđ}} = L_1+L_2\\pm 2M',
        text: 'Chiều sức điện động hỗ cảm được mã hóa gọn bằng quy tắc dấu chấm cực cùng tên.',
      },
      sig: {
        label: 'Tín hiệu & Hệ thống (TEL1368)',
        formula: '\\mathcal{L}\\{f\'(t)\\} = sF(s) - f(0_-), \\quad H(s) = \\frac{sL}{R + sL}',
        text: 'Đặc tính đạo hàm d/dt trở thành phép nhân s, tạo bộ lọc thông cao RL chặn DC (s=0) và thông tần số cao.',
      },
      tip: 'Cả Vật lý 2 (điện trường xoáy trụ r > R) lẫn Lý thuyết mạch (dấu hỗ cảm) đều cực thích bẫy hình học & dấu!',
    },
    shieldTrials: [
      {
        question: 'Trong trụ từ trường bán kính $R = 10\\text{ cm}$ có $B(t)$ biến thiên, tại điểm ngoài trụ $r = 25\\text{ cm}$ ($r > R$), diện tích tính từ thông qua vòng tròn bán kính $r$ là:',
        options: [
          '$S = \\pi r^2$',
          '$S = \\pi R^2$',
          '$S = \\pi(r^2 - R^2)$',
        ],
        correctIndex: 1,
        explain: 'Ngoài bán kính $R$ không có từ trường ($B = 0$), nên từ thông chỉ xuyên qua phần diện tích lõi trụ $S = \\pi R^2$.',
      },
      {
        question: 'Hai cuộn dây $L_1 = 0.2\\text{ H}$, $L_2 = 0.8\\text{ H}$ ghép hỗ cảm với hệ số ghép $k = 0.5$ mắc nối tiếp ngược (một dòng vào chấm, một dòng ra chấm). $L_{\\text{tđ}}$ bằng:',
        options: [
          '$1.4\\text{ H}$',
          '$0.6\\text{ H}$',
          '$0.8\\text{ H}$',
        ],
        correctIndex: 1,
        explain: '$M = k\\sqrt{L_1 L_2} = 0.5\\sqrt{0.16} = 0.2\\text{ H}$. Mắc ngược nên $L_{\\text{tđ}} = L_1 + L_2 - 2M = 0.2 + 0.8 - 0.4 = 0.6\\text{ H}$.',
      },
      {
        question: 'Khung dây vuông cạnh $a = 10\\text{ cm}$ đặt vuông góc từ trường $B(t) = 2t$. Điện trở khung $R = 0.5\\,\\Omega$. Dòng điện cảm ứng bằng:',
        options: [
          '$0.04\\text{ A}$',
          '$400\\text{ A}$',
          '$0.4\\text{ A}$',
        ],
        correctIndex: 0,
        explain: 'Đổi $S = (0.1)^2 = 0.01\\text{ m}^2 \\implies |e_c| = S\\frac{dB}{dt} = 0.01\\times 2 = 0.02\\text{ V} \\implies I_c = \\frac{0.02}{0.5} = 0.04\\text{ A}$.',
      },
    ],
    boss: {
      name: 'Boss Xoáy Trường & Hỗ Cảm',
      subjectLabel: 'Liên hợp VL2 + LTM • Tự luận 2.5đ',
      statement:
        'a) Trong hình trụ tròn dài vô hạn bán kính $R = 10\\text{ cm}$ có từ trường đều dọc trục $B(t) = 0.2t^2 + 0.5t\\text{ (T)}$. Tính cường độ điện trường xoáy tại $t = 2\\text{ s}$ ở hai vị trí $r_1 = 4\\text{ cm}$ và $r_2 = 20\\text{ cm}$.\nb) Hai cuộn dây $L_1 = 0.2\\text{ H}, L_2 = 0.8\\text{ H}$, hệ số ghép $k = 0.5$ mắc nối tiếp thuận vào nguồn $\\omega = 100\\text{ rad/s}, U = 140\\text{ V}$ (bỏ qua $R$). Tìm dòng điện hiệu dụng $I$.',
      phases: [
        {
          stepTitle: 'Pha 1: Tính tốc độ biến thiên $dB/dt$ & Điện trường xoáy trong trụ ($r_1 = 4\\text{ cm}$)',
          score: '+0.75đ',
          checkpointQuestion: 'Tại $t = 2\\text{ s}$, giá trị $\\frac{dB}{dt}$ và công thức $E$ khi $r_1 < R$ là:',
          checkpointOptions: [
            '$\\frac{dB}{dt} = 1.3\\text{ T/s}$ và $E = \\frac{r_1}{2}\\frac{dB}{dt}$',
            '$\\frac{dB}{dt} = 1.8\\text{ T/s}$ và $E = r_1\\frac{dB}{dt}$',
            '$\\frac{dB}{dt} = 1.3\\text{ T/s}$ và $E = \\frac{R^2}{2r_1}\\frac{dB}{dt}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Đạo hàm tại $t = 2\\text{ s}$: $\\frac{dB}{dt} = 0.4t + 0.5 = 0.4(2) + 0.5 = 1.3\\text{ T/s}$.\nĐổi $r_1 = 0.04\\text{ m} < R = 0.1\\text{ m}$. Áp dụng $\\oint \\vec{E}\\cdot d\\vec{l} = E\\cdot 2\\pi r_1 = \\pi r_1^2\\left|\\frac{dB}{dt}\\right|$:\n$$E(r_1) = \\frac{r_1}{2}\\left|\\frac{dB}{dt}\\right| = \\frac{0.04}{2}\\times 1.3 = 0.026\\text{ V/m}$$',
          trapNote: 'Luôn đổi cm → m ngay ở dòng đầu để không sai hệ số $10^{-2}$.',
        },
        {
          stepTitle: 'Pha 2: Tính điện trường xoáy ngoài trụ ($r_2 = 20\\text{ cm} > R$)',
          score: '+0.75đ',
          checkpointQuestion: 'Tại $r_2 = 0.2\\text{ m} > R = 0.1\\text{ m}$, giá trị $E(r_2)$ bằng bao nhiêu?',
          checkpointOptions: [
            '$0.13\\text{ V/m}$',
            '$0.0325\\text{ V/m}$',
            '$0.065\\text{ V/m}$',
          ],
          checkpointCorrectIndex: 1,
          baremSolution:
            'Vì từ trường chỉ nằm trong bán kính $R = 0.1\\text{ m}$, diện tích giới hạn là $\\pi R^2$:\n$$E\\cdot 2\\pi r_2 = \\pi R^2\\left|\\frac{dB}{dt}\\right| \\implies E(r_2) = \\frac{R^2}{2r_2}\\left|\\frac{dB}{dt}\\right| = \\frac{0.1^2}{2\\times 0.2}\\times 1.3 = 0.0325\\text{ V/m}$$',
          trapNote: 'Tuyệt đối không dùng $\\pi r_2^2$ ở miền ngoài trụ!',
        },
        {
          stepTitle: 'Pha 3: Tính hỗ cảm $M$ & Dòng mạch nối tiếp thuận',
          score: '+1.0đ',
          checkpointQuestion: 'Với $L_1=0.2\\text{ H}, L_2=0.8\\text{ H}, k=0.5$, $L_{\\text{thuận}}$ và $I$ bằng:',
          checkpointOptions: [
            '$L_{\\text{thuận}} = 1.4\\text{ H}, \\ I = 1\\text{ A}$',
            '$L_{\\text{thuận}} = 1.2\\text{ H}, \\ I = 1.17\\text{ A}$',
            '$L_{\\text{thuận}} = 0.6\\text{ H}, \\ I = 2.33\\text{ A}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Hỗ cảm: $M = k\\sqrt{L_1 L_2} = 0.5\\sqrt{0.2\\times 0.8} = 0.2\\text{ H}$.\nMắc nối tiếp thuận (dòng cùng chiều vào đầu chấm): $L_{\\text{thuận}} = L_1 + L_2 + 2M = 0.2 + 0.8 + 0.4 = 1.4\\text{ H}$.\nCảm kháng: $X_L = \\omega L_{\\text{thuận}} = 100\\times 1.4 = 140\\,\\Omega \\implies I = \\frac{U}{X_L} = \\frac{140}{140} = 1\\text{ A}$.',
          trapNote: 'Quên hệ số 2 trước $M$ ($L_1 + L_2 + M$) là lỗi mất điểm phổ biến nhất chương hỗ cảm.',
        },
      ],
    },
  },
  {
    id: 'stage-3',
    order: 3,
    code: 'SECTOR-03',
    title: 'Cú Đấm Quá Độ & Miền s',
    subtitle: 'Bảo toàn năng lượng → Đóng mở 0₊ & Toán tử p → Laplace H(s) & BIBO',
    coords: { x: 43, y: 63 },
    bridge: {
      headline: 'Quá trình quá độ trong Lý thuyết mạch chính là giải bài toán hệ thống LTI bằng Laplace.',
      phys: {
        label: 'Vật lý 2 (BAS1225)',
        formula: 'W_E = \\frac{1}{2}C u_C^2, \\quad W_B = \\frac{1}{2}L i_L^2',
        text: 'Năng lượng trường điện và trường từ là đại lượng liên tục — không thể nhảy vọt tức thời trong khoảng thời gian dt = 0.',
      },
      circ: {
        label: 'Lý thuyết mạch (ELE1318)',
        formula: 'u_C(0_+) = u_C(0_-), \\quad i_L(0_+) = i_L(0_-)',
        text: 'Từ bảo toàn năng lượng suy ra luật đóng mở. Chuyển mạch sang miền ảnh p giúp giải thẳng mạch RLC mà không cần lập pt vi phân.',
      },
      sig: {
        label: 'Tín hiệu & Hệ thống (TEL1368)',
        formula: 'H(s) = \\frac{Y(s)}{X(s)}, \\quad \\text{Ổn định BIBO} \\iff \\text{Re}(p_k) < 0',
        text: 'Nghiệm đặc trưng của mạch quá độ chính là điểm cực (poles) của hàm truyền H(s). Cực bên trái trục ảo đảm bảo quá độ tắt dần về 0.',
      },
      tip: 'Câu 3 điểm chắc chắn có ở CẢ HAI môn Lý thuyết mạch và Tín hiệu hệ thống — cày chắc Ải này là ăn chắc 30% tổng điểm hai môn!',
    },
    shieldTrials: [
      {
        question: 'Trong mạch có nguồn một chiều $E = 10\\text{ V}$ đóng vào mạch tại $t = 0$. Khi chuyển sang sơ đồ toán tử miền $p$, nguồn $E$ trở thành:',
        options: [
          '$10$',
          '$\\frac{10}{p}$',
          '$10p$',
        ],
        correctIndex: 1,
        explain: 'Nguồn đóng vào tại $t = 0$ tương đương hàm bậc thang $10u(t)$, có ảnh Laplace là $\\frac{10}{p}$.',
      },
      {
        question: 'Hệ LTI nhân quả có $H(s) = \\frac{2s + 1}{(s + 2)(s + 3)}$. Miền hội tụ ROC và tính ổn định của hệ là:',
        options: [
          'ROC: $\\text{Re}(s) > -2$, hệ ỔN ĐỊNH BIBO',
          'ROC: $\\text{Re}(s) > -3$, hệ không ổn định',
          'ROC: $-3 < \\text{Re}(s) < -2$, hệ ổn định',
        ],
        correctIndex: 0,
        explain: 'Hệ nhân quả có ROC nằm bên phải cực lớn nhất (cực ngoài cùng bên phải là $-2$), tức $\\text{Re}(s) > -2$. Miền này chứa trục ảo $\\text{Re}(s) = 0$ nên hệ ổn định BIBO.',
      },
      {
        question: 'Mạch tụ có sơ kiện $u_C(0_-) = 5\\text{ V}$. Trong sơ đồ toán tử áp dụng KVL, tụ điện được thay bằng tổng trở $\\frac{1}{pC}$ nối tiếp với nguồn áp phụ nào?',
        options: [
          'Nguồn áp $\\frac{5}{p}$ cùng chiều sụt áp của dòng đi vào bản dương ban đầu',
          'Nguồn áp $5p$ ngược chiều dòng điện',
          'Không cần nguồn phụ vì $u_C$ không đổi',
        ],
        correctIndex: 0,
        explain: 'Từ $i_C = C\\frac{du_C}{dt} \\implies I_C(p) = pC U_C(p) - C u_C(0_-) \\implies U_C(p) = \\frac{1}{pC}I_C(p) + \\frac{u_C(0_-)}{p}$.',
      },
    ],
    boss: {
      name: 'Boss Quá Độ RLC & Cực s',
      subjectLabel: 'LTM (ELE1318) & TH&HT (TEL1368) • Tự luận 3.0đ',
      statement:
        'Mạch $RLC$ nối tiếp gồm $E = 10\\text{ V}$ (DC), $R = 3\\,\\Omega$, $L = 1\\text{ H}$, $C = 0.5\\text{ F}$. Trước $t = 0$ khóa $K$ mở và mạch chưa tích điện ($i_L(0_-) = 0, u_C(0_-) = 0$). Tại $t = 0$ đóng khóa $K$. Dùng toán tử Laplace tìm $i(t)$ và $u_C(t)$ với $t \\ge 0$, đồng thời chỉ rõ điểm cực của $H(s) = \\frac{U_C(s)}{E(s)}$ và nhận xét tính ổn định.',
      phases: [
        {
          stepTitle: 'Pha 1: Sơ kiện & Tổng trở toán tử $Z(p)$',
          score: '+0.75đ',
          checkpointQuestion: 'Với $R=3, L=1, C=0.5$, tổng trở toán tử $Z(p) = R + pL + \\frac{1}{pC}$ thu gọn thành:',
          checkpointOptions: [
            '$\\frac{p^2 + 3p + 2}{p} = \\frac{(p+1)(p+2)}{p}$',
            '$\\frac{p^2 + 3p + 0.5}{p}$',
            '$\\frac{p^2 + 6p + 2}{p}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Sơ kiện: $i_L(0_+) = i_L(0_-) = 0\\text{ A}$, $u_C(0_+) = u_C(0_-) = 0\\text{ V}$ (không có nguồn phụ).\nNguồn ảnh: $E(p) = \\frac{10}{p}$.\nTổng trở toán tử: $Z(p) = 3 + p + \\frac{1}{0.5p} = 3 + p + \\frac{2}{p} = \\frac{(p+1)(p+2)}{p}$.',
          trapNote: 'Nhớ $\\frac{1}{0.5p} = \\frac{2}{p}$, nhiều bạn tính nhầm thành $\\frac{0.5}{p}$!',
        },
        {
          stepTitle: 'Pha 2: Tìm ảnh $I(p)$ & biến đổi ngược về $i(t)$',
          score: '+1.0đ',
          checkpointQuestion: 'Tách phân thức $I(p) = \\frac{E(p)}{Z(p)} = \\frac{10}{(p+1)(p+2)}$ thu được $i(t)$ là:',
          checkpointOptions: [
            '$i(t) = 10(e^{-t} - e^{-2t})u(t)\\text{ A}$',
            '$i(t) = 5(e^{-t} - e^{-2t})u(t)\\text{ A}$',
            '$i(t) = 10(1 - e^{-t})u(t)\\text{ A}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            '$$I(p) = \\frac{10/p}{(p+1)(p+2)/p} = \\frac{10}{(p+1)(p+2)} = \\frac{10}{p+1} - \\frac{10}{p+2}$$\nBiến đổi Laplace ngược:\n$$i(t) = 10\\left(e^{-t} - e^{-2t}\\right)u(t)\\text{ (A)}$$',
          trapNote: 'Kiểm tra ngay: tại $t = 0_+$, $i(0_+) = 10(1 - 1) = 0$, khớp với $i_L(0_-) = 0$!',
        },
        {
          stepTitle: 'Pha 3: Tìm $u_C(t)$ & Nhận xét cực của hàm truyền $H(s)$',
          score: '+1.25đ',
          checkpointQuestion: 'Tìm các hệ số Heaviside của $U_C(p) = \\frac{20}{p(p+1)(p+2)} = \\frac{A}{p} + \\frac{B}{p+1} + \\frac{C}{p+2}$:',
          checkpointOptions: [
            '$A = 10, B = -20, C = 10$',
            '$A = 10, B = -10, C = 0$',
            '$A = 20, B = -20, C = 10$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            '$U_C(p) = \\frac{1}{pC}I(p) = \\frac{2}{p}\\cdot\\frac{10}{(p+1)(p+2)} = \\frac{20}{p(p+1)(p+2)}$.\nHeaviside: $A = 10$, $B = \\frac{20}{(-1)(1)} = -20$, $C = \\frac{20}{(-2)(-1)} = 10$.\n$$u_C(t) = \\left(10 - 20e^{-t} + 10e^{-2t}\\right)u(t)\\text{ (V)}$$\nHàm truyền $H(s) = \\frac{2}{s^2+3s+2}$ có 2 cực thực âm $p_1 = -1, p_2 = -2$ (ROC $\\text{Re}(s) > -1$ chứa trục ảo) $\\implies$ mạch **quá tắt và ổn định BIBO**.',
          trapNote: 'Kiểm tra vật lý $t \\to \\infty$: $u_C(\\infty) = 10\\text{ V} = E$, $i(\\infty) = 0\\text{ A}$. Khớp 100%!',
        },
      ],
    },
  },
  {
    id: 'stage-4',
    order: 4,
    code: 'SECTOR-04',
    title: 'Vũ Điệu Cộng Hưởng & Phổ',
    subtitle: 'Dao động LC / Khe Young → Cộng hưởng Q & Thevenin → Phổ Fourier',
    coords: { x: 60, y: 34 },
    bridge: {
      headline: 'Chuyển mạch từ miền thời gian sang miền tần số jω để thiết kế bộ lọc & sóng mang.',
      phys: {
        label: 'Vật lý 2 (BAS1225)',
        formula: '\\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad \\Delta\\varphi = \\frac{2\\pi\\Delta d}{\\lambda}',
        text: 'Dao động điện từ LC tuần hoàn trao đổi năng lượng không mất mát (khi R=0); giao thoa sóng ánh sáng cộng hưởng theo pha.',
      },
      circ: {
        label: 'Lý thuyết mạch (ELE1318)',
        formula: 'Q = \\frac{\\omega_0 L}{R}, \\quad \\Delta\\omega = \\frac{\\omega_0}{Q}, \\quad \\dot{Z}_t = \\dot{Z}_{th}^*',
        text: 'Mạch cộng hưởng chọn lọc tần số ω₀ trong dải thông Δω; định lý Thevenin phối hợp trở kháng cho công suất tải cực đại.',
      },
      sig: {
        label: 'Tín hiệu & Hệ thống (TEL1368)',
        formula: 'X(j\\omega) = \\int_{-\\infty}^{\\infty} x(t)e^{-j\\omega t}dt, \\quad Y(j\\omega) = H(j\\omega)X(j\\omega)',
        text: 'Thay s = jω để thu được đáp ứng tần số H(jω). Mạch lọc cộng hưởng RLC chính là bộ lọc thông dải có đỉnh tại ω₀!',
      },
      tip: 'Khi tìm phổ biên độ $|X(j\\omega)|$ nhớ đặt trị tuyệt đối cho hàm $\\cos$ hoặc $\\text{sinc}$ — biên độ phổ không bao giờ âm!',
    },
    shieldTrials: [
      {
        question: 'Mạch $RLC$ nối tiếp đang cộng hưởng tại $\\omega_0$, hệ số phẩm chất $Q = 10$, biên độ nguồn $U_m = 20\\text{ V}$. Biên độ áp trên tụ $U_{Cm}$ bằng:',
        options: [
          '$20\\text{ V}$ (bằng điện áp nguồn)',
          '$200\\text{ V}$ (quá áp gấp $Q$ lần nguồn)',
          '$2\\text{ V}$',
        ],
        correctIndex: 1,
        explain: 'Tại cộng hưởng $U_L$ và $U_C$ ngược pha triệt tiêu nhau, nhưng biên độ trên từng phần tử phóng đại $Q$ lần: $U_{Cm} = Q\\cdot U_m = 200\\text{ V}$.',
      },
      {
        question: 'Dùng định lý Thevenin: nguồn tương đương có $\\dot{Z}_{th} = 4 + j3\\,\\Omega$. Tải $\\dot{Z}_t$ nhận công suất tác dụng cực đại khi:',
        options: [
          '$\\dot{Z}_t = 4 + j3\\,\\Omega$',
          '$\\dot{Z}_t = 4 - j3\\,\\Omega$',
          '$\\dot{Z}_t = 5\\,\\Omega$',
        ],
        correctIndex: 1,
        explain: 'Điều kiện phối hợp trở kháng liên hợp phức: $\\dot{Z}_t = \\dot{Z}_{th}^* = 4 - j3\\,\\Omega$ để phần ảo triệt tiêu hết.',
      },
      {
        question: 'Biến đổi Fourier của xung dịch thời gian $x(t - t_0)$ có mối quan hệ gì với $X(j\\omega)$?',
        options: [
          'Nhân thêm $e^{-j\\omega t_0}$ (chỉ đổi phổ pha, không đổi phổ biên độ)',
          'Nhân thêm $e^{+j\\omega t_0}$',
          'Dịch tần số sang $\\omega - t_0$',
        ],
        correctIndex: 0,
        explain: '$\\mathcal{F}\\{x(t-t_0)\\} = e^{-j\\omega t_0}X(j\\omega)$. Vì $|e^{-j\\omega t_0}| = 1$, phổ biên độ giữ nguyên còn phổ pha trượt thêm $-\\omega t_0$.',
      },
    ],
    boss: {
      name: 'Boss Cộng Hưởng & Phổ Tần Số',
      subjectLabel: 'LTM (ELE1318) & TH&HT (TEL1368) • Tự luận 2.5đ',
      statement:
        'a) Mạch $RLC$ nối tiếp $R = 10\\,\\Omega, L = 10\\text{ mH}, C = 1\\,\\mu\\text{F}$ cấp nguồn $U_m = 20\\text{ V}$. Tính $\\omega_0$, hệ số phẩm chất $Q$, băng thông $\\Delta\\omega$ và điện áp cực đại trên tụ khi cộng hưởng.\nb) Tìm biến đổi Fourier $X(j\\omega)$ và biểu thức phổ biên độ $|X(j\\omega)|$ của tín hiệu $x(t) = e^{-2t}u(t) + e^{-2(t-1)}u(t-1)$.',
      phases: [
        {
          stepTitle: 'Pha 1: Tần số cộng hưởng $\\omega_0$ & Hệ số phẩm chất $Q$',
          score: '+0.75đ',
          checkpointQuestion: 'Với $L = 10^{-2}\\text{ H}, C = 10^{-6}\\text{ F}, R = 10\\,\\Omega$, cặp $(\\omega_0, Q)$ bằng:',
          checkpointOptions: [
            '$\\omega_0 = 10^4\\text{ rad/s}, \\ Q = 10$',
            '$\\omega_0 = 10^3\\text{ rad/s}, \\ Q = 1$',
            '$\\omega_0 = 10^4\\text{ rad/s}, \\ Q = 100$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            '$$\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{10^{-2}\\times 10^{-6}}} = 10^4\\text{ rad/s}$$\n$$Q = \\frac{\\omega_0 L}{R} = \\frac{10^4\\times 10^{-2}}{10} = 10, \\quad \\Delta\\omega = \\frac{\\omega_0}{Q} = 1000\\text{ rad/s}, \\quad U_{Cm} = Q\\cdot U_m = 200\\text{ V}$$',
          trapNote: 'Đề hay hỏi băng thông theo Hz ($\\Delta f = \\frac{\\Delta\\omega}{2\\pi}$), phải đọc kỹ đơn vị!',
        },
        {
          stepTitle: 'Pha 2: Tính $X(j\\omega)$ bằng cặp chuẩn & dịch thời gian',
          score: '+0.75đ',
          checkpointQuestion: 'Áp dụng $e^{-2t}u(t) \\leftrightarrow \\frac{1}{2+j\\omega}$, kết quả $X(j\\omega)$ là:',
          checkpointOptions: [
            '$\\frac{1 + e^{-j\\omega}}{2 + j\\omega}$',
            '$\\frac{1 + e^{+j\\omega}}{2 + j\\omega}$',
            '$\\frac{1}{2 + j\\omega} + \\frac{e^{-2}}{2 + j\\omega}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Dịch $e^{-2t}u(t)$ sang phải $t_0 = 1$ thu được $e^{-2(t-1)}u(t-1) \\leftrightarrow \\frac{e^{-j\\omega}}{2 + j\\omega}$.\nCộng tuyến tính:\n$$X(j\\omega) = \\frac{1 + e^{-j\\omega}}{2 + j\\omega}$$',
          trapNote: 'Không tách rời hệ số $e^{-2}$ ra ngoài khi biểu thức là $e^{-2(t-1)}u(t-1)$ — toàn bộ hàm đã dịch sang $t-1$!',
        },
        {
          stepTitle: 'Pha 3: Rút gọn Euler tìm phổ biên độ $|X(j\\omega)|$',
          score: '+1.0đ',
          checkpointQuestion: 'Dùng công thức Euler rút gọn $|1 + e^{-j\\omega}|$ ta được:',
          checkpointOptions: [
            '$2|\\cos(\\omega/2)|$',
            '$2\\sin(\\omega/2)$',
            '$\\sqrt{1 + \\cos\\omega}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Đặt $e^{-j\\omega/2}$ làm nhân tử chung:\n$$1 + e^{-j\\omega} = e^{-j\\omega/2}(e^{j\\omega/2} + e^{-j\\omega/2}) = 2\\cos\\left(\\frac{\\omega}{2}\\right)e^{-j\\omega/2}$$\nSuy ra phổ biên độ:\n$$|X(j\\omega)| = \\frac{2\\left|\\cos(\\omega/2)\\right|}{\\sqrt{4 + \\omega^2}}$$',
          trapNote: 'Bắt buộc có dấu trị tuyệt đối $|\\cos(\\omega/2)|$, nếu thiếu sẽ bị trừ 0.25đ!',
        },
      ],
    },
  },
  {
    id: 'stage-5',
    order: 5,
    code: 'SECTOR-05',
    title: 'Ma Trận Mạng & Tích Chập',
    subtitle: 'Đường truyền vật lý → Thế nút & Mạng 4 cực [A] → Tích chập LTI',
    coords: { x: 76, y: 60 },
    bridge: {
      headline: 'Mô tả hệ thống từ sơ đồ mạch nhiều cửa đến phép tích chập tổng quát.',
      phys: {
        label: 'Vật lý 2 (BAS1225)',
        formula: 'I_{\\text{vào}} = I_{\\text{ra}}, \\quad \\text{Tuyến tính chất liệu } \\vec{D} = \\varepsilon\\varepsilon_0\\vec{E}',
        text: 'Tính tuyến tính của môi trường điện–từ (khi hằng số ε, μ không phụ thuộc cường độ trường) là gốc rễ của nguyên lý xếp chồng.',
      },
      circ: {
        label: 'Lý thuyết mạch (ELE1318)',
        formula: '\\begin{bmatrix}\\dot{U}_1\\\\\\dot{I}_1\\end{bmatrix} = \\begin{bmatrix}A&B\\\\C&D\\end{bmatrix}\\begin{bmatrix}\\dot{U}_2\\\\\\dot{I}_2\\end{bmatrix}, \\quad AD - BC = 1',
        text: 'Mạng 4 cực đóng gói toàn bộ mạch nút/vòng thành 1 ma trận truyền đạt [A], ghép nhiều tầng chỉ cần nhân ma trận.',
      },
      sig: {
        label: 'Tín hiệu & Hệ thống (TEL1368)',
        formula: 'y(t) = x(t)*h(t) = \\int_{-\\infty}^{+\\infty} x(\\tau)h(t-\\tau)d\\tau',
        text: 'Hệ thống LTI tổng quát được đặc trưng duy nhất bởi đáp ứng xung h(t) (tương ứng mạng 2 cửa khi đặt vào xung Dirac δ(t)).',
      },
      tip: 'Cả Mạng 4 cực lẫn Tích chập đều có công thức kiểm chứng nhanh (AD − BC = 1 và tính liên tục tại các mốc t) — dùng để tự chấm bài ngay tại bàn thi!',
    },
    shieldTrials: [
      {
        question: 'Hệ thống $y(t) = t\\cdot x(t-2)$ vi phạm tính chất nào trong 4 tính chất cơ bản?',
        options: [
          'Tuyến tính và Nhân quả',
          'Bất biến theo thời gian và Ổn định BIBO',
          'Chỉ vi phạm tính Nhân quả',
        ],
        correctIndex: 1,
        explain: 'Hệ số $t$ đứng trước làm hệ biến thiên theo thời gian; ngoài ra khi $x(t) = 1$, $|y(t)| = |t| \\to \\infty$ nên không ổn định BIBO.',
      },
      {
        question: 'Khi tìm thông số $A, C$ của mạng 4 cực ($\\dot{U}_1 = A\\dot{U}_2 + B\\dot{I}_2, \\dot{I}_1 = C\\dot{U}_2 + D\\dot{I}_2$), ta đặt điều kiện cửa 2 như thế nào?',
        options: [
          'Hở mạch cửa 2 ($\\dot{I}_2 = 0$)',
          'Ngắn mạch cửa 2 ($\\dot{U}_2 = 0$)',
          'Nối tải $Z_t = 1\\,\\Omega$',
        ],
        correctIndex: 0,
        explain: 'Khi $\\dot{I}_2 = 0$ (không tải), $A = \\dot{U}_1/\\dot{U}_2$ và $C = \\dot{I}_1/\\dot{U}_2$. Còn ngắn mạch ($\dot{U}_2 = 0$) để tìm $B, D$.',
      },
      {
        question: 'Tích chập rời rạc $y[n] = x[n] * h[n]$ với $x[n]$ dài $4$ mẫu và $h[n]$ dài $3$ mẫu sẽ cho $y[n]$ có độ dài bao nhiêu mẫu?',
        options: [
          '$7$ mẫu',
          '$6$ mẫu',
          '$12$ mẫu',
        ],
        correctIndex: 1,
        explain: 'Công thức chuẩn: $L_y = L_x + L_h - 1 = 4 + 3 - 1 = 6$ mẫu.',
      },
    ],
    boss: {
      name: 'Boss Tích Chập & Mạng 4 Cực',
      subjectLabel: 'TH&HT (TEL1368) & LTM (ELE1318) • Tự luận 3.0đ',
      statement:
        'a) (1.5đ) Tính tích chập $y(t) = x(t)*h(t)$ với $x(t) = u(t) - u(t-2)$ và $h(t) = e^{-t}u(t)$.\nb) (1.5đ) Cho mạng 4 cực chữ $T$ gồm hai nhánh nối tiếp $Z_1 = 2\\,\\Omega, Z_2 = 4\\,\\Omega$ và nhánh rẽ song song ở giữa $Z_3 = 2\\,\\Omega$. Tìm ma trận $[A]$ ($\\dot{I}_2$ hướng ra) và kiểm chứng $AD - BC = 1$.',
      phases: [
        {
          stepTitle: 'Pha 1: Tính tích chập chia 3 miền của $t$',
          score: '+1.5đ',
          checkpointQuestion: 'Trong miền $t \\ge 2$, cận tích phân đúng của $y(t) = \\int x(\\tau)h(t-\\tau)d\\tau$ là:',
          checkpointOptions: [
            '$\\int_0^2 e^{-(t-\\tau)}d\\tau = (e^2 - 1)e^{-t}$',
            '$\\int_0^t e^{-(t-\\tau)}d\\tau = 1 - e^{-t}$',
            '$\\int_2^t e^{-(t-\\tau)}d\\tau = 1 - e^{-(t-2)}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            '* $t < 0$: Không giao $\\implies y(t) = 0$.\n* $0 \\le t < 2$: Giao trên $[0, t] \\implies y(t) = \\int_0^t e^{-(t-\\tau)}d\\tau = 1 - e^{-t}$.\n* $t \\ge 2$: Giao phủ trọn $[0, 2] \\implies y(t) = \\int_0^2 e^{-(t-\\tau)}d\\tau = (e^2 - 1)e^{-t}$.\nKiểm tra tại $t=2$: $1 - e^{-2} = (e^2-1)e^{-2}$ (liên tục chuẩn!).',
          trapNote: 'Lỗi hay mất trắng 0.75đ là tích phân tới $t$ thay vì dừng ở $2$ khi $t \\ge 2$.',
        },
        {
          stepTitle: 'Pha 2: Tính $A, C$ của mạng chữ $T$ ở chế độ không tải ($\\dot{I}_2 = 0$)',
          score: '+0.75đ',
          checkpointQuestion: 'Khi $\\dot{I}_2 = 0$, cặp thông số $(A, C)$ bằng:',
          checkpointOptions: [
            '$A = 2, \\ C = 0.5\\text{ S}$',
            '$A = 3, \\ C = 0.5\\text{ S}$',
            '$A = 2, \\ C = 0.25\\text{ S}$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Khi $\\dot{I}_2 = 0$, $\\dot{U}_1 = (Z_1 + Z_3)\\dot{I}_1 = 4\\dot{I}_1$ và $\\dot{U}_2 = Z_3\\dot{I}_1 = 2\\dot{I}_1$.\n$$\\implies A = \\frac{\\dot{U}_1}{\\dot{U}_2} = 2, \\quad C = \\frac{\\dot{I}_1}{\\dot{U}_2} = 0.5\\text{ S}$$',
          trapNote: 'Ghi rõ đơn vị của $C$ là Siemens ($\\text{S}$), của $B$ là $\\Omega$, còn $A, D$ không thứ nguyên.',
        },
        {
          stepTitle: 'Pha 3: Tính $B, D$ khi ngắn mạch ($\\dot{U}_2 = 0$) & kiểm chứng $AD-BC=1$',
          score: '+0.75đ',
          checkpointQuestion: 'Khi $\\dot{U}_2 = 0$, áp dụng chia dòng giữa $Z_2=4\\,\\Omega$ và $Z_3=2\\,\\Omega$, giá trị $(B, D)$ bằng:',
          checkpointOptions: [
            '$B = 10\\,\\Omega, \\ D = 3$',
            '$B = 6\\,\\Omega, \\ D = 1.5$',
            '$B = 10\\,\\Omega, \\ D = 1.5$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            '$Z_{\\text{vào}} = Z_1 + (Z_2 \\parallel Z_3) = 2 + \\frac{4\\times 2}{4+2} = \\frac{10}{3}\\,\\Omega$.\nChia dòng: $\\dot{I}_2 = \\dot{I}_1\\frac{Z_3}{Z_2+Z_3} = \\frac{1}{3}\\dot{I}_1 \\implies D = \\frac{\\dot{I}_1}{\\dot{I}_2} = 3$, $B = \\frac{10}{3}\\times 3 = 10\\,\\Omega$.\nKiểm tra: $AD - BC = 2\\times 3 - 10\\times 0.5 = 1$ (Chính xác!).',
          trapNote: 'Dòng chia qua nhánh $Z_2$ lấy tử số là $Z_3$ (nhánh đối diện), đừng lấy nhầm $Z_2$!',
        },
      ],
    },
  },
  {
    id: 'stage-6',
    order: 6,
    code: 'SECTOR-06',
    title: 'Kỷ Nguyên Số & Vòng Tròn Z',
    subtitle: 'Lấy mẫu ADC → Ánh xạ $z = e^{sT_s}$ → Biến đổi Z, ROC & Sai phân',
    coords: { x: 90, y: 34 },
    bridge: {
      headline: 'Đưa tín hiệu tương tự từ thế giới vật lý & mạch điện vào bộ xử lý số DSP.',
      phys: {
        label: 'Vật lý 2 (BAS1225)',
        formula: 'x(t) \\xrightarrow{\\text{Chu kỳ lấy mẫu } T_s} x[n] = x(nT_s)',
        text: 'Tín hiệu điện từ liên tục trong tự nhiên được lượng tử hóa và lấy mẫu rời rạc theo chu kỳ Ts.',
      },
      circ: {
        label: 'Lý thuyết mạch (ELE1318)',
        formula: 's = \\sigma + j\\omega \\xrightarrow{z = e^{sT_s}} |z| = e^{\\sigma T_s}',
        text: 'Nửa trái mặt phẳng s (σ < 0 — mạch quá độ tắt dần) ánh xạ gọn vào bên trong vòng tròn đơn vị |z| < 1.',
      },
      sig: {
        label: 'Tín hiệu & Hệ thống (TEL1368)',
        formula: 'X(z) = \\sum_{n=-\\infty}^{\\infty} x[n]z^{-n}, \\quad \\mathcal{Z}^+\\{y[n-1]\\} = z^{-1}Y^+(z) + y[-1]',
        text: 'Hệ rời rạc ổn định BIBO ⇔ ROC chứa vòng tròn đơn vị |z| = 1. Nếu vừa nhân quả vừa ổn định ⇔ mọi cực nằm trong |z| < 1.',
      },
      tip: 'Cả 2 câu Z cuối đề TEL1368: câu 2 phía bắt liệt kê đủ 3 ROC; câu 1 phía bắt nhớ dấu CỘNG ở +y[-1]!',
    },
    shieldTrials: [
      {
        question: 'Biến đổi Z ngược của $\\frac{1}{1 - 2z^{-1}}$ với miền hội tụ $|z| < 2$ là:',
        options: [
          '$2^n u[n]$',
          '$-2^n u[-n-1]$',
          '$2^n u[-n]$',
        ],
        correctIndex: 1,
        explain: 'Miền trong $|z| < |a|$ ứng với dãy bên trái (phản nhân quả), bắt buộc có dấu trừ và $u[-n-1]$: $-a^n u[-n-1]$.',
      },
      {
        question: 'Một hệ LTI rời rạc có cực tại $z = 0.5$ và $z = 2$. Muốn hệ thống **ỔN ĐỊNH BIBO**, ta phải chọn ROC nào?',
        options: [
          '$|z| > 2$',
          '$0.5 < |z| < 2$',
          '$|z| < 0.5$',
        ],
        correctIndex: 1,
        explain: 'Ổn định BIBO yêu cầu ROC chứa vòng tròn đơn vị $|z| = 1$. Chỉ có vành khuyên $0.5 < |z| < 2$ chứa $|z|=1$ (nhưng hệ sẽ không nhân quả).',
      },
      {
        question: 'Biến đổi Z một phía của $y[n-1]$ có điều kiện đầu $y[-1] = 2$ là:',
        options: [
          '$z^{-1}Y^+(z) - 2$',
          '$z^{-1}Y^+(z) + 2$',
          '$z Y^+(z) + 2$',
        ],
        correctIndex: 1,
        explain: 'Theo định nghĩa $\\sum_{n=0}^{\\infty} y[n-1]z^{-n} = y[-1] + z^{-1}Y^+(z) = z^{-1}Y^+(z) + 2$.',
      },
    ],
    boss: {
      name: 'Boss Vành Khuyên Z & Sai Phân',
      subjectLabel: 'Tín hiệu & Hệ thống (TEL1368) • Tự luận 3.0đ',
      statement:
        'a) (1.5đ) Tìm tất cả các ROC có thể có và $h[n]$ tương ứng của $H(z) = \\frac{1 - z^{-1}}{(1 - 0.5z^{-1})(1 - 2z^{-1})}$. Chỉ rõ ROC nào ổn định, ROC nào nhân quả.\nb) (1.5đ) Giải phương trình sai phân nhân quả $y[n] - 0.5y[n-1] = (0.25)^n u[n]$ ($n \\ge 0$) với $y[-1] = 2$.',
      phases: [
        {
          stepTitle: 'Pha 1: Tách phân thức tối giản $H(z)$ theo $z^{-1}$',
          score: '+0.75đ',
          checkpointQuestion: 'Phân tích $H(z) = \\frac{A}{1 - 0.5z^{-1}} + \\frac{B}{1 - 2z^{-1}}$ cho cặp $(A, B)$ là:',
          checkpointOptions: [
            '$A = 1/3, \\ B = 2/3$',
            '$A = 2/3, \\ B = 1/3$',
            '$A = -1/3, \\ B = 4/3$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Tại $z^{-1} = 2 \\implies A = \\frac{1 - 2}{1 - 4} = \\frac{1}{3}$. Tại $z^{-1} = 0.5 \\implies B = \\frac{1 - 0.5}{1 - 0.25} = \\frac{2}{3}$.\n$$H(z) = \\frac{1/3}{1 - 0.5z^{-1}} + \\frac{2/3}{1 - 2z^{-1}}$$',
          trapNote: 'Nên tách theo biến $z^{-1}$ để tra bảng thẳng ra $a^n u[n]$, nhanh và ít nhầm bậc $n-1$ hơn so với nhân $z$ lên tử!',
        },
        {
          stepTitle: 'Pha 2: Liệt kê 3 miền ROC & Biến đổi ngược đủ 3 trường hợp',
          score: '+1.0đ',
          checkpointQuestion: 'Ở miền ROC $0.5 < |z| < 2$ (hệ ổn định BIBO), biểu thức đúng của $h[n]$ là:',
          checkpointOptions: [
            '$\\frac{1}{3}(0.5)^n u[n] - \\frac{2}{3}2^n u[-n-1]$',
            '$\\frac{1}{3}(0.5)^n u[n] + \\frac{2}{3}2^n u[n]$',
            '$-\\frac{1}{3}(0.5)^n u[-n-1] + \\frac{2}{3}2^n u[n]$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            '1. **ROC $|z| > 2$ (Nhân quả, không ổn định):** $h_1[n] = \\left[\\frac{1}{3}(0.5)^n + \\frac{2}{3}2^n\\right]u[n]$.\n2. **ROC $0.5 < |z| < 2$ (Ổn định BIBO chứa $|z|=1$, không nhân quả):** $h_2[n] = \\frac{1}{3}(0.5)^n u[n] - \\frac{2}{3}2^n u[-n-1]$.\n3. **ROC $|z| < 0.5$ (Phản nhân quả, không ổn định):** $h_3[n] = -\\left[\\frac{1}{3}(0.5)^n + \\frac{2}{3}2^n\\right]u[-n-1]$.',
          trapNote: 'Thiếu 1 trong 3 ROC hoặc quên kết luận "nhân quả / ổn định" sẽ mất ngay 0.5đ.',
        },
        {
          stepTitle: 'Pha 3: Giải phương trình sai phân có $y[-1] = 2$ bằng Z một phía',
          score: '+1.25đ',
          checkpointQuestion: 'Sau khi thế $y[-1] = 2$, $Y^+(z)$ thu được kết quả $y[n]$ là:',
          checkpointOptions: [
            '$y[n] = \\left[3(0.5)^n - (0.25)^n\\right]u[n]$',
            '$y[n] = \\left[2(0.5)^n - (0.25)^n\\right]u[n]$',
            '$y[n] = \\left[(0.5)^n + (0.25)^n\\right]u[n]$',
          ],
          checkpointCorrectIndex: 0,
          baremSolution:
            'Biến đổi Z một phía: $Y^+(z) - 0.5[z^{-1}Y^+(z) + 2] = \\frac{1}{1 - 0.25z^{-1}}$.\n$$\\implies Y^+(z) = \\frac{1}{1 - 0.5z^{-1}} + \\frac{1}{(1 - 0.5z^{-1})(1 - 0.25z^{-1})} = \\frac{3}{1 - 0.5z^{-1}} - \\frac{1}{1 - 0.25z^{-1}}$$\n$$\\implies y[n] = \\left[3(0.5)^n - (0.25)^n\\right]u[n]$$',
          trapNote: 'Kiểm tra tại $n = 0$: $y[0] = 3 - 1 = 2$; thế pt gốc $y[0] = 0.5(2) + (0.25)^0 = 2$. Chuẩn!',
        },
      ],
    },
  },
];
