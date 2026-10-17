/**
 * إيميلات التواصل الجاهزة — أسئلة الفرز (Master Profile v3 §4.4) وطلب الـCV.
 * مستخدمة في الرئيسية وصفحات العروض عشان الأسئلة تفضل في مكان واحد.
 */
import { publicContact } from "@/lib/public-contact";

// الحقول اللي الشركة بتملاها قبل جلسة الفرز المجانية
const intakeBody = [
  "Company and sector:",
  "Department:",
  "The problem (one or two lines):",
  "How often it happens:",
  "Time it takes today:",
  "Systems involved (SAP / ERP / Excel / other):",
  "Who owns the decision:",
  "Preferred start date:",
  "Data-access limits we should know about:",
].join("\n");

/** إيميل للشركة بعنوان مخصّص وأسئلة الفرز جاهزة في النص */
export function intakeMailto(subject: string): string {
  return `${publicContact.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(intakeBody)}`;
}

export const companyMailto = intakeMailto("Challenge for a free 90-minute scan");

export const recruiterMailto = `${publicContact.mailto}?subject=${encodeURIComponent(
  "CV request: AI & automation transformation role",
)}`;
