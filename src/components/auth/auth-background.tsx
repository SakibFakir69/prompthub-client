// components/AuthBackground.tsx
import { demoPromptsData } from "@/src/data/auth";
import { PromptCardLogin } from "./prompt-login-card";


export default function AuthBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none md:ml-9 ml-3 mr-10" aria-hidden="true">
      <div className="absolute md:-top-9 top-8 md:-left-7 -left-5 w-[340px] rotate-[-6deg] opacity-[0.35] scale-90 hidden lg:block">
        <PromptCardLogin prompt={demoPromptsData[0]} />
      </div>

      <div className="absolute md:top-50 md:-left-10 w-[300px] rotate-[3deg] opacity-[0.25] scale-75 hidden xl:block">
        <PromptCardLogin prompt={demoPromptsData[1]} />
      </div>

      <div className="absolute -top-4 -right-16 w-[340px] rotate-[5deg] opacity-[0.3] scale-90 hidden lg:block">
        <PromptCardLogin prompt={demoPromptsData[2]} />
      </div>

      <div className="absolute md:top-50 -right-7 w-[280px] rotate-[-4deg] opacity-[0.22] scale-75 hidden xl:block">
        <PromptCardLogin prompt={demoPromptsData[3]} />
      </div>

      <div className="absolute md:-bottom-10 -left-14 w-[320px] rotate-[4deg] opacity-[0.28] scale-85 hidden lg:block">
        <PromptCardLogin prompt={demoPromptsData[4]} />
      </div>

      <div className="absolute md:-bottom-7 -right-20 w-[310px] rotate-[-5deg] opacity-[0.26] scale-85 hidden lg:block">
        <PromptCardLogin prompt={demoPromptsData[5]} />
      </div>

      <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[280px] rotate-[7deg] opacity-[0.18] scale-70 hidden 2xl:block">
        <PromptCardLogin prompt={demoPromptsData[3]} />
      </div>

      <div className="absolute top-1/2 -right-28 -translate-y-1/2 w-[280px] rotate-[-8deg] opacity-[0.18] scale-70 hidden 2xl:block">
        <PromptCardLogin prompt={demoPromptsData[0]} />
      </div>

      {/* Subtle decorative blurs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF6B35]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl" />
    </div>
  );
}