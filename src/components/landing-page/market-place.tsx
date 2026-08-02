"use client"

import { useEffect, useRef, useState } from "react"
import { CATEGORIES, PROMPTS, type Prompt } from "@/src/constants/landing-page"
import { useScrollReveal } from "@/src/hooks/landing-page/page"
import { Copy, Star, Loader2, Check, AlertCircle } from "lucide-react"

type CopyState = "idle" | "copying" | "copied" | "error"

export function MarketPlace() {
  useScrollReveal()
  const [activeCategory, setActiveCategory] = useState("All")
  const [copyState, setCopyState] = useState<Record<number, CopyState>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const announceRef = useRef<HTMLDivElement>(null)

  const normalize = (s: string) => (s || "").trim().toLowerCase()

  const filteredPrompts = PROMPTS.filter(
    (p) => activeCategory === "All" || normalize(p.category) === normalize(activeCategory)
  )

  useEffect(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll(".reveal")
    cards.forEach((el) => {
      el.classList.remove("revealed")
      void (el as HTMLElement).offsetWidth
      el.classList.add("revealed")
    })
    // Tell screen reader users the result count changed, without moving focus.
    if (announceRef.current) {
      announceRef.current.textContent = `Showing ${filteredPrompts.length} prompt${
        filteredPrompts.length === 1 ? "" : "s"
      } in ${activeCategory}`
    }
  }, [activeCategory, filteredPrompts.length])

  const handleCopy = async (id: number, promptText: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (copyState[id] === "copying") return

    setCopyState((s) => ({ ...s, [id]: "copying" }))
    try {
      await navigator.clipboard.writeText(promptText)
      setCopyState((s) => ({ ...s, [id]: "copied" }))
      setTimeout(() => setCopyState((s) => ({ ...s, [id]: "idle" })), 1500)
    } catch {
      setCopyState((s) => ({ ...s, [id]: "error" }))
      setTimeout(() => setCopyState((s) => ({ ...s, [id]: "idle" })), 2000)
    }
  }

  return (
    <section id="marketplace" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f8f7f4]">
      <div className="max-w-6xl mx-auto">

        {/* ── Centered Header ── */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] bg-[#FF6B35]/10 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] motion-safe:animate-pulse" />
            Marketplace
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-semibold text-gray-900 tracking-tight leading-[1.15] mb-3">
            Top prompts{" "}
            <span className="text-gray-400 font-normal">curated for production</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
            Browse, copy, and use battle-tested prompts built by the community.
          </p>
        </div>

        {/* ── Category Tabs ── */}
        {/* Horizontal scroll on small screens instead of wrap: wrapping tabs reflow
            the whole bar's height per category, which shifts the grid below it. */}
        <div
          role="tablist"
          aria-label="Filter prompts by category"
          className="flex items-center gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap sm:justify-center overflow-x-auto no-scrollbar snap-x snap-mandatory sm:overflow-visible bg-white/80 p-2 rounded-2xl border border-gray-200/80 backdrop-blur-sm shadow-sm w-fit max-w-full mx-auto mb-10 sm:mb-12"
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PROMPTS.length
                : PROMPTS.filter((p) => normalize(p.category) === normalize(cat)).length

            const isActive = activeCategory === cat

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={(e) => {
                  setActiveCategory(cat)
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
                }}
                className={`relative shrink-0 snap-start text-sm sm:text-[15px] font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isActive
                    ? "bg-gray-900 text-white shadow-md shadow-gray-900/15"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] sm:text-xs min-w-[24px] text-center px-2 py-0.5 rounded-full leading-none ${
                    isActive
                      ? "bg-white/20 text-white/90"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Screen-reader-only live region announcing filter results */}
        <div ref={announceRef} className="sr-only" aria-live="polite" />

        {/* ── Prompt Grid ── */}
        {filteredPrompts.length > 0 ? (
          <ul
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 list-none p-0"
          >
            {filteredPrompts.map((p: Prompt, i: number) => {
              const state = copyState[p.id] ?? "idle"

              return (
                <li
                  key={p.id}
                  className="reveal group flex flex-col bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-lg hover:border-gray-300/80 transition-all duration-300 motion-safe:hover:-translate-y-0.5 relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: p.color }}
                  />

                  <div className="p-5 sm:p-6 flex flex-col flex-1 relative">
                    {/* Top: Emoji + Tag */}
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm border border-black/[0.04] group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: `${p.color}12` }}
                        aria-hidden="true"
                      >
                        {p.emoji}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                        {p.tag}
                      </span>
                    </div>

                    {/* Category label + Title */}
                    <div className="mb-4 flex-1">
                      <span
                        className="inline-block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mb-1.5"
                        style={{ color: p.color }}
                      >
                        {p.category}
                      </span>
                      <h3
                        title={p.title}
                        className="text-[15px] sm:text-base font-semibold text-gray-900 group-hover:text-black leading-snug line-clamp-2"
                      >
                        {p.title}
                      </h3>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        {/* Author */}
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                            style={{ backgroundColor: p.color }}
                            aria-hidden="true"
                          >
                            {p.authorInitials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-none truncate">
                              {p.author}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
                              Creator
                            </span>
                          </div>
                        </div>

                        {/* Rating + Copy */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-500 font-medium bg-gray-50/80 px-2 py-1 rounded-lg border border-gray-100">
                            <Star size={11} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                            <span>{p.rating.toFixed(1)}</span>
                            <span className="text-gray-200 mx-0.5">·</span>
                            <span className="text-gray-400">{p.uses}</span>
                          </div>

                          {/* Copy button */}
                          <button
                            type="button"
                            onClick={(e) =>
                              // NOTE: was copying p.title before — that copied the card's
                              // headline, not the prompt itself. Swap p.content for whatever
                              // field on Prompt actually holds the full prompt text.
                              handleCopy(p.id, p.content, e)
                            }
                            disabled={state === "copying"}
                            aria-label={
                              state === "copied"
                                ? "Copied to clipboard"
                                : state === "error"
                                ? "Copy failed, try again"
                                : `Copy "${p.title}" prompt`
                            }
                            title={
                              state === "copied"
                                ? "Copied!"
                                : state === "error"
                                ? "Copy failed"
                                : "Copy prompt"
                            }
                            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 ${
                              state === "copied"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60 scale-95"
                                : state === "error"
                                ? "bg-red-50 text-red-500 border border-red-200/60"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-900 hover:text-white hover:shadow-sm border border-transparent"
                            }`}
                          >
                            {state === "copying" ? (
                              <Loader2 size={14} strokeWidth={2} className="motion-safe:animate-spin" />
                            ) : state === "copied" ? (
                              <Check size={14} strokeWidth={2.5} />
                            ) : state === "error" ? (
                              <AlertCircle size={14} strokeWidth={2} />
                            ) : (
                              <Copy size={14} strokeWidth={2} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Mobile-only rating row */}
                      <div className="sm:hidden flex items-center gap-1.5 mt-2.5 text-[11px] text-gray-500 font-medium">
                        <Star size={11} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                        <span>{p.rating.toFixed(1)}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-gray-400">{p.uses} uses</span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          /* ── Empty State ── */
          <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 text-2xl flex items-center justify-center mx-auto mb-5 border border-gray-100" aria-hidden="true">
              🔍
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">
              No prompts found
            </h3>
            <p className="text-xs text-gray-400 max-w-[240px] mx-auto mb-6 leading-relaxed">
              No prompts match &quot;{activeCategory}&quot;. Try a different category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="text-xs font-semibold bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm shadow-gray-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              View All Prompts
            </button>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-12 sm:mt-14">
          <p className="text-xs text-gray-400 mb-3">
            Showing {filteredPrompts.length} of {PROMPTS.length} prompts
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
          >
            Explore all prompts
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default MarketPlace