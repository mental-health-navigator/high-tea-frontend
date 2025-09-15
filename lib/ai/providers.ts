import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai('gpt-5-nano'),
        'chat-model-reasoning': openai('gpt-5-nano'),

        'title-model': openai('gpt-5-nano'),
        'artifact-model': openai('gpt-5-nano'),
      },
      // imageModels: {
      //   'small-model': openai.imageModel(''),
      // },
    });
