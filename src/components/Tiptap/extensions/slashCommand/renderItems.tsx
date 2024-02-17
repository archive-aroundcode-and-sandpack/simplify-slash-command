import { Editor } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

export const renderItems = (MenuComponent: any) => {
  return () => {
    let component: ReactRenderer | null = null
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let popup: any | null = null

    return {
      onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
        component = new ReactRenderer(MenuComponent, {
          props,
          editor: props.editor,
        })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },
      onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
        component?.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },
      onKeyDown: (props: { event: KeyboardEvent }) => {
        if (props.event.key === 'Escape') {
          popup?.[0].hide()

          return true
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return component?.ref?.onKeyDown(props)
      },
      onExit: () => {
        popup && popup?.[0].destroy()
        component?.destroy()
      }
    }
  }
}
