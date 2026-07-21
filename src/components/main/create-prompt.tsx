'use client'

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, ImagePlus, Send, Lock, Globe, Plus, Loader2, Upload, Sparkles } from 'lucide-react'
import {
  useCreatePromptMutation,
  useUploadPromptImageMutation,
} from '@/src/store/features/prompt/prompt.features'
import { toast } from 'react-toastify'
import { MAX_CATEGORIES,MAX_IMAGE_MB,PRESET_CATEGORIES,MAX_TAGS } from '@/src/constants/create-prompt/constant.create-prompt'





const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Max 100 chars'),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').max(5000, 'Max 5000 chars'),
  categories: z.array(z.string()).min(1, 'Select at least one category').max(MAX_CATEGORIES, `Max ${MAX_CATEGORIES} categories`),
  tags: z.array(z.string()).max(MAX_TAGS, `Max ${MAX_TAGS} tags`),
  visibility: z.boolean(),
})

type FormValues = z.infer<typeof schema>

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreatePromptBox() {
  const [open, setOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  // Tag input state (not part of RHF — managed locally, synced via Controller)
  const [tagInput, setTagInput] = useState('')

  // Custom category state
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [categoryInput, setCategoryInput] = useState('')
  const [showCategoryInput, setShowCategoryInput] = useState(false)
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  const [createPrompt, { isLoading }] = useCreatePromptMutation()
  const [uploadImage, { isLoading: uploading }] = useUploadPromptImageMutation()
  const isBusy = isLoading || uploading

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      prompt: '',
      categories: [],
      tags: [],
      visibility: true,
    },
    mode: 'onChange',
  })

  const titleValue = watch('title')
  const promptValue = watch('prompt')

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const allCategories = [...PRESET_CATEGORIES, ...customCategories]

  const hardReset = () => {
    resetForm()
    setImageFile(null)
    setImagePreview(null)
    setImageError(null)
    setApiError(null)
    setTagInput('')
    setCustomCategories([])
    setCategoryInput('')
    setShowCategoryInput(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const close = () => { hardReset(); setOpen(false) }

  // ── Category handlers ────────────────────────────────────────────────────────

  const toggleCategory = (cat: string, current: string[], onChange: (v: string[]) => void) => {
    if (current.includes(cat)) {
      onChange(current.filter((c) => c !== cat))
    } else if (current.length < MAX_CATEGORIES) {
      onChange([...current, cat])
    }
  }

  const commitCustomCategory = (current: string[], onChange: (v: string[]) => void) => {
    const val = categoryInput.trim()
    if (!val) { setCategoryInput(''); setShowCategoryInput(false); return }

    const normalized = val.charAt(0).toUpperCase() + val.slice(1)

    // Ignore if already exists (preset or custom)
    if (allCategories.map((c) => c.toLowerCase()).includes(normalized.toLowerCase())) {
      // Still select it if not already selected
      if (!current.map((c) => c.toLowerCase()).includes(normalized.toLowerCase())) {
        if (current.length < MAX_CATEGORIES) onChange([...current, normalized])
      }
      setCategoryInput('')
      setShowCategoryInput(false)
      return
    }

    setCustomCategories((prev) => [...prev, normalized])
    if (current.length < MAX_CATEGORIES) onChange([...current, normalized])
    setCategoryInput('')
    setShowCategoryInput(false)
  }

  const removeCustomCategory = (
    cat: string,
    current: string[],
    onChange: (v: string[]) => void,
  ) => {
    setCustomCategories((prev) => prev.filter((c) => c !== cat))
    onChange(current.filter((c) => c !== cat))
  }

  // ── Tag handlers ─────────────────────────────────────────────────────────────

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    current: string[],
    onChange: (v: string[]) => void,
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = tagInput.trim().replace(/^#/, '')
      if (!val || current.includes(val) || current.length >= MAX_TAGS) {
        setTagInput('')
        return
      }
      onChange([...current, val])
      setTagInput('')
    }
    if (e.key === 'Backspace' && !tagInput && current.length) {
      onChange(current.slice(0, -1))
    }
  }

  // ── Image handler ────────────────────────────────────────────────────────────

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setImageError(`Image must be under ${MAX_IMAGE_MB} MB`)
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setImageError(null)
  }


  const onSubmit = async (data: FormValues) => {
    setApiError(null)
    try {
      let image = ''
      let imagePublicId = ''

      if (imageFile) {
        const form = new FormData()
        form.append('image', imageFile)
        const res = await uploadImage(form).unwrap()
        image = res?.url;
        imagePublicId = res?.public_id;
        console.log('UPLOAD RESPONSE:', res)
      }

      await createPrompt({
        title: data.title.trim(),
        prompt: data.prompt.trim(),
        category: data.categories,
        tags: data.tags,
        visibility: data.visibility,
        image,
        imagePublicId,
      }).unwrap()

      close()
      toast.success('Prompt published successfully!')

    } catch (err: any) {
      const message = err?.data?.message ?? 'Something went wrong. Try again.'
      setApiError(message)
      toast.error(message)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Trigger */}
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
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={close} />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className="relative pointer-events-auto w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Two-phase loading overlay ── */}
            {isBusy && (
              <div className="absolute inset-0 z-10 rounded-2xl bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FF6B35]/20 border-t-[#FF6B35] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {uploading
                      ? <Upload className="w-4 h-4 text-[#FF6B35]" />
                      : <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                    }
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">
                    {uploading ? 'Uploading image…' : 'Publishing prompt…'}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {uploading ? 'Step 1 of 2' : 'Step 2 of 2 · Almost there'}
                  </p>
                </div>
              </div>
            )}
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Share a prompt</h2>
                <p className="text-xs text-gray-400 mt-0.5">Share prompts that actually work</p>
              </div>
              <button
                onClick={close}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <form
              id="create-prompt-form"
              onSubmit={handleSubmit(onSubmit)}
              className="overflow-y-auto flex-1 p-5 flex flex-col gap-4"
            >
              {/* API error */}
              {apiError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {apiError}
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  {...register('title')}
                  maxLength={100}
                  placeholder="e.g. Rewrite for clarity"
                  className={`w-full text-sm px-3 py-2.5 rounded-xl border bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${errors.title ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#FF6B35]'
                    }`}
                />
                <div className="flex items-center justify-between">
                  {errors.title
                    ? <span className="text-xs text-red-500">{errors.title.message}</span>
                    : <span />
                  }
                  <span className="text-xs text-gray-400">{titleValue.length}/100</span>
                </div>
              </div>

              {/* Prompt */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Prompt <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register('prompt')}
                  maxLength={5000}
                  rows={6}
                  placeholder="Paste or write your prompt here. Be specific — the more detail, the more useful it is for others."
                  className={`w-full text-sm px-3 py-2.5 rounded-xl border bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all resize-none leading-relaxed ${errors.prompt ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#FF6B35]'
                    }`}
                />
                <div className="flex items-center justify-between">
                  {errors.prompt
                    ? <span className="text-xs text-red-500">{errors.prompt.message}</span>
                    : <span />
                  }
                  <span className="text-xs text-gray-400">{promptValue.length}/5000</span>
                </div>
              </div>

              {/* Categories */}
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-500">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <span className="text-xs text-gray-400">{field.value.length}/{MAX_CATEGORIES}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {/* Preset categories */}
                      {PRESET_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat, field.value, field.onChange)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${field.value.includes(cat)
                              ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] font-medium'
                              : field.value.length >= MAX_CATEGORIES
                                ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-white'
                                : 'border-gray-200 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] bg-white'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}

                      {/* Custom categories */}
                      {customCategories.map((cat) => (
                        <span
                          key={cat}
                          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${field.value.includes(cat)
                              ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] font-medium'
                              : 'border-gray-200 text-gray-600 bg-white'
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat, field.value, field.onChange)}
                            className="focus:outline-none"
                          >
                            {cat}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCustomCategory(cat, field.value, field.onChange)}
                            className="text-gray-400 hover:text-red-400 transition-colors ml-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {/* Add custom category */}
                      {showCategoryInput ? (
                        <div className="flex items-center gap-1 border border-[#FF6B35] rounded-full px-2 py-1 bg-orange-50/30">
                          <input
                            ref={categoryInputRef}
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                commitCustomCategory(field.value, field.onChange)
                              }
                              if (e.key === 'Escape') {
                                setCategoryInput('')
                                setShowCategoryInput(false)
                              }
                            }}
                            onBlur={() => commitCustomCategory(field.value, field.onChange)}
                            placeholder="Category name"
                            maxLength={20}
                            autoFocus
                            className="text-xs bg-transparent outline-none text-gray-900 placeholder:text-gray-400 w-28"
                          />
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              // prevent blur from firing before click
                              e.preventDefault()
                              commitCustomCategory(field.value, field.onChange)
                            }}
                            className="text-[#FF6B35]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowCategoryInput(true)
                            setTimeout(() => categoryInputRef.current?.focus(), 0)
                          }}
                          title="Add custom category"
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-dashed border-gray-300 text-gray-400 hover:border-[#FF6B35] hover:text-[#FF6B35] bg-white transition-all"
                        >
                          <Plus className="w-3 h-3" /> Custom
                        </button>
                      )}
                    </div>

                    {errors.categories && (
                      <span className="text-xs text-red-500">{errors.categories.message}</span>
                    )}
                  </div>
                )}
              />

              {/* Tags */}
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500">Tags</label>
                    <div
                      className="flex flex-wrap gap-1.5 items-center px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#FF6B35] focus-within:bg-white transition-all cursor-text min-h-[42px]"
                      onClick={() => document.getElementById('tagInput')?.focus()}
                    >
                      {field.value.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value.filter((t) => t !== tag))}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      {field.value.length < MAX_TAGS && (
                        <input
                          id="tagInput"
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => handleTagKeyDown(e, field.value, field.onChange)}
                          placeholder={field.value.length === 0 ? 'Type and press Enter…' : ''}
                          className="text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400 min-w-[120px] flex-1"
                        />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{field.value.length}/{MAX_TAGS} tags</span>
                  </div>
                )}
              />

              {/* Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Cover image</label>
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl py-5 hover:border-[#FF6B35] hover:bg-orange-50/20 transition-all"
                  >
                    <ImagePlus className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Click to upload · PNG, JPG · max {MAX_IMAGE_MB} MB
                    </span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden h-36">
                    <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview(null)
                        if (fileRef.current) fileRef.current.value = ''
                      }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
                {imageError && (
                  <span className="text-xs text-red-500">{imageError}</span>
                )}
              </div>

              {/* Visibility */}
              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500">Visibility</label>
                    <div className="flex gap-2">
                      {([
                        { val: true, label: 'Public', Icon: Globe },
                        { val: false, label: 'Private', Icon: Lock },
                      ] as const).map(({ val, label, Icon }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => field.onChange(val)}
                          className={`flex-1 flex items-center justify-center gap-2 text-xs py-2.5 rounded-xl border transition-all ${field.value === val
                              ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] font-medium'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                            }`}
                        >
                          <Icon className="w-3.5 h-3.5" /> {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              />
            </form>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 mb-3 border-t border-gray-100 shrink-0 ">
              <p className="text-xs text-gray-400">
                <span className="text-red-400">*</span> Required fields
              </p>
              <div className="flex gap-2 sm:-mt-10">
                <button
                  type="button"
                  onClick={close}
                  className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="create-prompt-form"
                  disabled={!isValid || isBusy}
                  className="flex items-center gap-1.5 text-sm px-5 py-2 rounded-xl bg-[#FF6B35] text-white font-medium hover:bg-[#e5602e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {uploading ? 'Uploading…' : 'Publishing…'}
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Publish
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}