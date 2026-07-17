document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. NAVIGATION & SPA ROUTING SYSTEM
  // ==========================================
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');
  const logoLink = document.getElementById('logoLink');
  const mainHeader = document.getElementById('mainHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const footerLinks = document.querySelectorAll('.footer-nav-link');

  function switchPage(targetId) {
    // Update nav active status
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update section visibility
    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Trigger reveal animations inside the newly active section
    const activeSection = document.getElementById(targetId);
    if (activeSection) {
      const reveals = activeSection.querySelectorAll('.reveal');
      reveals.forEach(r => {
        r.classList.remove('active');
        void r.offsetWidth; // trigger reflow
        r.classList.add('active');
      });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    navMenu.classList.remove('show');
  }

  // Nav clicks
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      switchPage(target);
    });
  });

  // Footer nav clicks
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-link');
      switchPage(target);
    });
  });

  // Logo click triggers home page
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchPage('home');
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Header scroll visual tweak
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });


  // ==========================================
  // 2. ASSIGNMENTS TAB SYSTEM
  // ==========================================
  const sidebarBtns = document.querySelectorAll('.assign-card-btn');
  const panels = document.querySelectorAll('.panel-container');

  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all buttons & panels and reset inline transforms
      sidebarBtns.forEach(b => {
        b.classList.remove('active');
        b.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });
      panels.forEach(p => p.classList.remove('active'));

      // Activate active button
      btn.classList.add('active');
      btn.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(8px)`;

      // Activate corresponding panel
      const index = btn.getAttribute('data-index');
      const activePanel = document.getElementById(`assign-panel-${index}`);
      if (activePanel) {
        activePanel.classList.add('active');
        
        // Trigger reveal animations inside the newly active assignment tab
        const reveals = activePanel.querySelectorAll('.reveal');
        reveals.forEach(r => {
          r.classList.remove('active');
          void r.offsetWidth; // trigger reflow
          r.classList.add('active');
        });

        // Smooth scroll page to top so user reads the new assignment from the beginning
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });


  // ==========================================
  // 3. HOME PAGE TYPING EFFECT
  // ==========================================
  const typedTextSpan = document.getElementById('typedText');
  const roles = [
    "Khoa Ngôn ngữ và Văn hóa Hàn Quốc - ULIS",
    "Biên dịch viên tiếng Hàn chuyên nghiệp tương lai",
    "Người làm chủ Kỹ năng số và Trí tuệ Nhân tạo"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting characters
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30; // speed up deleting
    } else {
      // Typing characters
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70; // typing speed
    }

    // Determine state
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000; // Pause duration
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typedTextSpan) {
    setTimeout(typeEffect, 1000);
  }


  // ==========================================
  // 4. BÀI 1: INTERACTIVE 12 STEPS DASHBOARD
  // ==========================================
  const stepsData = {
    1: {
      num: "#1 Mở File Explorer nhanh",
      title: "Bước 1: Mở File Explorer nhanh",
      desc: "Mình mở trình quản lý file bằng tổ hợp phím tắt nhanh Windows + E hoặc bấm trực tiếp vào biểu tượng thư mục màu vàng quen thuộc trên thanh Taskbar."
    },
    2: {
      num: "#2 Tìm ổ đĩa lưu trữ phù hợp",
      title: "Bước 2: Tìm ổ đĩa lưu trữ phù hợp",
      desc: "Tại thanh điều hướng bên trái, mình nhấp vào This PC rồi mở một ổ đĩa trống (thường là ổ E: hoặc ổ D: để tránh lưu đè vào phân vùng hệ thống)."
    },
    3: {
      num: "#3 Tạo thư mục gốc làm việc",
      title: "Bước 3: Tạo thư mục gốc làm việc",
      desc: "Mình click chuột phải vào vùng trống bất kỳ, chọn New -> Folder rồi đặt tên thư mục là ThucHanh_DuongTuongAnh để thầy cô dễ chấm điểm."
    },
    4: {
      num: "#4 Đi vào thư mục vừa tạo",
      title: "Bước 4: Đi vào thư mục vừa tạo",
      desc: "Bấm đúp chuột trái thật nhanh để truy cập vào bên trong thư mục ThucHanh_DuongTuongAnh"
    },
    5: {
      num: "#5 Tạo một file Text mới",
      title: "Bước 5: Tạo một file Text mới",
      desc: "Chuột phải vào vùng trống bên trong, tớ chọn New -> Text Document. Hệ thống tự động sinh ra một tệp mặc định ban đầu là GhiChu.txt."
    },
    6: {
      num: "#6 Đổi tên file cho rõ ràng",
      title: "Bước 6: Đổi tên file cho rõ ràng",
      desc: "Để file dễ đọc hơn, mình click vào GhiChu.txt rồi nhấn F2, đổi tên nó thành GhiChuQuanTrong.txt giúp dễ dàng nhận biết nội dung."
    },
    7: {
      num: "#7 Tạo thêm thư mục con",
      title: "Bước 7: Tạo thêm thư mục con",
      desc: "Vẫn ở trong thư mục gốc, mình click chuột phải chọn New -> Folder để tạo thêm một thư mục con và đặt tên gọn gàng là TaiLieu."
    },
    8: {
      num: "#8 Thao tác Sao chép file (Copy & Paste)",
      title: "Bước 8: Thao tác Sao chép file (Copy & Paste)",
      desc: "Mình click chuột phải vào file GhiChuQuanTrong.txt chọn Copy. Sau đó đi vào thư mục con TaiLieu rồi ấn Paste để làm một bản sao lưu dự phòng."
    },
    9: {
      num: "#9 Thao tác Di chuyển file (Cut & Paste)",
      title: "Bước 9: Thao tác Di chuyển file (Cut & Paste)",
      desc: "Mình tạo thêm file DiChuyen.txt ở thư mục gốc ngoài cùng, nhấn Cut (Ctrl + X), sau đó đi vào thư mục TaiLieu rồi nhấn Paste (Ctrl + V) để dời file hẳn vào trong."
    },
    10: {
      num: "#10 Xóa tệp tin nháp",
      title: "Bước 10: Xóa tệp tin nháp",
      desc: "Trong thư mục TaiLieu, mình click chuột phải vào tệp GhiChuQuanTrong.txt rồi chọn Delete để chuyển nó vào Thùng rác tạm thời."
    },
    11: {
      num: "#11 Xóa vĩnh viễn tệp tin",
      title: "Bước 11: Xóa vĩnh viễn tệp tin",
      desc: "Để dọn dẹp bộ nhớ máy tính, mình chọn tệp DiChuyen.txt trong thư mục TaiLieu rồi nhấn giữ Shift + Delete để xóa hẳn không qua Thùng rác."
    },
    12: {
      num: "#12 Khôi phục file đã xóa",
      title: "Bước 12: Khôi phục file đã xóa",
      desc: "Mình trở về màn hình chính mở Thùng rác (Recycle Bin), tìm file GhiChuQuanTrong.txt đã xóa ở bước 10, nhấp chuột phải chọn Restore để đưa nó về đúng chỗ cũ."
    }
  };

  const stepPills = document.querySelectorAll('.step-pill');
  const stepDetailNum = document.getElementById('stepDetailNum');
  const stepDetailTitle = document.getElementById('stepDetailTitle');
  const stepDetailDesc = document.getElementById('stepDetailDesc');

  const stepDetailCard = document.querySelector('.step-detail-card');
  stepPills.forEach(pill => {
    pill.addEventListener('click', () => {
      stepPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const stepNum = pill.getAttribute('data-step');
      const data = stepsData[stepNum];
      if (data && stepDetailCard) {
        stepDetailNum.textContent = data.num;
        stepDetailTitle.textContent = data.title;
        stepDetailDesc.textContent = data.desc;

        // Trigger smooth slide and fade-in
        stepDetailCard.classList.remove('animate-change');
        void stepDetailCard.offsetWidth; // trigger reflow
        stepDetailCard.classList.add('animate-change');
      }
    });
  });


  // ==========================================
  // 5. BÀI 1: VIRTUAL FILE EXPLORER SIMULATOR
  // ==========================================
  let explorerState = {
    rootFiles: ['GhiChuQuanTrong.txt', 'DiChuyen.txt'],
    subfolderFiles: [],
    selectedFile: null
  };

  const virtualTreeContent = document.getElementById('virtualTreeContent');
  const virtualViewer = document.getElementById('virtualViewer');
  const expCopy = document.getElementById('expCopy');
  const expMove = document.getElementById('expMove');
  const expDelete = document.getElementById('expDelete');
  const expReset = document.getElementById('expReset');

  const fileContents = {
    'GhiChuQuanTrong.txt': `NỘI DUNG TỆP: GhiChuQuanTrong.txt
------------------------------------------------------
- Người thực hiện: Dương Tường Anh
- Mã sinh viên: 25042327
- Khoa: Ngôn ngữ và Văn hóa Hàn Quốc (ULIS)
- Nội dung: 
  Cần hoàn thành toàn bộ các bài thực hành Nhập môn Công nghệ số 
  trước hạn nộp cuối cùng để đạt kết quả học tập tốt nhất!`,

    'GhiChuQuanTrong_backup.txt': `[BẢN SAO DỰ PHÒNG] GhiChuQuanTrong.txt
------------------------------------------------------
- Người thực hiện: Dương Tường Anh
- Mã sinh viên: 25042327
- Trạng thái: 
  Bản sao lưu dự phòng đặt trong thư mục con TaiLieu
  để tránh mất mát tệp tin quan trọng ở thư mục gốc.`,

    'DiChuyen.txt': `NỘI DUNG TỆP: DiChuyen.txt
------------------------------------------------------
Đây là tệp tin dùng để thực hành thao tác Di chuyển (Cut & Paste)
từ thư mục gốc ngoài cùng vào thư mục con TaiLieu.`
  };

  function renderTree() {
    virtualTreeContent.innerHTML = '';
    
    const fileSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle; color:var(--text-muted);"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
    const folderSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle; color:var(--color-wedgwood);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;

    // 1. Render root files
    explorerState.rootFiles.forEach(fileName => {
      const fileNode = document.createElement('div');
      fileNode.className = 'exp-node';
      if (explorerState.selectedFile && explorerState.selectedFile.name === fileName && explorerState.selectedFile.parent === 'root') {
        fileNode.className += ' active-file';
      }
      fileNode.innerHTML = `${fileSvg}${fileName}`;
      fileNode.addEventListener('click', () => handleSelectFile(fileName, 'root'));
      virtualTreeContent.appendChild(fileNode);
    });

    // 2. Render folder TaiLieu
    const folderNode = document.createElement('div');
    folderNode.className = 'exp-node';
    folderNode.innerHTML = `${folderSvg}<strong>TaiLieu</strong>`;
    virtualTreeContent.appendChild(folderNode);

    const subGroup = document.createElement('div');
    subGroup.className = 'exp-sub-group';
    
    if (explorerState.subfolderFiles.length === 0) {
      const emptyNode = document.createElement('div');
      emptyNode.className = 'exp-node';
      emptyNode.style.color = 'var(--text-muted)';
      emptyNode.style.fontStyle = 'italic';
      emptyNode.innerHTML = `<span>(Trống)</span>`;
      subGroup.appendChild(emptyNode);
    } else {
      explorerState.subfolderFiles.forEach(fileName => {
        const fileNode = document.createElement('div');
        fileNode.className = 'exp-node';
        if (explorerState.selectedFile && explorerState.selectedFile.name === fileName && explorerState.selectedFile.parent === 'sub') {
          fileNode.className += ' active-file';
        }
        fileNode.innerHTML = `${fileSvg}${fileName}`;
        fileNode.addEventListener('click', () => handleSelectFile(fileName, 'sub'));
        subGroup.appendChild(fileNode);
      });
    }
    virtualTreeContent.appendChild(subGroup);
  }

  function handleSelectFile(name, parent) {
    explorerState.selectedFile = { name, parent };
    
    let lookupName = name;
    if (parent === 'sub' && name === 'GhiChuQuanTrong.txt') {
      lookupName = 'GhiChuQuanTrong_backup.txt'; // backup content representation
    }
    
    virtualViewer.textContent = fileContents[lookupName] || '// Không tìm thấy dữ liệu tệp tin.';
    renderTree();
  }

  // Action Buttons for Explorer
  expCopy.addEventListener('click', () => {
    if (!explorerState.subfolderFiles.includes('GhiChuQuanTrong.txt')) {
      explorerState.subfolderFiles.push('GhiChuQuanTrong.txt');
      virtualViewer.textContent = `HỆ THỐNG MÔ PHỎNG:
------------------------------------------------------
Thao tác: SAO CHÉP (Copy & Paste) thành công!

Tệp 'GhiChuQuanTrong.txt' đã được sao chép vào thư mục con 'TaiLieu'. 
Tệp tin gốc ở ngoài vẫn được giữ nguyên. 
Nhấp vào file "GhiChuQuanTrong.txt" bên trong thư mục TaiLieu vừa xuất hiện ở nhánh cây thư mục để kiểm tra.`;
      explorerState.selectedFile = null;
      renderTree();
    } else {
      alert("Tệp tin 'GhiChuQuanTrong.txt' đã tồn tại trong thư mục TaiLieu.");
    }
  });

  expMove.addEventListener('click', () => {
    if (explorerState.rootFiles.includes('DiChuyen.txt')) {
      explorerState.rootFiles = explorerState.rootFiles.filter(f => f !== 'DiChuyen.txt');
      explorerState.subfolderFiles.push('DiChuyen.txt');
      virtualViewer.textContent = `HỆ THỐNG MÔ PHỎNG:
------------------------------------------------------
Thao tác: DI CHUYỂN (Cut & Paste) thành công!

Tệp 'DiChuyen.txt' đã được dời hẳn vào thư mục con 'TaiLieu' và biến mất hoàn toàn ở thư mục làm việc gốc.`;
      explorerState.selectedFile = null;
      renderTree();
    } else {
      alert("Tệp tin 'DiChuyen.txt' đã được di chuyển trước đó.");
    }
  });

  expDelete.addEventListener('click', () => {
    if (explorerState.subfolderFiles.includes('GhiChuQuanTrong.txt')) {
      explorerState.subfolderFiles = explorerState.subfolderFiles.filter(f => f !== 'GhiChuQuanTrong.txt');
      virtualViewer.textContent = `HỆ THỐNG MÔ PHỎNG:
------------------------------------------------------
Thao tác: XÓA TỆP TIN (Delete) thành công!

Tệp 'GhiChuQuanTrong.txt' trong thư mục TaiLieu đã được xóa bỏ và chuyển vào Thùng rác.`;
      explorerState.selectedFile = null;
      renderTree();
    } else {
      alert("Hãy bấm nút 'Copy Ghi Chú vào TaiLieu' trước để tạo tệp tin nháp cần xóa trong thư mục TaiLieu.");
    }
  });

  expReset.addEventListener('click', () => {
    explorerState = {
      rootFiles: ['GhiChuQuanTrong.txt', 'DiChuyen.txt'],
      subfolderFiles: [],
      selectedFile: null
    };
    virtualViewer.textContent = `// Nhấp vào một tệp tin (.txt) ở nhánh thư mục bên trái để xem trước nội dung bên trong...`;
    renderTree();
  });

  // Render on load
  if (virtualTreeContent) {
    renderTree();
  }


  // ==========================================
  // 6. BÀI 2: ACADEMIC FILTERING
  // ==========================================
  const acadFilterBtns = document.querySelectorAll('.acad-filter-btn');
  const acadTableRows = document.querySelectorAll('#acadTableBody tr');

  acadFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      acadFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-acad');
      acadTableRows.forEach(row => {
        const rowType = row.getAttribute('data-acad-type');
        if (filterType === 'all' || rowType === filterType) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
  // ==========================================
  // 7. MOUSE-TRACKING GLOW & 3D TILT EFFECT
  // ==========================================
  const tiltElements = [
    ...document.querySelectorAll('#home .glass-card'), 
    ...document.querySelectorAll('.assign-card-btn')
  ];

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set mouse glow coordinate variables
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt rotation calculations
      const width = rect.width;
      const height = rect.height;
      const maxRotation = 6; // Max rotation tilt in degrees
      const rotateX = ((y / height) - 0.5) * -maxRotation;
      const rotateY = ((x / width) - 0.5) * maxRotation;

      const activeOffset = (el.classList.contains('active') && el.classList.contains('assign-card-btn')) ? 'translateX(8px) ' : '';
      el.style.transform = `perspective(1000px) ${activeOffset}rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    // Disable transition lag during active mousemove for instant response
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease';
    });

    // Reset card smooth transition physics on mouseleave
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease';
      if (el.classList.contains('active') && el.classList.contains('assign-card-btn')) {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(8px)`;
      } else {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      }
    });
  });

  // ==========================================
  // 8. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // viewport
    threshold: 0.1, // reveal when 10% visible
    rootMargin: '0px 0px -40px 0px'
  });

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => revealObserver.observe(el));

  // Trigger initial reveals on page load (Home section)
  const homeReveals = document.querySelectorAll('#home .reveal');
  homeReveals.forEach(r => r.classList.add('active'));

  // ==========================================
  // 9. ACCORDION (BÀI 4 CHALLENGES)
  // ==========================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });
      
      // Toggle active state
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 10. PROMPT INTERNAL TABS (BÀI 3)
  // ==========================================
  const promptTabBtns = document.querySelectorAll('.prompt-tab-btn');
  const promptTaskPanels = document.querySelectorAll('.prompt-task-panel');

  promptTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      promptTabBtns.forEach(b => b.classList.remove('active'));
      promptTaskPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const taskId = btn.getAttribute('data-task');
      const activePanel = document.getElementById(`prompt-task-${taskId}`);
      if (activePanel) {
        activePanel.classList.add('active');
        // Trigger reflow & reveal class inside active prompt panel
        const reveals = activePanel.querySelectorAll('.reveal');
        reveals.forEach(r => {
          r.classList.remove('active');
          void r.offsetWidth;
          r.classList.add('active');
        });
      }
    });
  });

  // ==========================================
  // 11. PRINT TO PDF SYSTEM
  // ==========================================
  const printPdfBtn = document.getElementById('printPdfBtn');
  if (printPdfBtn) {
    printPdfBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================
  // 12. CUTE CAT EYE-TRACKING & TELEPORTATION & CHAT BUBBLE SYSTEM
  // ==========================================
  const pupilLeft = document.getElementById('pupilLeft');
  const pupilRight = document.getElementById('pupilRight');
  const cuteCat = document.getElementById('cuteCat');
  const catBubble = document.getElementById('catBubble');

  // Horizontal left offsets (in px) above: "TRƯỜNG" (36), "NGOẠI NGỮ" (130), "ĐHQGHN" (210)
  const catPositions = [36, 130, 210]; 
  let currentPosIndex = 0;
  let bubbleTimeout = null;

  const idlePhrases = [
    "Meo meo~",
    "Vuốt tớ đi! 🐾",
    "Học bài đi nhé! 📚",
    "Tường Anh ULIS chào bạn!",
    "Hàn Quốc Học thú vị lắm!",
    "Chào cậu nha! 💖"
  ];

  const jumpPhrases = [
    "Á! Đừng đụng tớ!",
    "Oái! Trốn nè! 💨",
    "Bắt hụt rồi nhé! 😜",
    "Hihi, ở bên này cơ!",
    "Đừng phá trẫm ngủ! 💤",
    "Nhanh tay đấy! ⚡"
  ];

  function showBubble(text, duration) {
    if (!catBubble) return;
    
    // Clear any pending timeouts to avoid overlapping transitions
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    
    catBubble.textContent = text;
    catBubble.classList.add('show');
    
    bubbleTimeout = setTimeout(() => {
      catBubble.classList.remove('show');
    }, duration);
  }

  if (cuteCat) {
    // Jump and speak on mouseenter
    cuteCat.addEventListener('mouseenter', () => {
      // Pick a random position index that is different from the current one
      let newIndex = Math.floor(Math.random() * catPositions.length);
      while (newIndex === currentPosIndex) {
        newIndex = Math.floor(Math.random() * catPositions.length);
      }
      currentPosIndex = newIndex;
      cuteCat.style.left = `${catPositions[currentPosIndex]}px`;

      // Say a random jump phrase
      const randomJumpPhrase = jumpPhrases[Math.floor(Math.random() * jumpPhrases.length)];
      showBubble(randomJumpPhrase, 1800);
    });

    // Idle bubble timer (triggers every 3 seconds, showing for 1.8 seconds)
    setInterval(() => {
      // Only show idle bubble if it's not currently showing (e.g. from a recent jump)
      if (catBubble && !catBubble.classList.contains('show')) {
        const randomIdlePhrase = idlePhrases[Math.floor(Math.random() * idlePhrases.length)];
        showBubble(randomIdlePhrase, 1800);
      }
    }, 3000);
  }

  if (pupilLeft && pupilRight) {
    window.addEventListener('mousemove', (e) => {
      [pupilLeft, pupilRight].forEach(pupil => {
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        
        // Find the absolute center of the eye in the viewport
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        // Calculate vector from eye to mouse cursor
        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const angle = Math.atan2(dy, dx);
        
        // Max pupil translation radius inside the eye socket (scaled to 2px for 9px eye)
        const maxDist = 2.0; 
        const x = Math.cos(angle) * maxDist;
        const y = Math.sin(angle) * maxDist;
        
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ==========================================
  // 13. GLOBAL COPY SEARCH QUERY HELPER
  // ==========================================
  window.copyQueryText = function(elementId, button) {
    const queryText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(queryText).then(() => {
      const originalText = button.innerHTML;
      button.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Đã sao chép!
      `;
      button.style.borderColor = 'green';
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.borderColor = 'var(--color-sky-blue)';
      }, 1800);
    });
  };

});
