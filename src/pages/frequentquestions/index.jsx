import React from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { FiChevronDown } from "react-icons/fi"; // Arrow icon

const FrequentQuestions = () => {
  return (
    <div className="pt-20 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>

      <Accordion allowMultiple unstyled>
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            header={({ state }) => (
              <div className="flex justify-between items-center py-4 text-lg font-semibold text-gray-800 cursor-pointer">
                {item.question}
                <FiChevronDown
                  className={`transform transition-transform duration-300 ml-6 ${
                    state?.isEnter ? "rotate-180" : ""
                  }`}
                />
              </div>
            )}
            className="border border-gray-300 rounded-xl mb-4 px-6"
            contentProps={{
              className: "pb-4 text-gray-600 transition-all duration-300",
            }}
          >
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// Replace these with your own questions/answers
const faqItems = [
    {
      question: "How do I book an appointment with a doctor?",
      answer:
        "You can easily book an appointment by selecting your preferred doctor, choosing an available date and time slot, and confirming your booking through the app.",
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer:
        "Yes, you can reschedule or cancel your appointment up to 24 hours in advance through your profile under 'My Appointments'.",
    },
    {
      question: "Do I need to create an account to book an appointment?",
      answer:
        "Yes, creating an account helps us securely manage your medical history, appointment details, and notifications.",
    },
    {
      question: "Will I get reminders for my upcoming appointments?",
      answer:
        "Absolutely! You'll receive automated reminders via email and push notifications before your scheduled appointment.",
    },
    {
      question: "Are virtual consultations available?",
      answer:
        "Yes, many doctors offer virtual consultations. You can select 'Online Consultation' while booking if the doctor provides that option.",
    },
    {
      question: "What should I do if the doctor doesn't show up?",
      answer:
        "In rare cases this may happen. Please contact our support team immediately through the app, and we’ll help you reschedule or issue a refund if needed.",
    },
  ];
  
export default FrequentQuestions;
