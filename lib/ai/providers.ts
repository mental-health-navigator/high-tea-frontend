import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';

// Don't import test models directly to avoid bundling them in production
// Test models will be loaded dynamically when needed
export const myProvider = customProvider({
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
