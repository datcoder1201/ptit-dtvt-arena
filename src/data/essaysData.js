export const ESSAYS_DATA = [
  // ================= VẬT LÝ 2 (BAS1225) =================
  {
    id: 'phys-1',
    subject: 'phys',
    topic: 'Điện trường & Định luật Gauss',
    title: 'Tính cường độ điện trường của quả cầu đặc tích điện khối đều',
    frequency: 'Rất hay ra',
    points: '2.0 điểm',
    linkNote: 'Cơ sở tính điện dung tụ cầu và phân bố điện trường trong linh kiện bán dẫn.',
    statement:
      'Một quả cầu đặc bằng điện môi đồng chất (hằng số điện môi $\\varepsilon$), tâm $O$, bán kính $R$, tích điện đều theo thể tích với mật độ điện khối $\\rho > 0$ (hoặc tổng điện tích $Q$). Sử dụng định lý Ostrogradsky–Gauss, hãy thiết lập biểu thức cường độ điện trường $\\vec{E}$ tại điểm $M$ cách tâm $O$ một khoảng $r$ trong hai trường hợp: a) $r > R$; b) $r < R$.',
    hint: 'Chọn mặt Gauss là mặt cầu tâm $O$ bán kính $r$. Chú ý sự khác nhau cốt lõi của $Q_{\\text{trong}}$ giữa quả cầu đặc (tích điện khối) và mặt cầu rỗng (tích điện mặt).',
    steps: [
      {
        title: 'Bước 1: Phát biểu định lý Ostrogradsky–Gauss & chọn mặt kín',
        score: '+0.5đ',
        content:
          'Theo định lý O–G, điện thông gửi qua mặt kín $(S)$ bất kỳ bằng tổng đại số các điện tích nằm bên trong mặt kín chia cho $\\varepsilon\\varepsilon_0$:\n$$\\Phi_e = \\oint_{(S)} \\vec{E}\\cdot d\\vec{S} = \\frac{\\sum q_{\\text{trong}}}{\\varepsilon\\varepsilon_0}$$\nDo tính đối xứng cầu, véctơ $\\vec{E}$ hướng xuyên tâm và có độ lớn $E$ như nhau tại mọi điểm cách tâm $O$ một khoảng $r$. Chọn mặt Gauss $(S)$ là mặt cầu tâm $O$ bán kính $r$. Khi đó $\\vec{E} \\parallel d\\vec{S}$, nên:\n$$\\Phi_e = E \\cdot 4\\pi r^2$$',
      },
      {
        title: 'Bước 2: Xét điểm M nằm ngoài quả cầu ($r > R$)',
        score: '+0.75đ',
        content:
          'Mặt Gauss bán kính $r > R$ bao trọn toàn bộ quả cầu nên điện tích bên trong là:\n$$q_{\\text{trong}} = Q = \\rho \\cdot \\frac{4}{3}\\pi R^3$$\nSuy ra:\n$$E \\cdot 4\\pi r^2 = \\frac{Q}{\\varepsilon\\varepsilon_0} \\implies E = \\frac{Q}{4\\pi\\varepsilon\\varepsilon_0 r^2} = \\frac{\\rho R^3}{3\\varepsilon\\varepsilon_0 r^2}$$',
      },
      {
        title: 'Bước 3: Xét điểm M nằm bên trong quả cầu ($r < R$)',
        score: '+0.75đ',
        content:
          'Mặt Gauss bán kính $r < R$ chỉ ôm phần thể tích $V\' = \\frac{4}{3}\\pi r^3$, nên điện tích chứa bên trong là:\n$$q_{\\text{trong}} = \\rho \\cdot \\frac{4}{3}\\pi r^3 = Q\\frac{r^3}{R^3}$$\nThay vào định lý Gauss:\n$$E \\cdot 4\\pi r^2 = \\frac{\\rho \\cdot \\frac{4}{3}\\pi r^3}{\\varepsilon\\varepsilon_0} \\implies E = \\frac{\\rho r}{3\\varepsilon\\varepsilon_0} = \\frac{Q r}{4\\pi\\varepsilon\\varepsilon_0 R^3}$$',
      },
    ],
    trap: 'Đọc kỹ đề là "mặt cầu tích điện đều" (bên trong $E = 0$) hay "quả cầu đặc tích điện đều theo thể tích" (bên trong $E \\propto r$). Viết thiếu hằng số điện môi $\\varepsilon$ nếu đề cho môi trường khác chân không cũng bị trừ 0.25đ!',
  },
  {
    id: 'phys-2',
    subject: 'phys',
    topic: 'Từ trường & Định luật Biot–Savart–Laplace',
    title: 'Thiết lập từ trường của đoạn dây dẫn thẳng có dòng điện $I$',
    frequency: 'Rất hay ra',
    points: '2.0 điểm',
    linkNote: 'Cơ sở tính độ tự cảm $L$ và hỗ cảm $M$ giữa hai đường dây truyền tín hiệu.',
    statement:
      'Một đoạn dây dẫn thẳng chiều dài hữu hạn mang dòng điện không đổi cường độ $I$ đặt trong không khí ($\\mu = 1$). Hãy dùng định luật Biot–Savart–Laplace thiết lập công thức cảm ứng từ $\\vec{B}$ tại điểm $M$ cách đường thẳng chứa dây một khoảng $h$, biết hai đầu dây nhìn từ $M$ dưới các góc $\\theta_1, \\theta_2$ (hoặc suy ra cho dây dài vô hạn).',
    hint: 'Lấy vi phân chiều dài $dl$, đổi biến tích phân toàn bộ theo góc $\\theta$ từ $\\theta_1$ đến $\\theta_2$ để khử $r$ và $l$.',
    steps: [
      {
        title: 'Bước 1: Viết công thức Biot–Savart–Laplace cho phần tử dòng điện',
        score: '+0.5đ',
        content:
          'Phần tử dòng điện $I d\\vec{l}$ gây ra tại điểm $M$ cách nó khoảng $r$ véctơ cảm ứng từ:\n$$d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I[d\\vec{l} \\times \\vec{r}]}{r^3}$$\nMọi phần tử $I d\\vec{l}$ trên dây thẳng đều tạo ra $d\\vec{B}$ có cùng phương vuông góc mặt phẳng chứa dây và $M$, cùng chiều (theo quy tắc nắm tay phải). Do đó $B = \\int dB$.',
      },
      {
        title: 'Bước 2: Biểu diễn hình học & đổi biến theo góc $\\theta$',
        score: '+0.75đ',
        content:
          'Gọi $H$ là hình chiếu vuông góc của $M$ lên dây ($MH = h$). Gọi $\\alpha$ là góc giữa $d\\vec{l}$ và $\\vec{r}$, $\\theta$ là góc hợp bởi đoạn $r$ và phương dây (hoặc góc ở đỉnh $M$ hợp với $MH$). Dùng góc $\\theta$ giữa $d\\vec{l}$ và $\\vec{r}$ (đi từ $\\theta_1$ đến $\\theta_2$):\n$$r = \\frac{h}{\\sin\\theta}, \\quad l = -h\\cot\\theta \\implies dl = \\frac{h\\,d\\theta}{\\sin^2\\theta}$$\nThay vào $dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\sin\\theta\\,dl}{r^2}$:\n$$dB = \\frac{\\mu_0 I}{4\\pi}\\frac{\\sin\\theta \\cdot \\frac{h\\,d\\theta}{\\sin^2\\theta}}{\\frac{h^2}{\\sin^2\\theta}} = \\frac{\\mu_0 I}{4\\pi h}\\sin\\theta\\,d\\theta$$',
      },
      {
        title: 'Bước 3: Lấy tích phân & xét trường hợp dây dài vô hạn',
        score: '+0.75đ',
        content:
          'Tích phân từ $\\theta_1$ đến $\\theta_2$:\n$$B = \\frac{\\mu_0 I}{4\\pi h}\\int_{\\theta_1}^{\\theta_2}\\sin\\theta\\,d\\theta = \\frac{\\mu_0 I}{4\\pi h}(\\cos\\theta_1 - \\cos\\theta_2)$$\nKhi dây dẫn **dài vô hạn**, $\\theta_1 \\to 0$ và $\\theta_2 \\to \\pi$:\n$$B = \\frac{\\mu_0 I}{4\\pi h}(1 - (-1)) = \\frac{\\mu_0 I}{2\\pi h}$$',
      },
    ],
    trap: 'Chú ý định nghĩa góc $\\theta_1, \\theta_2$: Nếu lấy góc hợp với phương dây thì ra $(\\cos\\theta_1 - \\cos\\theta_2)$, còn lấy góc hợp với đường vuông góc $MH$ thì ra $(\\sin\\alpha_1 + \\sin\\alpha_2)$. Phải vẽ hình minh họa rõ ràng góc mình đặt!',
  },
  {
    id: 'phys-3',
    subject: 'phys',
    topic: 'Cảm ứng điện từ Faraday',
    title: 'Thanh dẫn chuyển động trong từ trường & Suất điện động cảm ứng',
    frequency: 'Rất hay ra',
    points: '2.0 điểm',
    linkNote: 'Nguyên lý máy phát điện, cảm biến tốc độ và mạch đóng cắt tuyến tính.',
    statement:
      'Một khung dây dẫn hình chữ U đặt nằm ngang trong từ trường đều $\\vec{B}$ thẳng đứng hướng xuống ($B = 0.4\\text{ T}$). Thanh kim loại $MN$ dài $l = 25\\text{ cm}$ trượt không ma sát trên hai cạnh khung với vận tốc không đổi $v = 5\\text{ m/s}$ làm tăng diện tích mạch. Biết điện trở thanh $R = 2\\,\\Omega$ (bỏ qua điện trở khung). Tính suất điện động cảm ứng, cường độ dòng điện cảm ứng, chiều dòng điện và lực từ tác dụng lên thanh.',
    hint: 'Đổi $l = 0.25\\text{ m}$. Tính $|e_c| = B l v$ từ đạo hàm từ thông, dùng định luật Lenz xác định chiều dòng.',
    steps: [
      {
        title: 'Bước 1: Đổi đơn vị SI & tính suất điện động cảm ứng',
        score: '+0.75đ',
        content:
          'Đổi đơn vị: $l = 25\\text{ cm} = 0.25\\text{ m}$.\nSau thời gian $dt$, thanh dịch chuyển đoạn $dx = v\\,dt$, diện tích khung tăng thêm $dS = l\\,dx = l v\\,dt$. Độ biến thiên từ thông qua mạch:\n$$d\\Phi = B\\,dS\\cos 0^\\circ = B l v\\,dt$$\nTheo định luật Faraday:\n$$|e_c| = \\left|-\\frac{d\\Phi}{dt}\\right| = B l v = 0.4 \\times 0.25 \\times 5 = 0.5\\text{ V}$$',
      },
      {
        title: 'Bước 2: Cường độ và chiều dòng điện cảm ứng',
        score: '+0.75đ',
        content:
          'Cường độ dòng điện cảm ứng:\n$$I_c = \\frac{|e_c|}{R} = \\frac{0.5}{2} = 0.25\\text{ A}$$\n**Xác định chiều (Định luật Lenz):** Vì diện tích tăng nên từ thông hướng xuống tăng $\\implies$ dòng điện cảm ứng sinh ra từ trường cảm ứng $\\vec{B}_c$ hướng **lên trên** để chống lại sự tăng đó. Áp dụng quy tắc nắm tay phải $\\implies$ dòng điện chạy ngược chiều kim đồng hồ trong khung.',
      },
      {
        title: 'Bước 3: Tính lực từ cản trở chuyển động thanh',
        score: '+0.5đ',
        content:
          'Thanh mang dòng $I_c$ đặt vuông góc với $\\vec{B}$ chịu lực Laplace:\n$$F_{\\text{từ}} = B I_c l = 0.4 \\times 0.25 \\times 0.25 = 0.025\\text{ N}$$\nTheo quy tắc bàn tay trái (hoặc định luật Lenz), $\\vec{F}_{\\text{từ}}$ hướng ngược chiều vận tốc $\\vec{v}$ (cản trở chuyển động).',
      },
    ],
    trap: 'Quên đổi $l$ từ $\\text{cm}$ sang $\\text{m}$ làm sai kết quả gấp 100 lần; kết luận chiều dòng điện nhưng không nêu lập luận theo định luật Lenz sẽ mất 0.25–0.5đ.',
  },
  {
    id: 'phys-4',
    subject: 'phys',
    topic: 'Luận điểm Maxwell – Điện trường xoáy',
    title: 'Tìm điện trường xoáy sinh ra bởi từ trường biến thiên trong hình trụ',
    frequency: 'Hay ra',
    points: '2.0 điểm',
    linkNote: 'Giải thích trực tiếp bản chất trường điện từ bên trong cuộn cảm.',
    statement:
      'Trong một miền không gian hình trụ tròn dài vô hạn bán kính $R = 10\\text{ cm}$ có từ trường đều hướng dọc theo trục hình trụ với cảm ứng từ biến thiên theo quy luật $B(t) = 0.2t^2 + 0.5t$ (Tesla). Hãy xác định cường độ điện trường xoáy $E$ tại điểm $M$ cách trục hình trụ một khoảng $r$ tại thời điểm $t = 2\\text{ s}$ trong hai trường hợp: a) $r = 4\\text{ cm}$; b) $r = 20\\text{ cm}$.',
    hint: 'Áp dụng $\\oint \\vec{E}\\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}$. Chú ý diện tích có từ trường xuyên qua chỉ tối đa là $\\pi R^2$ khi $r > R$!',
    steps: [
      {
        title: 'Bước 1: Thiết lập phương trình Maxwell–Faraday & tính tốc độ biến thiên từ trường',
        score: '+0.5đ',
        content:
          'Theo luận điểm I của Maxwell, từ trường biến thiên sinh ra điện trường xoáy có các đường sức là đường tròn đồng tâm nằm trong mặt phẳng vuông góc trục trụ:\n$$\\oint_{(C)} \\vec{E}\\cdot d\\vec{l} = -\\frac{d}{dt}\\iint_{(S)} \\vec{B}\\cdot d\\vec{S} \\implies E \\cdot 2\\pi r = \\left|\\frac{d\\Phi_B}{dt}\\right|$$\nĐạo hàm $B(t)$ tại $t = 2\\text{ s}$:\n$$\\frac{dB}{dt} = 0.4t + 0.5 \\implies \\left.\\frac{dB}{dt}\\right|_{t=2} = 0.4(2) + 0.5 = 1.3\\text{ T/s}$$',
      },
      {
        title: 'Bước 2: Trường hợp $r = 4\\text{ cm} = 0.04\\text{ m} < R = 0.1\\text{ m}$',
        score: '+0.75đ',
        content:
          'Đường tròn bán kính $r$ nằm hoàn toàn trong vùng có từ trường nên diện tích có từ thông là $S = \\pi r^2$:\n$$E \\cdot 2\\pi r = \\pi r^2 \\left|\\frac{dB}{dt}\\right| \\implies E = \\frac{r}{2}\\left|\\frac{dB}{dt}\\right|$$\nThay số:\n$$E = \\frac{0.04}{2} \\times 1.3 = 0.026\\text{ V/m}$$',
      },
      {
        title: 'Bước 3: Trường hợp $r = 20\\text{ cm} = 0.2\\text{ m} > R = 0.1\\text{ m}$',
        score: '+0.75đ',
        content:
          'Từ trường chỉ tồn tại trong hình trụ bán kính $R$, nên từ thông qua vòng tròn bán kính $r > R$ chỉ giới hạn trên diện tích $S = \\pi R^2$:\n$$E \\cdot 2\\pi r = \\pi R^2 \\left|\\frac{dB}{dt}\\right| \\implies E = \\frac{R^2}{2r}\\left|\\frac{dB}{dt}\\right|$$\nThay số:\n$$E = \\frac{0.1^2}{2 \\times 0.2} \\times 1.3 = 0.025 \\times 1.3 = 0.0325\\text{ V/m}$$',
      },
    ],
    trap: 'Lỗi kinh điển nhất là ở câu b ($r > R$) vẫn lấy diện tích là $\\pi r^2$ thay vì $\\pi R^2$!',
  },
  {
    id: 'phys-5',
    subject: 'phys',
    topic: 'Dòng điện dịch & Hệ Maxwell',
    title: 'Tính mật độ dòng điện dịch & dòng toàn phần trong tụ điện phẳng',
    frequency: 'Hay ra',
    points: '1.5 điểm',
    linkNote: 'Cầu nối trực tiếp sang tổng trở tụ điện $\\dot{Z}_C = \\frac{1}{j\\omega C}$ ở Lý thuyết mạch.',
    statement:
      'Một tụ điện phẳng có diện tích mỗi bản $S = 200\\text{ cm}^2$, khoảng cách hai bản $d = 2\\text{ mm}$, chứa đầy điện môi $\\varepsilon = 4$. Đặt vào hai bản tụ điện áp xoay chiều $u(t) = 100\\sqrt{2}\\sin(100\\pi t)\\text{ (V)}$. Hãy tính: a) Biên độ mật độ dòng điện dịch $j_{d0}$ trong lớp điện môi; b) Giá trị hiệu dụng của dòng điện dịch toàn phần $I_d$.',
    hint: 'Điện trường giữa hai bản tụ phẳng là $E(t) = \\frac{u(t)}{d}$, cảm ứng điện $D(t) = \\varepsilon\\varepsilon_0 E(t)$, mật độ dòng dịch $j_d = \\frac{\\partial D}{\\partial t}$.',
    steps: [
      {
        title: 'Bước 1: Biểu thức cường độ điện trường và cảm ứng điện',
        score: '+0.5đ',
        content:
          'Đổi đơn vị: $S = 200\\times 10^{-4} = 0.02\\text{ m}^2$, $d = 2\\times 10^{-3}\\text{ m}$, $\\varepsilon_0 = 8.85\\times 10^{-12}\\text{ F/m}$.\nĐiện trường đều trong tụ:\n$$E(t) = \\frac{u(t)}{d} = \\frac{100\\sqrt{2}}{2\\times 10^{-3}}\\sin(100\\pi t) = 5\\sqrt{2}\\times 10^4\\sin(100\\pi t)\\text{ (V/m)}$$',
      },
      {
        title: 'Bước 2: Mật độ dòng điện dịch $j_d$',
        score: '+0.5đ',
        content:
          'Theo định nghĩa của Maxwell:\n$$j_d(t) = \\frac{\\partial D}{\\partial t} = \\varepsilon\\varepsilon_0 \\frac{\\partial E}{\\partial t} = 4 \\times 8.85\\times 10^{-12} \\times 5\\sqrt{2}\\times 10^4 \\times 100\\pi \\cos(100\\pi t)$$\nBiên độ mật độ dòng điện dịch:\n$$j_{d0} = 4 \\times 8.85\\times 10^{-12} \\times 5\\sqrt{2}\\times 10^4 \\times 100\\pi \\approx 7.86\\times 10^{-4}\\text{ A/m}^2$$',
      },
      {
        title: 'Bước 3: Dòng điện dịch toàn phần (so với công thức Lý thuyết mạch)',
        score: '+0.5đ',
        content:
          'Giá trị hiệu dụng dòng điện dịch toàn phần:\n$$I_d = \\frac{j_{d0}}{\\sqrt{2}} \\cdot S = 4 \\times 8.85\\times 10^{-12} \\times 5\\times 10^4 \\times 100\\pi \\times 0.02 \\approx 1.11\\times 10^{-5}\\text{ A}$$\n*Kiểm tra chéo bằng Lý thuyết mạch:* $C = \\frac{\\varepsilon\\varepsilon_0 S}{d} = \\frac{4 \\times 8.85\\times 10^{-12} \\times 0.02}{0.002} = 3.54\\times 10^{-10}\\text{ F}$, $I = U\\omega C = 100 \\times 100\\pi \\times 3.54\\times 10^{-10} \\approx 1.11\\times 10^{-5}\\text{ A}$. Khớp tuyệt đối!',
      },
    ],
    trap: 'Quên nhân $\\varepsilon = 4$ hoặc nhầm lẫn giữa giá trị cực đại ($100\\sqrt{2}$) với giá trị hiệu dụng ($100\\text{ V}$).',
  },
  {
    id: 'phys-6',
    subject: 'phys',
    topic: 'Quang sóng & Lượng tử (Bonus đề gộp)',
    title: 'Giao thoa khe Young & Hiệu ứng quang điện ngoài',
    frequency: 'Trung bình – Cao',
    points: '2.0 điểm',
    linkNote: 'Dành cho lớp PTIT gộp chương Quang học sóng & Lượng tử vào đề Vật lý 2.',
    statement:
      'Trong thí nghiệm giao thoa khe Young với ánh sáng đơn sắc có bước sóng $\\lambda = 0.5\\,\\mu\\text{m}$, khoảng cách hai khe $a = 1\\text{ mm}$, màn cách hai khe $D = 2\\text{ m}$. a) Tính khoảng vân $i$ và vị trí vân sáng bậc 3, vân tối thứ 4. b) Dùng chính ánh sáng này chiếu vào catốt kim loại có công thoát $A = 1.88\\text{ eV}$, tính động năng ban đầu cực đại của quang electron (cho $h = 6.625\\times 10^{-34}\\text{ J}\\cdot\\text{s}, c = 3\\times 10^8\\text{ m/s}, 1\\text{ eV} = 1.6\\times 10^{-19}\\text{ J}$).',
    hint: 'Vân tối thứ $k$ tính từ vân trung tâm có $x_t = \\left(k - \\frac{1}{2}\\right)i$. Nhớ đổi $A$ từ $\\text{eV}$ sang $\\text{J}$ trước khi trừ!',
    steps: [
      {
        title: 'Bước 1: Tính khoảng vân và tọa độ các vân',
        score: '+1.0đ',
        content:
          'Khoảng vân:\n$$i = \\frac{\\lambda D}{a} = \\frac{0.5\\times 10^{-6} \\times 2}{1\\times 10^{-3}} = 10^{-3}\\text{ m} = 1\\text{ mm}$$\nVị trí vân sáng bậc 3: $x_{s3} = 3i = 3\\text{ mm}$ (cách vân trung tâm).\nVị trí vân tối thứ 4: $x_{t4} = (4 - 0.5)i = 3.5i = 3.5\\text{ mm}$.',
      },
      {
        title: 'Bước 2: Áp dụng phương trình Einstein cho hiệu ứng quang điện',
        score: '+1.0đ',
        content:
          'Năng lượng photon:\n$$\\varepsilon_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{6.625\\times 10^{-34} \\times 3\\times 10^8}{0.5\\times 10^{-6}} = 3.975\\times 10^{-19}\\text{ J}$$\nCông thoát theo Joule: $A = 1.88 \\times 1.6\\times 10^{-19} = 3.008\\times 10^{-19}\\text{ J}$.\nĐộng năng cực đại:\n$$K_{\\max} = \\frac{hc}{\\lambda} - A = 3.975\\times 10^{-19} - 3.008\\times 10^{-19} = 0.967\\times 10^{-19}\\text{ J} \\approx 0.604\\text{ eV}$$',
      },
    ],
    trap: 'Nhầm vân tối thứ 4 là $4.5i$ thay vì $3.5i$ (vân tối thứ nhất ứng với $0.5i$, nên thứ $k$ là $(k-0.5)i$).',
  },

  // ================= LÝ THUYẾT MẠCH (ELE1318) =================
  {
    id: 'circ-1',
    subject: 'circ',
    topic: 'Phương pháp Thế nút (Số phức AC)',
    title: 'Giải mạch xác lập điều hòa bằng phương pháp Điện áp nút',
    frequency: 'Cực kỳ hay ra',
    points: '2.5 – 3.0 điểm',
    linkNote: 'Công cụ giải nhanh nhất cho mọi mạch AC nhiều nhánh, tiền đề cho phân tích mạch miền Laplace.',
    statement:
      'Cho mạch xác lập điều hòa có 2 nút độc lập $1, 2$ (nút $0$ làm gốc $\\dot{\\varphi}_0 = 0$). Tại nút $1$ có nguồn dòng $\\dot{J}_1 = 5\\angle 0^\\circ\\text{ A}$ đi vào nút và điện trở $R_1 = 2\\,\\Omega$ nối đất. Giữa nút $1$ và nút $2$ mắc cuộn cảm có cảm kháng $Z_{12} = j2\\,\\Omega$. Từ nút $2$ nối xuống đất qua nhánh có tổng trở $Z_2 = 1 - j1\\,\\Omega$. Hãy lập hệ phương trình thế nút và tìm điện áp nút $\\dot{\\varphi}_1, \\dot{\\varphi}_2$ cùng dòng điện qua nhánh $1–2$.',
    hint: 'Tính tổng dẫn từng nhánh $Y = 1/Z$ trước: $G_1 = 0.5\\text{ S}$, $Y_{12} = -j0.5\\text{ S}$, $Y_2 = 0.5 + j0.5\\text{ S}$.',
    steps: [
      {
        title: 'Bước 1: Chuyển tổng trở sang tổng dẫn nhánh',
        score: '+0.5đ',
        content:
          'Ta tính các tổng dẫn:\n$$Y_1 = \\frac{1}{R_1} = 0.5\\text{ S}, \\quad Y_{12} = \\frac{1}{j2} = -j0.5\\text{ S}, \\quad Y_2 = \\frac{1}{1 - j1} = \\frac{1 + j1}{2} = 0.5 + j0.5\\text{ S}$$',
      },
      {
        title: 'Bước 2: Lập ma trận hệ phương trình thế nút $[Y][\\dot{\\varphi}] = [\\dot{J}]$',
        score: '+1.0đ',
        content:
          'Tổng dẫn tự phần và hỗ phần:\n$$Y_{11} = Y_1 + Y_{12} = 0.5 - j0.5\\text{ S}, \\quad Y_{22} = Y_{12} + Y_2 = 0.5\\text{ S}, \\quad Y_{12\\text{ chung}} = -Y_{12} = j0.5\\text{ S}$$\nHệ phương trình:\n$$\\begin{cases} (0.5 - j0.5)\\dot{\\varphi}_1 + j0.5\\dot{\\varphi}_2 = 5 \\\\ j0.5\\dot{\\varphi}_1 + 0.5\\dot{\\varphi}_2 = 0 \\end{cases}$$',
      },
      {
        title: 'Bước 3: Giải hệ & tìm dòng nhánh $1–2$',
        score: '+1.0đ',
        content:
          'Từ phương trình (2): $\\dot{\\varphi}_2 = -j\\dot{\\varphi}_1$. Thay vào (1):\n$$(0.5 - j0.5 + j0.5(-j))\\dot{\\varphi}_1 = 5 \\implies (1 - j0.5)\\dot{\\varphi}_1 = 5$$\n$$\\implies \\dot{\\varphi}_1 = \\frac{5}{1 - j0.5} = 4 + j2\\text{ (V)} = 4.47\\angle 26.57^\\circ\\text{ V}$$\n$$\\implies \\dot{\\varphi}_2 = -j(4 + j2) = 2 - j4\\text{ (V)} = 4.47\\angle -63.43^\\circ\\text{ V}$$\nDòng điện chạy từ nút 1 sang nút 2:\n$$\\dot{I}_{12} = (\\dot{\\varphi}_1 - \\dot{\\varphi}_2) Y_{12} = [(4+j2) - (2-j4)](-j0.5) = (2 + j6)(-j0.5) = 3 - j1\\text{ (A)}$$',
      },
    ],
    trap: 'Nhầm dấu phần tử hỗ phần ngoài đường chéo chính ($-Y_{ij}$) hoặc quên cộng $-j0.5$ vào cả $Y_{11}$ và $Y_{22}$. Luôn kiểm tra lại bằng KCL tại một nút!',
  },
  {
    id: 'circ-2',
    subject: 'circ',
    topic: 'Quá trình quá độ (Toán tử Laplace)',
    title: 'Tìm dòng điện và điện áp quá độ mạch RLC nối tiếp khi đóng khóa K',
    frequency: 'Chắc chắn có (~3đ)',
    points: '3.0 điểm',
    linkNote: 'Trùng hoàn toàn phương pháp giải hệ thống LTI bằng biến đổi Laplace bên TEL1368!',
    statement:
      'Mạch nối tiếp gồm nguồn một chiều $E = 10\\text{ V}$, điện trở $R = 3\\,\\Omega$, cuộn cảm $L = 1\\text{ H}$ và tụ điện $C = 0.5\\text{ F}$. Trước $t = 0$, khóa $K$ mở và mạch chưa tích trữ năng lượng ($i_L(0_-) = 0, u_C(0_-) = 0$). Tại $t = 0$ đóng khóa $K$. Dùng phương pháp toán tử Laplace tìm biểu thức dòng điện $i(t)$ và điện áp trên tụ $u_C(t)$ với $t \\ge 0$.',
    hint: 'Xác định sơ kiện $0_- \\to 0_+$, chuyển mạch sang miền $p$, giải $I(p)$ rồi tách phân thức tối giản (Heaviside) để biến đổi ngược.',
    steps: [
      {
        title: 'Bước 1: Xác định sơ kiện độc lập ($0_- \\to 0_+$)',
        score: '+0.5đ',
        content:
          'Theo luật đóng mở mạch:\n$$i_L(0_+) = i_L(0_-) = 0\\text{ A}, \\quad u_C(0_+) = u_C(0_-) = 0\\text{ V}$$',
      },
      {
        title: 'Bước 2: Lập sơ đồ toán tử miền $p$ và tìm $I(p), U_C(p)$',
        score: '+1.0đ',
        content:
          'Vì sơ kiện bằng 0 nên không có nguồn phụ. Nguồn áp $E(p) = \\frac{10}{p}$. Tổng trở toán tử toàn mạch:\n$$Z(p) = R + pL + \\frac{1}{pC} = 3 + p + \\frac{2}{p} = \\frac{p^2 + 3p + 2}{p} = \\frac{(p+1)(p+2)}{p}$$\nDòng điện ảnh:\n$$I(p) = \\frac{E(p)}{Z(p)} = \\frac{10/p}{(p+1)(p+2)/p} = \\frac{10}{(p+1)(p+2)}$$\nĐiện áp ảnh trên tụ:\n$$U_C(p) = \\frac{1}{pC}I(p) = \\frac{20}{p(p+1)(p+2)}$$',
      },
      {
        title: 'Bước 3: Khai triển phân thức tối giản & biến đổi ngược về $t$',
        score: '+1.5đ',
        content:
          'Tách $I(p)$:\n$$I(p) = \\frac{10}{p+1} - \\frac{10}{p+2} \\implies i(t) = 10\\left(e^{-t} - e^{-2t}\\right)u(t)\\text{ (A)}$$\nTách $U_C(p) = \\frac{A}{p} + \\frac{B}{p+1} + \\frac{C}{p+2}$:\n$$A = \\left.\\frac{20}{(p+1)(p+2)}\\right|_{p=0} = 10, \\quad B = \\left.\\frac{20}{p(p+2)}\\right|_{p=-1} = -20, \\quad C = \\left.\\frac{20}{p(p+1)}\\right|_{p=-2} = 10$$\n$$\\implies u_C(t) = \\left(10 - 20e^{-t} + 10e^{-2t}\\right)u(t)\\text{ (V)}$$',
      },
    ],
    trap: 'Hay quên chuyển $E = 10\\text{ V}$ thành $\\frac{10}{p}$ (cứ để nguyên $10$!). Khi kiểm tra lại, bắt buộc thế $t=0$ và $t\\to\\infty$ xem $u_C(0_+)=0$ và $u_C(\\infty)=10\\text{ V}$ có khớp vật lý không.',
  },
  {
    id: 'circ-3',
    subject: 'circ',
    topic: 'Mạng bốn cực (Ma trận truyền đạt A)',
    title: 'Tìm bộ thông số [A] của mạng bốn cực chữ T và kiểm tra tính tương hỗ',
    frequency: 'Cực kỳ hay ra',
    points: '2.5 điểm',
    linkNote: 'Tương đương ma trận truyền đạt hệ thống nhiều tầng trong viễn thông.',
    statement:
      'Cho mạng bốn cực tuyến tính tương hỗ hình chữ $T$ gồm hai nhánh nối tiếp $Z_1 = 2\\,\\Omega$, $Z_2 = 4\\,\\Omega$ và nhánh rẽ song song ở giữa $Z_3 = 2\\,\\Omega$. Hãy xác định ma trận thông số truyền đạt $[A] = \\begin{bmatrix} A & B \\\\ C & D \\end{bmatrix}$ theo quy ước $\\dot{U}_1 = A\\dot{U}_2 + B\\dot{I}_2$, $\\dot{I}_1 = C\\dot{U}_2 + D\\dot{I}_2$ (với $\\dot{I}_2$ hướng ra tải) và kiểm chứng điều kiện $AD - BC = 1$.',
    hint: 'Xét hai chế độ chuẩn: Không tải cửa 2 ($\\dot{I}_2 = 0$) để tìm $A, C$; và Ngắn mạch cửa 2 ($\\dot{U}_2 = 0$) để tìm $B, D$.',
    steps: [
      {
        title: 'Bước 1: Chế độ không tải cửa 2 ($\\dot{I}_2 = 0$)',
        score: '+1.0đ',
        content:
          'Khi hở mạch cửa 2 ($\\dot{I}_2 = 0$), dòng $\\dot{I}_1$ chảy trọn qua $Z_1$ và $Z_3$:\n$$\\dot{U}_1 = (Z_1 + Z_3)\\dot{I}_1 = 4\\dot{I}_1, \\quad \\dot{U}_2 = Z_3\\dot{I}_1 = 2\\dot{I}_1$$\nSuy ra:\n$$A = \\left.\\frac{\\dot{U}_1}{\\dot{U}_2}\\right|_{\\dot{I}_2=0} = \\frac{4}{2} = 2, \\quad C = \\left.\\frac{\\dot{I}_1}{\\dot{U}_2}\\right|_{\\dot{I}_2=0} = \\frac{1}{2} = 0.5\\text{ S}$$',
      },
      {
        title: 'Bước 2: Chế độ ngắn mạch cửa 2 ($\\dot{U}_2 = 0$)',
        score: '+1.0đ',
        content:
          'Khi nối tắt cửa 2, $Z_3$ mắc song song với $Z_2$:\n$$Z_{23} = Z_2 \\parallel Z_3 = \\frac{4 \\times 2}{4 + 2} = \\frac{4}{3}\\,\\Omega$$\nTổng trở vào: $Z_{\\text{vào}} = Z_1 + Z_{23} = 2 + \\frac{4}{3} = \\frac{10}{3}\\,\\Omega \\implies \\dot{U}_1 = \\frac{10}{3}\\dot{I}_1$.\nTheo công thức chia dòng (vì $\\dot{I}_2$ đi ra qua $Z_2$):\n$$\\dot{I}_2 = \\dot{I}_1 \\frac{Z_3}{Z_2 + Z_3} = \\dot{I}_1 \\frac{2}{6} = \\frac{1}{3}\\dot{I}_1 \\implies \\dot{I}_1 = 3\\dot{I}_2$$\nSuy ra:\n$$D = \\left.\\frac{\\dot{I}_1}{\\dot{I}_2}\\right|_{\\dot{U}_2=0} = 3, \\quad B = \\left.\\frac{\\dot{U}_1}{\\dot{I}_2}\\right|_{\\dot{U}_2=0} = \\frac{10}{3} \\times 3 = 10\\,\\Omega$$',
      },
      {
        title: 'Bước 3: Kết luận ma trận & kiểm tra điều kiện tương hỗ',
        score: '+0.5đ',
        content:
          '$$[A] = \\begin{bmatrix} 2 & 10\\,\\Omega \\\\ 0.5\\text{ S} & 3 \\end{bmatrix}$$\nKiểm tra: $AD - BC = 2\\times 3 - 10\\times 0.5 = 6 - 5 = 1$ (Thỏa mãn đúng tính chất tương hỗ!).',
      },
    ],
    trap: 'Dễ nhầm công thức chia dòng khi tìm $D$: dòng qua nhánh $Z_2$ tỷ lệ với trở kháng nhánh kia ($Z_3$), KHÔNG phải $Z_2$! Luôn thử lại $AD - BC = 1$, nếu khác $1$ là chắc chắn tính sai một phần tử.',
  },
  {
    id: 'circ-4',
    subject: 'circ',
    topic: 'Mạch có ghép Hỗ cảm',
    title: 'Phân tích mạch ghép hỗ cảm & quy tắc dấu chấm cực cùng tên',
    frequency: 'Hay ra',
    points: '2.0 điểm',
    linkNote: 'Ứng dụng trực tiếp của định luật Faraday $e_{21} = -M\\frac{di_1}{dt}$ từ Vật lý 2.',
    statement:
      'Hai cuộn dây có độ tự cảm $L_1 = 0.2\\text{ H}$, $L_2 = 0.8\\text{ H}$ và hệ số ghép hỗ cảm $k = 0.5$ được mắc nối tiếp vào nguồn xoay chiều tần số góc $\\omega = 100\\text{ rad/s}$, điện áp hiệu dụng $U = 100\\text{ V}$ (bỏ qua điện trở dây). Hãy tính: a) Hỗ cảm $M$; b) Độ tự cảm tương đương và dòng điện hiệu dụng trong hai trường hợp mắc thuận (dòng cùng đi vào đầu có dấu chấm) và mắc ngược (một vào chấm, một ra chấm).',
    hint: 'Tính $M = k\\sqrt{L_1 L_2}$, sau đó áp dụng $L_{\\text{tđ}} = L_1 + L_2 \\pm 2M$.',
    steps: [
      {
        title: 'Bước 1: Tính hệ số hỗ cảm $M$',
        score: '+0.5đ',
        content:
          '$$M = k\\sqrt{L_1 L_2} = 0.5\\sqrt{0.2 \\times 0.8} = 0.5 \\times 0.4 = 0.2\\text{ H}$$',
      },
      {
        title: 'Bước 2: Trường hợp mắc nối tiếp thuận (cộng hỗ cảm)',
        score: '+0.75đ',
        content:
          'Do dòng điện cùng đi vào đầu mang dấu chấm trên cả hai cuộn, từ thông hỗ cảm cộng hưởng với từ thông tự cảm:\n$$L_{\\text{thuận}} = L_1 + L_2 + 2M = 0.2 + 0.8 + 2(0.2) = 1.4\\text{ H}$$\nCảm kháng tương đương: $X_{\\text{thuận}} = \\omega L_{\\text{thuận}} = 100 \\times 1.4 = 140\\,\\Omega$.\nDòng điện hiệu dụng: $I_{\\text{thuận}} = \\frac{100}{140} \\approx 0.714\\text{ A}$.',
      },
      {
        title: 'Bước 3: Trường hợp mắc nối tiếp ngược (trừ hỗ cảm)',
        score: '+0.75đ',
        content:
          '$$L_{\\text{ngược}} = L_1 + L_2 - 2M = 0.2 + 0.8 - 2(0.2) = 0.6\\text{ H}$$\nCảm kháng tương đương: $X_{\\text{ngược}} = \\omega L_{\\text{ngược}} = 100 \\times 0.6 = 60\\,\\Omega$.\nDòng điện hiệu dụng: $I_{\\text{ngược}} = \\frac{100}{60} \\approx 1.667\\text{ A}$.',
      },
    ],
    trap: 'Trong bài toán viết KVL mạch vòng có hỗ cảm (chứ không mắc nối tiếp), sinh viên rất hay quên nhân 2 khi hai dòng vòng cùng qua cuộn hỗ cảm hoặc ghi nhầm dấu $+j\\omega M$ với $-j\\omega M$.',
  },
  {
    id: 'circ-5',
    subject: 'circ',
    topic: 'Định lý Thevenin – Norton',
    title: 'Rút gọn mạch bằng Thevenin để tìm dòng trên nhánh tải',
    frequency: 'Hay ra',
    points: '2.0 điểm',
    linkNote: 'Giúp tìm công suất cực đại truyền sang anten hoặc tải viễn thông ($\\dot{Z}_t = \\dot{Z}_{th}^*$).',
    statement:
      'Cho nguồn áp $\\dot{E} = 12\\angle 0^\\circ\\text{ V}$ nối tiếp với $R_1 = 4\\,\\Omega$ đến nút $A$. Từ nút $A$ có nhánh $Z_2 = j4\\,\\Omega$ nối đất và nhánh tải $Z_t = 2 - j2\\,\\Omega$ mắc giữa $A$ và đất. Dùng định lý Thevenin tìm sơ đồ tương đương phía bên trái tải $Z_t$, từ đó suy ra dòng điện qua tải $\\dot{I}_t$.',
    hint: 'Ngắt bỏ tải $Z_t$, tìm điện áp hở mạch $\\dot{U}_{hm}$ giữa $A$ và đất, sau đó triệt tiêu nguồn độc lập (ngắn mạch nguồn áp) để tìm $Z_{th}$.',
    steps: [
      {
        title: 'Bước 1: Ngắt tải $Z_t$, tính điện áp hở mạch $\\dot{U}_{th}$',
        score: '+0.75đ',
        content:
          'Theo cầu phân áp giữa $R_1$ và $Z_2$:\n$$\\dot{U}_{th} = \\dot{E} \\cdot \\frac{Z_2}{R_1 + Z_2} = 12 \\cdot \\frac{j4}{4 + j4} = 12 \\cdot \\frac{j1}{1 + j1} = 12 \\cdot \\frac{j(1-j)}{2} = 6(1 + j) = 6 + j6\\text{ (V)}$$',
      },
      {
        title: 'Bước 2: Triệt tiêu nguồn độc lập (ngắn mạch $\\dot{E}$), tìm $Z_{th}$',
        score: '+0.5đ',
        content:
          'Khi nối tắt nguồn áp $\\dot{E}$, $R_1$ mắc song song với $Z_2$:\n$$Z_{th} = R_1 \\parallel Z_2 = \\frac{4 \\times j4}{4 + j4} = \\frac{j4}{1 + j1} = 2 + j2\\text{ (}\\Omega\\text{)}$$',
      },
      {
        title: 'Bước 3: Mắc lại tải $Z_t$ và tính dòng tải',
        score: '+0.75đ',
        content:
          'Ta nhận thấy $Z_t = 2 - j2 = Z_{th}^*$ (đây chính là điều kiện phối hợp trở kháng!).\n$$\\dot{I}_t = \\frac{\\dot{U}_{th}}{Z_{th} + Z_t} = \\frac{6 + j6}{(2 + j2) + (2 - j2)} = \\frac{6 + j6}{4} = 1.5 + j1.5\\text{ (A)} \\approx 2.12\\angle 45^\\circ\\text{ A}$$',
      },
    ],
    trap: 'Khi tìm $Z_{th}$ mà mạch có **nguồn phụ thuộc**, tuyệt đối KHÔNG được triệt tiêu nguồn phụ thuộc; phải giữ nguyên và đặt nguồn thử $U_{\\text{test}}$ hoặc tính $U_{hm}/I_{nm}$.',
  },
  {
    id: 'circ-6',
    subject: 'circ',
    topic: 'Cộng hưởng & Đáp ứng tần số',
    title: 'Khảo sát mạch cộng hưởng nối tiếp và hệ số phẩm chất Q',
    frequency: 'Trung bình – Cao',
    points: '2.0 điểm',
    linkNote: 'Cầu nối trực tiếp sang vị trí điểm cực và độ rộng băng thông $BW$ trong Tín hiệu & Hệ thống.',
    statement:
      'Một mạch $RLC$ nối tiếp gồm $R = 10\\,\\Omega$, $L = 10\\text{ mH}$, $C = 1\\,\\mu\\text{F}$ nối vào nguồn xoay chiều có biên độ $U_m = 20\\text{ V}$, tần số góc $\\omega$ thay đổi được. Tìm: a) Tần số góc cộng hưởng $\\omega_0$; b) Hệ số phẩm chất $Q$ và dải thông $\\Delta\\omega$ (băng thông $3\\text{ dB}$); c) Điện áp cực đại trên tụ điện khi cộng hưởng.',
    hint: 'Đổi $L = 10^{-2}\\text{ H}$, $C = 10^{-6}\\text{ F}$. Nhớ khi cộng hưởng thì $U_{Cm} = Q \\cdot U_m$!',
    steps: [
      {
        title: 'Bước 1: Tính tần số cộng hưởng $\\omega_0$',
        score: '+0.75đ',
        content:
          '$$\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{10^{-2} \\times 10^{-6}}} = \\frac{1}{10^{-4}} = 10^4\\text{ rad/s}$$',
      },
      {
        title: 'Bước 2: Hệ số phẩm chất $Q$ và băng thông $\\Delta\\omega$',
        score: '+0.75đ',
        content:
          '$$Q = \\frac{\\omega_0 L}{R} = \\frac{10^4 \\times 10^{-2}}{10} = \\frac{100}{10} = 10$$\nDải thông (băng thông mức $-3\\text{ dB}$):\n$$\\Delta\\omega = \\frac{\\omega_0}{Q} = \\frac{R}{L} = \\frac{10}{10^{-2}} = 1000\\text{ rad/s}$$',
      },
      {
        title: 'Bước 3: Quá áp trên tụ điện khi cộng hưởng',
        score: '+0.5đ',
        content:
          'Tại cộng hưởng, tổng trở $Z = R = 10\\,\\Omega$, dòng cực đại $I_m = \\frac{U_m}{R} = 2\\text{ A}$.\n$$U_{Cm} = I_m \\cdot \\frac{1}{\\omega_0 C} = Q \\cdot U_m = 10 \\times 20 = 200\\text{ V}$$',
      },
    ],
    trap: 'Chú ý phân biệt tần số góc $\\omega_0$ (rad/s) với tần số $f_0 = \\frac{\\omega_0}{2\\pi}$ (Hz) khi đề hỏi băng thông.',
  },

  // ================= TÍN HIỆU VÀ HỆ THỐNG (TEL1368) =================
  {
    id: 'sig-1',
    subject: 'sig',
    topic: 'Tính chất hệ thống (Tuyến tính, Bất biến, Nhân quả, Ổn định)',
    title: 'Khảo sát 4 tính chất cơ bản của một hệ thống cho trước',
    frequency: 'Cực kỳ hay ra',
    points: '2.0 điểm',
    linkNote: 'Điều kiện tiên quyết để được phép dùng Tích chập, Fourier, Laplace và Z!',
    statement:
      'Cho hệ thống có quan hệ ngõ vào $x(t)$ và ngõ ra $y(t)$ xác định bởi: $y(t) = t\\cdot x(t - 2)$. Hãy khảo sát 4 tính chất của hệ thống: Tuyến tính (Linear), Bất biến theo thời gian (Time-Invariant), Nhân quả (Causal), và Ổn định BIBO (Bounded-Input Bounded-Output).',
    hint: 'Kiểm tra từng tính chất theo đúng định nghĩa chuẩn. Chú ý hệ số $t$ đứng trước $x(t-2)$ sẽ làm hỏng tính bất biến!',
    steps: [
      {
        title: 'Bước 1: Kiểm tra tính Tuyến tính (Linearity)',
        score: '+0.5đ',
        content:
          'Xét ngõ vào tổ hợp $x(t) = a x_1(t) + b x_2(t)$:\n$$T\\{x(t)\\} = t\\,[a x_1(t-2) + b x_2(t-2)] = a\\,[t x_1(t-2)] + b\\,[t x_2(t-2)] = a y_1(t) + b y_2(t)$$\n$\\implies$ Hệ thống **TUYẾN TÍNH**.',
      },
      {
        title: 'Bước 2: Kiểm tra tính Bất biến theo thời gian (Time-Invariance)',
        score: '+0.5đ',
        content:
          'Nếu dịch ngõ vào một khoảng $t_0$: $x_1(t) = x(t - t_0)$, ngõ ra tương ứng là:\n$$y_1(t) = t\\cdot x_1(t-2) = t\\cdot x(t - t_0 - 2)$$\nTrong khi dịch ngõ ra gốc đi $t_0$: $y(t - t_0) = (t - t_0)\\cdot x(t - t_0 - 2)$.\nVì $y_1(t) \\neq y(t - t_0)$ $\\implies$ Hệ thống **BIẾN THIÊN THEO THỜI GIAN** (Không bất biến).',
      },
      {
        title: 'Bước 3: Kiểm tra tính Nhân quả & Ổn định BIBO',
        score: '+1.0đ',
        content:
          '**Nhân quả:** Tại mọi thời điểm $t$, ngõ ra $y(t)$ chỉ phụ thuộc ngõ vào ở thời điểm quá khứ $(t - 2 < t)$ $\\implies$ Hệ thống **NHÂN QUẢ**.\n**Ổn định BIBO:** Chọn tín hiệu vào bị chặn $|x(t)| = 1 \\le M_x$. Khi $t \\to +\\infty$, $|y(t)| = |t| \\to +\\infty$ (không bị chặn!) $\\implies$ Hệ thống **KHÔNG ỔN ĐỊNH BIBO**.',
      },
    ],
    trap: 'Để chứng minh KHÔNG bất biến hoặc KHÔNG ổn định, chỉ cần nêu 1 phản ví dụ cụ thể (như $x(t)=1$). Nhiều bạn chỉ ghi "không ổn định" mà không chứng minh bị trừ nửa số điểm.',
  },
  {
    id: 'sig-2',
    subject: 'sig',
    topic: 'Tích chập liên tục (Convolution)',
    title: 'Tính tích chập $y(t) = x(t) * h(t)$ bằng phương pháp chia khoảng',
    frequency: 'Chắc chắn có (~2.5đ)',
    points: '2.5 điểm',
    linkNote: 'Tìm đáp ứng ngõ ra của mạch điện RC/RL khi biết xung vào $x(t)$ và đáp ứng xung $h(t)$.',
    statement:
      'Cho hệ thống LTI liên tục có đáp ứng xung $h(t) = e^{-t}u(t)$ và tín hiệu vào là xung chữ nhật $x(t) = u(t) - u(t - 2)$. Hãy tính ngõ ra $y(t) = x(t) * h(t)$ bằng phương pháp tích phân tích chập trực tiếp và kiểm tra tính liên tục tại các điểm gãy.',
    hint: 'Giữ nguyên $x(\\tau)$ trên đoạn $[0, 2]$, lật và trượt $h(t - \\tau) = e^{-(t-\\tau)}u(t - \\tau)$ tồn tại khi $\\tau \\le t$. Chia 3 miền của $t$: $t < 0$, $0 \\le t < 2$, $t \\ge 2$.',
    steps: [
      {
        title: 'Bước 1: Viết biểu thức tích phân tích chập & xác định miền tồn tại',
        score: '+0.5đ',
        content:
          '$$y(t) = \\int_{-\\infty}^{+\\infty} x(\\tau)h(t - \\tau)\\,d\\tau$$\nTa có $x(\\tau) = 1$ với $0 \\le \\tau \\le 2$ (và $=0$ ở ngoài), còn $h(t - \\tau) = e^{-(t-\\tau)}$ với $\\tau \\le t$ (và $=0$ khi $\\tau > t$).',
      },
      {
        title: 'Bước 2: Xét 3 trường hợp vị trí của $t$',
        score: '+1.5đ',
        content:
          '* **Trường hợp 1 ($t < 0$):** Hai miền $[0, 2]$ và $(-\\infty, t]$ không giao nhau $\\implies y(t) = 0$.\n* **Trường hợp 2 ($0 \\le t < 2$):** Miền giao là $[0, t]$:\n$$y(t) = \\int_0^t 1 \\cdot e^{-(t-\\tau)}\\,d\\tau = e^{-t}\\left[e^\\tau\\right]_0^t = 1 - e^{-t}$$\n* **Trường hợp 3 ($t \\ge 2$):** Miền giao phủ trọn $[0, 2]$:\n$$y(t) = \\int_0^2 1 \\cdot e^{-(t-\\tau)}\\,d\\tau = e^{-t}\\left[e^\\tau\\right]_0^2 = (e^2 - 1)e^{-t}$$',
      },
      {
        title: 'Bước 3: Kết luận & Kiểm tra nối tiếp tại biên',
        score: '+0.5đ',
        content:
          '$$y(t) = \\begin{cases} 0, & t < 0 \\\\ 1 - e^{-t}, & 0 \\le t < 2 \\\\ (e^2 - 1)e^{-t}, & t \\ge 2 \\end{cases}$$\nKiểm tra tại $t = 0$: $0 = 1 - e^0$; tại $t = 2$: $1 - e^{-2} = (e^2 - 1)e^{-2}$. Khớp hoàn toàn!',
      },
    ],
    trap: 'Sai cận tích phân ở trường hợp 2 và 3 (lấy nhầm cận từ $0$ đến $t$ cho cả $t \\ge 2$!). Mẹo: luôn kiểm tra giá trị tại điểm ranh giới $t=0, t=2$, tích chập 2 hàm hữu hạn luôn liên tục!',
  },
  {
    id: 'sig-3',
    subject: 'sig',
    topic: 'Biến đổi Fourier liên tục (CTFT)',
    title: 'Tìm phổ biến đổi Fourier & vẽ phổ biên độ của tín hiệu mũ/xung',
    frequency: 'Rất hay ra',
    points: '2.5 điểm',
    linkNote: 'Cơ sở phân tích băng thông sóng mang và phổ mạch lọc tương tự.',
    statement:
      'Cho tín hiệu $x(t) = e^{-2t}u(t) + e^{-2(t-1)}u(t-1)$. Sử dụng các cặp biến đổi Fourier cơ bản và tính chất dịch thời gian, hãy tìm biến đổi Fourier $X(j\\omega)$, biểu thức phổ biên độ $|X(j\\omega)|$ và phổ pha $\\theta(\\omega)$.',
    hint: 'Dùng cặp chuẩn $e^{-at}u(t) \\leftrightarrow \\frac{1}{a + j\\omega}$ ($a > 0$) kết hợp tính chất dịch thời gian $x(t - t_0) \\leftrightarrow e^{-j\\omega t_0}X(j\\omega)$.',
    steps: [
      {
        title: 'Bước 1: Áp dụng cặp biến đổi chuẩn & tính chất tuyến tính, dịch thời gian',
        score: '+1.0đ',
        content:
          'Ta biết $\\mathcal{F}\\{e^{-2t}u(t)\\} = \\frac{1}{2 + j\\omega}$.\nÁp dụng tính chất dịch thời gian ($t_0 = 1$):\n$$\\mathcal{F}\\{e^{-2(t-1)}u(t-1)\\} = \\frac{e^{-j\\omega}}{2 + j\\omega}$$\nCộng tuyến tính hai thành phần:\n$$X(j\\omega) = \\frac{1 + e^{-j\\omega}}{2 + j\\omega}$$',
      },
      {
        title: 'Bước 2: Thu gọn tử số bằng công thức Euler để tìm phổ biên độ & pha',
        score: '+1.5đ',
        content:
          'Đặt $e^{-j\\omega/2}$ làm nhân tử chung:\n$$1 + e^{-j\\omega} = e^{-j\\omega/2}\\left(e^{j\\omega/2} + e^{-j\\omega/2}\\right) = 2\\cos\\left(\\frac{\\omega}{2}\\right)e^{-j\\omega/2}$$\nSuy ra:\n$$|X(j\\omega)| = \\frac{2\\left|\\cos(\\omega/2)\\right|}{\\sqrt{4 + \\omega^2}}$$\nPhổ pha:\n$$\\theta(\\omega) = -\\frac{\\omega}{2} - \\arctan\\left(\\frac{\\omega}{2}\\right) + \\arg\\{\\cos(\\omega/2)\\}$$',
      },
    ],
    trap: 'Quên trị tuyệt đối $|\\cos(\\omega/2)|$ khi tính biên độ phổ (biên độ luôn $\\ge 0$, dấu âm của $\\cos$ phải đẩy sang pha $\\pm\\pi$!).',
  },
  {
    id: 'sig-4',
    subject: 'sig',
    topic: 'Biến đổi Laplace & Phân tích hệ thống liên tục',
    title: 'Tìm hàm truyền $H(s)$, giản đồ Cực–Không, đáp ứng xung $h(t)$ và xét ổn định',
    frequency: 'Chắc chắn có (~3đ)',
    points: '3.0 điểm',
    linkNote: 'Trùng khớp hoàn toàn với phương pháp giải mạch quá độ của Lý thuyết mạch.',
    statement:
      'Một hệ thống LTI liên tục nhân quả được mô tả bởi phương trình vi phân:\n$$\\frac{d^2y(t)}{dt^2} + 5\\frac{dy(t)}{dt} + 6y(t) = 2\\frac{dx(t)}{dt} + x(t)$$\na) Tìm hàm truyền $H(s)$ và chỉ rõ miền hội tụ (ROC). b) Xác định điểm cực, điểm không và xét tính ổn định BIBO. c) Tìm đáp ứng xung $h(t)$ và đáp ứng ngõ ra $y(t)$ khi vào $x(t) = e^{-t}u(t)$ (với điều kiện ban đầu bằng 0).',
    hint: 'Biến đổi Laplace hai vế với điều kiện đầu bằng 0: $\\frac{d^k}{dt^k} \\to s^k$. Tìm nghiệm mẫu thức $s^2+5s+6=0$.',
    steps: [
      {
        title: 'Bước 1: Tìm hàm truyền $H(s)$, điểm cực–không & ROC',
        score: '+1.0đ',
        content:
          'Biến đổi Laplace hai vế (điều kiện đầu bằng 0):\n$$(s^2 + 5s + 6)Y(s) = (2s + 1)X(s) \\implies H(s) = \\frac{Y(s)}{X(s)} = \\frac{2s + 1}{(s + 2)(s + 3)}$$\n* Điểm không (Zero): $z_1 = -0.5$.\n* Điểm cực (Poles): $p_1 = -2, p_2 = -3$.\n* Vì hệ **nhân quả**, ROC nằm bên phải cực ngoài cùng: $\\text{Re}(s) > -2$.\n* Vì ROC chứa trục ảo $\\text{Re}(s)=0$ (cả 2 cực đều nằm bên trái trục ảo) $\\implies$ Hệ thống **ỔN ĐỊNH BIBO**.',
      },
      {
        title: 'Bước 2: Tìm đáp ứng xung $h(t)$',
        score: '+1.0đ',
        content:
          'Khai triển phân thức tối giản:\n$$H(s) = \\frac{A}{s+2} + \\frac{B}{s+3}, \\quad A = \\left.\\frac{2s+1}{s+3}\\right|_{s=-2} = -3, \\quad B = \\left.\\frac{2s+1}{s+2}\\right|_{s=-3} = 5$$\n$$\\implies h(t) = \\left(-3e^{-2t} + 5e^{-3t}\\right)u(t)$$',
      },
      {
        title: 'Bước 3: Tìm ngõ ra $y(t)$ khi $x(t) = e^{-t}u(t)$',
        score: '+1.0đ',
        content:
          'Ta có $X(s) = \\frac{1}{s+1}$ (ROC $\\text{Re}(s) > -1$).\n$$Y(s) = H(s)X(s) = \\frac{2s + 1}{(s+1)(s+2)(s+3)} = \\frac{C_1}{s+1} + \\frac{C_2}{s+2} + \\frac{C_3}{s+3}$$\nTính hệ số Heaviside:\n$$C_1 = \\frac{-1}{1\\cdot 2} = -0.5, \\quad C_2 = \\frac{-3}{(-1)\\cdot 1} = 3, \\quad C_3 = \\frac{-5}{(-2)(-1)} = -2.5$$\n$$\\implies y(t) = \\left(-0.5e^{-t} + 3e^{-2t} - 2.5e^{-3t}\\right)u(t)$$',
      },
    ],
    trap: 'Nếu thiếu dòng kết luận **ROC: $\\text{Re}(s) > -2$** là mất ngay 0.25–0.5đ trình bày! Kiểm tra nhanh $y(0_+) = -0.5 + 3 - 2.5 = 0$ (khớp bậc mẫu lớn hơn bậc tử 2 bậc).',
  },
  {
    id: 'sig-5',
    subject: 'sig',
    topic: 'Biến đổi Z & Miền hội tụ ROC (Tín hiệu rời rạc)',
    title: 'Biến đổi Z ngược theo cả 3 miền hội tụ (Nhân quả – Ổn định – Phản nhân quả)',
    frequency: 'Cực kỳ hay ra',
    points: '2.5 điểm',
    linkNote: 'Bài toán kinh điển phân biệt sinh viên hiểu sâu bản chất ROC trong PTIT.',
    statement:
      'Cho hệ thống LTI rời rạc có hàm truyền đạt:\n$$H(z) = \\frac{1 - z^{-1}}{(1 - 0.5z^{-1})(1 - 2z^{-1})}$$\nHãy liệt kê tất cả các miền hội tụ (ROC) có thể có của $H(z)$, tìm biểu thức đáp ứng xung $h[n]$ tương ứng với từng ROC, và chỉ rõ trường hợp nào hệ thống **ổn định**, trường hợp nào **nhân quả**.',
    hint: 'Hàm truyền có 2 cực $z = 0.5$ và $z = 2$, do đó chia mặt phẳng $z$ thành đúng 3 miền đồng tâm: $|z| > 2$, $0.5 < |z| < 2$, và $|z| < 0.5$.',
    steps: [
      {
        title: 'Bước 1: Khai triển phân thức tối giản theo $z^{-1}$',
        score: '+0.75đ',
        content:
          'Đặt $H(z) = \\frac{A}{1 - 0.5z^{-1}} + \\frac{B}{1 - 2z^{-1}}$:\n* Tại $z^{-1} = 2$: $A = \\frac{1 - 2}{1 - 4} = \\frac{1}{3}$.\n* Tại $z^{-1} = 0.5$: $B = \\frac{1 - 0.5}{1 - 0.25} = \\frac{2}{3}$.\nVậy:\n$$H(z) = \\frac{1/3}{1 - 0.5z^{-1}} + \\frac{2/3}{1 - 2z^{-1}}$$',
      },
      {
        title: 'Bước 2: Xét 3 miền hội tụ ROC tương ứng',
        score: '+1.5đ',
        content:
          'Hai cực là $|p_1| = 0.5$ và $|p_2| = 2$:\n1. **ROC 1: $|z| > 2$** (ngoài cả 2 cực $\\to$ cả 2 dãy đều bên phải):\n$$h_1[n] = \\left[\\frac{1}{3}(0.5)^n + \\frac{2}{3}2^n\\right]u[n]$$\n2. **ROC 2: $0.5 < |z| < 2$** (ngoài $0.5$ và trong $2$ $\\to$ dãy hai phía):\n$$h_2[n] = \\frac{1}{3}(0.5)^n u[n] - \\frac{2}{3}2^n u[-n-1]$$\n3. **ROC 3: $|z| < 0.5$** (trong cả 2 cực $\\to$ cả 2 dãy đều bên trái):\n$$h_3[n] = -\\left[\\frac{1}{3}(0.5)^n + \\frac{2}{3}2^n\\right]u[-n-1]$$',
      },
      {
        title: 'Bước 3: Kết luận tính Nhân quả & Ổn định',
        score: '+0.25đ',
        content:
          '* **Nhân quả:** ROC 1 ($|z| > 2$), nhưng không ổn định vì $2^n$ phân kỳ.\n* **Ổn định BIBO:** ROC 2 ($0.5 < |z| < 2$) vì miền hội tụ **chứa vòng tròn đơn vị $|z| = 1$** (nhưng không nhân quả).',
      },
    ],
    trap: 'Lỗi chí mạng khi biến đổi Z ngược phần tử bên trái ($|z| < |a|$): luôn phải có dấu TRỪ đằng trước và nhân với $u[-n-1]$, tức $-a^n u[-n-1]$ (KHÔNG phải $u[-n]$!).',
  },
  {
    id: 'sig-6',
    subject: 'sig',
    topic: 'Phương trình sai phân & Biến đổi Z một phía',
    title: 'Giải phương trình sai phân có điều kiện ban đầu bằng Biến đổi Z',
    frequency: 'Hay ra',
    points: '2.5 điểm',
    linkNote: 'Ứng dụng trong mạch lọc số IIR và các hệ thống điều khiển rời rạc.',
    statement:
      'Cho hệ thống nhân quả mô tả bởi phương trình sai phân:\n$$y[n] - 0.5y[n-1] = x[n], \\quad n \\ge 0$$\nvới ngõ vào $x[n] = (0.25)^n u[n]$ và điều kiện ban đầu $y[-1] = 2$. Dùng biến đổi Z một phía tìm biểu thức ngõ ra $y[n]$ cho $n \\ge 0$.',
    hint: 'Dùng công thức dịch trễ của biến đổi Z một phía: $\\mathcal{Z}^+\\{y[n-1]\\} = z^{-1}Y^+(z) + y[-1]$.',
    steps: [
      {
        title: 'Bước 1: Biến đổi Z một phía hai vế kèm điều kiện ban đầu',
        score: '+1.0đ',
        content:
          'Ta có $X^+(z) = \\frac{1}{1 - 0.25z^{-1}}$ và $\\mathcal{Z}^+\\{y[n-1]\\} = z^{-1}Y^+(z) + y[-1]$.\nThay vào phương trình sai phân:\n$$Y^+(z) - 0.5\\left[z^{-1}Y^+(z) + 2\\right] = \\frac{1}{1 - 0.25z^{-1}}$$\n$$(1 - 0.5z^{-1})Y^+(z) = 1 + \\frac{1}{1 - 0.25z^{-1}}$$',
      },
      {
        title: 'Bước 2: Tách phân thức & biến đổi Z ngược',
        score: '+1.5đ',
        content:
          '$$Y^+(z) = \\frac{1}{1 - 0.5z^{-1}} + \\frac{1}{(1 - 0.5z^{-1})(1 - 0.25z^{-1})}$$\nTách phân thức thứ hai: $\\frac{A}{1 - 0.5z^{-1}} + \\frac{B}{1 - 0.25z^{-1}}$ với $A = \\frac{1}{1 - 0.5} = 2$, $B = \\frac{1}{1 - 2} = -1$.\nGộp lại:\n$$Y^+(z) = \\frac{3}{1 - 0.5z^{-1}} - \\frac{1}{1 - 0.25z^{-1}}$$\nBiến đổi ngược (ROC $|z| > 0.5$):\n$$y[n] = \\left[3(0.5)^n - (0.25)^n\\right]u[n]$$\n*Kiểm tra nhanh:* $n=0 \\implies y[0] = 3 - 1 = 2$; thay vào pt gốc: $y[0] = 0.5y[-1] + x[0] = 0.5(2) + 1 = 2$. Đúng tuyệt đối!',
      },
    ],
    trap: 'Rất nhiều bạn nhầm dấu thành $- y[-1]$ hoặc $z^{-1}y[-1]$ khi biến đổi Z một phía cho $y[n-1]$!',
  },
];
