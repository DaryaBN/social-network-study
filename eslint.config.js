import js from '@eslint/js';
import globals from 'globals';
import mocha from 'eslint-plugin-mocha';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        it: 'readonly',
        describe: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        ...globals.mocha, // Используем глобальные переменные из пакета globals
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      mocha, // Подключаем плагин Mocha
    },
    rules: {
      'semi': ['error', 'always'], // Точка с запятой обязательна
      'indent': ['error', 2], // Отступы: 2 пробела
      'quotes': ['error', 'single'], // Использовать одинарные кавычки
      'no-trailing-spaces': 'error', // Запретить пробелы в конце строк
      'eol-last': ['error', 'always'], // Последняя строка файла должна быть пустой
      'comma-dangle': ['error', 'always-multiline'], // Висячая запятая для многострочных объектов/массивов
      'object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок
    },
  },
];
