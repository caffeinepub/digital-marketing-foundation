import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Bot,
  Brain,
  LogIn,
  Send,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AppNav } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useChatWithAI } from "../hooks/useQueries";

interface Props {
  nav: AppNav;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  id: "welcome",
  content:
    "Hi! I'm your AI learning assistant. Ask me anything about digital marketing, SEO, social media, or practice your prompt engineering skills! I'm here to help you master digital marketing and become an AI-powered marketer.",
};

const PROMPT_EXERCISES = [
  {
    title: "Facebook Ad Prompt",
    description: "Write a compelling Facebook ad for a new product",
    prompt:
      "Write me a Facebook ad copy for a digital marketing course targeting small business owners. The course costs ₹24,999 and teaches SEO, social media, and content marketing from scratch.",
    icon: Target,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "SEO Blog Outline",
    description: "Create a structured outline for an SEO-optimized blog post",
    prompt:
      "Create a detailed blog post outline for the topic 'How to rank on Google Page 1 in 2025'. Include H1, H2, H3 headings, target keywords, and estimated word count for each section.",
    icon: BookOpen,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    title: "Social Media Calendar",
    description: "Generate a week-long social media content calendar",
    prompt:
      "Create a 7-day social media content calendar for a digital marketing agency. Include post ideas for Instagram, LinkedIn, and Twitter with captions, hashtags, and best posting times.",
    icon: Zap,
    color: "text-brand-orange",
    bg: "bg-orange-50",
  },
  {
    title: "Email Newsletter",
    description: "Draft a promotional email newsletter",
    prompt:
      "Write a promotional email newsletter for The Digital Marketing Foundation announcing our Advanced course. Include a subject line, pre-header, body copy, and CTA button text. Tone: professional but friendly.",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Instagram Bio",
    description: "Craft an engaging Instagram bio for a business",
    prompt:
      "Write 3 variations of an Instagram bio for a digital marketing consultant who specializes in helping Indian small businesses grow online. Keep each under 150 characters and include a CTA.",
    icon: Sparkles,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    title: "Google Ads Copy",
    description: "Create Google Search ad headlines and descriptions",
    prompt:
      "Generate 5 Google Search Ad headlines (max 30 chars each) and 3 descriptions (max 90 chars each) for a digital marketing course. Target keywords: 'digital marketing course India', 'learn SEO online'.",
    icon: Target,
    color: "text-brand-teal",
    bg: "bg-teal-50",
  },
  {
    title: "YouTube Script Hook",
    description: "Write the first 60 seconds of a YouTube video script",
    prompt:
      "Write the first 60 seconds of a YouTube script for a video titled 'I Earned ₹1 Lakh with Digital Marketing in 30 Days – Here's How'. Start with a strong hook, build curiosity, and end with a subscribe CTA.",
    icon: Zap,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    title: "Competitor Analysis Prompt",
    description: "Structure a competitive analysis for a business",
    prompt:
      "Help me do a digital competitive analysis for a new online bakery in Mumbai. What aspects should I analyze about competitors: website, SEO, social media, pricing, and content? Give me a framework with specific questions to answer.",
    icon: BookOpen,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
];

export default function AIHubPage({ nav: _nav }: Props) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const chatWithAI = useChatWithAI();

  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || chatWithAI.isPending) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: text,
      id: `user-${Date.now()}`,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await chatWithAI.mutateAsync({ message: text, history });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response, id: `ai-${Date.now()}` },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your request right now. Please try again.",
          id: `error-${Date.now()}`,
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTryPrompt = (prompt: string) => {
    setInputValue(prompt);
    setActiveTab("chat");
    setTimeout(() => {
      const textarea = document.querySelector<HTMLTextAreaElement>(
        "[data-ocid='aihub.textarea']",
      );
      textarea?.focus();
    }, 100);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-orange flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-heading mb-3">
            AI Practice Hub
          </h1>
          <p className="text-brand-body mb-6">
            Login to access your personal AI learning assistant, practice prompt
            engineering, and get expert guidance on digital marketing.
          </p>
          <Button
            data-ocid="aihub.primary_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-8 font-semibold shadow-orange"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isLoggingIn ? "Logging in..." : "Login to Continue"}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-brand-teal to-brand-teal-dark text-white py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">AI Practice Hub</h1>
              <p className="text-white/80 text-sm">
                Chat with AI, practice prompts, and level up your digital
                marketing skills
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList
            data-ocid="aihub.tab"
            className="bg-white border border-gray-100 shadow-xs"
          >
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger
              value="prompt-training"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Prompt Training
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card className="border border-gray-100 shadow-xs overflow-hidden">
              <CardHeader className="border-b border-gray-100 py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal to-brand-orange flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-brand-heading">
                      AI Marketing Assistant
                    </CardTitle>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                      Online
                    </p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea
                data-ocid="aihub.panel"
                className="h-[420px] px-4 py-4"
              >
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-teal to-brand-orange flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-brand-orange text-white rounded-tr-sm"
                              : "bg-gray-100 text-brand-heading rounded-tl-sm"
                          }`}
                        >
                          <span
                            // biome-ignore lint: safe HTML, no user-controlled tags
                            dangerouslySetInnerHTML={{
                              __html: msg.content.replace(/\n/g, "<br />"),
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {chatWithAI.isPending && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-teal to-brand-orange flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div
                        data-ocid="aihub.loading_state"
                        className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-brand-body"
                      >
                        <span className="inline-flex items-center gap-1">
                          AI is thinking
                          <span className="animate-bounce">.</span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          >
                            .
                          </span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          >
                            .
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-gray-100 p-3 flex gap-2 items-end">
                <Textarea
                  data-ocid="aihub.textarea"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about digital marketing, SEO, social media... (Enter to send)"
                  className="flex-1 min-h-[44px] max-h-[120px] resize-none border-gray-200 focus:border-brand-teal focus:ring-brand-teal text-sm"
                  rows={1}
                />
                <Button
                  data-ocid="aihub.primary_button"
                  onClick={handleSend}
                  disabled={chatWithAI.isPending || !inputValue.trim()}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white h-11 w-11 p-0 rounded-xl flex-shrink-0"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Prompt Training Tab */}
          <TabsContent value="prompt-training">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <div>
                  <h2 className="font-bold text-brand-heading">
                    Prompt Engineering Exercises
                  </h2>
                  <p className="text-sm text-brand-body">
                    Practice writing effective AI prompts for digital marketing
                    tasks
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {PROMPT_EXERCISES.map((exercise, i) => {
                  const Icon = exercise.icon;
                  return (
                    <motion.div
                      key={exercise.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      data-ocid={`aihub.item.${i + 1}`}
                    >
                      <Card className="border border-gray-100 shadow-xs hover:shadow-md transition-shadow h-full">
                        <CardContent className="p-4 flex flex-col h-full">
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className={`w-9 h-9 rounded-xl ${exercise.bg} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className={`w-5 h-5 ${exercise.color}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-brand-heading text-sm">
                                {exercise.title}
                              </h3>
                              <p className="text-xs text-brand-body mt-0.5">
                                {exercise.description}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-xs text-brand-body font-mono leading-relaxed flex-1 mb-3 line-clamp-3">
                            {exercise.prompt}
                          </div>
                          <Button
                            data-ocid="aihub.secondary_button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleTryPrompt(exercise.prompt)}
                            className="w-full border-brand-teal text-brand-teal hover:bg-brand-wash text-xs"
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Try This Prompt
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
