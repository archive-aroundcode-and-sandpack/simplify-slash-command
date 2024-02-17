
import { updateScrollView } from './index'
import { NodeSuggestionItemsType } from './index'
import { SuggestionProps } from '@tiptap/suggestion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const Menu = ({
  items,
  command
}: Pick<SuggestionProps<NodeSuggestionItemsType>, 'items' | 'command'>) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index]
      command(item)
    },
    [command, items]
  )

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length)
          return true
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length)
          return true
        }
        if (e.key === 'Enter') {
          selectItem(selectedIndex)
          return true
        }
        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [items, selectedIndex, setSelectedIndex, selectItem])

  useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  useLayoutEffect(() => {
    const wrapper = ref.current
    const item = wrapper?.children[selectedIndex] as HTMLElement
    if (item && wrapper) updateScrollView(wrapper, item)
  }, [])

  if (!items) return null

  if (items.length) {
    return (
      <div
        id="slash-command"
        ref={ref}
        className="slash-command-wrapper"
      >
        {items.map((item: any, index: number) => {
          return (
            <button
              className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
                index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <div className="flex size-10 items-center justify-center rounded-md border border-stone-200 bg-white">
                {item.icon}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-stone-500">{item.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    )
  }
}
