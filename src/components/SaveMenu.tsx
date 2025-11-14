import { useState, useRef, useEffect } from 'react'
import './SaveMenu.css'

interface SaveMenuProps {
  onSave: () => void
  onDownloadHTML: () => void
  onDownloadText: () => void
  onDownloadJSON: () => void
  isSaved: boolean
}

const SaveMenu = ({ onSave, onDownloadHTML, onDownloadText, onDownloadJSON, isSaved }: SaveMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSave = () => {
    onSave()
    setIsOpen(false)
  }

  const handleDownloadHTML = () => {
    onDownloadHTML()
    setIsOpen(false)
  }

  const handleDownloadText = () => {
    onDownloadText()
    setIsOpen(false)
  }

  const handleDownloadJSON = () => {
    onDownloadJSON()
    setIsOpen(false)
  }

  const handleMainButtonClick = () => {
    if (!isSaved) {
      // If not saved, save directly
      handleSave()
    } else {
      // If saved, toggle dropdown
      setIsOpen(!isOpen)
    }
  }

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div className="save-menu-container" ref={menuRef}>
      <div className="save-button-wrapper">
        <button
          className={`save-button ${isSaved ? 'saved' : ''}`}
          onClick={handleMainButtonClick}
        >
          {isSaved ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 4L6 11L3 8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="saved-indicator">Saved</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 13V9C4 8.44772 4.44772 8 5 8H11C11.5523 8 12 8.44772 12 9V13M4 13H2C1.44772 13 1 12.5523 1 12V2C1 1.44772 1.44772 1 2 1H8L13 6V12C13 12.5523 12.5523 13 12 13H4Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 1V6H13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="save-text">Save</span>
            </>
          )}
        </button>
        <button
          className={`dropdown-arrow-button ${isOpen ? 'open' : ''}`}
          onClick={handleArrowClick}
          aria-label="Save options"
        >
          <svg 
            className="dropdown-arrow" 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="save-menu-dropdown">
          <button className="save-menu-item" onClick={handleSave}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 13.5V10.5C4.5 9.67157 5.17157 9 6 9H12C12.8284 9 13.5 9.67157 13.5 10.5V13.5M4.5 13.5H2.25C1.42157 13.5 0.75 12.8284 0.75 12V2.25C0.75 1.42157 1.42157 0.75 2.25 0.75H9L13.5 5.25V12C13.5 12.8284 12.8284 13.5 12 13.5H4.5Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 0.75V5.25H13.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="menu-item-title">Save to Browser</div>
              <div className="menu-item-desc">Save to local storage</div>
            </div>
          </button>

          <div className="save-menu-divider"></div>

          <button className="save-menu-item" onClick={handleDownloadHTML}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1.5 9V14.25C1.5 15.0784 2.17157 15.75 3 15.75H15C15.8284 15.75 16.5 15.0784 16.5 14.25V9M9 12.75V2.25M9 12.75L6 9.75M9 12.75L12 9.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="menu-item-title">Download as HTML</div>
              <div className="menu-item-desc">Save as HTML file</div>
            </div>
          </button>

          <button className="save-menu-item" onClick={handleDownloadText}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1.5 9V14.25C1.5 15.0784 2.17157 15.75 3 15.75H15C15.8284 15.75 16.5 15.0784 16.5 14.25V9M9 12.75V2.25M9 12.75L6 9.75M9 12.75L12 9.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="menu-item-title">Download as Text</div>
              <div className="menu-item-desc">Save as plain text file</div>
            </div>
          </button>

          <button className="save-menu-item" onClick={handleDownloadJSON}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1.5 9V14.25C1.5 15.0784 2.17157 15.75 3 15.75H15C15.8284 15.75 16.5 15.0784 16.5 14.25V9M9 12.75V2.25M9 12.75L6 9.75M9 12.75L12 9.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="menu-item-title">Download as JSON</div>
              <div className="menu-item-desc">Export full document data</div>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default SaveMenu

