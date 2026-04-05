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
  Cpu,
  LogIn,
  Send,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AppNav } from "../App";
import { useEmailAuth } from "../hooks/useEmailAuth";
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
      "Write me a Facebook ad copy for a digital marketing course targeting small business owners. The course costs Rs. 24,999 and teaches SEO, social media, and content marketing from scratch.",
    icon: Target,
  },
  {
    title: "SEO Blog Outline",
    description: "Create a structured outline for an SEO-optimized blog post",
    prompt:
      "Create a detailed blog post outline for the topic 'How to rank on Google Page 1 in 2025'. Include H1, H2, H3 headings, target keywords, and estimated word count for each section.",
    icon: BookOpen,
  },
  {
    title: "Social Media Calendar",
    description: "Generate a week-long social media content calendar",
    prompt:
      "Create a 7-day social media content calendar for a digital marketing agency. Include post ideas for Instagram, LinkedIn, and Twitter with captions, hashtags, and best posting times.",
    icon: Zap,
  },
  {
    title: "Email Newsletter",
    description: "Draft a promotional email newsletter",
    prompt:
      "Write a promotional email newsletter for The Digital Marketing Foundation announcing our Advanced course. Include a subject line, pre-header, body copy, and CTA button text. Tone: professional but friendly.",
    icon: Brain,
  },
  {
    title: "Instagram Bio",
    description: "Craft an engaging Instagram bio for a business",
    prompt:
      "Write 3 variations of an Instagram bio for a digital marketing consultant who specializes in helping Indian small businesses grow online. Keep each under 150 characters and include a CTA.",
    icon: Sparkles,
  },
  {
    title: "Google Ads Copy",
    description: "Create Google Search ad headlines and descriptions",
    prompt:
      "Generate 5 Google Search Ad headlines (max 30 chars each) and 3 descriptions (max 90 chars each) for a digital marketing course. Target keywords: 'digital marketing course India', 'learn SEO online'.",
    icon: Target,
  },
  {
    title: "YouTube Script Hook",
    description: "Write the first 60 seconds of a YouTube video script",
    prompt:
      "Write the first 60 seconds of a YouTube script for a video titled 'I Earned Rs. 1 Lakh with Digital Marketing in 30 Days - Here's How'. Start with a strong hook, build curiosity, and end with a subscribe CTA.",
    icon: Zap,
  },
  {
    title: "Competitor Analysis Prompt",
    description: "Structure a competitive analysis for a business",
    prompt:
      "Help me do a digital competitive analysis for a new online bakery in Mumbai. What aspects should I analyze about competitors: website, SEO, social media, pricing, and content? Give me a framework with specific questions to answer.",
    icon: BookOpen,
  },
];

export default function AIHubPage({ nav: _nav }: Props) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { isEmailLoggedIn, emailUser } = useEmailAuth();
  const isLoggedIn = !!identity || isEmailLoggedIn;
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I couldn't process your request. Error: ${errorMessage}`,
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
      <div
        className="min-h-screen flex items-center justify-center px-4 neural-grid"
        style={{ background: "oklch(5% 0.01 250)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-blue"
            style={{
              background: "oklch(60% 0.25 230 / 0.15)",
              border: "1px solid oklch(60% 0.25 230 / 0.4)",
            }}
          >
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground mb-3">
            AI Practice Hub
          </h1>
          <p className="mb-6" style={{ color: "oklch(55% 0.01 250)" }}>
            Login to access your personal AI learning assistant, practice prompt
            engineering, and get expert guidance on digital marketing.
          </p>
          <Button
            data-ocid="aihub.primary_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="btn-gold rounded-full px-8 font-semibold glow-blue"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isLoggingIn ? "Logging in..." : "Login to Continue"}
          </Button>
        </motion.div>
      </div>
    );
  }

  const heroTitle =
    isEmailLoggedIn && emailUser
      ? `Welcome, ${emailUser.name}`
      : "AI Practice Hub";

  return (
    <div className="min-h-screen" style={{ background: "oklch(5% 0.01 250)" }}>
      {/* Hero */}
      <div
        className="py-10 neural-grid"
        style={{
          borderBottom: "1px solid oklch(60% 0.25 230 / 0.15)",
          background: "oklch(6% 0.012 250)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center glow-blue"
              style={{
                background: "oklch(60% 0.25 230 / 0.15)",
                border: "1px solid oklch(60% 0.25 230 / 0.4)",
              }}
            >
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">
                {heroTitle}
              </h1>
              <p className="text-sm" style={{ color: "oklch(50% 0.01 250)" }}>
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
          <TabsList data-ocid="aihub.tab" className="glass-card border-border">
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2 data-[state=active]:text-primary"
            >
              <Bot className="w-4 h-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger
              value="prompt-training"
              className="flex items-center gap-2 data-[state=active]:text-primary"
            >
              <Sparkles className="w-4 h-4" />
              Prompt Training
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <div
              className="glass-card rounded-2xl overflow-hidden"
              style={{ border: "1px solid oklch(60% 0.25 230 / 0.2)" }}
            >
              <div
                className="flex items-center gap-2 border-b py-3 px-4"
                style={{ borderColor: "oklch(60% 0.25 230 / 0.15)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.15)",
                    border: "1px solid oklch(60% 0.25 230 / 0.3)",
                  }}
                >
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-mono font-semibold text-primary">
                    AI Marketing Assistant
                  </div>
                  <p
                    className="text-xs flex items-center gap-1"
                    style={{ color: "oklch(55% 0.01 250)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                      style={{ background: "oklch(70% 0.2 200)" }}
                    />
                    Online
                  </p>
                </div>
              </div>

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
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1"
                            style={{
                              background: "oklch(60% 0.25 230 / 0.15)",
                              border: "1px solid oklch(60% 0.25 230 / 0.3)",
                            }}
                          >
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "rounded-tr-sm"
                              : "rounded-tl-sm"
                          }`}
                          style={
                            msg.role === "user"
                              ? {
                                  background: "oklch(60% 0.25 230 / 0.2)",
                                  border:
                                    "1px solid oklch(60% 0.25 230 / 0.35)",
                                  color: "oklch(90% 0.005 250)",
                                }
                              : {
                                  background: "oklch(12% 0.02 250)",
                                  border:
                                    "1px solid oklch(60% 0.25 230 / 0.15)",
                                  borderLeft:
                                    "3px solid oklch(60% 0.25 230 / 0.6)",
                                  color: "oklch(85% 0.005 250)",
                                }
                          }
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
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: "oklch(60% 0.25 230 / 0.15)",
                          border: "1px solid oklch(60% 0.25 230 / 0.3)",
                        }}
                      >
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div
                        data-ocid="aihub.loading_state"
                        className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm"
                        style={{
                          background: "oklch(12% 0.02 250)",
                          border: "1px solid oklch(60% 0.25 230 / 0.15)",
                          borderLeft: "3px solid oklch(60% 0.25 230 / 0.6)",
                          color: "oklch(55% 0.01 250)",
                        }}
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
              <div
                className="border-t p-3 flex gap-2 items-end"
                style={{ borderColor: "oklch(60% 0.25 230 / 0.15)" }}
              >
                <Textarea
                  data-ocid="aihub.textarea"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about digital marketing, SEO, social media... (Enter to send)"
                  className="flex-1 min-h-[44px] max-h-[120px] resize-none border-border focus:border-primary focus:ring-primary text-sm bg-input"
                  rows={1}
                />
                <Button
                  data-ocid="aihub.primary_button"
                  onClick={handleSend}
                  disabled={chatWithAI.isPending || !inputValue.trim()}
                  className="btn-gold h-11 w-11 p-0 rounded-xl flex-shrink-0"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Prompt Training Tab */}
          <TabsContent value="prompt-training">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="font-bold text-foreground">
                    Prompt Engineering Exercises
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(50% 0.01 250)" }}
                  >
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
                      <div
                        className="glass-card rounded-xl p-4 flex flex-col h-full"
                        style={{
                          border: "1px solid oklch(60% 0.25 230 / 0.15)",
                        }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: "oklch(60% 0.25 230 / 0.1)",
                              border: "1px solid oklch(60% 0.25 230 / 0.2)",
                            }}
                          >
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">
                              {exercise.title}
                            </h3>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: "oklch(50% 0.01 250)" }}
                            >
                              {exercise.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className="rounded-lg p-3 text-xs font-mono leading-relaxed flex-1 mb-3 line-clamp-3"
                          style={{
                            background: "oklch(8% 0.015 250)",
                            border: "1px solid oklch(60% 0.25 230 / 0.1)",
                            color: "oklch(55% 0.01 250)",
                          }}
                        >
                          {exercise.prompt}
                        </div>
                        <Button
                          data-ocid="aihub.secondary_button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleTryPrompt(exercise.prompt)}
                          className="w-full border-primary/30 text-primary hover:bg-primary/10 text-xs"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Try This Prompt
                        </Button>
                      </div>
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
