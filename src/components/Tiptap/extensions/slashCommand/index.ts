import { type Editor as TiptapEditorType, type Range, Extension } from '@tiptap/core'
import { Editor } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import './slash-command.css'
import { SuggestionItems } from './nodes-suggestions-items'
import { renderItems } from './renderItems'
import { Menu } from './render'

export const SlashExtension = Extension.create({
  name: 'slash-suggestion',
  // this might be the default / base value
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props
        }: {
          editor: TiptapEditorType
          range: Range
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props: any
        }) => {
          props.command({ editor, range })
        },
        items: SuggestionItems,
        render: renderItems(Menu)
      }
    }
  },
  // https://tiptap.dev/guide/custom-extensions#prosemirror-plugins
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ]
  }
})

export interface NodeSuggestionItemsType {
  title: string
  description: string
  group: string
  searchTerms: string[]
  icon: JSX.Element
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

export { SuggestionItems } from './nodes-suggestions-items'
export { Menu } from './render'


export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
}
