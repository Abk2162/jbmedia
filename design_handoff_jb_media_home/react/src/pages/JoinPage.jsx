import React, { useState } from "react";
import { CheckCircle2, Sparkles, Send, ArrowRight, HelpCircle, AlertCircle, Camera, Film, Palette, Globe, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const DOMAINS = [
  { id: "photography", label: "Photography", icon: Camera },
  { id: "cinematography", label: "Cinematography & Reels", icon: Film },
  { id: "design", label: "Graphic & Poster Design", icon: Palette },
  { id: "editing", label: "Video Editing & VFX", icon: Sparkles },
  { id: "content", label: "Content, Scripting & PR", icon: PenTool },
  { id: "tech", label: "Web & Creative Tech", icon: Globe },
];

const FAQS = [
  {
    q: "Do I need to own a professional DSLR or mirrorless camera?",
    a: "No! Personal gear is not mandatory. We value your eye for composition, enthusiasm to learn, and commitment. The club provides official cinema bodies, gimbals, primes, and studio lights for assignments.",
  },
  {
    q: "Who is eligible to apply for recruitments?",
    a: "All 1st, 2nd, and 3rd year students of JBIET from any engineering branch or department are eligible to apply.",
  },
  {
    q: "What does the selection process look like?",
    a: "The induction happens in two simple stages: (1) Online Application Review based on your domain interest/portfolio, followed by (2) A friendly in-person interactive session and hands-on trial task.",
  },
  {
    q: "How much weekly time commitment is expected?",
    a: "Usually 3 to 5 hours per week during regular college days, with intensive multi-day multi-cam assignments during major college fests and flagship sports tournaments.",
  },
  {
    q: "Can I apply for more than one domain?",
    a: "Yes! You can choose your primary domain and mention secondary interests (e.g. Photography + Video Editing) in the application form.",
  },
];

export function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    branchYear: "1st Year - CSE",
    email: "",
    phone: "",
    primaryDomain: "photography",
    portfolioUrl: "",
    statement: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in your full name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission to backend / Google Form webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col gap-20">
      {/* Header */}
      <div className="flex flex-col gap-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Badge variant="default" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Induction Portal</span>
          </Badge>
          <span className="font-barlow-condensed text-xs uppercase tracking-widest text-gold-400 font-semibold">
            Academic Year 2025–26
          </span>
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground">
          JOIN <span className="bg-gold-gradient bg-clip-text text-transparent">THE CREW</span>
        </h1>
        <p className="font-barlow text-lg text-foreground/75 max-w-xl mx-auto">
          Step into the spotlight or command the lens behind the scenes. Fill out your details below to begin your induction.
        </p>
      </div>

      {/* ---------------- APPLICATION FORM CARD ---------------- */}
      <Card className="p-8 sm:p-12 border-gold-500/30 bg-dark-card/95 shadow-2xl relative overflow-hidden">
        {isSubmitted ? (
          /* Success Screen */
          <div className="py-12 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-gold-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-anton text-3xl sm:text-4xl uppercase text-foreground">
                APPLICATION RECEIVED!
              </h2>
              <p className="font-barlow text-foreground/80 max-w-md mx-auto text-base">
                Thank you, <span className="font-semibold text-gold-300">{formData.fullName}</span>. Your application for <span className="uppercase text-gold-300 font-semibold">{formData.primaryDomain}</span> has been logged into our induction roster.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gold-500/20 bg-dark-surface max-w-md text-xs font-barlow text-foreground/70 leading-relaxed">
              Our coordinators will reach out to you via WhatsApp at <span className="text-gold-200">{formData.phone}</span> with the scheduled time for your in-person interaction session.
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: "",
                  rollNumber: "",
                  branchYear: "1st Year - CSE",
                  email: "",
                  phone: "",
                  primaryDomain: "photography",
                  portfolioUrl: "",
                  statement: "",
                });
              }}
              className="mt-4"
            >
              Submit Another Application
            </Button>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {errorMsg && (
              <div className="p-4 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Field Section 1: Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12 px-4 rounded-lg bg-dark-surface border border-gold-500/25 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold-400 text-sm font-barlow"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                  Hall Ticket / Roll Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24JBIET..."
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="h-12 px-4 rounded-lg bg-dark-surface border border-gold-500/25 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold-400 text-sm font-barlow"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 px-4 rounded-lg bg-dark-surface border border-gold-500/25 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold-400 text-sm font-barlow"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 px-4 rounded-lg bg-dark-surface border border-gold-500/25 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold-400 text-sm font-barlow"
                />
              </div>
            </div>

            {/* Field Section 2: Domain Selection */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                Primary Domain of Interest *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOMAINS.map((domain) => {
                  const Icon = domain.icon;
                  const isSelected = formData.primaryDomain === domain.id;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, primaryDomain: domain.id })}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-gold-400 bg-gold-500/15 text-gold-200 shadow-md font-semibold"
                          : "border-gold-500/20 bg-dark-surface hover:border-gold-400/40 text-foreground/75"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? "text-gold-300" : "text-foreground/50"}`} />
                      <span className="font-barlow-condensed text-sm tracking-wide uppercase">
                        {domain.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field Section 3: Portfolio & Statement */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                  Portfolio / Instagram / Google Drive Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/... or https://drive.google.com/..."
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="h-12 px-4 rounded-lg bg-dark-surface border border-gold-500/25 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold-400 text-sm font-barlow"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-barlow-condensed font-semibold uppercase tracking-wider text-foreground/80">
                  Why do you want to join JB Media?
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your interests, your passion for storytelling, or what you hope to create..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="p-4 rounded-lg bg-dark-surface border border-gold-500/25 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold-400 text-sm font-barlow resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              variant="default"
              disabled={isSubmitting}
              className="w-full gap-2 text-base font-bold shadow-xl"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </Card>

      {/* ---------------- FAQS ACCORDION ---------------- */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <div className="jb-eyebrow">Got Questions?</div>
          <h2 className="jb-h2 text-foreground">Frequently Asked Questions</h2>
          <div className="jb-rule mt-2" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
