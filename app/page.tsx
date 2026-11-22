"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check,
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
  { id: "ai", n: "10", title: "مساعد الذكاء الاصطناعي", desc: "منظومة ذكاء اصطناعي متقدمة تدعم المدرس والمساعد في المهام اليومية وتساعد على اتخاذ قرارات تعليمية أكثر وضوحاً.", icon: BrainCircuit, items: ["تكامل مع NVIDIA AI عبر NVIDIA NIM والنماذج المتاحة", "وكيل ذكاء اصطناعي داخل لوحة المدرس لتنفيذ المهام المسموح بها", "محادثة ذكية للمدرس والمساعد للإجابة عن أسئلة العمل", "اقتراح أسئلة وتدريبات باللغة العربية", "المساعدة في إعداد نماذج الامتحانات والواجبات", "تحليل أداء الطلاب وتحديد نقاط الضعف", "اقتراح مراجعات وخطط متابعة مناسبة", "إعداد ملخصات وتقارير أداء", "إدارة مزوّد الذكاء الاصطناعي وحدود الاستخدام والتكلفة"] },
  { id: "support", n: "11", title: "الدعم المباشر وواتساب", desc: "قنوات تواصل متصلة بالمنصة لمساعدة المدرس والمساعد والرد على استفسارات الطلاب وأولياء الأمور.", icon: Headphones, items: ["محادثة دعم مباشر داخل لوحة المدرس", "إمكانية تحويل المحادثة إلى المدرس أو المساعد حسب الصلاحيات", "صندوق وارد موحّد لطلبات الدعم والاستفسارات", "روبوت محادثة ذكي للرد على الأسئلة المتكررة", "تكامل WhatsApp Business Cloud API", "إرسال إشعارات وتذكيرات عبر واتساب وفق إعدادات المنصة", "استقبال رسائل واتساب وربطها بملفات الطلاب عند الحاجة", "إدارة قوالب الرسائل وحالة الإرسال وسجل المحادثات", "إعداد مفاتيح API والتحقق من Webhooks بشكل آمن"] },
  { id: "security", n: "12", title: "الأمان والإدارة التقنية", desc: "حماية بيانات الطلاب والمعاملات، مع أدوات لمتابعة استقرار النظام وإمكانية استعادة البيانات.", icon: ShieldCheck, items: ["تسجيل دخول آمن وصلاحيات حسب الدور", "حماية بيانات الطلاب وأولياء الأمور", "سجل تدقيق للعمليات والتعديلات", "نسخ احتياطي وخطة لاستعادة البيانات", "متابعة حالة قاعدة البيانات والتكاملات", "مراقبة استهلاك الخدمات والتكاليف", "لوحة تقنية مستقلة للمطور باللغة الإنجليزية", "إدارة الأعطال والمهام والتحديثات التقنية"] },
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
  ["دعم مساعد الذكاء الاصطناعي", "متابعة المشكلات التقنية المتعلقة بالمساعد الذكي وتكامل NVIDIA NIM."],
  ["فحص تكامل واتساب", "مراجعة اتصال WhatsApp Business API والـ Webhooks وإعدادات الرسائل."],
  ["تحديثات بسيطة للمحتوى", "تعديل نصوص أو صور أو بيانات بسيطة ضمن الهيكل الحالي."],
  ["المساعدة الفنية", "تقديم الدعم والإرشاد الفني والتعامل مع المشكلات التقنية."]
];

const faqs = [
  ["هل يشمل العرض تقديم دروس أونلاين مباشرة؟", "لا، المنصة مخصصة لإدارة الحصص الحضورية داخل المراكز والحصص الخاصة. ويمكن للطلاب استخدام حساباتهم لمتابعة الجداول والواجبات والامتحانات والنتائج والملفات."],
  ["هل يمكن للطالب التسجيل بنفسه؟", "نعم، يستطيع الطالب إرسال طلب تسجيل من الموقع، ويقوم المدرس بمراجعته والموافقة عليه أو رفضه. كما يمكن للمدرس إنشاء حسابات الطلاب يدوياً."],
  ["هل يمكن للمراكز تحصيل المدفوعات؟", "نعم، يدعم النظام تسجيل المدفوعات التي يحصل عليها المدرس أو المركز، مع فصل المبالغ المحصلة عن المستحقات والتسويات المالية."],
  ["هل يمكن ربط المنصة بواتساب؟", "نعم، يتضمن نطاق العمل إعداد تكامل WhatsApp Business Cloud API لإرسال واستقبال الرسائل والإشعارات وفق صلاحيات المنصة. يلزم توفير حساب WhatsApp Business وبيانات الربط الرسمية قبل التنفيذ."],
  ["هل يشمل سعر الصيانة إضافة خصائص جديدة؟", "باقة الصيانة تشمل الإصلاحات والفحوصات والتحديثات المتوافقة والدعم والتعديلات البسيطة للمحتوى. أما إضافة أنظمة أو خصائص جديدة كبيرة فتُقدّر بصورة مستقلة."]
];


const ENGLISH: Record<string, string> = {
  "عرض فني ومالي مخصص لتطوير منصة تعليمية متكاملة": "Technical and financial proposal for an integrated education platform",
  "مقدم من": "Presented by",
  "نظرة عامة": "Overview",
  "المميزات": "Features",
  "الأسعار": "Pricing",
  "الصيانة": "Maintenance",
  "الشروط": "Terms",
  "مناقشة العرض": "Discuss proposal",
  "عرض فني ومالي": "Technical & financial proposal",
  "منصة تعليمية متكاملة": "Integrated education platform",
  "إدارة تعليمك،": "Manage your teaching,",
  "بأسلوب أكثر ذكاءً.": "the smarter way.",
  "منصة رقمية متكاملة تجمع إدارة المراكز التعليمية والحصص الخاصة والطلاب وأولياء الأمور والعمليات المالية في تجربة واحدة أنيقة وسهلة الاستخدام.": "An integrated digital platform bringing learning centers, private lessons, students, parents, and financial operations together in one elegant, easy-to-use experience.",
  "اكتشف تفاصيل المنصة": "Explore the platform",
  "عرض باقة الصيانة": "View maintenance package",
  "واجهة عربية بالكامل": "Arabic interface",
  "متوافق مع الهاتف": "Mobile friendly",
  "إدارة مركزية": "Centralized management",
  "لوحة تحكم المدرس": "Teacher dashboard",
  "ملخص الأداء": "Performance overview",
  "إجمالي الطلاب": "Total students",
  "المجموعات النشطة": "Active groups",
  "نظرة على الأداء": "Performance overview",
  "آخر ٦ أشهر": "Last 6 months",
  "الحضور والالتزام": "Attendance and engagement",
  "مؤشرات محدثة": "Updated indicators",
  "منظومة تعليمية": "Education platform",
  "كل التفاصيل في مكان واحد": "Everything in one place",
  "متابعة لحظية": "Real-time tracking",
  "تقارير وبيانات منظمة": "Organized reports and data",
  "عرض المنصة": "Platform proposal",
  "الفكرة باختصار": "At a glance",
  "منظومة واحدة.": "One platform.",
  "إدارة بلا تعقيد.": "Management without complexity.",
  "سواء كنت تدرّس داخل أكثر من مركز أو تقدم حصصاً خاصة، تمنحك المنصة رؤية واضحة لكل طالب وحصة وموعد ومعاملة مالية، مع بوابات مخصصة للطلاب وأولياء الأمور.": "Whether you teach at multiple centers or offer private lessons, the platform gives you a clear view of every student, lesson, schedule, and financial transaction, with dedicated student and parent portals.",
  "إدارة عدة مراكز": "Manage multiple centers",
  "ملفات طلاب موحّدة": "Unified student profiles",
  "متابعة مالية دقيقة": "Accurate financial tracking",
  "نطاق العمل والمميزات": "Scope & features",
  "كل ما تحتاجه لإدارة": "Everything you need to manage",
  "منظومتك التعليمية.": "your education business.",
  "تفاصيل الوظائف والخصائص المقترحة ضمن المنصة، منظمة في أقسام واضحة وقابلة للمراجعة والاعتماد.": "Proposed platform functions and features, organized into clear sections for review and approval.",
  "تفاصيل الخصائص والأنظمة": "Feature and system details",
  "طيّ جميع الأقسام": "Collapse all sections",
  "عرض جميع التفاصيل": "Show all details",
  "خصائص": "features",
  "تجربة لكل مستخدم": "A role for every user",
  "كل شخص يرى": "Everyone sees",
  "ما يخصّه فقط.": "only what they need.",
  "صلاحيات واضحة وتجربة مناسبة لكل دور، مع حماية خصوصية بيانات الطلاب وأولياء الأمور.": "Clear permissions and a tailored experience for each role, while protecting student and parent privacy.",
  "منصة واحدة": "One platform",
  "تجربة مترابطة": "Connected experience",
  "الطلاب": "Students",
  "المساعد": "Assistant",
  "المالية": "Finance",
  "أولياء الأمور": "Parents",
  "الاستثمار في المنصة": "Platform investment",
  "تكلفة واضحة.": "Clear pricing.",
  "قيمة قابلة للتطوير.": "Value that can grow.",
  "يتم تحديد السعر النهائي بعد اعتماد التفاصيل والأولويات الفنية، مع فصل تكلفة التطوير عن باقة الصيانة.": "The final price is confirmed after the scope and technical priorities are approved. Development and maintenance are priced separately.",
  "تكلفة تصميم وتطوير المنصة": "Platform design & development",
  "منظومة تعليمية متكاملة": "An integrated education platform",
  "مصممة لطريقة عملك.": "built around how you work.",
  "يشمل السعر تنفيذ نطاق العمل والخصائص الموضحة في هذا العرض بعد اعتمادها.": "Includes implementation of the approved scope and features described in this proposal.",
  "السعر التقديري للمشروع": "Estimated project price",
  "يُحدد السعر النهائي بعد اعتماد النطاق": "Final price confirmed after scope approval",
  "باقة الصيانة والدعم الفني لمدة 3 أشهر:": "3-month maintenance and technical support package:",
  "استمرارية وراحة بال": "Continuity & peace of mind",
  "الدعم لا يتوقف": "Support doesn't stop",
  "عند التسليم.": "at handover.",
  "لضمان استمرار عمل المنصة بكفاءة، نوفر باقة صيانة ودعم فني لمدة ثلاثة أشهر تشمل المتابعة والإصلاحات والخدمات الموضحة أدناه.": "To keep the platform running smoothly, we offer a three-month maintenance and support package covering monitoring, fixes, and the services below.",
  "دعم فني": "Technical support",
  "ومتابعة دورية": "& regular monitoring",
  "باقة الصيانة والدعم الفني": "Maintenance & technical support",
  "ثلاثة أشهر من": "Three months of",
  "الاهتمام المستمر.": "ongoing care.",
  "خدمات متابعة وصيانة للحفاظ على استقرار الموقع وسلامة وظائفه.": "Monitoring and maintenance services to keep the website stable and its features working correctly.",
  "السعر الإجمالي": "Total price",
  "لمدة 3 أشهر": "For 3 months",
  "تبدأ المدة من تاريخ بدء الصيانة المتفق عليه": "The package starts on the agreed maintenance start date",
  "دعم فني ومتابعة خلال فترة الباقة": "Technical support throughout the package",
  "من الفكرة إلى التشغيل": "From concept to launch",
  "خطوات واضحة.": "Clear steps.",
  "نتيجة مدروسة.": "A considered result.",
  "نعمل وفق مراحل منظمة لضمان وضوح نطاق العمل ومراجعة التفاصيل قبل الإطلاق.": "We follow an organized process to clarify the scope and review details before launch.",
  "اعتماد نطاق العمل": "Approve the scope",
  "مراجعة الخصائص والتفاصيل والاتفاق على الأولويات.": "Review features and details, then agree on priorities.",
  "التصميم والتطوير": "Design & development",
  "تصميم الواجهات وتنفيذ الأنظمة والوظائف المعتمدة.": "Design the interfaces and implement the approved systems and functions.",
  "الاختبار والمراجعة": "Testing & review",
  "مراجعة تجربة الاستخدام والوظائف والصلاحيات.": "Review usability, functionality, and permissions.",
  "التسليم والتشغيل": "Handover & launch",
  "إطلاق المنصة وبدء فترة الصيانة المتفق عليها.": "Launch the platform and begin the agreed maintenance period.",
  "توضيحات مهمة": "Important notes",
  "تفاصيل تحفظ": "Details that protect",
  "وضوح الاتفاق.": "clarity of agreement.",
  "نحرص على توضيح حدود العرض وما يتضمنه قبل بدء التنفيذ.": "We clarify the proposal boundaries and inclusions before development begins.",
  "نطاق التطوير": "Development scope",
  "حدود الصيانة": "Maintenance boundaries",
  "الخدمات الخارجية": "Third-party services",
  "التعديلات الإضافية": "Additional changes",
  "إجابات سريعة": "Quick answers",
  "أسئلة قد": "Questions you may",
  "تكون في بالك.": "have in mind.",
  "إذا كانت هناك تفاصيل أخرى ترغب في مناقشتها، يسعدنا توضيحها قبل اعتماد العرض.": "If you would like to discuss anything else, we will be happy to clarify it before approval.",
  "الخطوة التالية": "The next step",
  "لنحوّل إدارة العملية التعليمية": "Let's make education management",
  "إلى تجربة أكثر سهولة.": "a simpler experience.",
  "يسعدنا مناقشة تفاصيل العرض والإجابة عن أي استفسارات، ثم اعتماد نطاق العمل تمهيداً لبدء التنفيذ.": "We would be glad to discuss the proposal, answer your questions, and finalize the scope before implementation begins.",
  "طباعة العرض أو حفظه PDF": "Print or save as PDF",
  "عرض فني ومالي مقدم من VELTRIX": "Technical and financial proposal by VELTRIX",
  "حلول رقمية تُصمّم بعناية.": "Digital solutions, thoughtfully designed.",
  "جميع الحقوق محفوظة.": "All rights reserved.",
  "الموقع الإلكتروني الرئيسي": "Main website",
  "واجهة تعريفية أنيقة تمنح المدرس حضوراً رقمياً احترافياً وتسهّل على الطلاب وأولياء الأمور الوصول إلى المعلومات.": "An elegant public-facing website that gives the teacher a professional online presence and helps students and parents find information.",
  "صفحة رئيسية بتصميم احترافي وتعريف بالمدرس": "Professional homepage introducing the teacher",
  "صفحة نبذة عن المدرس والخبرات والمؤهلات": "Teacher profile, experience, and qualifications",
  "عرض المراكز التعليمية ومواقعها": "Learning centers and their locations",
  "عرض الصفوف والمراحل والمجموعات المتاحة": "Available grades, levels, and groups",
  "طلبات التسجيل في المجموعات": "Group enrollment requests",
  "طلبات حجز الحصص الخاصة": "Private lesson booking requests",
  "صفحة الإعلانات والأخبار": "Announcements and news page",
  "صفحة تواصل وربط مباشر بواتساب": "Contact page with direct WhatsApp link",
  "مركز تحكم موحّد لإدارة جميع تفاصيل العمل من مكان واحد، دون الحاجة إلى أدوات أو ملفات متفرقة.": "A unified control center for managing all operations in one place, without scattered tools or files.",
  "لوحة إحصائيات ومؤشرات شاملة": "Comprehensive statistics dashboard",
  "إدارة جميع المراكز والفصول والمجموعات": "Manage all centers, classes, and groups",
  "إدارة الطلاب وأولياء الأمور": "Student and parent management",
  "إدارة الحصص الخاصة الفردية والجماعية": "Manage individual and group private lessons",
  "إدارة الجداول والمواعيد": "Manage schedules and appointments",
  "إدارة المساعدين والصلاحيات": "Manage assistants and permissions",
  "سجل النشاط والتعديلات": "Activity and change log",
  "إعدادات المنصة وإدارة المحتوى": "Platform settings and content management",
  "ملف موحّد لكل طالب يربط بياناته وتسجيلاته وحضوره ودرجاته ومدفوعاته في مكان واحد.": "A unified student profile connecting personal details, enrollments, attendance, grades, and payments.",
  "تسجيل الطالب من الموقع بعد مراجعة المدرس": "Online student registration, subject to teacher approval",
  "إنشاء حسابات الطلاب يدوياً": "Create student accounts manually",
  "إضافة حساب مستقل لولي الأمر": "Create a separate parent account",
  "ربط ولي الأمر بأكثر من طالب": "Link one parent to multiple students",
  "ملف شخصي وبيانات التواصل والمرحلة الدراسية": "Profile, contact details, and grade level",
  "تسجيل الطالب في أكثر من مركز أو مجموعة": "Enroll a student in multiple centers or groups",
  "نقل الطلاب بين المجموعات والمراكز": "Transfer students between groups and centers",
  "متابعة المستوى وسجل الدرجات والمدفوعات": "Track performance, grades, and payments",
  "إدارة المراكز التعليمية": "Learning center management",
  "إدارة مستقلة لكل مركز مع متابعة الفصول والحضور والأداء والتعاملات المالية.": "Independent management for each center, including classes, attendance, performance, and finances.",
  "إضافة وتعديل بيانات المراكز وعناوينها": "Add and edit center details and addresses",
  "إنشاء الفصول والمجموعات وتحديد السعة": "Create classes and groups and set capacity",
  "تحديد أيام ومواعيد الدراسة": "Set study days and times",
  "توزيع الطلاب على المجموعات": "Assign students to groups",
  "متابعة حضور وغياب كل مجموعة": "Track attendance and absences for each group",
  "تقارير أداء وإحصائيات لكل مركز": "Performance reports and statistics for each center",
  "تسجيل الاتفاقات المالية مع المراكز": "Record financial agreements with centers",
  "متابعة مستحقات المدرس وتسويات المراكز": "Track teacher earnings and center settlements",
  "إدارة الحصص الخاصة": "Private lesson management",
  "تنظيم الحصص الفردية والجماعية ومواعيدها وباقاتها ومدفوعاتها، مع متابعة الرصيد المتبقي لكل طالب.": "Organize individual and group lessons, schedules, packages, and payments, while tracking each student's remaining balance.",
  "إنشاء حصص فردية أو جماعية": "Create individual or group lessons",
  "تحديد الموعد والمدة ومكان الحصة": "Set lesson time, duration, and location",
  "تحديد سعر الحصة أو الباقة": "Set lesson or package pricing",
  "باقات مرنة بعدد حصص قابل للتخصيص": "Flexible packages with customizable lesson counts",
  "متابعة الحصص المستخدمة والمتبقية": "Track used and remaining lessons",
  "تسجيل الحضور والإلغاء والتأجيل": "Record attendance, cancellations, and postponements",
  "إعادة جدولة الحصص": "Reschedule lessons",
  "متابعة المدفوعات والمبالغ المستحقة": "Track payments and outstanding balances",
  "الحضور والواجبات والمحتوى": "Attendance, homework, and content",
  "أدوات يومية تساعد المدرس على متابعة التزام الطلاب وتوزيع المحتوى التعليمي وتصحيح الواجبات.": "Daily tools to monitor student engagement, share learning materials, and review homework.",
  "تسجيل الحضور: حاضر، غائب، متأخر، بعذر": "Record attendance: present, absent, late, or excused",
  "تقارير حضور يومية وشهرية ونسب الالتزام": "Daily and monthly attendance reports and engagement rates",
  "إنشاء الواجبات وتحديد مواعيد التسليم": "Create homework and set due dates",
  "إرفاق ملفات PDF والصور": "Attach PDF files and images",
  "استقبال إجابات الطلاب ومراجعتها": "Receive and review student submissions",
  "تسجيل الدرجات والملاحظات": "Record grades and feedback",
  "مكتبة للمذكرات والمراجعات والملفات": "Library for notes, revision materials, and files",
  "تخصيص المحتوى حسب الصف والمجموعة": "Customize content by grade and group",
  "بنك الأسئلة والامتحانات": "Question bank and exams",
  "منظومة تقييم مرنة لإنشاء الاختبارات ومتابعة نتائج الطلاب وتحليل مستواهم.": "A flexible assessment system for creating exams, tracking results, and analyzing student performance.",
  "إنشاء بنك أسئلة وتصنيفها حسب الصف والموضوع": "Build a question bank organized by grade and topic",
  "إضافة الأسئلة يدوياً أو استيرادها من Word وPDF": "Add questions manually or import from Word and PDF",
  "اختيار من متعدد وصح وخطأ وأكمل ومقالي": "Multiple choice, true/false, fill-in-the-blank, and essay questions",
  "أسئلة النحو والبلاغة والقراءة": "Grammar, rhetoric, and reading questions",
  "إنشاء امتحانات من بنك الأسئلة": "Create exams from the question bank",
  "تحديد زمن الامتحان وترتيب الأسئلة عشوائياً": "Set exam duration and shuffle questions",
  "تصحيح الأسئلة الموضوعية تلقائياً": "Automatically grade objective questions",
  "مراجعة الإجابات المقالية ونشر النتائج": "Review essay answers and publish results",
  "الإدارة المالية والمدفوعات": "Finance and payments",
  "متابعة مالية واضحة تفصل بين جهة تحصيل المبلغ ونصيب المدرس والمركز لتجنّب تكرار الحسابات.": "Clear financial tracking that separates the collecting party from teacher and center shares to avoid duplicate accounting.",
  "تسجيل المدفوعات النقدية والإلكترونية": "Record cash and electronic payments",
  "تسجيل ما يتم تحصيله بواسطة المدرس أو المركز": "Record payments collected by the teacher or center",
  "تسجيل الدفعات الجزئية والمتأخرات": "Record partial payments and overdue balances",
  "ربط عمليات الدفع بالطالب أو الحصة أو المجموعة": "Link payments to a student, lesson, or group",
  "إدارة الاتفاقات ونسب أو مستحقات المراكز": "Manage center agreements, percentages, and dues",
  "متابعة التسويات والمبالغ المستحقة": "Track settlements and outstanding amounts",
  "تسجيل المصروفات وإصدار إيصالات": "Record expenses and issue receipts",
  "تقارير الإيرادات والمصروفات شهرياً وسنوياً": "Monthly and annual income and expense reports",
  "الجداول والتقارير والإشعارات": "Schedules, reports, and notifications",
  "رؤية شاملة للمواعيد والأداء والعمليات، مع تنبيهات تساعد على التواصل في الوقت المناسب.": "A complete view of schedules, performance, and operations, with timely notifications.",
  "تقويم يومي وأسبوعي وشهري": "Daily, weekly, and monthly calendar",
  "كشف تعارض مواعيد الحصص": "Detect lesson scheduling conflicts",
  "تقارير الطلاب والمراكز والمجموعات": "Student, center, and group reports",
  "تحليل الحضور ومتوسط الدرجات": "Attendance and average-grade analysis",
  "تصدير التقارير إلى Excel وPDF": "Export reports to Excel and PDF",
  "إشعارات الواجبات والامتحانات والنتائج": "Homework, exam, and result notifications",
  "تذكيرات الغياب والمدفوعات": "Absence and payment reminders",
  "رسائل وإعلانات موجهة للطلاب وأولياء الأمور": "Targeted messages and announcements for students and parents",
  "مساعد الذكاء الاصطناعي": "AI assistant",
  "منظومة ذكاء اصطناعي متقدمة تدعم المدرس والمساعد في المهام اليومية وتساعد على اتخاذ قرارات تعليمية أكثر وضوحاً.": "An advanced AI system that assists teachers and assistants with daily tasks and supports informed educational decisions.",
  "تكامل مع NVIDIA AI عبر NVIDIA NIM والنماذج المتاحة": "Integrate NVIDIA AI through NVIDIA NIM and available models",
  "وكيل ذكاء اصطناعي داخل لوحة المدرس لتنفيذ المهام المسموح بها": "AI agent inside the teacher dashboard for permitted tasks",
  "محادثة ذكية للمدرس والمساعد للإجابة عن أسئلة العمل": "AI chatbot for teachers and assistants to answer work-related questions",
  "اقتراح أسئلة وتدريبات باللغة العربية": "Suggest questions and exercises in Arabic",
  "المساعدة في إعداد نماذج الامتحانات والواجبات": "Assist in preparing exams and homework",
  "تحليل أداء الطلاب وتحديد نقاط الضعف": "Analyze student performance and identify weak areas",
  "اقتراح مراجعات وخطط متابعة مناسبة": "Suggest revision and follow-up plans",
  "إعداد ملخصات وتقارير أداء": "Prepare summaries and performance reports",
  "إدارة مزوّد الذكاء الاصطناعي وحدود الاستخدام والتكلفة": "Manage AI providers, usage limits, and costs",
  "الدعم المباشر وواتساب": "Live support and WhatsApp",
  "قنوات تواصل متصلة بالمنصة لمساعدة المدرس والمساعد والرد على استفسارات الطلاب وأولياء الأمور.": "Integrated communication channels to support teachers and assistants and respond to student and parent inquiries.",
  "محادثة دعم مباشر داخل لوحة المدرس": "Live support chat inside the teacher dashboard",
  "إمكانية تحويل المحادثة إلى المدرس أو المساعد حسب الصلاحيات": "Route conversations to the teacher or assistant according to permissions",
  "صندوق وارد موحّد لطلبات الدعم والاستفسارات": "Unified inbox for support requests and inquiries",
  "روبوت محادثة ذكي للرد على الأسئلة المتكررة": "AI chatbot for frequently asked questions",
  "تكامل WhatsApp Business Cloud API": "WhatsApp Business Cloud API integration",
  "إرسال إشعارات وتذكيرات عبر واتساب وفق إعدادات المنصة": "Send WhatsApp notifications and reminders based on platform settings",
  "استقبال رسائل واتساب وربطها بملفات الطلاب عند الحاجة": "Receive WhatsApp messages and link them to student profiles when needed",
  "إدارة قوالب الرسائل وحالة الإرسال وسجل المحادثات": "Manage message templates, delivery status, and conversation history",
  "إعداد مفاتيح API والتحقق من Webhooks بشكل آمن": "Configure API credentials and securely verify webhooks",
  "الأمان والإدارة التقنية": "Security and technical administration",
  "حماية بيانات الطلاب والمعاملات، مع أدوات لمتابعة استقرار النظام وإمكانية استعادة البيانات.": "Protect student data and transactions, with tools to monitor system stability and restore data.",
  "تسجيل دخول آمن وصلاحيات حسب الدور": "Secure login and role-based permissions",
  "حماية بيانات الطلاب وأولياء الأمور": "Protect student and parent data",
  "سجل تدقيق للعمليات والتعديلات": "Audit log for operations and changes",
  "نسخ احتياطي وخطة لاستعادة البيانات": "Backups and a data recovery plan",
  "متابعة حالة قاعدة البيانات والتكاملات": "Monitor database and integration health",
  "مراقبة استهلاك الخدمات والتكاليف": "Monitor service usage and costs",
  "لوحة تقنية مستقلة للمطور باللغة الإنجليزية": "Separate developer console in English",
  "إدارة الأعطال والمهام والتحديثات التقنية": "Manage incidents, tasks, and technical updates",
  "المدرس / مالك المنصة": "Teacher / Platform owner",
  "صلاحية كاملة لإدارة المراكز والطلاب والتعليم والمالية والإعدادات.": "Full access to manage centers, students, education, finances, and settings.",
  "صلاحيات تشغيلية محددة لإدارة الحضور والواجبات والطلاب وفق ما يسمح به المدرس.": "Limited operational permissions for attendance, homework, and students as authorized by the teacher.",
  "الطالب": "Student",
  "الوصول إلى جدوله وواجباته وامتحاناته ودرجاته ومواده التعليمية.": "Access to their schedule, homework, exams, grades, and learning materials.",
  "ولي الأمر": "Parent",
  "متابعة الأبناء المرتبطين بحسابه فقط، بما يشمل الحضور والدرجات والمدفوعات.": "View only linked children, including attendance, grades, and payments.",
  "المطور": "Developer",
  "إدارة تقنية مستقلة باللغة الإنجليزية، دون وصول تلقائي إلى بيانات الطلاب الخاصة.": "Independent technical administration in English, without automatic access to private student data.",
  "إصلاح الأخطاء البرمجية": "Bug fixes",
  "معالجة الأعطال والمشكلات التي تظهر أثناء استخدام الموقع.": "Resolve bugs and issues that arise while using the website.",
  "الفحص الدوري للموقع": "Routine website checks",
  "مراجعة الصفحات والوظائف الأساسية والتأكد من عملها بصورة سليمة.": "Review pages and core functions to ensure they work properly.",
  "تحديثات الأمان المتوافقة": "Compatible security updates",
  "تطبيق تحديثات الأمان المتوافقة مع بنية الموقع وإصداراته.": "Apply security updates compatible with the website architecture and versions.",
  "فحص قاعدة البيانات والتكاملات": "Database and integration checks",
  "التحقق من الاتصال بقاعدة البيانات والخدمات الخارجية المرتبطة.": "Verify database connectivity and linked external services.",
  "دعم مساعد الذكاء الاصطناعي": "AI assistant support",
  "متابعة المشكلات التقنية المتعلقة بالمساعد الذكي وتكامل NVIDIA NIM.": "Monitor technical issues related to the AI assistant and NVIDIA NIM integration.",
  "فحص تكامل واتساب": "WhatsApp integration checks",
  "مراجعة اتصال WhatsApp Business API والـ Webhooks وإعدادات الرسائل.": "Review WhatsApp Business API connectivity, webhooks, and message settings.",
  "تحديثات بسيطة للمحتوى": "Minor content updates",
  "تعديل نصوص أو صور أو بيانات بسيطة ضمن الهيكل الحالي.": "Update text, images, or simple details within the existing structure.",
  "المساعدة الفنية": "Technical assistance",
  "تقديم الدعم والإرشاد الفني والتعامل مع المشكلات التقنية.": "Provide technical guidance and handle technical issues.",
  "هل يشمل العرض تقديم دروس أونلاين مباشرة؟": "Does the proposal include live online lessons?",
  "لا، المنصة مخصصة لإدارة الحصص الحضورية داخل المراكز والحصص الخاصة. ويمكن للطلاب استخدام حساباتهم لمتابعة الجداول والواجبات والامتحانات والنتائج والملفات.": "No. The platform is designed to manage in-person lessons at centers and private lessons. Students can use their accounts to view schedules, homework, exams, results, and files.",
  "هل يمكن للطالب التسجيل بنفسه؟": "Can students register themselves?",
  "نعم، يستطيع الطالب إرسال طلب تسجيل من الموقع، ويقوم المدرس بمراجعته والموافقة عليه أو رفضه. كما يمكن للمدرس إنشاء حسابات الطلاب يدوياً.": "Yes. Students can submit a registration request through the website for the teacher to review and approve or reject. The teacher can also create student accounts manually.",
  "هل يمكن للمراكز تحصيل المدفوعات؟": "Can centers collect payments?",
  "نعم، يدعم النظام تسجيل المدفوعات التي يحصل عليها المدرس أو المركز، مع فصل المبالغ المحصلة عن المستحقات والتسويات المالية.": "Yes. The system records payments collected by either the teacher or the center, separating collected amounts from dues and financial settlements.",
  "هل يمكن ربط المنصة بواتساب؟": "Can the platform connect to WhatsApp?",
  "نعم، يتضمن نطاق العمل إعداد تكامل WhatsApp Business Cloud API لإرسال واستقبال الرسائل والإشعارات وفق صلاحيات المنصة. يلزم توفير حساب WhatsApp Business وبيانات الربط الرسمية قبل التنفيذ.": "Yes. The scope includes WhatsApp Business Cloud API integration for sending and receiving messages and notifications according to platform permissions. A WhatsApp Business account and official integration credentials must be provided before implementation.",
  "هل يشمل سعر الصيانة إضافة خصائص جديدة؟": "Does the maintenance price include new features?",
  "باقة الصيانة تشمل الإصلاحات والفحوصات والتحديثات المتوافقة والدعم والتعديلات البسيطة للمحتوى. أما إضافة أنظمة أو خصائص جديدة كبيرة فتُقدّر بصورة مستقلة.": "The maintenance package includes fixes, checks, compatible updates, support, and minor content changes. Major new systems or features are estimated separately.",
  "يتم اعتماد الخصائص النهائية والأولويات والتفاصيل الفنية قبل بدء التنفيذ، ويتراوح سعر التطوير من 20,000 إلى 35,000 جنيه مصري.": "Final features, priorities, and technical details will be approved before development begins. Development is priced between EGP 20,000 and EGP 35,000.",
  "تشمل الباقة الإصلاحات والفحوصات والتحديثات المتوافقة والتعديلات البسيطة للمحتوى، ولا تشمل تطوير أنظمة كبيرة جديدة.": "The package includes fixes, checks, compatible updates, and minor content changes. It does not include the development of major new systems.",
  "رسوم الاستضافة وقواعد البيانات واستهلاك خدمات الذكاء الاصطناعي أو تراخيص NVIDIA الإنتاجية ورسوم Meta أو WhatsApp والخدمات الخارجية لا تدخل في سعر التطوير أو الصيانة إلا إذا تم الاتفاق كتابياً على ذلك. يتطلب تفعيل واتساب توفير حساب WhatsApp Business وبيانات الربط الرسمية مثل Access Token وPhone Number ID وبيانات Webhook، ويتم حفظ المفاتيح في إعدادات الخادم السرية ولا تظهر في كود المتصفح.": "Hosting, database, AI usage, production NVIDIA licensing, Meta or WhatsApp fees, and other external services are not included in development or maintenance pricing unless agreed to in writing. WhatsApp activation requires a WhatsApp Business account and official credentials such as an Access Token, Phone Number ID, and webhook details. Credentials will be stored securely on the server and never exposed in browser code.",
  "أي خصائص أو تغييرات جوهرية خارج نطاق العمل المعتمد يتم تقديرها والاتفاق عليها بصورة مستقلة.": "Any major features or changes outside the approved scope will be estimated and agreed upon separately.",
  "8,000 جنيه مصري": "EGP 8,000",
  "١٬٢٤٨": "1,248",
  "٢٤": "24",
  "هذا الشهر": "This month",
  "01 — 12": "01 — 12",
  "12 خصائص": "12 features",
  "فتح القائمة": "Open menu",
  "إغلاق القائمة": "Close menu",
};

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;
    root.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", language);
    const translate = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const value = node.nodeValue?.trim();
        if (!value) continue;
        const parent = node.parentElement;
        if (!parent || parent.closest("script,style")) continue;
        if (language === "en" && ENGLISH[value]) node.nodeValue = node.nodeValue!.replace(value, ENGLISH[value]);
        else if (language === "ar") {
          const englishEntry = Object.entries(ENGLISH).find(([, translated]) => translated === value);
          if (englishEntry) node.nodeValue = node.nodeValue!.replace(value, englishEntry[0]);
        }
      }
    };
    translate();
    // Watch newly-rendered sections only. Avoid observing characterData because
    // translating a text node would otherwise trigger another observer pass.
    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.addedNodes.length > 0)) translate();
    });
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(["public", "management"]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const toggle = (id: string) => setExpanded(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  const DirectionArrow = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <main>
      <div className="announcement"><span className="pulse" /> عرض فني ومالي مخصص لتطوير منصة تعليمية متكاملة <span className="ann-sep">✦</span> مقدم من <b>VELTRIX</b></div>
      <header className="nav wrap">
        <a className="brand" href="#top" aria-label="VELTRIX"><span className="brand-mark">V</span><span>VELTRIX<small> DIGITAL EXPERIENCES</small></span></a>
        <nav id="primary-navigation" className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#overview" onClick={() => setMenuOpen(false)}>نظرة عامة</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>المميزات</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>الأسعار</a>
          <a href="#maintenance" onClick={() => setMenuOpen(false)}>الصيانة</a>
          <a href="#terms" onClick={() => setMenuOpen(false)}>الشروط</a>
        </nav>
        <div className="nav-actions"><button className="language-toggle" onClick={() => setLanguage(v => v === "ar" ? "en" : "ar")} aria-label="Switch language">{language === "ar" ? "EN" : "عربي"}</button><a className="nav-cta" href="#contact">مناقشة العرض <DirectionArrow size={15}/></a><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة" aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X/> : <Menu/>}</button></div>
      </header>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> عرض فني ومالي <span className="eyebrow-dot">✳</span> منصة تعليمية متكاملة</div>
          <h1>إدارة تعليمك،<br/><em>بأسلوب أكثر ذكاءً.</em></h1>
          <p className="hero-lead">منصة رقمية متكاملة تجمع إدارة المراكز التعليمية والحصص الخاصة والطلاب وأولياء الأمور والعمليات المالية في تجربة واحدة أنيقة وسهلة الاستخدام.</p>
          <div className="hero-actions"><a className="btn-primary" href="#features">اكتشف تفاصيل المنصة <DirectionArrow size={17}/></a><a className="btn-quiet" href="#maintenance">عرض باقة الصيانة <ArrowDown size={16}/></a></div>
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
        <div className="feature-intro"><span>01 — 12</span><b>تفاصيل الخصائص والأنظمة</b><span className="feature-intro-line"/><button onClick={() => setExpanded(expanded.length === sections.length ? [] : sections.map(s => s.id))}>{expanded.length === sections.length ? "طيّ جميع الأقسام" : "عرض جميع التفاصيل"} <ChevronDown size={15}/></button></div>
        <div className="feature-list">{sections.map(s => { const Icon = s.icon; const open = expanded.includes(s.id); return <article className={open ? "feature-card active" : "feature-card"} key={s.id}>
          <button className="feature-trigger" onClick={() => toggle(s.id)} aria-expanded={open}><span className="feature-number">{s.n}</span><span className="feature-icon"><Icon size={21}/></span><span className="feature-title-wrap"><b>{s.title}</b><small>{s.desc}</small></span><span className="feature-count">{s.items.length} خصائص</span><span className="feature-chevron"><ChevronDown size={18}/></span></button>
          {open && <div className="feature-content"><div className="feature-content-inner">{s.items.map((item,i)=><div className="feature-item" key={item}><span><Check size={14}/></span>{item}</div>)}</div></div>}
        </article>})}</div>
      </section>

      <section className="portal-section"><div className="wrap portal-grid"><div className="portal-copy"><span className="section-kicker">تجربة لكل مستخدم</span><h2>كل شخص يرى<br/><em>ما يخصّه فقط.</em></h2><p>صلاحيات واضحة وتجربة مناسبة لكل دور، مع حماية خصوصية بيانات الطلاب وأولياء الأمور.</p><div className="role-list">{roles.map(([name,desc],i)=><div className="role-row" key={name}><span className="role-index">0{i+1}</span><div><b>{name}</b><small>{desc}</small></div><BadgeCheck size={18}/></div>)}</div></div><div className="portal-visual"><div className="portal-orbit orbit-a"/><div className="portal-orbit orbit-b"/><div className="portal-center"><div className="portal-center-icon"><GraduationCap size={36}/></div><b>منصة واحدة</b><small>تجربة مترابطة</small></div><div className="orbit-node node-1"><Users/><span>الطلاب</span></div><div className="orbit-node node-2"><Headphones/><span>المساعد</span></div><div className="orbit-node node-3"><Wallet/><span>المالية</span></div><div className="orbit-node node-4"><Smartphone/><span>أولياء الأمور</span></div></div></div></section>

      <section className="section wrap project-pricing" id="pricing"><div className="section-heading"><div><span className="section-kicker">الاستثمار في المنصة</span><h2>تكلفة واضحة.<br/><em>قيمة قابلة للتطوير.</em></h2></div><p>يتم تحديد السعر النهائي بعد اعتماد التفاصيل والأولويات الفنية، مع فصل تكلفة التطوير عن باقة الصيانة.</p></div><div className="project-price-card"><div><span className="plan-label">تكلفة تصميم وتطوير المنصة</span><h3>منظومة تعليمية متكاملة<br/><em>مصممة لطريقة عملك.</em></h3><p>يشمل السعر تنفيذ نطاق العمل والخصائص الموضحة في هذا العرض بعد اعتمادها.</p></div><div className="project-price-value"><span>السعر التقديري للمشروع</span><strong><small>EGP</small> 20,000 – 35,000</strong><b>يُحدد السعر النهائي بعد اعتماد النطاق</b></div></div><p className="pricing-separate-note">باقة الصيانة والدعم الفني لمدة 3 أشهر: <b>8,000 جنيه مصري</b> — تُحسب بشكل منفصل عن تكلفة التطوير.</p></section>

      <section className="section wrap" id="maintenance"><div className="maintenance-heading"><div><span className="section-kicker">استمرارية وراحة بال</span><h2>الدعم لا يتوقف<br/><em>عند التسليم.</em></h2><p>لضمان استمرار عمل المنصة بكفاءة، نوفر باقة صيانة ودعم فني لمدة ثلاثة أشهر تشمل المتابعة والإصلاحات والخدمات الموضحة أدناه.</p></div><div className="maintenance-stamp"><Wrench size={24}/><span>دعم فني<br/>ومتابعة دورية</span></div></div>
        <div className="maintenance-card"><div className="maintenance-card-top"><div><span className="plan-label">باقة الصيانة والدعم الفني</span><h3>ثلاثة أشهر من <em>الاهتمام المستمر.</em></h3><p>خدمات متابعة وصيانة للحفاظ على استقرار الموقع وسلامة وظائفه.</p></div><div className="price-block"><span>السعر الإجمالي</span><strong><small>EGP</small> 8,000</strong><b>لمدة 3 أشهر</b></div></div><div className="maintenance-services">{maintenance.map(([title,desc],i)=><div className="maintenance-service" key={title}><span className="service-check"><Check size={15}/></span><div><b>{title}</b><small>{desc}</small></div></div>)}</div><div className="maintenance-foot"><span><Clock3 size={16}/> تبدأ المدة من تاريخ بدء الصيانة المتفق عليه</span><span><ShieldCheck size={16}/> دعم فني ومتابعة خلال فترة الباقة</span></div></div>
      </section>

      <section className="process-section"><div className="wrap"><div className="section-heading light"><div><span className="section-kicker">من الفكرة إلى التشغيل</span><h2>خطوات واضحة.<br/><em>نتيجة مدروسة.</em></h2></div><p>نعمل وفق مراحل منظمة لضمان وضوح نطاق العمل ومراجعة التفاصيل قبل الإطلاق.</p></div><div className="process-grid"><div><span>01</span><b>اعتماد نطاق العمل</b><small>مراجعة الخصائص والتفاصيل والاتفاق على الأولويات.</small></div><div><span>02</span><b>التصميم والتطوير</b><small>تصميم الواجهات وتنفيذ الأنظمة والوظائف المعتمدة.</small></div><div><span>03</span><b>الاختبار والمراجعة</b><small>مراجعة تجربة الاستخدام والوظائف والصلاحيات.</small></div><div><span>04</span><b>التسليم والتشغيل</b><small>إطلاق المنصة وبدء فترة الصيانة المتفق عليها.</small></div></div></div></section>

      <section className="section wrap" id="terms"><div className="section-heading"><div><span className="section-kicker">توضيحات مهمة</span><h2>تفاصيل تحفظ<br/><em>وضوح الاتفاق.</em></h2></div><p>نحرص على توضيح حدود العرض وما يتضمنه قبل بدء التنفيذ.</p></div><div className="terms-grid"><div className="term-card"><span>01</span><b>نطاق التطوير</b><p>يتم اعتماد الخصائص النهائية والأولويات والتفاصيل الفنية قبل بدء التنفيذ، ويتراوح سعر التطوير من 20,000 إلى 35,000 جنيه مصري.</p></div><div className="term-card"><span>02</span><b>حدود الصيانة</b><p>تشمل الباقة الإصلاحات والفحوصات والتحديثات المتوافقة والتعديلات البسيطة للمحتوى، ولا تشمل تطوير أنظمة كبيرة جديدة.</p></div><div className="term-card"><span>03</span><b>الخدمات الخارجية</b><p>رسوم الاستضافة وقواعد البيانات واستهلاك خدمات الذكاء الاصطناعي أو تراخيص NVIDIA الإنتاجية ورسوم Meta أو WhatsApp والخدمات الخارجية لا تدخل في سعر التطوير أو الصيانة إلا إذا تم الاتفاق كتابياً على ذلك. يتطلب تفعيل واتساب توفير حساب WhatsApp Business وبيانات الربط الرسمية مثل Access Token وPhone Number ID وبيانات Webhook، ويتم حفظ المفاتيح في إعدادات الخادم السرية ولا تظهر في كود المتصفح.</p></div><div className="term-card"><span>04</span><b>التعديلات الإضافية</b><p>أي خصائص أو تغييرات جوهرية خارج نطاق العمل المعتمد يتم تقديرها والاتفاق عليها بصورة مستقلة.</p></div></div></section>

      <section className="faq-section"><div className="wrap faq-grid"><div><span className="section-kicker">إجابات سريعة</span><h2>أسئلة قد<br/><em>تكون في بالك.</em></h2><p>إذا كانت هناك تفاصيل أخرى ترغب في مناقشتها، يسعدنا توضيحها قبل اعتماد العرض.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={faqOpen===i?"faq-item open":"faq-item"} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)}><b>{q}</b><ChevronDown size={18}/></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></div></section>

      <section className="closing wrap" id="contact"><div className="closing-card"><div className="closing-decoration">✳</div><span className="section-kicker">الخطوة التالية</span><h2>لنحوّل إدارة العملية التعليمية<br/><em>إلى تجربة أكثر سهولة.</em></h2><p>يسعدنا مناقشة تفاصيل العرض والإجابة عن أي استفسارات، ثم اعتماد نطاق العمل تمهيداً لبدء التنفيذ.</p><div className="closing-actions"><a href="mailto:?subject=استفسار%20حول%20عرض%20المنصة%20التعليمية" className="btn-primary">مناقشة العرض <DirectionArrow size={17}/></a><button className="btn-outline" onClick={()=>window.print()}><Printer size={16}/> طباعة العرض أو حفظه PDF</button></div><small className="closing-note">عرض فني ومالي مقدم من VELTRIX</small></div></section>

      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark">V</span><span>VELTRIX<small> DIGITAL EXPERIENCES</small></span></a><span>حلول رقمية تُصمّم بعناية.</span><span>© {new Date().getFullYear()} VELTRIX. جميع الحقوق محفوظة.</span></div></footer>
    </main>
  );
}
