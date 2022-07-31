import { injectable } from 'tsyringe'
import { z } from 'zod'
import { Webhook } from './Webhook'

@injectable()
export class WebhookValidator {
  private schema = z.object({
    data: z.object({
      new_state: z
        .object({
          enabled: z.boolean(),
          feature: z.object({
            name: z.string()
          })
        })
        .optional(),
      previous_state: z
        .object({
          feature: z.object({
            name: z.string()
          })
        })
        .optional()
    }),
    event_type: z.enum(['FLAG_DELETED', 'FLAG_UPDATED'])
  })

  isValid(payload: unknown): payload is Webhook {
    const { success } = this.schema.safeParse(payload)
    return success
  }
}
