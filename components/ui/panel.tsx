"use client"

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { XIcon } from "lucide-react"

import {
  DEFAULT_WIDTH,
} from "@/constants/common"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TPanelCallbacks = {
  onOpenPanel?: () => void
  onClosePanel?: () => void
}

export type TPanelState = {
  isOpen: boolean
  panelType?: "artifact"
  content: ReactNode | null
  title?: string
  header?: ReactNode
  footer?: ReactNode
} & TPanelCallbacks

type TOpenPanelProps = TPanelCallbacks & {
  panelType?: "artifact"
  content: ReactNode
  title?: string
  header?: ReactNode
  footer?: ReactNode
}

type TDefaultCallbacks = TPanelCallbacks

export type TPanelContextValue = {
  panel: TPanelState
  openPanel: (props: TOpenPanelProps) => void
  closePanel: (callback?: () => void) => void
  togglePanel: () => void
  setDefaultCallbacks: (callbacks: TDefaultCallbacks) => void
}

export const PanelContext = createContext<TPanelContextValue | null>(null)

type TPanelProviderProps = {
  children: ReactNode
}

export const PanelProvider = ({ children }: TPanelProviderProps) => {
  const [panel, setPanel] = useState<TPanelState>({
    isOpen: false,
    content: null,
    title: undefined,
    header: undefined,
    footer: undefined,
    panelType: undefined,
    onOpenPanel: undefined,
    onClosePanel: undefined,
  })

  const defaultCallbacksRef = useRef<TDefaultCallbacks>({})

  const openPanel = ({
    content,
    title,
    header,
    footer,
    panelType,
    onOpenPanel,
    onClosePanel,
  }: TOpenPanelProps) => {
    const mergedCallbacks = {
      onOpenPanel: () => {
        onOpenPanel?.()
        defaultCallbacksRef.current.onOpenPanel?.()
      },
      onClosePanel: () => {
        onClosePanel?.()
        defaultCallbacksRef.current.onClosePanel?.()
      },
    }

    setPanel((prev) => ({
      ...prev,
      isOpen: true,
      panelType,
      content,
      title,
      header,
      footer,
      onOpenPanel: mergedCallbacks.onOpenPanel,
      onClosePanel: mergedCallbacks.onClosePanel,
    }))

    mergedCallbacks.onOpenPanel?.()
  }

  const closePanel = (callback?: () => void) => {
    setPanel((prev) => {
      prev.onClosePanel?.()
      return {
        ...prev,
        isOpen: false,
        content: null,
        title: undefined,
        header: undefined,
        footer: undefined,
        panelType: undefined,
        onOpenPanel: undefined,
        onClosePanel: undefined,
      }
    })

    callback?.()
  }

  const togglePanel = () => {
    setPanel((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }

  const setDefaultCallbacks = (callbacks: TDefaultCallbacks) => {
    defaultCallbacksRef.current = callbacks
  }

  return (
    <PanelContext.Provider
      value={{
        panel,
        openPanel,
        closePanel,
        togglePanel,
        setDefaultCallbacks,
      }}
    >
      {children}
    </PanelContext.Provider>
  )
}

type TUsePanelOptions = TPanelCallbacks

export const usePanel = (options?: TUsePanelOptions) => {
  const context = useContext(PanelContext)

  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider")
  }

  if (options) {
    context.setDefaultCallbacks({
      onOpenPanel: options.onOpenPanel,
      onClosePanel: options.onClosePanel,
    })
  }

  return context
}

type PanelProps = {
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
}

export const Panel = ({
  className,
  contentClassName,
  headerClassName,
  footerClassName,
}: PanelProps) => {
  const { panel, closePanel } = usePanel()

  if (!panel.isOpen) return null

  return (
    <aside
      className={cn(
        "relative z-20 shrink-0 rounded-md border bg-background shadow-md ml-2 pointer-events-auto",
        className
      )}
      style={{ width: `${DEFAULT_WIDTH}px` }}
      aria-hidden={!panel.isOpen}
    >
      <div className="flex h-full w-full flex-col">
        {panel.header ? (
          <div className={cn("border-b p-2", headerClassName)}>
            {panel.header}
          </div>
        ) : (
          <div
            className={cn(
              "flex items-start justify-between gap-3 border-b p-2",
              headerClassName
            )}
          >
            <div className="min-w-0">
              {panel.title && (
                <div className="truncate text-base font-semibold">
                  {panel.title}
                </div>
              )}
            </div>
            <Button
              size="icon-sm"
              variant="secondary"
              onClick={() => closePanel()}
              aria-label="Close panel"
              className="relative z-10"
            >
            </Button>
          </div>
        )}

        <div className={cn("min-h-0 flex-1 overflow-auto p-4", contentClassName)}>
          {panel.content}
        </div>

        {panel.footer && (
          <div className={cn("border-t p-4", footerClassName)}>{panel.footer}</div>
        )}
      </div>
    </aside>
  )
}

export { DEFAULT_WIDTH }
