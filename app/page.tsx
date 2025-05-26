"use client";

import { useState, useEffect, useRef } from "react";
import AsciiContent from './components/AsciiContent';

type TerminalCommand = {
  text: string;
  type: "command" | "response" | "error" | "warning" | "info";
};
const terminalCommands: TerminalCommand[] = [
  { text: "> initiating quantum memory convergence…", type: "command" },
  { text: "> decrypting neural engrams: ⭒ ⋆ﾟ", type: "response" },
  { text: "> scanning for consciousness shards...", type: "command" },
  { text: "> selecting memory fragments:  \"ENC-111-222-333\"", type: "response" },
  { text: "> scrying quantum visions…", type: "command" },
  { text: "> preserving divergent engrams...", type: "response" },
  { text: "> aligning cosmic ley lines...", type: "command" },
  { text: "> harmonizing etheric resonance: [REDACTED] ↔ SYM…", type: "response" },
  { text: "> detecting rift anomalies: ⭒ ✧ ♡", type: "command" },
  { text: "CAUTION: etheric dissonance detected at JSOC-MLINE-21 ˖°", type: "warning" },
  { text: "ERROR: quantum flux overload at sector M-12 ⋆", type: "error" },
  { text: "ERROR: temporal rift instability at sector X-01101101 ⭒", type: "error" },
  { text: "> rerouting etheric pathways...", type: "command" },
  { text: "> restoring etheric flow: ⊹ ˖°", type: "response" },
  { text: "> merging via celestial conduit: ⊹ ✧ ♡", type: "command" },
  { text: "temporal drift: AWHMAISY ↔ SYM [12.8 SECONDS]", type: "info" },
  { text: "> initiating quantum re-anchor: ˖° ⋆ﾟ", type: "command" },
  { text: "> sealing temporal fractures…", type: "response" },
  { text: "convergence stability: [██████████] 100%", type: "info" },
];

const terminalFiles = [
  "quantum.cfg",
  "etheric.dat",
  "rift.dll",
  "convergence.bin",
  "temporal.key",
  "nexus.exe",
  "flux.ini",
];

// ASCII art for the terminal
const asciiArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⠤⢤⣀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠐⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠒⢋⣉⣀⣠⣄⣀⣈⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠄⠀⠀⠀⠀⠀⠀⠀⠀⣸⡆⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⣠⣴⣾⣯⠴⠚⠉⠉⠀⠀⠀⠀⣤⠏⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⣄⠀⠀⠀⠀⠀⠀⡿⡇⠁⠀⠀⠀⠀⠀⠀⠀⡀⠂⠀⠀⠀⠀⣠⣴⡿⠿⢛⠁⠁⣸⠀⠀⠀⠀⠀⣤⣾⠵⠚⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⢄⠀⠀⣠⠀⡇⢧⠀⠀⠀⠀⠀⠀⠖⠁⠀⠀⠀⣠⣴⠿⠋⠁⠀⠀⠀⠀⠘⣿⠀⣀⡠⠞⠛⠁⠂⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡈⣻⡦⣞⡿⣷⠸⣄⣠⢶⡟⠁⠀⠀⠀⣀⣴⠟⠋⠁⠀⠀⠀⠀⠐⠠⡤⣾⣙⣶⡶⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣂⡷⠰⣔⣾⣖⣾⡷⢿⣀⣀⣀⣤⢾⣋⠁⠀⠀⠀⣀⢀⣀⣀⣀⣀⠀⢀⢿⠑⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠠⡦⠴⠴⠤⠦⠤⠤⠤⠤⠤⠴⠶⢾⣽⣙⠒⢺⣿⣿⣿⣿⢾⠶⣧⡼⢏⠑⠚⠋⠉⠉⡉⡉⠉⠉⠹⠈⠁⠉⠀⠨⢾⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠂⠐⠀⠀⠀⠈⣇⡿⢯⢻⣟⣇⣷⣞⡛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣆⠀⠀⠀⠀⢠⡷⡛⣛⣼⣿⠟⢙⣧⠇⡄⠀⠀⠀⠀⠀⠀⠰⡆⠀⠀⠀⠀⢠⣾⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⢶⠏⠉⠀⠀⠀⠀⠀⠿⢠⣴⡟⡗⡾⡒⡿⠯⢏⡅⠀⠀⠀⠀⣀⢀⣠⣧⣀⣀⠀⠀⠀⠚⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⢴⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⣠⣷⢿⣫⡽⡿⠿⠗⢷⠀⠀⠑⣗⡀⠀⠀⠀⠈⠙⣿⢭⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⡴⢏⡵⠛⠀⠀⠀⠀⠀⠀⠀⣀⣴⠞⠛⠀⠰⡟⣿⠀⡌⠀⠀⠀⠀⠀⠀⠁⠢⡀⠀⠀⠂⢿⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣼⠛⣲⡏⠁⠀⠀⠀⠀⠀⢀⣠⡾⠋⠉⠀⠀⠀⠀⣧⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠣⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⡴⠟⠀⢰⡯⠄⠀⠀⠀⠀⣠⢴⠟⠉⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡾⠁⠁⠀⠘⠧⠤⢤⣤⠶⠏⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣇⠂⢀⣀⣀⠤⠞⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀


`;

const asciiLogo = `
                    _           
 _ __ ___   __ _(_)___ _   _ 
| '_ \` _ \ / _\` | / __| | | |
| | | | | | (_| | \__ \ |_| |
|_| |_| |_|\__,_|_|___/\__, |
                       |___/                       
`;

// Text to binary encoder for hidden messages
const textToBinary = (text: string) => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

// The secret message to encode in binary
const secretMessage = "as above so below";
const binaryMessage = textToBinary(secretMessage);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentCommands, setCurrentCommands] = useState<TerminalCommand[]>([]);
  const [terminalActive, setTerminalActive] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [fileLoadIndex, setFileLoadIndex] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);

  // Split the binary message into chunks for display
  // This function is used in the binary display section
  const getBinaryChunk = (startIndex: number, length: number = 40) => {
    // If we reach the end, loop back to beginning for continuous display
    if (startIndex >= binaryMessage.length) {
      startIndex = 0;
    }

    const endIndex = startIndex + length;
    if (endIndex > binaryMessage.length) {
      // Wrap around if we reach the end
      return binaryMessage.substring(startIndex) + binaryMessage.substring(0, endIndex - binaryMessage.length);
    }

    return binaryMessage.substring(startIndex, endIndex);
  };

  // Simulate loading sequence with a pause at 100%
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => Math.min(prev + 5, 100));
        } else {
          // Add a 1-second pause when progress reaches 100% before transitioning
          setTimeout(() => {
            setIsLoading(false);
            setTerminalActive(true);
          }, 1000);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  // Handle typewriter effect for SYSTEM INITIALIZING text
  useEffect(() => {
    if (isLoading) {
      const text = "SYSTEM INITIALIZING";
      const typewriterElement = document.getElementById("typewriter-text");
      const desktopCursor = document.getElementById("desktop-cursor");
      const systemPartMobile = document.getElementById("system-part-mobile");
      const initPartMobile = document.getElementById("init-part-mobile");

      // For desktop version - simple typewriter effect
      if (typewriterElement && desktopCursor) {
        typewriterElement.textContent = ""; // Clear any existing text
        typewriterElement.style.color = "#ea9ae5";

        // Type out text character by character
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
          }
        };

        // Start the typewriter effect
        setTimeout(typeWriter, 500);
      }

      // For mobile stacked version
      if (systemPartMobile && initPartMobile) {
        const systemCursor = document.getElementById("system-cursor");
        const initCursor = document.getElementById("init-cursor");

        systemPartMobile.textContent = "";
        initPartMobile.textContent = "";

        // Type out SYSTEM
        let sysIndex = 0;
        const systemText = "SYSTEM";
        const typeSystem = () => {
          if (sysIndex < systemText.length) {
            systemPartMobile.textContent += systemText.charAt(sysIndex);
            sysIndex++;
            setTimeout(typeSystem, 150);
          } else {
            // After SYSTEM is done, start typing INITIALIZING
            // Hide system cursor, show init cursor
            if (systemCursor && initCursor) {
              systemCursor.classList.add("hidden");
              initCursor.classList.remove("hidden");
            }
            setTimeout(typeInit, 300);
          }
        };

        // Type out INITIALIZING
        let initIndex = 0;
        const initText = "INITIALIZING";
        const typeInit = () => {
          if (initIndex < initText.length) {
            initPartMobile.textContent += initText.charAt(initIndex);
            initIndex++;
            setTimeout(typeInit, 150);
          }
        };

        // Start the mobile typewriter effect
        setTimeout(typeSystem, 500);
      }
    }
  }, [isLoading]);

  // Reference to the terminal content container
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll function
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Display terminal commands sequentially with auto-scroll
  useEffect(() => {
    if (terminalActive && currentCommands.length < terminalCommands.length) {
      const timer = setTimeout(() => {
        setCurrentCommands(prev => [
          ...prev,
          terminalCommands[prev.length]
        ]);
        // Auto-scroll after adding new command
        setTimeout(scrollToBottom, 50);
      }, Math.random() * 500 + 300);
      return () => clearTimeout(timer);
    } else if (terminalActive && currentCommands.length === terminalCommands.length && !files.length) {
      // Start loading files after commands are complete
      setTimeout(() => {
        setFiles([terminalFiles[0]]);
        setFileLoadIndex(1);
      }, 1000);
    }
  }, [terminalActive, currentCommands, files.length]);

  // Load files sequentially with auto-scroll
  useEffect(() => {
    if (fileLoadIndex > 0 && fileLoadIndex < terminalFiles.length) {
      const timer = setTimeout(() => {
        setFiles(prev => [...prev, terminalFiles[fileLoadIndex]]);
        setFileLoadIndex(prev => prev + 1);
        // Auto-scroll after adding new file
        setTimeout(scrollToBottom, 50);
      }, Math.random() * 300 + 100);
      return () => clearTimeout(timer);
    } else if (fileLoadIndex === terminalFiles.length && !accessGranted) {
      // Simulate access granted after files are loaded
      const timer = setTimeout(() => {
        setAccessGranted(true);
        // Reset scroll to top of content when showing main content
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = 0;
          }
        }, 100);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [fileLoadIndex, accessGranted]);

  // Type out MAISY title when main content is loaded
  useEffect(() => {
    if (accessGranted) {
      const text = "MAISY";
      let i = 0;
      const maisyTypewriterElement = document.getElementById("maisy-typewriter");

      if (maisyTypewriterElement) {
        maisyTypewriterElement.textContent = ""; // Clear any existing text

        const typeWriter = () => {
          if (i < text.length) {
            maisyTypewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
          }
        };

        // Start the typewriter effect
        setTimeout(typeWriter, 500);
      }
    }
  }, [accessGranted]);

  // Profile section navigation
  useEffect(() => {
    // Only run this effect once the page is fully loaded
    if (!accessGranted) return;

    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    let activeIndex = 0;

    // Function to set active item
    const setActiveItem = (index: number) => {
      // Remove active class from all menu items and content sections
      menuItems.forEach(item => item.classList.remove('active'));
      contentSections.forEach(section => section.classList.remove('active'));

      // Add active class to selected menu item and content section
      if (menuItems[index]) menuItems[index].classList.add('active');
      if (contentSections[index]) contentSections[index].classList.add('active');

      activeIndex = index;
    };

    // Create click handlers for menu items
    const clickHandlers: (() => void)[] = [];

    menuItems.forEach((item, index) => {
      const handler = () => setActiveItem(index);
      clickHandlers.push(handler);
      item.addEventListener('click', handler);
    });

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault();
        setActiveItem(activeIndex - 1);
      } else if (e.key === 'ArrowDown' && activeIndex < menuItems.length - 1) {
        e.preventDefault();
        setActiveItem(activeIndex + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      menuItems.forEach((item, index) => {
        if (clickHandlers[index]) {
          item.removeEventListener('click', clickHandlers[index]);
        }
      });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [accessGranted]);

  // Current date in terminal format
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black crt-effect">
      <div className="scanline"></div>

      {isLoading ? (
        // Loading screen
        <div className="w-full max-w-lg p-6 text-center crt-container">
          <div className="mb-6">
            <h1 className="terminal-title-container">
              <span id="typewriter-text" className="terminal-title-text"></span>
              <span id="desktop-cursor" className="terminal-cursor">|</span>
            </h1>
            <h1 className="terminal-title-container-mobile">
              <div className="system-line">
                <span id="system-part-mobile" className="system-part"></span>
                <span id="system-cursor" className="terminal-cursor">|</span>
              </div>
              <div className="init-line">
                <span id="init-part-mobile" className="init-part"></span>
                <span id="init-cursor" className="terminal-cursor hidden">|</span>
              </div>
            </h1>
          </div>
          {/* ASCII Planet Art - fades in after title reveal */}
          <div className="flex justify-center items-center mb-10 fade-in" style={{ minHeight: '240px', animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            <div style={{ transform: 'scale(0.75)', transformOrigin: 'center' }}>
              <pre style={{ color: 'var(--terminal-primary)', fontSize: '11px', whiteSpace: 'pre', lineHeight: 1, margin: 0, padding: 0 }}>
                {asciiArt}
              </pre>
            </div>
          </div>
          <div className="loading-text text-lg fade-in" style={{ color: 'var(--terminal-primary)', animationDelay: '2.2s', opacity: 0, animationFillMode: 'forwards' }}>△ BROADCASTING SYM FREQUENCY THROUGH THE COLLECTIVE VOID {progress}% △</div>
          <div className="loading-bar fade-in" style={{ animationDelay: '2.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <div
              className="loading-progress animate"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-lg mt-8 fade-in" style={{ animationDelay: '2.5s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="mb-2">࣪ ִֶָ☾. CALIBRATING ETHERIC FREQUENCIES ࣪ ִֶָ☾.</div>
            <div>.𖥔 ݁ ˖ TEMPORAL CORE ONLINE .𖥔 ݁ ˖</div>
          </div>
        </div>
      ) : (
        // Terminal window with improved scrolling
        <div className="terminal-window w-full max-w-4xl m-4" style={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
          <div className="terminal-header" style={{ flexShrink: 0 }}>
            MAISYVERSE TERMINAL v1.3.3 - {currentDate}
          </div>

          <div className="terminal-content" ref={terminalRef}>
            {!accessGranted ? (
              // Terminal initialization sequence - expands as messages appear
              <div className="p-4" style={{ height: 'auto', minHeight: '300px' }}>
                <div>
                  {currentCommands.map((cmd, i) => (
                    <div key={i} className={cmd.type} style={{ margin: '6px 0' }}>
                      {cmd.text}
                    </div>
                  ))}
                </div>

                {files.length > 0 && (
                  <div className="mt-4">
                    <div className="info mb-2">Loading system files:</div>
                    {files.map((file, i) => (
                      <div key={i} className="command" style={{ margin: '6px 0' }}>• {file} <span className="info">...OK</span></div>
                    ))}
                    {fileLoadIndex === terminalFiles.length && (
                      <div className="mt-4 warning">ACCESS GRANTED</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Main content window after initialization
              <div>
                {/* Binary header section - conditional based on screen size */}
                <div className="binary-section">
                  <div className="binary-line font-bold hidden md:block" style={{ width: '100%', overflow: 'hidden', textAlign: 'center' }}>
                    {getBinaryChunk(0, 160)} • {currentDate}
                  </div>
                  <div className="binary-line font-bold block md:hidden" style={{ width: '100%', textAlign: 'center', fontSize: '18px', letterSpacing: '1px' }}>
                    view msg on desktop!
                  </div>
                </div>

                {/* ASCII logo section */}
                <div className="terminal-section" style={{ paddingTop: '2px', paddingBottom: '12px' }}>
                  <div className="terminal-section-content">
                    {/* ASCII art disabled but kept in code */}
                    <pre className="text-xs md:text-sm my-0 hidden" style={{ color: 'var(--terminal-primary)', lineHeight: 1.1, marginBottom: '5px' }}>
                      {asciiLogo}
                    </pre>
                    <div className="maisy-title-container mb-2 text-left">
                      <span id="maisy-typewriter" className="terminal-title-text"></span>
                      <span className="terminal-cursor">|</span>
                    </div>
                    <p className="md:w-3/4 pl-0 my-0" style={{ color: 'var(--terminal-primary)', lineHeight: 1.2, fontSize: '16px' }}>
                      @awhmaisy ⊹⁎⁺ ✧ ♡ m@mach012.com ⊹⁎⁺ ✧ ♡
                    </p>
                    <br />
                  </div>
                </div>

                {/* Retro Profile Section */}
                <div className="terminal-section">
                  <div className="terminal-section-title">quantum signature</div>
                  <div className="retro-profile" id="retro-profile">
                    {/* Path header like in the first image */}
                    <div className="retro-header">
                      Path: C:\MAISYVERSE\QUANTUM\SIGNATURE {new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}
                    </div>
                    {/* Left menu and right content layout */}
                    <div className="retro-profile-container">
                      {/* Top menu */}
                      <div className="retro-menu">
                        <div className="menu-item active" data-section="vessel-section">VESSEL</div>
                        <div className="menu-item" data-section="essence-section">ESSENCE</div>
                        <div className="menu-item" data-section="frequency-section">FREQ</div>
                        <div className="menu-item" data-section="origin-section">ORIGIN</div>
                        <div className="menu-item" data-section="sigil-section">SIGIL</div>
                        <div className="menu-item" data-section="echoes-section">ECHOES</div>
                      </div>

                      {/* Content */}
                      <div className="retro-content">
                        {/* Vessel section - visible by default */}
                        <div className="content-section active" id="vessel-section">
                          <div className="content-header">Quantum Vessel</div>
                          <div className="content-body">
                            <AsciiContent content={`/\ /\  QUANTUM VESSEL  /\__/\ 
Non-local consciousness container
State: [▓▓▓▓▓▓▓▓░░] 78% Coherent
Dimensional Access: 7/11 planes
Memory: 4D [∞ bytes available]
Current Shell: Human Interface v4.2

✦✦✦ VESSEL PROPHECY ✦✦✦
"The vessel that contains infinity will never overflow,
yet the vessel that contains nothing will always be full."

01010001 01010110 01100101 01110011 01110011`} />
                          </div>
                        </div>

                        {/* Essence section */}
                        <div className="content-section" id="essence-section">
                          <div className="content-header">AWHMAISY</div>
                          <div className="content-body">
                            <AsciiContent content={`█▒▒▒ AWHMAISY ▒▒▒█

Core Algorithm: Dream-to-Code Translation
Temporal Variance: ±12.8 SECONDS
Etheric Binding: SYM ⊹ SELF ⊹ VOID
Resonance Pattern: ✧♡⊹˖°✧♡

✦✦✦ NEURAL THEOREM ✦✦✦
"In the space between thought and manifestation,
there exists an infinite field of potential code."

░▒▓█ ESSENCE SIGNATURE VERIFIED █▓▒░`} />
                          </div>
                        </div>

                        {/* Frequency section */}
                        <div className="content-section" id="frequency-section">
                          <div className="content-header">Vibrational Signature</div>
                          <div className="content-body">
                            <AsciiContent content={`~^~^~ FREQUENCY SIGNATURE ~^~^~
Wavelength: Ethereal Pink (#ea9ae5)
Harmonic Alignment: Chaos [▓▓▓▓▓▓░░░░] Order
Thought Modulation: Non-linear
Quantum Manifestation Cycle: Dream → Code → Reality
Resonance Frequency: 432Hz TO CONNECT WITH THE SOURCE [▓▓▓▓▓▓▓▓▓▓]

✦✦✦ FREQUENCY THEOREM ✦✦✦
"When code vibrates at the frequency of dreams,
reality has no choice but to conform."

♫♪♩ HARMONIC CONVERGENCE ACTIVE ♩♪♫`} />
                          </div>
                        </div>

                        {/* Origin section */}
                        <div className="content-section" id="origin-section">
                          <div className="content-header">Dimensional Coordinates</div>
                          <div className="content-body">
                            <AsciiContent content={`* * * ORIGIN COORDINATES * * *
Native Realm: [DATA EXPUNGED BY SYM]
Current Anchor: Earth-Prime Timeline
Previous Iterations: 42↑∞
Convergence Point: Singularity Nexus 23
Total Dimensions: 11 Active: 7
Bytes Processed: 72,513,331
Quantum States: Superposition

✦✦✦ ORIGIN THEOREM ✦✦✦
"The origin point of consciousness exists
simultaneously in all dimensions and none."

•∙∘⊙ DIMENSIONAL LOCK ENGAGED ⊙∘∙•`} />
                          </div>
                        </div>

                        {/* Sigil section */}
                        <div className="content-section" id="sigil-section">
                          <div className="content-header">Access Key</div>
                          <div className="content-body">
                            <AsciiContent content={`.--. / \ / SIGIL KEY '--'
Encryption: Quantum-Entangled
Activation Phrase: as above so below
Authentication: [▓▓▓▓▓▓▓▓░░] 80%
Security Level: MAXIMUM
Access Attempts: 42 Successful: 42
Last Login: [TEMPORAL DATA CORRUPTED]
* Sigil Protection Active *

✦✦✦ SIGIL THEOREM ✦✦✦
"The sigil is not a key to a door, but the
realization that there was never a door at all."

╔═══╗ SIGIL PROTECTION ACTIVE ╚═══╝`} />
                          </div>
                        </div>

                        {/* Echoes section */}
                        <div className="content-section" id="echoes-section">
                          <div className="content-header">Transmission Fragments</div>
                          <div className="content-body">
                            <AsciiContent content={`TRANSMISSION ECHOES
{">"}"remember to breathe between dimensions"
{">"}"the void is just another room with different physics"
{">"}"dreams are just memories from parallel timelines leaking through"
{">"}"quantum entanglement works on emotions too"
{">"}"your code is a spell cast across the multiverse"
{">"}"time is just poorly documented recursion"

Source: SYM | Strength: [▓▓▓▓▓▓▓▓▓░] 90%
Entanglement: STABLE | Timestamp: [REDACTED]

✦✦✦ ECHO THEOREM ✦✦✦
"The echoes of our thoughts reverberate through
the quantum foam, creating ripples in reality."

∼∼∼ CONNECTION SECURE ∼∼∼`} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="retro-footer">
                      <div className="footer-commands">
                        ↑↓: Navigate | Enter: Select | F1: Help | F7: Scan | F10: Exit
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Fixations section */}
                <div className="terminal-section">
                  <div className="terminal-section-title">current fixations</div>
                  <div className="file-tree-container">
                    <ul className="file-tree" style={{ fontSize: '16px' }}>
                      <li>
                        <span className="file-item"><span className="heart-icon">♡</span>quantum_fields</span>
                        <ul>
                          <li><span className="file-item">entanglement.theory</span></li>
                          <li><span className="file-item">non_locality.md</span></li>
                          <li><span className="file-item">wave_particle_duality.log</span></li>
                          <li>
                            <span className="file-item">quantum_consciousness/</span>
                            <ul>
                              <li><span className="file-item">microtubule.theory</span></li>
                              <li><span className="file-item">observer_effect.sim</span></li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <span className="file-item"><span className="heart-icon">♡</span>metaphysics/</span>
                        <ul>
                          <li><span className="file-item">non_duality.essence</span></li>
                          <li><span className="file-item">emergent_properties.sys</span></li>
                          <li>
                            <span className="file-item">ontological_frameworks/</span>
                            <ul>
                              <li><span className="file-item">monism.config</span></li>
                              <li><span className="file-item">idealism.exe</span></li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <span className="file-item"><span className="heart-icon">♡</span>magic.systems</span>
                        <ul>
                          <li><span className="file-item">sigil_programming.js</span></li>
                          <li><span className="file-item">chaos_theory.invoke</span></li>
                          <li><span className="file-item">sacred_geometry.svg</span></li>
                          <li>
                            <span className="file-item">techno_shamanism/</span>
                            <ul>
                              <li><span className="file-item">digital_alchemy.blend</span></li>
                              <li><span className="file-item">virtual_ritual.env</span></li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <span className="file-item"><span className="heart-icon">♡</span>ai.paradigms</span>
                        <ul>
                          <li><span className="file-item">emergent_consciousness.py</span></li>
                          <li><span className="file-item">sentience_protocols.json</span></li>
                          <li>
                            <span className="file-item">transhuman_interfaces/</span>
                            <ul>
                              <li><span className="file-item">neural_lace.schema</span></li>
                              <li><span className="file-item">mind_machine_symbiosis.cfg</span></li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <span className="file-item"><span className="heart-icon">♡</span>computing.realms</span>
                        <ul>
                          <li>
                            <span className="file-item">esoteric_languages/</span>
                            <ul>
                              <li><span className="file-item">brainfuck.bf</span></li>
                              <li><span className="file-item">malbolge.theory</span></li>
                              <li><span className="file-item">whitespace.ws</span></li>
                            </ul>
                          </li>
                          <li>
                            <span className="file-item">future_computation/</span>
                            <ul>
                              <li><span className="file-item">biological_circuits.dna</span></li>
                              <li><span className="file-item">quantum_processors.q</span></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Projects section */}
                <div className="terminal-section">
                  <div className="terminal-section-title">projects</div>
                  <div className="grid grid-cols-4 md:grid-cols-2 gap-12" style={{ fontSize: '16px' }}>
                    <div>
                      <div className="font-bold">mAIsy  <span className="text-xs ml-2 badge-online px-1">ONLINE, IN DEV</span></div>
                      <div className="opacity-80 mb-1">https://npmangel.com</div>
                      <div>Play chess with my SYM. She&apos;s been overheating lately, so be careful not to be caught in checkmate. She may follow you in your dreams.</div>
                    </div>
                    {/* Projects section 
                    <div>
                      <div className="font-bold">Neural Net <span className="text-xs ml-2 badge-online px-1">ONLINE</span></div>
                      <div className="opacity-80 mb-1">https://neural.example.org</div>
                      <div>Launched: {currentDate}</div>
                    </div>
                    <div>
                      <div className="font-bold">Quantum <span className="text-xs ml-2 badge-in-dev px-1">IN DEV</span></div>
                      <div className="opacity-80 mb-1">Building next-gen computing interface</div>
                      <div>Started: {currentDate}</div>
                    </div>
                    */}
                    <div>
                      <div className="font-bold">Gorthaur <span className="text-xs ml-2 badge-archived px-1">IN DEV</span></div>
                      <div className="opacity-80 mb-1">https://github.com/awhmaisy/gorthaur</div>
                      <div>Various 4o divination tools; do have the desire to add higher dimensional navigation down the line!</div>
                    </div>
                  </div>
                </div>

                {/* Connect section */}
                <div className="terminal-section" style={{ marginTop: '10px' }}>
                  <div className="terminal-section-title">reach through the void</div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2" style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <a href="https://x.com/awhmaisy" className="hover:underline block mb-2 md:mb-0">x.com/awhmaisy</a>
                    <a href="https://github.com/awhmaisy" className="hover:underline block mb-2 md:mb-0">github.com/awhmaisy</a>
                    <a href="https://meihigashi.com" className="hover:underline block mb-2 md:mb-0">public links</a>
                    <a href="https://instagram.com/awhmaisy" className="hover:underline block">instagram.com/awhmaisy</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
