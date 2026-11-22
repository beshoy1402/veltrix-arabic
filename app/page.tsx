"use client";

import { useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowUpLeft, BookOpen, CalendarDays, Check,
  ChevronDown, ClipboardCheck, FileSpreadsheet, GraduationCap, Headphones,
  LayoutDashboard, Menu, MessageCircle, Monitor, ShieldCheck, Sparkles,
  Wallet, Users, X, Building2, BrainCircuit, ChartNoAxesCombined, Clock3,
  FileText, Smartphone, BadgeCheck, Wrench, Database, RefreshCw, Printer
} from "lucide-react";

const sections = [
  { id: "public", n: "01", title: "الموقع الإلكتروني الرئيسي", desc: "واجهة تعريفية أنيقة تمنح المدرس حضوراً رقمياً احترافياً وتسهّل على الطلاب وأولياء الأمور الوصول إلى المعلومات.", icon: Monitor, items: ["صفحة رئيسية بتصميم احترافي وتعريف بالمدرس", "صفحة نبذة عن المدرس والخبرات والمؤهلات", "عرض المراكز التعليمية ومواقعها", "عرض الصفوف والمراحل والمجموعات المتاحة", "طلبات التسجيل في المجموعات", "طلبات حجز الحصص الخاصة", "صفحة الإعلانات والأخبار", "صفحة تواصل وربط مباشر بواتساب"] },
  { id: "management", n: "02", title: "لوحة تحكم المدرس", desc: "مركز تحكم موحّد لإدارة جميع تفاصيل العمل من مكان واحد، دون الحاجة إلى أدوات أو ملفات متفرقة.", icon: LayoutDashboard, items: ["لوحة إحصائيات ومؤشرات شاملة", "إدارة جميع المراكز والفصول والمجموعات", "إدارة الطلاب وأولياء الأمور", "إدارة الحصص الخاصة الفردية والجماعية", "إدارة الجداول والمواعيد", "إدارة المساعدين والصلاحيات", "سجل النشاط والتعديلات", "إعدادات المنصة وإدارة المحتوى"] },
  { id: "students", n: "03", title: "إدارة الطلاب وأولياء الأمور", desc: "ملف موحّد لكل طالب يربط بياناته وتسجيلاته وحضوره ودرجاته ومدفوعاته في مكان واحد.", icon: Users, items: ["تسجيل الطالب من الموقع بعد مراجعة المدرس", "إنشاء حسابات الطلاب يدوياً", "إضافة حساب مستقل لولي الأمر", "ربط ولي الأمر بأكثر من طالب", "ملف شخصي وبيانات التواصل والمرحلة الدراسية", "تسجيل الطالب في أكثر من مركز أو مجموعة", "نقل الطلاب بين المجموعات والمراكز", "متابعة المستوى وسجل الدرجات والمدفوعات"] },
  { id: "centers", n: "04", title: "إدارة المراكز التعليمية", desc: "إدارة مستقلة لكل مركز مع متابعة الفصول والحضور والأداء والتعاملات المالية.", icon: Building2, items: ["إضافة وتعديل بيانات المراكز وعناوينها", "إنشاء الفصول والمجموعات وتحديد السعة", "تحديد أيام ومواعيد الدراسة", "توزيع الطلاب على المجموعات", "متابعة حضور وغياب كل مجموعة", "تقارير أداء وإحصائيات لكل مركز", "تسجيل الاتفاقات المالية مع المراكز", "متابعة مستحقات المدرس وتسويات المراكز"] },
  { id: "private", n: "05", title: "إدارة الحصص الخاصة", desc: "تنظيم الحصص الفردية والجماعية ومواعيدها وباقاتها ومدفوعاتها، مع متابعة الرصيد المتبقي لكل طالب.", icon: CalendarDays, items: ["إنشاء حصص فردية أو جماعية", "تحديد الموعد والمدة ومكان الحصة", "تحديد سعر الحصة أو الباقة", "باقات مرنة بعدد حصص قابل للتخصيص", "متابعة الحصص المستخدمة والمتبقية", "تسجيل الحضور والإلغاء والتأجيل", "إعادة جدولة الحصص", "متابعة المدفوعات والمبالغ المستحقة"] },
  { id: "learning", n: "06", title: "الحضور والواجبات والمحتوى", desc: "أدوات يومية تساعد المدرس على متابعة التزام الطلاب وتوزيع المحتوى التعليمي وتصحيح الواجبات.", icon: ClipboardCheck, items: ["تسجيل الحضور: حاضر، غائب، متأخر، بعذر", "تقارير حضور يومية وشهرية ونسب الالتزام", "إنشاء الواجبات وتحديد مواعيد التسليم", "إرفاق ملفات PDF والصور", "استقبال إجابات الطلاب ومراجعتها", "تسجيل الدرجات والملاحظات", "مكتبة للمذكرات والمراجعات والملفات", "تخصيص المحتوى حسب الصف والمجموعة"] },
  { id: "exams", n: "07", title: "بنك الأسئلة والامتحانات", desc: "منظومة تقييم مرنة لإنشاء الاختبارات ومتابعة نتائج الطلاب وتحليل مستواهم.", icon: BookOpen, items: ["إنشاء بنك أسئلة وتصنيفها حسب الصف والموضوع", "إضافة الأسئلة يدوياً أو استيرادها من Word وPDF", "اختيار من متعدد وصح وخطأ وأكمل ومقالي", "أسئلة النحو والبلاغة والقراءة", "إنشاء امتحانات من بنك الأسئلة", "تحديد زمن الامتحان وترتيب الأسئلة عشوائياً", "تصحيح الأسئلة الموضوعية تلقائياً", "مراجعة الإجابات المقالية ونشر النتائج"] },
  { id: "finance", n: "08", title: "الإدارة المالية والمدفوعات", desc: "متابعة مالية واضحة تفصل بين جهة تحصيل المبلغ ونصيب المدرس والمركز لتجنّب تكرار الحسابات.", icon: Wallet, items: ["تسجيل المدفوعات النقدية والإلكترونية", "تسجيل ما يتم تحصيله بواسطة المدرس أو المركز", "تسجيل الدفعات الجزئية والمتأخرات", "ربط عمليات الدفع بالطالب أو الحصة أو المجموعة", "إدارة الاتفاقات ونسب أو مستحقات المراكز", "متابعة التسويات والمبالغ المستحقة", "تسجيل المصروفات وإصدار إيصالات", "تقارير الإيرادات والمصروفات شهرياً وسنوياً"] },
  { id: "reports", n: "09", title: "الجداول والتقارير والإشعارات", desc: "رؤية شاملة للمواعيد والأداء والعمليات، مع تنبيهات تساعد على التواصل في الوقت المناسب.", icon: ChartNoAxesCombined, items: ["تقويم يومي وأسبوعي وشهري", "كشف تعارض مواعيد الحصص", "تقارير الطلاب والمراكز والمجموعات", "تحليل الحضور ومتوسط الدرجات", "تصدير التقارير إلى Excel وPDF", "إشعارات الواجبات والامتحانات والنتائج", "تذكيرات الغياب والمدفوعات", "رسائل وإعلانات موجهة للطلاب وأولياء الأمور"] },
  { id: "ai", n: "10", title: "مساعد الذكاء الاصطناعي", desc: "مساعد ذكي يدعم المدرس في إعداد المحتوى وتحليل الإجابات، مع بقاء القرار النهائي للمدرس.", icon: BrainCircuit, items: ["اقتراح أسئلة وتدريبات باللغة العربية", "المساعدة في إعداد نماذج الامتحانات", "تحليل إجابات الواجبات واقتراح التصحيح", "تحليل أداء الطلاب وتحديد نقاط الضعف", "اقتراح مراجعات تعليمية مناسبة", "إعداد ملخصات وتقارير أداء", "إمكانية ضبط مزوّد الذكاء الاصطناعي", "متابعة الاستهلاك والتكلفة وحدود الاستخدام"] },
  { id: "security", n: "11", title: "الأمان والإدارة التقنية", desc: "حماية بيانات الطلاب والمعاملات، مع أدوات لمتابعة استقرار النظام وإمكانية استعادة البيانات.", icon: ShieldCheck, items: ["تسجيل دخول آمن وصلاحيات حسب الدور", "حماية بيانات الطلاب وأولياء الأمور", "سجل تدقيق للعمليات والتعديلات", "نسخ احتياطي وخطة لاستعادة البيانات", "متابعة حالة قاعدة البيانات والتكاملات", "مراقبة استهلاك الخدمات والتكاليف", "لوحة تقنية مستقلة للمطور باللغة الإنجليزية", "إدارة الأعطال والمهام والتحديثات التقنية"] },
];

const roles = [
  ["المدرس / مالك المنصة", "صلاحية كاملة لإدارة المراكز والطلاب والتعليم والمالية والإعدادات."],
  ["المساعد", "صلاحيات تشغيلية محددة لإدارة الحضور والواجبات والطلاب وفق ما يسمح به المدرس."],
  ["الطالب", "الوصول إلى جدوله وواجباته وامتحاناته ودرجاته ومواده التعليمية."],
  ["ولي الأمر", "متابعة الأبناء المرتبطين بحسابه فقط، بما يشمل الحضور والدرجات والمدفوعات."],
  ["المطور", "إدارة تقنية مستقلة باللغة الإنجليزية، دون وصول تلقائي إلى بيانات الطلاب الخاصة."]
];

const maintenance = [
  ["إصلاح الأخطاء البرمجية", "معالجة الأعطال والمشكلات التي تظهر أثناء استخدام الموقع."],
  ["الفحص الدوري للموقع", "مراجعة الصفحات والوظائف الأساسية والتأكد من عملها بصورة سليمة."],
  ["تحديثات الأمان المتوافقة", "تطبيق تحديثات الأمان المتوافقة مع بنية الموقع وإصداراته."],
  ["فحص قاعدة البيانات والتكاملات", "التحقق من الاتصال بقاعدة البيانات والخدمات الخارجية المرتبطة."],
  ["دعم مساعد الذكاء الاصطناعي", "متابعة المشكلات التقنية المتعلقة بالمساعد الذكي."],
  ["تحديثات بسيطة للمحتوى", "تعديل نصوص أو صور أو بيانات بسيطة ضمن الهيكل الحالي."],
  ["المساعدة الفنية", "تقديم الدعم والإرشاد الفني والتعامل مع المشكلات التقنية."]
];

const faqs = [
  ["هل يشمل العرض تقديم دروس أونلاين مباشرة؟", "لا، المنصة مخصصة لإدارة الحصص الحضورية داخل المراكز والحصص الخاصة. ويمكن للطلاب استخدام حساباتهم لمتابعة الجداول والواجبات والامتحانات والنتائج والملفات."],
  ["هل يمكن للطالب التسجيل بنفسه؟", "نعم، يستطيع الطالب إرسال طلب تسجيل من الموقع، ويقوم المدرس بمراجعته والموافقة عليه أو رفضه. كما يمكن للمدرس إنشاء حسابات الطلاب يدوياً."],
  ["هل يمكن للمراكز تحصيل المدفوعات؟", "نعم، يدعم النظام تسجيل المدفوعات التي يحصل عليها المدرس أو المركز، مع فصل المبالغ المحصلة عن المستحقات والتسويات المالية."],
  ["هل يشمل سعر الصيانة إضافة خصائص جديدة؟", "باقة الصيانة تشمل الإصلاحات والفحوصات والتحديثات المتوافقة والدعم والتعديلات البسيطة للمحتوى. أما إضافة أنظمة أو خصائص جديدة كبيرة فتُقدّر بصورة مستقلة."]
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(["public", "management"]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const toggle = (id: string) => setExpanded(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);

  return (
    <main>
      <div className="announcement"><span className="pulse" /> عرض فني ومالي مخصص لتطوير منصة تعليمية متكاملة <span className="ann-sep">✦</span> مقدم من <b>VELTRIX</b></div>
      <header className="nav wrap">
        <a className="brand" href="#top" aria-label="VELTRIX"><span className="brand-mark">V</span><span>VELTRIX<small> DIGITAL EXPERIENCES</small></span></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#overview" onClick={() => setMenuOpen(false)}>نظرة عامة</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>المميزات</a>
          <a href="#maintenance" onClick={() => setMenuOpen(false)}>الصيانة</a>
          <a href="#terms" onClick={() => setMenuOpen(false)}>الشروط</a>
        </nav>
        <div className="nav-actions"><a className="nav-cta" href="#contact">مناقشة العرض <ArrowLeft size={15}/></a><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">{menuOpen ? <X/> : <Menu/>}</button></div>
      </header>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> عرض فني ومالي <span className="eyebrow-dot">✳</span> منصة تعليمية متكاملة</div>
          <h1>إدارة تعليمك،<br/><em>بأسلوب أكثر ذكاءً.</em></h1>
          <p className="hero-lead">منصة رقمية متكاملة تجمع إدارة المراكز التعليمية والحصص الخاصة والطلاب وأولياء الأمور والعمليات المالية في تجربة واحدة أنيقة وسهلة الاستخدام.</p>
          <div className="hero-actions"><a className="btn-primary" href="#features">اكتشف تفاصيل المنصة <ArrowLeft size={17}/></a><a className="btn-quiet" href="#maintenance">عرض باقة الصيانة <ArrowDown size={16}/></a></div>
          <div className="hero-meta"><span><Check size={15}/> واجهة عربية بالكامل</span><span><Check size={15}/> متوافق مع الهاتف</span><span><Check size={15}/> إدارة مركزية</span></div>
        </div>
        <div className="hero-art" aria-label="تصميم توضيحي للوحة تحكم تعليمية">
          <div className="art-glow"/>
          <div className="art-ring ring-one"/><div className="art-ring ring-two"/>
          <div className="floating-tag tag-top"><span className="tag-icon"><GraduationCap size={17}/></span><span><b>منظومة تعليمية</b><small>كل التفاصيل في مكان واحد</small></span></div>
          <div className="dashboard-card">
            <div className="dash-top"><div><small>لوحة تحكم المدرس</small><b>ملخص الأداء</b></div><span className="dash-avatar">م</span></div>
            <div className="dash-stats"><div><small>إجمالي الطلاب</small><b>١٬٢٤٨</b><span className="stat-up">↗ ١٢٪</span></div><div><small>المجموعات النشطة</small><b>٢٤</b><span className="stat-neutral">هذا الشهر</span></div></div>
            <div className="chart-title"><b>نظرة على الأداء</b><small>آخر ٦ أشهر</small></div>
            <div className="mini-chart"><span style={{height:"34%"}}/><span style={{height:"49%"}}/><span style={{height:"43%"}}/><span style={{height:"67%"}}/><span style={{height:"57%"}}/><span style={{height:"78%"}}/><span style={{height:"69%"}}/><span style={{height:"94%"}}/></div>
            <div className="dash-bottom"><span><i className="legend-dot"/> الحضور والالتزام</span><span>مؤشرات محدثة</span></div>
          </div>
          <div className="floating-tag tag-bottom"><span className="tag-check"><Check size={16}/></span><span><b>متابعة لحظية</b><small>تقارير وبيانات منظمة</small></span></div>
          <div className="art-spark spark-a">✳</div><div className="art-spark spark-b">✦</div>
        </div>
        <div className="hero-index"><span>01</span><i/> <span>عرض المنصة</span></div>
      </section>

      <section className="overview-band" id="overview"><div className="wrap overview-grid"><div><span className="section-kicker">الفكرة باختصار</span><h2>منظومة واحدة.<br/><em>إدارة بلا تعقيد.</em></h2></div><p>سواء كنت تدرّس داخل أكثر من مركز أو تقدم حصصاً خاصة، تمنحك المنصة رؤية واضحة لكل طالب وحصة وموعد ومعاملة مالية، مع بوابات مخصصة للطلاب وأولياء الأمور.</p><div className="overview-points"><span><Building2/> إدارة عدة مراكز</span><span><Users/> ملفات طلاب موحّدة</span><span><Wallet/> متابعة مالية دقيقة</span></div></div></section>

      <section className="section wrap" id="features">
        <div className="section-heading"><div><span className="section-kicker">نطاق العمل والمميزات</span><h2>كل ما تحتاجه لإدارة<br/><em>منظومتك التعليمية.</em></h2></div><p>تفاصيل الوظائف والخصائص المقترحة ضمن المنصة، منظمة في أقسام واضحة وقابلة للمراجعة والاعتماد.</p></div>
        <div className="feature-intro"><span>01 — 11</span><b>تفاصيل الخصائص والأنظمة</b><span className="feature-intro-line"/><button onClick={() => setExpanded(expanded.length === sections.length ? [] : sections.map(s => s.id))}>{expanded.length === sections.length ? "طيّ جميع الأقسام" : "عرض جميع التفاصيل"} <ChevronDown size={15}/></button></div>
        <div className="feature-list">{sections.map(s => { const Icon = s.icon; const open = expanded.includes(s.id); return <article className={open ? "feature-card active" : "feature-card"} key={s.id}>
          <button className="feature-trigger" onClick={() => toggle(s.id)} aria-expanded={open}><span className="feature-number">{s.n}</span><span className="feature-icon"><Icon size={21}/></span><span className="feature-title-wrap"><b>{s.title}</b><small>{s.desc}</small></span><span className="feature-count">{s.items.length} خصائص</span><span className="feature-chevron"><ChevronDown size={18}/></span></button>
          {open && <div className="feature-content"><div className="feature-content-inner">{s.items.map((item,i)=><div className="feature-item" key={item}><span><Check size={14}/></span>{item}</div>)}</div></div>}
        </article>})}</div>
      </section>

      <section className="portal-section"><div className="wrap portal-grid"><div className="portal-copy"><span className="section-kicker">تجربة لكل مستخدم</span><h2>كل شخص يرى<br/><em>ما يخصّه فقط.</em></h2><p>صلاحيات واضحة وتجربة مناسبة لكل دور، مع حماية خصوصية بيانات الطلاب وأولياء الأمور.</p><div className="role-list">{roles.map(([name,desc],i)=><div className="role-row" key={name}><span className="role-index">0{i+1}</span><div><b>{name}</b><small>{desc}</small></div><BadgeCheck size={18}/></div>)}</div></div><div className="portal-visual"><div className="portal-orbit orbit-a"/><div className="portal-orbit orbit-b"/><div className="portal-center"><div className="portal-center-icon"><GraduationCap size={36}/></div><b>منصة واحدة</b><small>تجربة مترابطة</small></div><div className="orbit-node node-1"><Users/><span>الطلاب</span></div><div className="orbit-node node-2"><Headphones/><span>المساعد</span></div><div className="orbit-node node-3"><Wallet/><span>المالية</span></div><div className="orbit-node node-4"><Smartphone/><span>أولياء الأمور</span></div></div></div></section>

      <section className="section wrap" id="maintenance"><div className="maintenance-heading"><div><span className="section-kicker">استمرارية وراحة بال</span><h2>الدعم لا يتوقف<br/><em>عند التسليم.</em></h2><p>لضمان استمرار عمل المنصة بكفاءة، نوفر باقة صيانة ودعم فني لمدة ثلاثة أشهر تشمل المتابعة والإصلاحات والخدمات الموضحة أدناه.</p></div><div className="maintenance-stamp"><Wrench size={24}/><span>دعم فني<br/>ومتابعة دورية</span></div></div>
        <div className="maintenance-card"><div className="maintenance-card-top"><div><span className="plan-label">باقة الصيانة والدعم الفني</span><h3>ثلاثة أشهر من <em>الاهتمام المستمر.</em></h3><p>خدمات متابعة وصيانة للحفاظ على استقرار الموقع وسلامة وظائفه.</p></div><div className="price-block"><span>السعر الإجمالي</span><strong><small>EGP</small> 8,000</strong><b>لمدة 3 أشهر</b></div></div><div className="maintenance-services">{maintenance.map(([title,desc],i)=><div className="maintenance-service" key={title}><span className="service-check"><Check size={15}/></span><div><b>{title}</b><small>{desc}</small></div></div>)}</div><div className="maintenance-foot"><span><Clock3 size={16}/> تبدأ المدة من تاريخ بدء الصيانة المتفق عليه</span><span><ShieldCheck size={16}/> دعم فني ومتابعة خلال فترة الباقة</span></div></div>
      </section>

      <section className="process-section"><div className="wrap"><div className="section-heading light"><div><span className="section-kicker">من الفكرة إلى التشغيل</span><h2>خطوات واضحة.<br/><em>نتيجة مدروسة.</em></h2></div><p>نعمل وفق مراحل منظمة لضمان وضوح نطاق العمل ومراجعة التفاصيل قبل الإطلاق.</p></div><div className="process-grid"><div><span>01</span><b>اعتماد نطاق العمل</b><small>مراجعة الخصائص والتفاصيل والاتفاق على الأولويات.</small></div><div><span>02</span><b>التصميم والتطوير</b><small>تصميم الواجهات وتنفيذ الأنظمة والوظائف المعتمدة.</small></div><div><span>03</span><b>الاختبار والمراجعة</b><small>مراجعة تجربة الاستخدام والوظائف والصلاحيات.</small></div><div><span>04</span><b>التسليم والتشغيل</b><small>إطلاق المنصة وبدء فترة الصيانة المتفق عليها.</small></div></div></div></section>

      <section className="section wrap" id="terms"><div className="section-heading"><div><span className="section-kicker">توضيحات مهمة</span><h2>تفاصيل تحفظ<br/><em>وضوح الاتفاق.</em></h2></div><p>نحرص على توضيح حدود العرض وما يتضمنه قبل بدء التنفيذ.</p></div><div className="terms-grid"><div className="term-card"><span>01</span><b>نطاق التطوير</b><p>يتم اعتماد الخصائص النهائية والأولويات والتفاصيل الفنية قبل بدء التنفيذ.</p></div><div className="term-card"><span>02</span><b>حدود الصيانة</b><p>تشمل الباقة الإصلاحات والفحوصات والتحديثات المتوافقة والتعديلات البسيطة للمحتوى، ولا تشمل تطوير أنظمة كبيرة جديدة.</p></div><div className="term-card"><span>03</span><b>الخدمات الخارجية</b><p>رسوم الاستضافة وقواعد البيانات والذكاء الاصطناعي ورسوم بوابات الدفع والخدمات الخارجية لا تدخل في سعر الصيانة إلا إذا تم الاتفاق كتابياً على ذلك.</p></div><div className="term-card"><span>04</span><b>التعديلات الإضافية</b><p>أي خصائص أو تغييرات جوهرية خارج نطاق العمل المعتمد يتم تقديرها والاتفاق عليها بصورة مستقلة.</p></div></div></section>

      <section className="faq-section"><div className="wrap faq-grid"><div><span className="section-kicker">إجابات سريعة</span><h2>أسئلة قد<br/><em>تكون في بالك.</em></h2><p>إذا كانت هناك تفاصيل أخرى ترغب في مناقشتها، يسعدنا توضيحها قبل اعتماد العرض.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={faqOpen===i?"faq-item open":"faq-item"} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)}><b>{q}</b><ChevronDown size={18}/></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></div></section>

      <section className="closing wrap" id="contact"><div className="closing-card"><div className="closing-decoration">✳</div><span className="section-kicker">الخطوة التالية</span><h2>لنحوّل إدارة العملية التعليمية<br/><em>إلى تجربة أكثر سهولة.</em></h2><p>يسعدنا مناقشة تفاصيل العرض والإجابة عن أي استفسارات، ثم اعتماد نطاق العمل تمهيداً لبدء التنفيذ.</p><div className="closing-actions"><a href="mailto:hello@veltrixeg.com?subject=استفسار%20حول%20عرض%20المنصة%20التعليمية" className="btn-primary">مناقشة العرض <ArrowLeft size={17}/></a><button className="btn-outline" onClick={()=>window.print()}><Printer size={16}/> طباعة العرض أو حفظه PDF</button></div><small className="closing-note">عرض فني ومالي مقدم من VELTRIX</small></div></section>

      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark">V</span><span>VELTRIX<small> DIGITAL EXPERIENCES</small></span></a><span>حلول رقمية تُصمّم بعناية.</span><span>© {new Date().getFullYear()} VELTRIX. جميع الحقوق محفوظة.</span></div></footer>
    </main>
  );
}
