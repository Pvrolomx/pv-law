"use client";

import { useState, useEffect, useRef } from "react";

/* ─── i18n ─── */
const t: Record<string, Record<string, string>> = {
  en: {
    nav_areas: "Practice Areas",
    nav_why: "Why Us",
    nav_process: "Our Process",
    nav_team: "Our Team",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    lang_toggle: "Español",
    hero_title: "Your Legal Partner in Paradise",
    hero_sub: "Bilingual litigation firm serving the international community in Puerto Vallarta",
    hero_cta: "Schedule a Free Consultation",
    hero_call: "Call Us Now",
    trust_years: "20+ Years Experience",
    trust_bar: "Mexican Bar Licensed",
    trust_bilingual: "Fully Bilingual",
    trust_cases: "1,000+ Cases Resolved",
    areas_title: "Practice Areas",
    areas_sub: "Comprehensive legal services for the international community",
    area_1_title: "Real Estate & Fideicomiso",
    area_1_desc: "Navigate Mexico's restricted zone property laws with confidence. Full fideicomiso setup, transfers, and due diligence.",
    area_2_title: "Immigration & Residency",
    area_2_desc: "Temporary and permanent residency, visa renewals, naturalization, and all INM procedures.",
    area_3_title: "Business Formation",
    area_3_desc: "Company incorporation, RFC registration, commercial permits, and ongoing compliance for foreign investors.",
    area_4_title: "Litigation & Disputes",
    area_4_desc: "Civil, commercial, and administrative litigation. We fight for your rights in Mexican courts.",
    area_5_title: "Estate Planning & Wills",
    area_5_desc: "Mexican wills, cross-border estate planning, probate proceedings, and asset protection.",
    area_6_title: "Criminal Defense",
    area_6_desc: "Immediate response for arrests and criminal matters. 24/7 availability for emergencies.",
    area_7_title: "Family Law",
    area_7_desc: "Binational divorce, child custody, alimony, and cross-border family disputes.",
    area_8_title: "HOA & Condo Law",
    area_8_desc: "Condominium regime disputes, HOA governance, maintenance fee collections, and assemblies.",
    why_title: "Why Choose Us",
    why_sub: "What sets our firm apart",
    why_1_title: "Truly Bilingual",
    why_1_desc: "Our entire team speaks fluent English. No translators, no misunderstandings. Clear communication from consultation to resolution.",
    why_2_title: "Licensed in Mexico",
    why_2_desc: "We are fully licensed Mexican attorneys with cédula profesional — not consultants or facilitators. We represent you in court.",
    why_3_title: "Litigation Experience",
    why_3_desc: "We don't just file paperwork. When negotiation fails, we have the courtroom experience to protect your interests.",
    why_4_title: "Local Presence in PV",
    why_4_desc: "We live and work in Puerto Vallarta. We know the local courts, judges, and procedures — not operating remotely from Mexico City.",
    why_5_title: "Expat-Focused",
    why_5_desc: "We understand the unique challenges foreigners face in Mexico's legal system and guide you through every step.",
    process_title: "How We Work",
    process_sub: "A transparent, straightforward process",
    process_1_title: "Free Consultation",
    process_1_desc: "Video call or in-person meeting to understand your situation. No obligation, no pressure.",
    process_2_title: "Case Evaluation",
    process_2_desc: "We analyze your case, research applicable law, and develop a clear legal strategy.",
    process_3_title: "Transparent Pricing",
    process_3_desc: "Flat fee or hourly — you'll know the cost upfront. No hidden charges, no surprises.",
    process_4_title: "Execution & Updates",
    process_4_desc: "We execute the strategy and keep you informed in English at every milestone.",
    testimonials_title: "What Our Clients Say",
    testimonial_1: "They handled our fideicomiso purchase flawlessly. Having a lawyer who actually speaks English and understands our concerns made all the difference.",
    testimonial_1_name: "Robert & Lisa M.",
    testimonial_1_role: "Property Buyers, California",
    testimonial_2: "When I had an issue with my residency renewal, they resolved it in days instead of the months I was expecting. Highly professional.",
    testimonial_2_name: "David K.",
    testimonial_2_role: "Retiree, Texas",
    testimonial_3: "Our condo HOA was a mess. They helped us restructure the condominium regime and finally get proper governance in place.",
    testimonial_3_name: "Jennifer W.",
    testimonial_3_role: "Condo Owner, Canada",
    testimonial_4: "I got into legal trouble and they responded within an hour on a Saturday. That kind of responsiveness is rare anywhere, let alone Mexico.",
    testimonial_4_name: "Michael T.",
    testimonial_4_role: "Business Owner, Oregon",
    faq_title: "Frequently Asked Questions",
    faq_1_q: "Do I need a fideicomiso to buy property?",
    faq_1_a: "Yes, if the property is within the restricted zone (within 50km of the coast or 100km of a border). A fideicomiso is a bank trust that allows foreigners to hold property rights in these areas. We handle the entire process.",
    faq_2_q: "How long does residency take?",
    faq_2_a: "Temporary residency typically takes 3-6 weeks from the consulate appointment to receiving your card. Permanent residency timelines vary based on your pathway (retirement, family ties, or time-in-country). We expedite where possible.",
    faq_3_q: "Can I open a business as a foreigner?",
    faq_3_a: "Absolutely. Foreigners can own 100% of a Mexican company in most sectors. We handle the full incorporation, RFC registration, and necessary permits.",
    faq_4_q: "What happens if I get arrested in Mexico?",
    faq_4_a: "Call us immediately — we provide 24/7 emergency response. You have the right to legal representation and to contact your consulate. We'll be at the station as quickly as possible.",
    faq_5_q: "Do you handle cases outside Puerto Vallarta?",
    faq_5_a: "Yes. While our office is in PV, we handle cases throughout Jalisco and Nayarit, and can coordinate with partner firms in other states.",
    faq_6_q: "How much does a consultation cost?",
    faq_6_a: "Your initial consultation is completely free. We'll evaluate your situation and give you a clear idea of costs and timeline before you commit to anything.",
    team_title: "Our Team",
    team_sub: "Experienced attorneys who understand your world",
    team_1_name: "Lic. María Fernanda Robles",
    team_1_role: "Managing Partner — Real Estate & Corporate",
    team_1_desc: "15+ years specializing in cross-border property transactions and business formation. Bilingual, UNAM Law graduate.",
    team_2_name: "Lic. Carlos Andrés Vega",
    team_2_role: "Senior Partner — Litigation & Criminal Defense",
    team_2_desc: "Former public prosecutor with deep courtroom experience. Specializes in defending the rights of foreign nationals.",
    team_3_name: "Lic. Ana Lucía Torres",
    team_3_role: "Associate — Immigration & Family Law",
    team_3_desc: "Expert in Mexican immigration procedures and binational family matters. Fluent in English and French.",
    contact_title: "Ready to Protect Your Interests?",
    contact_sub: "Schedule your free consultation today",
    contact_name: "Your Name",
    contact_email: "Email Address",
    contact_phone: "Phone / WhatsApp",
    contact_message: "How can we help?",
    contact_send: "Send Message",
    contact_wa: "Chat on WhatsApp",
    contact_address: "Puerto Vallarta, Jalisco, México",
    contact_hours: "Mon–Fri 9:00 AM – 6:00 PM",
    contact_emergency: "24/7 Emergency Line Available",
    footer_rights: "All rights reserved.",
    footer_made: "Hecho por duendes.app 2026",
    hablamos: "Hablamos Español",
  },
  es: {
    nav_areas: "Áreas de Práctica",
    nav_why: "Por Qué Nosotros",
    nav_process: "Proceso",
    nav_team: "Equipo",
    nav_faq: "Preguntas",
    nav_contact: "Contacto",
    lang_toggle: "English",
    hero_title: "Tu Socio Legal en el Paraíso",
    hero_sub: "Despacho litigante bilingüe al servicio de la comunidad internacional en Puerto Vallarta",
    hero_cta: "Agenda una Consulta Gratuita",
    hero_call: "Llámanos Ahora",
    trust_years: "20+ Años de Experiencia",
    trust_bar: "Cédula Profesional",
    trust_bilingual: "Totalmente Bilingüe",
    trust_cases: "1,000+ Casos Resueltos",
    areas_title: "Áreas de Práctica",
    areas_sub: "Servicios legales completos para la comunidad internacional",
    area_1_title: "Inmobiliario y Fideicomiso",
    area_1_desc: "Navega las leyes de zona restringida con confianza. Constitución de fideicomiso, transferencias y due diligence.",
    area_2_title: "Migración y Residencia",
    area_2_desc: "Residencia temporal y permanente, renovaciones de visa, naturalización y todos los trámites ante INM.",
    area_3_title: "Constitución de Empresas",
    area_3_desc: "Incorporación de sociedades, registro RFC, permisos comerciales y cumplimiento para inversionistas extranjeros.",
    area_4_title: "Litigio y Disputas",
    area_4_desc: "Litigio civil, mercantil y administrativo. Peleamos por tus derechos en tribunales mexicanos.",
    area_5_title: "Testamentos y Sucesiones",
    area_5_desc: "Testamentos mexicanos, planeación patrimonial transfronteriza, juicios sucesorios y protección de activos.",
    area_6_title: "Defensa Penal",
    area_6_desc: "Respuesta inmediata ante detenciones y asuntos penales. Disponibilidad 24/7 para emergencias.",
    area_7_title: "Derecho Familiar",
    area_7_desc: "Divorcio binacional, custodia de menores, pensiones alimenticias y disputas familiares transfronterizas.",
    area_8_title: "Derecho Condominial",
    area_8_desc: "Disputas de régimen condominal, gobernanza de HOA, cobro de cuotas de mantenimiento y asambleas.",
    why_title: "¿Por Qué Elegirnos?",
    why_sub: "Lo que nos distingue",
    why_1_title: "Verdaderamente Bilingües",
    why_1_desc: "Todo nuestro equipo habla inglés con fluidez. Sin traductores, sin malentendidos. Comunicación clara de la consulta a la resolución.",
    why_2_title: "Licenciados en México",
    why_2_desc: "Somos abogados mexicanos con cédula profesional — no consultores ni facilitadores. Te representamos en tribunales.",
    why_3_title: "Experiencia en Litigio",
    why_3_desc: "No solo hacemos trámites. Cuando la negociación falla, tenemos la experiencia en sala para proteger tus intereses.",
    why_4_title: "Presencia Local en PV",
    why_4_desc: "Vivimos y trabajamos en Puerto Vallarta. Conocemos los juzgados locales, jueces y procedimientos.",
    why_5_title: "Enfocados en Expats",
    why_5_desc: "Entendemos los desafíos únicos que enfrentan los extranjeros en el sistema legal mexicano.",
    process_title: "Cómo Trabajamos",
    process_sub: "Un proceso transparente y directo",
    process_1_title: "Consulta Gratuita",
    process_1_desc: "Videollamada o reunión presencial para entender tu situación. Sin compromiso, sin presión.",
    process_2_title: "Evaluación del Caso",
    process_2_desc: "Analizamos tu caso, investigamos la ley aplicable y desarrollamos una estrategia legal clara.",
    process_3_title: "Precios Transparentes",
    process_3_desc: "Tarifa fija o por hora — conocerás el costo desde el inicio. Sin cargos ocultos.",
    process_4_title: "Ejecución y Actualizaciones",
    process_4_desc: "Ejecutamos la estrategia y te mantenemos informado en cada etapa importante.",
    testimonials_title: "Lo Que Dicen Nuestros Clientes",
    testimonial_1: "Manejaron la compra de nuestro fideicomiso impecablemente. Tener un abogado que realmente habla inglés y entiende nuestras preocupaciones hizo toda la diferencia.",
    testimonial_1_name: "Robert & Lisa M.",
    testimonial_1_role: "Compradores de Propiedad, California",
    testimonial_2: "Cuando tuve un problema con la renovación de mi residencia, lo resolvieron en días en lugar de los meses que esperaba. Altamente profesional.",
    testimonial_2_name: "David K.",
    testimonial_2_role: "Jubilado, Texas",
    testimonial_3: "Nuestro HOA del condominio era un desastre. Nos ayudaron a reestructurar el régimen condominial y finalmente tener gobernanza adecuada.",
    testimonial_3_name: "Jennifer W.",
    testimonial_3_role: "Propietaria, Canadá",
    testimonial_4: "Tuve un problema legal y respondieron en una hora un sábado. Ese nivel de respuesta es raro en cualquier parte.",
    testimonial_4_name: "Michael T.",
    testimonial_4_role: "Empresario, Oregon",
    faq_title: "Preguntas Frecuentes",
    faq_1_q: "¿Necesito un fideicomiso para comprar propiedad?",
    faq_1_a: "Sí, si la propiedad está dentro de la zona restringida (a menos de 50km de la costa o 100km de una frontera). El fideicomiso es un instrumento bancario que permite a extranjeros poseer derechos de propiedad en estas áreas.",
    faq_2_q: "¿Cuánto tarda obtener la residencia?",
    faq_2_a: "La residencia temporal típicamente toma 3-6 semanas desde la cita consular hasta recibir tu tarjeta. Los tiempos de residencia permanente varían según tu vía de acceso.",
    faq_3_q: "¿Puedo abrir un negocio como extranjero?",
    faq_3_a: "Por supuesto. Los extranjeros pueden poseer el 100% de una empresa mexicana en la mayoría de los sectores. Nos encargamos de toda la incorporación.",
    faq_4_q: "¿Qué pasa si me arrestan en México?",
    faq_4_a: "Llámanos de inmediato — proporcionamos respuesta de emergencia 24/7. Tienes derecho a representación legal y a contactar tu consulado.",
    faq_5_q: "¿Manejan casos fuera de Puerto Vallarta?",
    faq_5_a: "Sí. Aunque nuestra oficina está en PV, manejamos casos en todo Jalisco y Nayarit, y coordinamos con despachos asociados en otros estados.",
    faq_6_q: "¿Cuánto cuesta la consulta?",
    faq_6_a: "Tu consulta inicial es completamente gratuita. Evaluaremos tu situación y te daremos una idea clara de costos antes de que te comprometas.",
    team_title: "Nuestro Equipo",
    team_sub: "Abogados experimentados que entienden tu mundo",
    team_1_name: "Lic. María Fernanda Robles",
    team_1_role: "Socia Directora — Inmobiliario y Corporativo",
    team_1_desc: "15+ años especializada en transacciones inmobiliarias transfronterizas y constitución de empresas. Bilingüe, egresada de la UNAM.",
    team_2_name: "Lic. Carlos Andrés Vega",
    team_2_role: "Socio Senior — Litigio y Defensa Penal",
    team_2_desc: "Ex fiscal con amplia experiencia en sala. Especialista en la defensa de los derechos de nacionales extranjeros.",
    team_3_name: "Lic. Ana Lucía Torres",
    team_3_role: "Asociada — Migración y Derecho Familiar",
    team_3_desc: "Experta en trámites migratorios mexicanos y asuntos familiares binacionales. Habla inglés y francés con fluidez.",
    contact_title: "¿Listo para Proteger tus Intereses?",
    contact_sub: "Agenda tu consulta gratuita hoy",
    contact_name: "Tu Nombre",
    contact_email: "Correo Electrónico",
    contact_phone: "Teléfono / WhatsApp",
    contact_message: "¿En qué podemos ayudarte?",
    contact_send: "Enviar Mensaje",
    contact_wa: "Chatear por WhatsApp",
    contact_address: "Puerto Vallarta, Jalisco, México",
    contact_hours: "Lun–Vie 9:00 AM – 6:00 PM",
    contact_emergency: "Línea de Emergencia 24/7 Disponible",
    footer_rights: "Todos los derechos reservados.",
    footer_made: "Hecho por duendes.app 2026",
    hablamos: "We Speak English",
  },
};

/* ─── Icons (inline SVGs) ─── */
const icons: Record<string, React.ReactNode> = {
  building: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" /></svg>,
  passport: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>,
  briefcase: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
  scale: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>,
  document: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  shield: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  heart: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  home: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" /></svg>,
  check: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  phone: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
  mail: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  map: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  clock: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  star: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" /></svg>,
  chevron: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
};

const areaIcons = ["building", "passport", "briefcase", "scale", "document", "shield", "heart", "home"];

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, inView } = useInView(0.05);
  return (
    <section ref={ref} id={id} className={`${className} transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
      {children}
    </section>
  );
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--cream-dark)]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium text-lg pr-4" style={{ fontFamily: "var(--font-body)" }}>{q}</span>
        <span className={`text-[var(--gold)] transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}>{icons.chevron}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? "max-h-60 pb-5" : "max-h-0"}`}>
        <p className="text-[var(--slate)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const l = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const WA_LINK = "https://wa.me/523221234567?text=Hello%2C%20I%20need%20legal%20assistance";

  return (
    <div className="min-h-screen">
      {/* ─── NAVBAR ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[var(--navy)]/95 backdrop-blur-md shadow-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>PV</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>PV Law</span>
                <span className="hidden sm:block text-[var(--gold-light)] text-xs tracking-widest uppercase">Abogados • Attorneys</span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                ["#areas", l.nav_areas],
                ["#why", l.nav_why],
                ["#process", l.nav_process],
                ["#team", l.nav_team],
                ["#faq", l.nav_faq],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-white/80 hover:text-[var(--gold)] transition-colors text-sm tracking-wide">{label}</a>
              ))}
              <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="text-white/60 hover:text-white text-sm border border-white/20 rounded-full px-3 py-1 transition-all hover:border-[var(--gold)]">
                {l.lang_toggle}
              </button>
              <a href="#contact" className="bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-[var(--gold)]/20">
                {l.nav_contact}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {mobileMenu
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="lg:hidden bg-[var(--navy)]/98 backdrop-blur-lg border-t border-white/10 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {[
                ["#areas", l.nav_areas], ["#why", l.nav_why], ["#process", l.nav_process],
                ["#team", l.nav_team], ["#faq", l.nav_faq], ["#contact", l.nav_contact],
              ].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMobileMenu(false)} className="block text-white/90 text-lg py-2">{label}</a>
              ))}
              <button onClick={() => { setLang(lang === "en" ? "es" : "en"); setMobileMenu(false); }} className="text-[var(--gold)] text-lg py-2">
                {l.lang_toggle}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.png')" }} />
        {/* Dark overlay for text readability — lighter to show image warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-dark)]/60 via-[var(--navy)]/40 to-[var(--navy-dark)]/70" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[var(--gold)]/3 rounded-full blur-3xl" />
        {/* Gold lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[var(--gold)]/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-[var(--gold-light)] text-sm tracking-widest uppercase">{l.hablamos}</span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 opacity-0" style={{ fontFamily: "var(--font-heading)" }}>
            {l.hero_title}
          </h1>

          <p className="animate-fade-in-up delay-200 text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto mb-10 opacity-0 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {l.hero_sub}
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-xl shadow-[var(--gold)]/25 hover:shadow-[var(--gold)]/40 hover:-translate-y-0.5">
              {icons.whatsapp} {l.hero_cta}
            </a>
            <a href="tel:+523221234567"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-white/20 hover:border-white/40">
              {icons.phone} {l.hero_call}
            </a>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-in-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 opacity-0">
            {[l.trust_years, l.trust_bar, l.trust_bilingual, l.trust_cases].map((badge) => (
              <div key={badge} className="flex flex-col items-center gap-2 py-3">
                <div className="text-[var(--gold)]">{icons.check}</div>
                <span className="text-white/70 text-sm text-center">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-line" />

      {/* ─── PRACTICE AREAS ─── */}
      <Section id="areas" className="py-24 px-4 sm:px-6 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--gold)] text-sm tracking-widest uppercase font-semibold">{l.areas_sub}</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>{l.areas_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-[var(--cream-dark)] hover:border-[var(--gold)]/30 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-[var(--navy)]/5 group-hover:bg-[var(--gold)]/10 flex items-center justify-center mb-4 transition-colors text-[var(--navy)] group-hover:text-[var(--gold)]">
                  {icons[areaIcons[i]]}
                </div>
                <h3 className="text-lg font-bold mb-2 text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>
                  {l[`area_${i + 1}_title`]}
                </h3>
                <p className="text-[var(--slate)] text-sm leading-relaxed">
                  {l[`area_${i + 1}_desc`]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── WHY US ─── */}
      <Section id="why" className="py-24 px-4 sm:px-6 bg-[var(--navy)] relative noise-overlay overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold)]/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--gold)] text-sm tracking-widest uppercase font-semibold">{l.why_sub}</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>{l.why_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={`bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-5">
                  <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>0{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>{l[`why_${i + 1}_title`]}</h3>
                <p className="text-white/60 leading-relaxed">{l[`why_${i + 1}_desc`]}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PROCESS ─── */}
      <Section id="process" className="py-24 px-4 sm:px-6 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--gold)] text-sm tracking-widest uppercase font-semibold">{l.process_sub}</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>{l.process_title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--navy)] text-[var(--gold)] flex items-center justify-center text-2xl font-bold mx-auto mb-5" style={{ fontFamily: "var(--font-heading)" }}>
                  {i + 1}
                </div>
                {i < 3 && <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-[var(--navy)]/15" />}
                <h3 className="text-lg font-bold mb-2 text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>{l[`process_${i + 1}_title`]}</h3>
                <p className="text-[var(--slate)] text-sm leading-relaxed">{l[`process_${i + 1}_desc`]}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>{l.testimonials_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="bg-[var(--cream)] rounded-2xl p-8 border border-[var(--cream-dark)]">
                <div className="flex gap-1 text-[var(--gold)] mb-4">
                  {Array.from({ length: 5 }, (_, j) => <span key={j}>{icons.star}</span>)}
                </div>
                <p className="text-[var(--navy)]/80 leading-relaxed mb-6 italic">&ldquo;{l[`testimonial_${i + 1}`]}&rdquo;</p>
                <div>
                  <p className="font-bold text-[var(--navy)]">{l[`testimonial_${i + 1}_name`]}</p>
                  <p className="text-[var(--slate)] text-sm">{l[`testimonial_${i + 1}_role`]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TEAM ─── */}
      <Section id="team" className="py-24 px-4 sm:px-6 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--gold)] text-sm tracking-widest uppercase font-semibold">{l.team_sub}</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>{l.team_title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--cream-dark)] hover:shadow-xl transition-all duration-500">
                <div className="h-48 bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-[var(--gold)]/40 flex items-center justify-center">
                    <span className="text-white/50 text-3xl" style={{ fontFamily: "var(--font-heading)" }}>{l[`team_${i + 1}_name`].split(" ").pop()?.[0]}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[var(--navy)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>{l[`team_${i + 1}_name`]}</h3>
                  <p className="text-[var(--gold)] text-sm font-semibold mb-3">{l[`team_${i + 1}_role`]}</p>
                  <p className="text-[var(--slate)] text-sm leading-relaxed">{l[`team_${i + 1}_desc`]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section id="faq" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--navy)]" style={{ fontFamily: "var(--font-heading)" }}>{l.faq_title}</h2>
          </div>
          <div>
            {Array.from({ length: 6 }, (_, i) => (
              <FaqItem key={i} q={l[`faq_${i + 1}_q`]} a={l[`faq_${i + 1}_a`]} />
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact" className="py-24 px-4 sm:px-6 bg-[var(--navy)] relative noise-overlay overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>{l.contact_title}</h2>
            <p className="text-white/60 text-xl">{l.contact_sub}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <input type="text" placeholder={l.contact_name} className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors" />
                <input type="email" placeholder={l.contact_email} className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors" />
                <input type="tel" placeholder={l.contact_phone} className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors" />
                <textarea placeholder={l.contact_message} rows={4} className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors resize-none" />
                <button type="submit" className="w-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-[var(--gold)]/20">
                  {l.contact_send}
                </button>
              </form>
            </div>
            {/* Info */}
            <div className="space-y-8">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 hover:bg-[#25D366]/20 transition-all group">
                <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                  {icons.whatsapp}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{l.contact_wa}</p>
                  <p className="text-white/50 text-sm">+52 322 123 4567</p>
                </div>
              </a>

              <div className="space-y-5">
                {[
                  [icons.map, l.contact_address],
                  [icons.mail, "contacto@pvlaw.mx"],
                  [icons.phone, "+52 322 123 4567"],
                  [icons.clock, l.contact_hours],
                ].map(([icon, text], i) => (
                  <div key={i} className="flex items-center gap-4 text-white/70">
                    <span className="text-[var(--gold)]">{icon}</span>
                    <span>{text as string}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-2xl p-6">
                <p className="text-[var(--gold)] font-semibold mb-1">{l.contact_emergency}</p>
                <p className="text-white/60 text-sm">
                  {lang === "en"
                    ? "For arrests or urgent legal matters, call us anytime."
                    : "Para detenciones o asuntos legales urgentes, llámanos en cualquier momento."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[var(--navy-dark)] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>PV</span>
            </div>
            <span className="text-white/60 text-sm">© 2026 PV Law. {l.footer_rights}</span>
          </div>
          <p className="text-white/30 text-sm">{l.footer_made}</p>
        </div>
      </footer>

      {/* ─── Floating WhatsApp ─── */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl shadow-[#25D366]/30 hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
}
