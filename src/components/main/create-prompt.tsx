
'use client'

import { useState, useRef } from 'react'
import { X, ImagePlus, Send, Lock, Globe, Plus } from 'lucide-react'
import { useCreatePromptMutation, useUploadPromptImageMutation } from '@/src/store/features/prompt/prompt.features'

const CATEGORIES = ['Writing', 'Dev', 'Marketing', 'Education', 'Design', 'Research', 'Productivity']

export default function CreatePromptBox() {
  const [open, setOpen]               = useState(false)
  const [title, setTitle]             = useState('')
  const [prompt, setPrompt]           = useState('')
  const [categories, setCategories]   = useState<string[]>([])
  const [tags, setTags]               = useState<string[]>([])
  const [tagInput, setTagInput]       = useState('')
  const [visibility, setVisibility]   = useState(true)
  const [imageFile, setImageFile]     = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError]             = useState<string | null>(null)
  const [toast, setToast]             = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  const [createPrompt, { isLoading }]           = useCreatePromptMutation()
  const [uploadImage, { isLoading: uploading }] = useUploadPromptImageMutation()

  const isBusy  = isLoading || uploading
  const isValid = title.trim() && prompt.trim() && categories.length > 0

  const reset = () => {
    setTitle(''); setPrompt(''); setCategories([]); setTags([])
    setTagInput(''); setVisibility(true); setImageFile(null)
    setImagePreview(null); setError(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const close = () => { reset(); setOpen(false) }

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const toggleCategory = (cat: string) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = tagInput.trim().replace(/^#/, '')
      if (!val || tags.includes(val) || tags.length >= 10) { setTagInput(''); return }
      setTags((prev) => [...prev, val])
      setTagInput('')
    }
    if (e.key === 'Backspace' && !tagInput && tags.length)
      setTags((prev) => prev.slice(0, -1))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setError('Image must be under 2 MB'); return }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError(null)
  }

  const handleSubmit = async () => {
    if (!isValid || isBusy) return
    setError(null)
    try {
      let image = ''
      if (imageFile) {
        const form = new FormData()
        form.append('image', imageFile)
        const res = await uploadImage(form).unwrap()
        image = res.image
      }
      await createPrompt({
        title: title.trim(),
        prompt: prompt.trim(),
        category: categories,
        tags,
        visibility,
        image,
      }).unwrap()
      close()
      showToast()
    } catch (err: any) {
      setError(err?.data?.message ?? 'Something went wrong. Try again.')
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-[#FF6B35] hover:bg-orange-50/30 transition-all group"
      >
        <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
          <Plus className="w-4 h-4 text-[#FF6B35]" />
        </div>
        <span className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
          Share a prompt that works…
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className="pointer-events-auto w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Share a prompt</h2>
                <p className="text-xs text-gray-400 mt-0.5">Share prompts that actually work</p>
              </div>
              <button onClick={close} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4">

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  placeholder="e.g. Rewrite for clarity"
                  className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                />
                <span className="text-xs text-gray-400 text-right">{title.length}/100</span>
              </div>

              {/* Prompt */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Prompt <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={5000}
                  rows={6}
                  placeholder="Paste or write your prompt here. Be specific — the more detail, the more useful it is for others."
                  className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all resize-none leading-relaxed"
                />
                <span className="text-xs text-gray-400 text-right">{prompt.length}/5000</span>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        categories.includes(cat)
                          ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Tags</label>
                <div
                  className="flex flex-wrap gap-1.5 items-center px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#FF6B35] focus-within:bg-white transition-all cursor-text min-h-[42px]"
                  onClick={() => document.getElementById('tagInput')?.focus()}
                >
                  {tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                      #{tag}
                      <button onClick={() => setTags((p) => p.filter((t) => t !== tag))} className="text-gray-400 hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {tags.length < 10 && (
                    <input
                      id="tagInput"
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder={tags.length === 0 ? 'Type and press Enter…' : ''}
                      className="text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400 min-w-[120px] flex-1"
                    />
                  )}
                </div>
                <span className="text-xs text-gray-400">{tags.length}/10 tags</span>
              </div>

              {/* Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Cover image</label>
                {!imagePreview ? (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl py-5 hover:border-[#FF6B35] hover:bg-orange-50/20 transition-all"
                  >
                    <ImagePlus className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-400">Click to upload · PNG, JPG · max 2 MB</span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden h-36">
                    <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      onClick={() => { setImageFile(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = '' }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </div>

              {/* Visibility */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Visibility</label>
                <div className="flex gap-2">
                  {[
                    { val: true,  label: 'Public',  Icon: Globe },
                    { val: false, label: 'Private', Icon: Lock  },
                  ].map(({ val, label, Icon }) => (
                    <button
                      key={label}
                      onClick={() => setVisibility(val)}
                      className={`flex-1 flex items-center justify-center gap-2 text-xs py-2.5 rounded-xl border transition-all ${
                        visibility === val
                          ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 shrink-0">
              <p className="text-xs text-gray-400">
                <span className="text-red-400">*</span> Required fields
              </p>
              <div className="flex gap-2">
                <button
                  onClick={close}
                  className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isValid || isBusy}
                  className="flex items-center gap-1.5 text-sm px-5 py-2 rounded-xl bg-[#FF6B35] text-white font-medium hover:bg-[#e5602e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isBusy ? 'Publishing…' : 'Publish'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Success toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <span className="text-green-400">✓</span>
          Prompt published successfully!
        </div>
      )}
    </>
  )
}