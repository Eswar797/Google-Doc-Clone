import { useState, useCallback, useRef, useEffect } from 'react'
import RichTextEditor from './components/RichTextEditor'
import Toolbar from './components/Toolbar'
import SaveMenu from './components/SaveMenu'
import './App.css'

function App() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const [documentTitle, setDocumentTitle] = useState<string>('Untitled Document')
  const [fontSize, setFontSize] = useState<string>('14px')
  const [fontFamily, setFontFamily] = useState<string>('Arial')
  const [isSaved, setIsSaved] = useState<boolean>(true)

  // Load document from localStorage on mount
  useEffect(() => {
    const savedDoc = localStorage.getItem('google-docs-clone-doc')
    if (savedDoc) {
      try {
        const doc = JSON.parse(savedDoc)
        setContent(doc.content || '')
        setDocumentTitle(doc.title || 'Untitled Document')
        setFontSize(doc.fontSize || '14px')
        setFontFamily(doc.fontFamily || 'Arial')
      } catch (e) {
        console.error('Error loading document:', e)
      }
    }
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (content !== '') {
      const doc = {
        content,
        title: documentTitle,
        fontSize,
        fontFamily,
      }
      localStorage.setItem('google-docs-clone-doc', JSON.stringify(doc))
      setIsSaved(true)
    }
  }, [content, documentTitle, fontSize, fontFamily])

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)
    setIsSaved(false)
  }, [])

  const handleSave = useCallback(() => {
    const doc = {
      content,
      title: documentTitle,
      fontSize,
      fontFamily,
    }
    localStorage.setItem('google-docs-clone-doc', JSON.stringify(doc))
    setIsSaved(true)
  }, [content, documentTitle, fontSize, fontFamily])

  const handleFormat = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
      setIsSaved(false)
    }
  }, [])

  const handleNewDocument = useCallback(() => {
    if (confirm('Create a new document? Unsaved changes will be lost.')) {
      setContent('')
      setDocumentTitle('Untitled Document')
      setFontSize('14px')
      setFontFamily('Arial')
      setIsSaved(true)
      if (editorRef.current) {
        editorRef.current.innerHTML = ''
        editorRef.current.focus()
      }
    }
  }, [])

  const handleDownloadHTML = useCallback(() => {
    // Convert HTML content to a full HTML document
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentTitle}</title>
    <style>
        body {
            font-family: ${fontFamily};
            font-size: ${fontSize};
            line-height: 1.5;
            max-width: 816px;
            margin: 0 auto;
            padding: 48px 96px;
            color: #202124;
        }
        h1 {
            font-size: 32px;
            font-weight: 400;
            line-height: 1.2;
            margin: 20px 0 16px 0;
        }
        h2 {
            font-size: 24px;
            font-weight: 400;
            line-height: 1.2;
            margin: 18px 0 12px 0;
        }
        ul, ol {
            margin: 12px 0;
            padding-left: 32px;
        }
        li {
            margin: 4px 0;
        }
        p {
            margin: 0 0 12px 0;
        }
    </style>
</head>
<body>
    <h1>${documentTitle}</h1>
    ${content || '<p></p>'}
</body>
</html>`
    
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${documentTitle || 'document'}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setIsSaved(true)
  }, [content, documentTitle, fontSize, fontFamily])

  const handleDownloadText = useCallback(() => {
    // Strip HTML tags and convert to plain text
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const plainText = tempDiv.textContent || tempDiv.innerText || ''
    
    const blob = new Blob([plainText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${documentTitle || 'document'}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setIsSaved(true)
  }, [content, documentTitle])

  const handleDownloadJSON = useCallback(() => {
    const doc = {
      title: documentTitle,
      content,
      fontSize,
      fontFamily,
      exportedAt: new Date().toISOString(),
    }
    
    const jsonContent = JSON.stringify(doc, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${documentTitle || 'document'}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setIsSaved(true)
  }, [content, documentTitle, fontSize, fontFamily])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <button className="menu-button" onClick={handleNewDocument}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="document-info">
            <input
              type="text"
              className="document-title"
              value={documentTitle}
              onChange={(e) => {
                setDocumentTitle(e.target.value)
                setIsSaved(false)
              }}
              placeholder="Untitled Document"
            />
          </div>
        </div>
        <div className="header-right">
          <SaveMenu
            onSave={handleSave}
            onDownloadHTML={handleDownloadHTML}
            onDownloadText={handleDownloadText}
            onDownloadJSON={handleDownloadJSON}
            isSaved={isSaved}
          />
        </div>
      </header>
      
      <Toolbar
        onFormat={handleFormat}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onFontSizeChange={setFontSize}
        onFontFamilyChange={setFontFamily}
      />
      
      <div className="editor-container">
        <RichTextEditor
          ref={editorRef}
          content={content}
          onChange={handleContentChange}
          fontSize={fontSize}
          fontFamily={fontFamily}
        />
      </div>
    </div>
  )
}

export default App

