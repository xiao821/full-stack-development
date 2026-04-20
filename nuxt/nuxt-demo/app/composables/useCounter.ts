// composables/ 下的函数自动导入，无需 import
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}
