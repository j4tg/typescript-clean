export interface Webhook {
  data: {
    new_state?: {
      enabled: boolean
      feature: {
        name: string
      }
    }
    previous_state?: {
      feature: {
        name: string
      }
    }
  }
  event_type: 'FLAG_DELETED' | 'FLAG_UPDATED'
}
