"use client"

import { useState, useEffect, useCallback, useRef } from "react"

// 懒加载数据选项
interface LazyDataOptions<T> {
  initialData?: T[]
  pageSize?: number
  threshold?: number
  delay?: number
  loadMoreOnMount?: boolean
  sortBy?: keyof T
  sortDirection?: "asc" | "desc"
  filter?: (item: T) => boolean
}

// 懒加载数据钩子
export function useLazyData<T>(
  fetchData: (page: number, pageSize: number) => Promise<T[]>,
  options: LazyDataOptions<T> = {},
) {
  const {
    initialData = [],
    pageSize = 10,
    threshold = 200,
    delay = 300,
    loadMoreOnMount = false,
    sortBy,
    sortDirection = "desc",
    filter,
  } = options

  const [data, setData] = useState<T[]>(initialData)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const observer = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 加载更多数据
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      // 添加延迟，避免频繁请求
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, delay)
      })

      const newData = await fetchData(page, pageSize)

      if (newData.length === 0) {
        setHasMore(false)
      } else {
        setData((prevData) => {
          // 合并数据并去重
          const combinedData = [...prevData, ...newData]
          const uniqueData = Array.from(
            new Map(
              combinedData.map((item) =>
                // 假设每个项目都有一个唯一的 id 属性
                // @ts-ignore
                [item.id, item],
              ),
            ).values(),
          )

          // 应用过滤器
          let filteredData = filter ? uniqueData.filter(filter) : uniqueData

          // 应用排序
          if (sortBy) {
            filteredData = [...filteredData].sort((a, b) => {
              const aValue = a[sortBy]
              const bValue = b[sortBy]

              if (sortDirection === "asc") {
                // @ts-ignore
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
              } else {
                // @ts-ignore
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
              }
            })
          }

          return filteredData
        })

        setPage((prevPage) => prevPage + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load data"))
    } finally {
      setIsLoading(false)
    }
  }, [fetchData, page, pageSize, isLoading, hasMore, delay, sortBy, sortDirection, filter])

  // 重置数据
  const resetData = useCallback(() => {
    setData(initialData)
    setPage(1)
    setHasMore(true)
    setError(null)
  }, [initialData])

  // 设置 Intersection Observer
  useEffect(() => {
    const currentObserver = observer.current

    if (loadingRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            loadMore()
          }
        },
        { rootMargin: `0px 0px ${threshold}px 0px` },
      )

      observer.current.observe(loadingRef.current)
    }

    return () => {
      if (currentObserver) {
        currentObserver.disconnect()
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [loadMore, hasMore, isLoading, threshold])

  // 初始加载
  useEffect(() => {
    if (loadMoreOnMount) {
      loadMore()
    }
  }, [loadMoreOnMount, loadMore])

  return {
    data,
    isLoading,
    hasMore,
    error,
    loadMore,
    resetData,
    loadingRef,
  }
}

// 使用示例：
// const { data, isLoading, hasMore, loadingRef } = useLazyData(
//   (page, pageSize) => fetchScripts(page, pageSize),
//   { pageSize: 20, sortBy: 'createdAt' }
// )
