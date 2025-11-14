# Google Docs Clone

A modern, feature-rich Google Docs clone built with React, TypeScript, and Vite. This application provides a rich text editing experience with formatting options, document management, and auto-save functionality.

## Features

- **Rich Text Editing**: Full-featured contentEditable-based text editor
- **Text Formatting**: Bold, italic, underline, text color, and highlight color
- **Font Options**: Multiple font families and sizes
- **Text Alignment**: Left, center, and right alignment
- **Lists**: Bulleted and numbered lists
- **Headings**: Normal text, Heading 1, and Heading 2
- **Document Management**: Create new documents, rename documents
- **Auto-Save**: Automatic saving to localStorage
- **Modern UI**: Clean, Google Docs-inspired interface
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "google-docs-clone"
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

### Building for Production

Build the production-ready application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. **Creating a Document**: Click the menu button and select "New Document" (or use the new document button)
2. **Editing Text**: Click anywhere in the editor area and start typing
3. **Formatting**: Select text and use the toolbar buttons to apply formatting
4. **Changing Font**: Use the font family and size dropdowns in the toolbar
5. **Saving**: Documents are automatically saved to localStorage. You can also click the "Save" button manually
6. **Renaming**: Click on the document title in the header to rename it

## Keyboard Shortcuts

- **Ctrl+B** (Cmd+B on Mac): Bold
- **Ctrl+I** (Cmd+I on Mac): Italic
- **Ctrl+U** (Cmd+U on Mac): Underline

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **CSS3**: Styling with modern CSS features

## Project Structure

```
google-docs-clone/
├── src/
│   ├── components/
│   │   ├── RichTextEditor.tsx   # Main editor component
│   │   ├── Toolbar.tsx          # Formatting toolbar
│   │   └── Toolbar.css          # Toolbar styles
│   ├── App.tsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── README.md                    # This file
```

## Future Enhancements

Potential features to add:
- Real-time collaboration
- Cloud storage integration
- Export to PDF/Word
- More formatting options (tables, images, etc.)
- Undo/redo functionality
- Search and replace
- Comments and suggestions

## License

This project is open source and available under the MIT License.

