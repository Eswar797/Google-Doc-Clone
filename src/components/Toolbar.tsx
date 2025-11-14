import './Toolbar.css'

interface ToolbarProps {
  onFormat: (command: string, value?: string) => void
  fontSize: string
  fontFamily: string
  onFontSizeChange: (size: string) => void
  onFontFamilyChange: (family: string) => void
}

const Toolbar = ({ onFormat, fontSize, fontFamily, onFontSizeChange, onFontFamilyChange }: ToolbarProps) => {
  const fontSizes = ['10px', '11px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '72px']
  const fontFamilies = ['Arial', 'Calibri', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana']

  const handleFormat = (command: string, value?: string) => {
    onFormat(command, value)
  }

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <select
          className="toolbar-select"
          value={fontFamily}
          onChange={(e) => {
            onFontFamilyChange(e.target.value)
            handleFormat('fontName', e.target.value)
          }}
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <select
          className="toolbar-select"
          value={fontSize}
          onChange={(e) => {
            const newSize = e.target.value
            onFontSizeChange(newSize)
            
            // Apply font size to selected text or future typing
            const selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0)
              if (!range.collapsed) {
                // Text is selected - apply to selection
                document.execCommand('removeFormat', false)
                const span = document.createElement('span')
                span.style.fontSize = newSize
                try {
                  range.surroundContents(span)
                } catch {
                  // Fallback if surroundContents fails
                  const contents = range.extractContents()
                  span.appendChild(contents)
                  range.insertNode(span)
                }
              } else {
                // No selection - will apply to future typing via editor style
                document.execCommand('removeFormat', false)
              }
            }
            
            // Trigger onChange to update content
            const editor = document.querySelector('.rich-text-editor') as HTMLElement
            if (editor) {
              const event = new Event('input', { bubbles: true })
              editor.dispatchEvent(event)
            }
          }}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size.replace('px', '')}
            </option>
          ))}
        </select>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={() => handleFormat('bold')}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('italic')}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('underline')}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={() => handleFormat('foreColor', '#000000')}
          title="Text Color"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 15L10 5L15 15" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="7" y1="12" x2="13" y2="12" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('backColor', '#ffff00')}
          title="Highlight Color"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 17L17 3" strokeLinecap="round"/>
            <path d="M7 3L17 3L17 13" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={() => handleFormat('justifyLeft')}
          title="Align Left"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="5" x2="17" y2="5" strokeLinecap="round"/>
            <line x1="3" y1="10" x2="17" y2="10" strokeLinecap="round"/>
            <line x1="3" y1="15" x2="17" y2="15" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('justifyCenter')}
          title="Align Center"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="15" y2="5" strokeLinecap="round"/>
            <line x1="3" y1="10" x2="17" y2="10" strokeLinecap="round"/>
            <line x1="5" y1="15" x2="15" y2="15" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('justifyRight')}
          title="Align Right"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="5" x2="17" y2="5" strokeLinecap="round"/>
            <line x1="7" y1="10" x2="17" y2="10" strokeLinecap="round"/>
            <line x1="3" y1="15" x2="17" y2="15" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={() => handleFormat('insertUnorderedList')}
          title="Bullet List"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="4" cy="5" r="1.5"/>
            <circle cx="4" cy="10" r="1.5"/>
            <circle cx="4" cy="15" r="1.5"/>
            <line x1="7" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('insertOrderedList')}
          title="Numbered List"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4h1M3 4v1m1-1h1M5 4H3" strokeLinecap="round"/>
            <line x1="7" y1="4" x2="17" y2="4" strokeLinecap="round"/>
            <path d="M3 9h1M3 10h1" strokeLinecap="round"/>
            <line x1="7" y1="9.5" x2="17" y2="9.5" strokeLinecap="round"/>
            <path d="M3 14h1M3 15h1M3 16h1" strokeLinecap="round"/>
            <line x1="7" y1="15" x2="17" y2="15" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={() => handleFormat('formatBlock', '<div>')}
          title="Normal Text"
        >
          <span style={{ fontSize: '12px' }}>Normal</span>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('formatBlock', '<h1>')}
          title="Heading 1"
        >
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>H1</span>
        </button>
        <button
          className="toolbar-button"
          onClick={() => handleFormat('formatBlock', '<h2>')}
          title="Heading 2"
        >
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>H2</span>
        </button>
      </div>
    </div>
  )
}

export default Toolbar

