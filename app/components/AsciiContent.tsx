import React from 'react';

interface AsciiContentProps {
  content: string;
}

const AsciiContent: React.FC<AsciiContentProps> = ({ content }) => {
  // Split the content by newlines to render each line properly
  const lines = content.split('\n');
  
  return (
    <pre className="ascii-stats">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </pre>
  );
};

export default AsciiContent;
