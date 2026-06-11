export function redirectWithParams(path: string) {
  if (typeof window === "undefined") return

  try {
    const current = new URL(window.location.href)
    const target = new URL(path, current.origin)

    const currentParams = new URLSearchParams(current.search)
    const targetParams = new URLSearchParams(target.search)

    // Preserve query params from current location unless target already defines them
    for (const [key, value] of currentParams) {
      if (!targetParams.has(key)) targetParams.append(key, value)
    }

    target.search = targetParams.toString()
    window.location.href = target.toString()
  } catch (err) {
    // Fallback: navigate directly
    window.location.href = path
  }
}
