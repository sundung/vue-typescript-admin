// shims-vue.d.ts
// 由于 TypeScript 只能理解 .ts 文件，无法理解 .vue文件，故需在项目根目录创建一个后缀为 .d.ts 文件
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
