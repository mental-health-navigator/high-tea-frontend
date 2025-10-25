import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';
import {
  artifactModel,
  chatModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai('gpt-5-nano'),
        'title-model': openai('gpt-5-nano'),
        'artifact-model': openai('gpt-5-nano'),
      },
    });
