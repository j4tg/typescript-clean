import { z } from 'zod'

export const DisponibilidadResponse = z.object({
  recursos: z.object({
    primarios: z.array(z.object({
      id_recurso: z.number(),
      nombre_recurso: z.string(),
      tipo: z.number(),
      codigo: z.string()
    })),
    secundarios: z.optional(z.array(z.object({
      id_recurso: z.number(),
      nombre_recurso: z.string(),
      tipo: z.number(),
      codigo: z.string()
    })))
  }),
  disponibilidades: z.array(z.object({
    horario: z.array(z.string()),
    id_prestacion: z.number(),
    prestacion_codigo: z.string(),
    servicio_codigo: z.number(),
    dia: z.number(),
    id_recurso: z.number(),
    recurso_codigo: z.string(),
    id_recurso_secundario: z.optional(z.number()),
    recurso_secundario_codigo: z.string(),
    sucursal_codigo: z.string(),
    sugerencia_ph: z.string()
  }))
})

export const PreReservaResponse = z.object({
  resultado: z.object({
    indice: z.number()
  })
})

export const ReservaResponse = z.object({
  reserva: z.object({
    reserva: z.string(),
    ubicacion: z.string()
  })
})
