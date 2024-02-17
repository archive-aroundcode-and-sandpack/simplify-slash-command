import { Editor } from '@tiptap/core'
import { NodeSuggestionItemsType } from '.'
import { Heading1, Heading2, Heading3, SquareCode, Text } from 'lucide-react'

interface SuggestionItemProps {
  /*
   * the query is the filled in text after the suggestion char
   */
  query: string

  /*
   * the editor instance, so we can use any props or command
   */
  editor: Editor
}

// maybe a list of blocks that are accessbiel via the slash command can be done before and import here
export const SuggestionItems = ({
  query,
  editor
}: SuggestionItemProps): NodeSuggestionItemsType[] => {
  return [
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      group: 'basic-blocks',
      icon: <Heading1 size={16} />,
      command: ({ editor, range }) => {
        console.log('editor', editor)
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      }
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      group: 'basic-blocks',
      searchTerms: ['subtitle', 'medium'],
      icon: <Heading2 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
      }
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      group: 'basic-blocks',
      searchTerms: ['subtitle', 'small'],
      icon: <Heading3 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
      }
    },
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      group: 'basic-blocks',
      searchTerms: ['p', 'paragraph'],
      icon: <Text size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('paragraph').run()
      }
    },
    {
      title: 'Little Ide',
      description: 'Create a little ide block.',
      searchTerms: ['little', 'ide'],
      group: 'advanced-blocks',
      icon: <SquareCode size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('littleIdeBlock').run()
      }
    }
  ]
}
