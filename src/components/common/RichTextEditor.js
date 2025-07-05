import React, { useState, useEffect, useCallback } from "react";
import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from 'lexical';

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  
  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };
  
  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };
  
  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };
  
  const formatBulletList = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'ul');
  };
  
  const formatNumberedList = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'ol');
  };

  const toolbarStyle = {
    display: 'flex',
    gap: '8px',
    padding: '8px',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px 4px 0 0'
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '3px',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  return (
    <div style={toolbarStyle}>
      <button style={buttonStyle} onClick={formatBold} type="button">
        B
      </button>
      <button style={{...buttonStyle, fontStyle: 'italic'}} onClick={formatItalic} type="button">
        I
      </button>
      <button style={{...buttonStyle, textDecoration: 'underline'}} onClick={formatUnderline} type="button">
        U
      </button>
      <button style={buttonStyle} onClick={formatBulletList} type="button">
        • List
      </button>
      <button style={buttonStyle} onClick={formatNumberedList} type="button">
        1. List
      </button>
    </div>
  );
}

// Plugin to handle HTML conversion
function HTMLUpdatePlugin({ value, onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value && typeof value === 'string') {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
      });
    }
  }, [editor, value]);

  const handleChange = useCallback((editorState) => {
    editor.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      onChange(htmlString);
    });
  }, [editor, onChange]);

  return <OnChangePlugin onChange={handleChange} />;
}

export const RichTextEditor = ({ value, onChange }) => {
  const [useRichText, setUseRichText] = useState(false);
  const [textValue, setTextValue] = useState("");

  // Convert HTML to plain text
  const htmlToPlainText = useCallback((html) => {
    if (!html) return "";
    
    return html
      .replace(/<\/p>/g, "\n")
      .replace(/<p>/g, "")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<\/li>/g, "\n")
      .replace(/<li>/g, "• ")
      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "")
      .replace(/<ol>/g, "")
      .replace(/<\/ol>/g, "")
      .replace(/<strong>/g, "**")
      .replace(/<\/strong>/g, "**")
      .replace(/<em>/g, "*")
      .replace(/<\/em>/g, "*")
      .replace(/<[^>]*>/g, "")
      .replace(/\n\n+/g, "\n\n")
      .trim();
  }, []);

  // Convert plain text to HTML
  const plainTextToHtml = useCallback((text) => {
    if (!text) return "";
    
    const lines = text.split("\n");
    let html = "";
    let inList = false;
    let listType = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        if (inList) {
          html += `</${listType}>`;
          inList = false;
        }
        html += "<p><br></p>";
        continue;
      }

      if (line.match(/^[-•*]\s/)) {
        if (!inList || listType !== "ul") {
          if (inList) html += `</${listType}>`;
          html += "<ul>";
          inList = true;
          listType = "ul";
        }
        html += `<li>${line.substring(2).trim()}</li>`;
      } else if (line.match(/^\d+\.\s/)) {
        if (!inList || listType !== "ol") {
          if (inList) html += `</${listType}>`;
          html += "<ol>";
          inList = true;
          listType = "ol";
        }
        html += `<li>${line.replace(/^\d+\.\s/, "").trim()}</li>`;
      } else {
        if (inList) {
          html += `</${listType}>`;
          inList = false;
        }
        html += `<p>${line}</p>`;
      }
    }

    if (inList) {
      html += `</${listType}>`;
    }

    return html;
  }, []);

  // Initialize values when component mounts or value prop changes
  useEffect(() => {
    if (value !== undefined && value !== null) {
      const plainText = htmlToPlainText(value);
      setTextValue(plainText);
    }
  }, [value, htmlToPlainText]);

  const handleModeSwitch = () => {
    setUseRichText(!useRichText);
  };

  const handleTextChange = (newTextValue) => {
    setTextValue(newTextValue);
    const htmlValue = plainTextToHtml(newTextValue);
    onChange(htmlValue);
  };

  // Lexical editor configuration
  const initialConfig = {
    namespace: 'RichTextEditor',
    theme: {
      text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
      },
      list: {
        nested: {
          listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        listitem: 'editor-listitem',
      },
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      AutoLinkNode,
      LinkNode,
    ],
    onError: (error) => {
      console.error('Lexical Error:', error);
    },
  };

  const editorStyle = {
    minHeight: '150px',
    padding: '12px',
    border: '1px solid #ccc',
    borderTop: 'none',
    borderRadius: '0 0 4px 4px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.5',
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button
          type="button"
          onClick={handleModeSwitch}
          style={{
            padding: "5px 10px",
            fontSize: "12px",
            backgroundColor: useRichText ? "#007bff" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          {useRichText ? "Switch to Plain Text" : "Switch to Rich Text"}
        </button>
      </div>

      {useRichText ? (
        <LexicalComposer initialConfig={initialConfig}>
          <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
            <ToolbarPlugin />
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  style={editorStyle}
                  placeholder="Enter job description..."
                />
              }
              placeholder={null}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <LinkPlugin />
            <HTMLUpdatePlugin value={value} onChange={onChange} />
          </div>
          <style jsx>{`
            .editor-text-bold {
              font-weight: bold;
            }
            .editor-text-italic {
              font-style: italic;
            }
            .editor-text-underline {
              text-decoration: underline;
            }
            .editor-list-ol {
              padding-left: 20px;
            }
            .editor-list-ul {
              padding-left: 20px;
            }
            .editor-listitem {
              margin: 2px 0;
            }
            .editor-nested-listitem {
              list-style-type: none;
            }
          `}</style>
        </LexicalComposer>
      ) : (
        <textarea
          value={textValue}
          onChange={(e) => handleTextChange(e.target.value)}
          rows="8"
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.5",
            resize: "vertical",
          }}
          placeholder={`Enter job description...

Formatting tips:
• Use - or • for bullet points
• Use 1. 2. 3. for numbered lists  
• Use **bold** for emphasis
• Use *italic* for emphasis
• Press Enter twice for new paragraphs`}
        />
      )}
    </div>
  );
};