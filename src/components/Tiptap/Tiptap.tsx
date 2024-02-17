import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menu, SlashExtension, SuggestionItems } from "./extensions/slashCommand";
import { renderItems } from "./extensions/slashCommand/renderItems";
import './Tiptap.css'

export const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      SlashExtension
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return <EditorContent editor={editor} />;
};

