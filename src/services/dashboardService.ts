import type { DashboardData } from '@/types/dashboard'
import { nextDashboardFrame } from '@/mocks/realtimeDashboardSimulator'

export async function fetchDashboardData(): Promise<DashboardData> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return nextDashboardFrame()
}

export async function refreshAllData() {
  await fetchDashboardData()
}

// 兼容store导入 getDashboardData
export const getDashboardData = fetchDashboardData