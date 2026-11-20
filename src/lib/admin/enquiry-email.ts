export function createEnquiryReplyTemplate(name: string, subject: string) {
  const recipient = name.trim() || "Customer";
  const enquirySubject = subject.trim() || "your enquiry";
  return {
    subject: `Regarding your enquiry: ${enquirySubject}`.slice(0, 200),
    message: `Dear ${recipient},\n\nThank you for contacting Astronis Global. We have received your enquiry regarding "${enquirySubject}". Our team will review your request and get back to you shortly.\n\nBest regards,\nTeam Astronis Global`,
  };
}
