import { FlagsmithFeatureRemote } from './FlagsmithFeatureRemote'
import { WebhookValidator } from './webhook/WebhookValidator'
import { Webhook } from './webhook/Webhook'
import { mock } from 'jest-mock-extended'
import { Logger } from '@/service/logger/Logger'

test('should return the name of the feature', () => {
  // Arrange
  const webhookValidator = mock<WebhookValidator>()
  webhookValidator.isValid.mockReturnValue(true)

  const flagsmithFeatureRemote = new FlagsmithFeatureRemote(
    mock<Logger>(),
    webhookValidator
  )
  const webhook: Webhook = {
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
  const feature = flagsmithFeatureRemote.parseWebhook(webhook)

  // Assert
  expect(webhookValidator.isValid).toHaveBeenCalled()
  expect(feature.name).toEqual('JIRA_1001')
})

test('should return an enabled feature', () => {
  // Arrange
  const webhookValidator = mock<WebhookValidator>()
  webhookValidator.isValid.mockReturnValue(true)

  const flagsmithFeatureRemote = new FlagsmithFeatureRemote(
    mock<Logger>(),
    webhookValidator
  )
  const webhook: Webhook = {
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
  const feature = flagsmithFeatureRemote.parseWebhook(webhook)

  // Assert
  expect(webhookValidator.isValid).toHaveBeenCalled()
  expect(feature.isEnabled).toBeTruthy()
  expect(feature.isDeleted).toBeFalsy()
})

test('should return an disabled feature', () => {
  // Arrange
  const webhookValidator = mock<WebhookValidator>()
  webhookValidator.isValid.mockReturnValue(true)

  const flagsmithFeatureRemote = new FlagsmithFeatureRemote(
    mock<Logger>(),
    webhookValidator
  )
  const webhook: Webhook = {
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
  const feature = flagsmithFeatureRemote.parseWebhook(webhook)

  // Assert
  expect(webhookValidator.isValid).toHaveBeenCalled()
  expect(feature.isEnabled).toBeFalsy()
  expect(feature.isDeleted).toBeFalsy()
})

test('should return an deleted feature', () => {
  // Arrange
  const webhookValidator = mock<WebhookValidator>()
  webhookValidator.isValid.mockReturnValue(true)

  const flagsmithFeatureRemote = new FlagsmithFeatureRemote(
    mock<Logger>(),
    webhookValidator
  )
  const webhook: Webhook = {
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
  const feature = flagsmithFeatureRemote.parseWebhook(webhook)

  // Assert
  expect(webhookValidator.isValid).toHaveBeenCalled()
  expect(feature.isEnabled).toBeFalsy()
  expect(feature.isDeleted).toBeTruthy()
})
