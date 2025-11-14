import { forwardRef, useEffect, useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  fontSize: string
  fontFamily: string
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ content, onChange, fontSize, fontFamily }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const editorRef = (ref || internalRef) as React.RefObject<HTMLDivElement>

    useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== content) {
        const selection = window.getSelection()
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null
        const startOffset = range?.startOffset || 0
        const endOffset = range?.endOffset || 0

        editorRef.current.innerHTML = content || '<br>'

        // Restore cursor position
        if (range && editorRef.current.firstChild) {
          try {
            const newRange = document.createRange()
            if (editorRef.current.firstChild.nodeType === Node.TEXT_NODE) {
              const textNode = editorRef.current.firstChild as Text
              const maxOffset = Math.min(startOffset, textNode.length)
              newRange.setStart(textNode, maxOffset)
              newRange.setEnd(textNode, Math.min(endOffset, textNode.length))
            } else {
              newRange.selectNodeContents(editorRef.current)
              newRange.collapse(true)
            }
            selection?.removeAllRanges()
            selection?.addRange(newRange)
          } catch (e) {
            // Ignore cursor restoration errors
          }
        }
      }
    }, [content])

    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.style.fontSize = fontSize
        editorRef.current.style.fontFamily = fontFamily
      }
    }, [fontSize, fontFamily])

    const handleInput = () => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML)
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
      handleInput()
    }

    return (
      <div
        ref={editorRef}
        className="rich-text-editor"
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        suppressContentEditableWarning
        style={{
          fontSize,
          fontFamily,
        }}
      />
    )
  }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor

