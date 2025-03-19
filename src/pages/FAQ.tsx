
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock FAQ data (in a real app, this would come from an API)
const faqData = [
  {
    id: "1",
    question: "How do I register a product?",
    answer: "You can register a product by navigating to the 'Register Product' page, searching for your brand, selecting your product, and filling out the registration form with your purchase details."
  },
  {
    id: "2",
    question: "How does ConsumerConnect protect my personal information?",
    answer: "We protect your personal information by never sharing your contact details directly with brands. Communications are handled through our platform, ensuring your privacy is maintained at all times."
  },
  {
    id: "3",
    question: "Can I track my customer service requests?",
    answer: "Yes, all your service requests are tracked in your profile. You can view their status, updates, and communication history at any time."
  },
  {
    id: "4",
    question: "How do I connect with a brand's customer service?",
    answer: "You can connect with a brand's customer service by navigating to their brand page and using the contact options provided. The brand will then be able to respond to you through our platform."
  },
  {
    id: "5",
    question: "What should I do if I'm not satisfied with a brand's response?",
    answer: "If you're not satisfied with a brand's response, you can escalate your concern through the relevant regulatory authority listed on the brand's page. We provide direct links to these authorities to make the process easier."
  }
];

// FAQ categories for filtering
const categories = [
  "All",
  "Product Registration",
  "Privacy & Security",
  "Customer Service",
  "Regulatory Matters",
  "Account Management"
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-grow w-full pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about using ConsumerConnect
            </p>
          </div>
          
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border rounded-md px-4"
              >
                <AccordionTrigger className="text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-accent/30 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              If you couldn't find the answer to your question, feel free to contact our support team.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:support@consumerconnect.com"
                className="text-primary hover:underline"
              >
                support@consumerconnect.com
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
