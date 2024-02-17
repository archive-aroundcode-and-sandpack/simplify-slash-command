import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menu, SlashExtension, SuggestionItems } from "../components/Tiptap/extensions/slashCommand";
import { renderItems } from "../components/Tiptap/extensions/slashCommand/renderItems";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      SlashExtension.configure({
        suggestion: {
          items: SuggestionItems,
          render: renderItems(Menu)
        }
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return <EditorContent editor={editor} />;
};

export default TiptapEditor;