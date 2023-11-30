import { boot } from 'quasar/wrappers';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-');
  defineIonPhaser(window);
})
