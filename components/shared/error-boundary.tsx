"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { handleError, ErrorType, getUserFriendlyMessage } from "@/utils/error-handler"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * 错误边界组件
 * 捕获子组件树中的 JavaScript 错误
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 处理错误
    handleError(error, ErrorType.CLIENT, {
      context: { componentStack: errorInfo.componentStack },
    })

    // 调用自定义错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 如果提供了自定义回退UI，则使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 否则使用默认错误UI
      return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold mb-2">出现了问题</h2>
          <p className="text-center mb-4">
            {this.state.error
              ? getUserFriendlyMessage({
                  type: ErrorType.CLIENT,
                  message: this.state.error.message,
                  timestamp: Date.now(),
                })
              : "应用程序遇到了问题，请刷新页面重试。"}
          </p>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
          >
            <RefreshCw className="w-4 h-4" />
            刷新页面
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
