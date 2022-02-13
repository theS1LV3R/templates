import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],

  ignores: [(commit): boolean => commit === 'Initial commit'],
};

export default config;
