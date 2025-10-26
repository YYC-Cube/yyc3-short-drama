import { render, screen } from "@testing-library/react"
import FeaturesOverview from "./features-overview"

describe("FeaturesOverview 组件", () => {
  it("渲染带有标题和描述的组件", () => {
    render(<FeaturesOverview />)

    // 检查标题是否已渲染
    const titleElement = screen.getByText(/平台核心功能/i)
    expect(titleElement).toBeInTheDocument()

    // 检查描述是否已渲染
    const descriptionElement = screen.getByText(/融合河洛文化与现代科技，打造全方位的智能短剧创作生态系统/i)
    expect(descriptionElement).toBeInTheDocument()
  })
})
