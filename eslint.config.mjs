import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

// react-hooks v7 编译器级架构规则已全量治理完成（purity/set-state-in-effect/immutability 等）
// 恢复 error 级以进入硬门禁，防止回退
const hooksArchRules = {
  'react-hooks/set-state-in-effect': 'error',
  'react-hooks/purity': 'error',
  'react-hooks/immutability': 'error',
  'react-hooks/static-components': 'error',
  'react-hooks/globals': 'error',
  'react-hooks/refs': 'error',
}

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'disabled/**', 'scripts/**'],
  },
  ...coreWebVitals,
  {
    ...typescript.find((c) => c.rules),
    rules: {
      ...typescript.find((c) => c.rules)?.rules,
      ...hooksArchRules,
    },
  },
]

export default eslintConfig
