interface FeedbackOverlayProps {
  message: string | null
  tone?: 'positive' | 'neutral'
}

export function FeedbackOverlay({ message, tone = 'positive' }: FeedbackOverlayProps) {
  if (!message) {
    return null
  }

  return (
    <div className={`feedback-overlay feedback-overlay--${tone}`} role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  )
}
