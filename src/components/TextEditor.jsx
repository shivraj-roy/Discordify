import { useState, useRef } from "react";
import {
   Title,
   Center,
   Container,
   Group,
   Button,
   Tooltip,
} from "@mantine/core";
import {
   GrPowerReset,
   GrBold,
   GrItalic,
   GrUnderline,
   GrClipboard,
} from "react-icons/gr";

const fgColors = {
   darkGray: {
      label: "Dark Gray (33%)",
      color: "#4f545c",
   },
   red: {
      label: "Red",
      color: "#dc322f",
   },
   yellowishGreen: {
      label: "Yellowish Green",
      color: "#859900",
   },
};

const bgColors = {
   bluishBlack: {
      label: "Bluish Black",
      color: "#002b36",
   },
   rustBrown: {
      label: "Rust Brown",
      color: "#cb4b16",
   },
   gray40: {
      label: "Gray (40%)",
      color: "#586e75",
   },
};

const TextEditor = () => {
   const [text, setText] = useState("");
   const [copyButtonText, setCopyButtonText] = useState(
      "Copy Text as Discord Formatted"
   );
   const editorRef = useRef(null);

   const applyStyles = (style, colorKey = null) => {
      const editor = editorRef.current;
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      if (range.collapsed) return; // No text selected

      const selectedText = range.toString();
      let formattedText = selectedText;

      switch (style) {
         case "bold":
            formattedText = `<strong>${selectedText}</strong>`;
            break;
         case "italic":
            formattedText = `<em>${selectedText}</em>`;
            break;
         case "underline":
            formattedText = `<u>${selectedText}</u>`;
            break;
         case "fg":
            formattedText = `<span style="color: ${fgColors[colorKey].color}">${selectedText}</span>`;
            break;
         case "bg":
            formattedText = `<span style="background-color: ${bgColors[colorKey].color}">${selectedText}</span>`;
            break;
      }

      range.deleteContents();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = formattedText;
      range.insertNode(tempDiv.firstChild);

      // Update the text state with HTML content
      setText(editor.innerHTML);
   };

   const getASCIFormattedText = () => {
      const editor = editorRef.current;
      let formattedText = editor.innerHTML;

      // Replace HTML tags with ANSI codes
      formattedText = formattedText
         // Text formatting
         .replace(/<strong>(.*?)<\/strong>/gi, "\x1b[1m$1\x1b[0m") // Bold
         .replace(/<em>(.*?)<\/em>/gi, "\x1b[3m$1\x1b[0m") // Italic
         .replace(/<i>(.*?)<\/i>/gi, "\x1b[3m$1\x1b[0m") // Italic alternative
         .replace(/<u>(.*?)<\/u>/gi, "\x1b[4m$1\x1b[0m") // Underline
         // Foreground colors
         .replace(
            /<span[^>]*style=["'][^"']*color:\s*(#4f545c)[^"']*["'][^>]*>(.*?)<\/span>/gi,
            "\x1b[38;5;240m$2\x1b[0m"
         )
         .replace(
            /<span[^>]*style=["'][^"']*color:\s*(#dc322f)[^"']*["'][^>]*>(.*?)<\/span>/gi,
            "\x1b[38;5;160m$2\x1b[0m"
         )
         .replace(
            /<span[^>]*style=["'][^"']*color:\s*(#859900)[^"']*["'][^>]*>(.*?)<\/span>/gi,
            "\x1b[38;5;106m$2\x1b[0m"
         )
         // Background colors
         .replace(
            /<span[^>]*style=["'][^"']*background-color:\s*(#002b36)[^"']*["'][^>]*>(.*?)<\/span>/gi,
            "\x1b[48;5;23m$2\x1b[0m"
         )
         .replace(
            /<span[^>]*style=["'][^"']*background-color:\s*(#cb4b16)[^"']*["'][^>]*>(.*?)<\/span>/gi,
            "\x1b[48;5;166m$2\x1b[0m"
         )
         .replace(
            /<span[^>]*style=["'][^"']*background-color:\s*(#586e75)[^"']*["'][^>]*>(.*?)<\/span>/gi,
            "\x1b[48;5;66m$2\x1b[0m"
         )
         // Line breaks and spaces
         .replace(/<br\s*\/?>/g, "\n") // Ensure <br> is handled properly
         .replace(/<\/div>/g, "\n") // Add newline after closing div
         .replace(/<div.*?>/g, "") // Remove opening div tags but preserve content
         .replace(/&nbsp;/g, " ") // Convert non-breaking spaces to normal spaces
         .replace(/<\/?span.*?>/g, ""); // Remove any stray span tags

      return formattedText;
   };

   const resetStyles = () => {
      const editor = editorRef.current;
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      if (range.collapsed) return; // No text selected

      const selectedText = range.toString();
      range.deleteContents();
      range.insertNode(document.createTextNode(selectedText));

      // Update the text state with HTML content
      setText(editor.innerHTML);
   };

   const copyToClipboard = () => {
      const toCopy = `\`\`\`ansi\n${getASCIFormattedText()}\`\`\``;
      navigator.clipboard.writeText(toCopy);
      setCopyButtonText("Copied!");
      setTimeout(() => {
         setCopyButtonText("Copy Text as Discord Formatted");
      }, 1500);
   };

   return (
      <div>
         <Center m={20}>
            <Title order={4}>Create your own Discord message</Title>
         </Center>

         {/* Editor Buttons */}
         <Center>
            <Group justify="center">
               <Button
                  leftSection={<GrPowerReset />}
                  variant="default"
                  onClick={resetStyles}
               >
                  Reset
               </Button>
               <Button
                  leftSection={<GrBold />}
                  variant="light"
                  onClick={() => applyStyles("bold")}
                  style={{
                     fontWeight: "bold",
                     backgroundColor: "#4f545c",
                     color: "#fff",
                  }}
               >
                  Bold
               </Button>
               <Button
                  leftSection={<GrItalic />}
                  variant="light"
                  onClick={() => applyStyles("italic")}
                  style={{
                     fontStyle: "italic",
                     backgroundColor: "#4f545c",
                     color: "#fff",
                  }}
               >
                  Italic
               </Button>
               <Button
                  leftSection={<GrUnderline />}
                  variant="light"
                  onClick={() => applyStyles("underline")}
                  style={{
                     textDecoration: "underline",
                     backgroundColor: "#4f545c",
                     color: "#fff",
                  }}
               >
                  Underline
               </Button>
            </Group>
         </Center>

         {/* Foreground Color */}
         <Center>
            <Group justify="center" mt={20}>
               <Title mr={10} order={4}>
                  FG:{" "}
               </Title>
               {Object.entries(fgColors).map(([key, color]) => (
                  <Tooltip
                     key={key}
                     label={color.label}
                     arrowSize={5}
                     withArrow
                  >
                     <Button
                        color={color.color}
                        radius="xl"
                        onClick={() => applyStyles("fg", key)}
                     ></Button>
                  </Tooltip>
               ))}
            </Group>
         </Center>

         {/* Background Color */}
         <Center>
            <Group justify="center" mt={20}>
               <Title mr={10} order={4}>
                  BG:{" "}
               </Title>
               {Object.entries(bgColors).map(([key, color]) => (
                  <Tooltip
                     key={key}
                     label={color.label}
                     arrowSize={5}
                     withArrow
                  >
                     <Button
                        color={color.color}
                        radius="xl"
                        onClick={() => applyStyles("bg", key)}
                     ></Button>
                  </Tooltip>
               ))}
            </Group>
         </Center>

         {/* Editor */}
         <Container mt={20}>
            <div
               ref={editorRef}
               contentEditable
               data-placeholder="Hope this got me selected, I tried my best..."
               style={{
                  backgroundColor: "#2f3136",
                  minHeight: "200px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  outline: "none",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  position: "relative",
                  fontSize: "16px",
               }}
               defaultValue={text}
               onInput={(e) => setText(e.currentTarget.innerHTML)}
               onFocus={(e) => {
                  if (e.currentTarget.innerHTML === "") {
                     e.currentTarget.innerHTML = "";
                  }
               }}
               onBlur={(e) => {
                  if (e.currentTarget.innerHTML === "") {
                     e.currentTarget.innerHTML = "";
                  }
               }}
            />
         </Container>

         {/* Button */}
         <Center mt={20}>
            <Button
               leftSection={<GrClipboard />}
               onClick={copyToClipboard}
               disabled={!text.trim()}
            >
               {copyButtonText}
            </Button>
         </Center>
      </div>
   );
};

// Add CSS for placeholder
const style = document.createElement("style");
style.textContent = `
   [contenteditable][data-placeholder]:empty:before {
      content: attr(data-placeholder);
      color: #666;
      font-style: bold;
   }
`;
document.head.appendChild(style);

export default TextEditor;
