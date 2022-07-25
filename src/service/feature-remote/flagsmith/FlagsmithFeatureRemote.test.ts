import { container } from '@/injection/container'
import { FlagsmithFeatureRemote } from './FlagsmithFeatureRemote'
import { WebhookPayload } from './WebhookPayload'
import { mock } from 'jest-mock-extended'
import { Logger } from '@/service/logger/Logger'
import { z } from 'zod'

test('should return the name of the feature', () => {
  // Arrange
  const scope = container.createChildContainer()
  scope.registerInstance('Logger', mock<Logger>())
  const webhook: z.infer<typeof WebhookPayload> = {
    event_type: 'FLAG_UPDATED',
    data: {
      new_state: {
        enabled: true,
        feature: {
          name: 'JIRA_1001'
        }
      }
    }
  }

  // Act
  const feature = scope.resolve(FlagsmithFeatureRemote).parseWebhook(webhook)

  // Assert
  expect(feature.name).toEqual('JIRA_1001')
})

test('should return an enabled feature', () => {
  // Arrange
  const scope = container.createChildContainer()
  scope.registerInstance('Logger', mock<Logger>())
  const webhook: z.infer<typeof WebhookPayload> = {
    event_type: 'FLAG_UPDATED',
    data: {
      new_state: {
        enabled: true,
        feature: {
          name: 'JIRA_1001'
        }
      }
    }
  }

  // Act
  const feature = scope.resolve(FlagsmithFeatureRemote).parseWebhook(webhook)

  // Assert
  expect(feature.isEnabled).toBeTruthy()
  expect(feature.isDeleted).toBeFalsy()
})

test('should return an disabled feature', () => {
  // Arrange
  const scope = container.createChildContainer()
  scope.registerInstance('Logger', mock<Logger>())
  const webhook: z.infer<typeof WebhookPayload> = {
    event_type: 'FLAG_UPDATED',
    data: {
      new_state: {
        enabled: false,
        feature: {
          name: 'JIRA_1001'
        }
      }
    }
  }

  // Act
  const feature = scope.resolve(FlagsmithFeatureRemote).parseWebhook(webhook)

  // Assert
  expect(feature.isEnabled).toBeFalsy()
  expect(feature.isDeleted).toBeFalsy()
})

test('should return an deleted feature', () => {
  // Arrange
  const scope = container.createChildContainer()
  scope.registerInstance('Logger', mock<Logger>())
  const webhook: z.infer<typeof WebhookPayload> = {
    event_type: 'FLAG_DELETED',
    data: {
      previous_state: {
        feature: {
          name: 'JIRA_1001'
        }
      }
    }
  }

  // Act
  const feature = scope.resolve(FlagsmithFeatureRemote).parseWebhook(webhook)

  // Assert
  expect(feature.isEnabled).toBeFalsy()
  expect(feature.isDeleted).toBeTruthy()
})
