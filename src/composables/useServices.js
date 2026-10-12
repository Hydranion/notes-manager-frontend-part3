import { inject } from 'vue'
import { SERVICES_KEY } from '../services/keys'

export function useServices() {
  const services = inject(SERVICES_KEY)
  if (!services) throw new Error('Сервіси застосунку не зареєстровані через Dependency Injection.')
  return services
}
