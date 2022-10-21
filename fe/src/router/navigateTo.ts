import router from "./index"
export function navigateTo(url: string): void {
  router.push(url)
}
