import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';
import replacing from '../public/assets/replacing.js';

describe('Функция проверки расчета размера поста', function () {
  it('без ссылок', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет!');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой https', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! https://github.com');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой http', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! http://github.com');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой www', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! www://github.com');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой без протокола .com', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! github.com');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой без протокола .org', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! github.org');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой без протокола .ru', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! github.ru');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой и со ссылкой без протокола ', function () {
    const expectedResult = 14;
    const result = postSize('Всем привет! https://github.com github.org');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой и дальнейщим написанием текста', function () {
    const expectedResult = 25;
    const result = postSize('Всем привет! https://github.com нужный сайт');
    assert.equal(expectedResult, result);
  });
  it('со ссылкой без протокола дальнейщим написанием текста', function () {
    const expectedResult = 25;
    const result = postSize('Всем привет! github.org нужный сайт');
    assert.equal(expectedResult, result);
  });
});

describe('Функция замены ссылок', function () {
  it('с протоколом .com', function () {
    const expectedResult = 'Привет! <a href="https://github.com">github.com</a>';
    const result = replacing('Привет! github.com');
    assert.equal(expectedResult, result);
  });
  it('с протоколом .org', function () {
    const expectedResult = 'Привет! <a href="https://github.org">github.org</a>';
    const result = replacing('Привет! github.org');
    assert.equal(expectedResult, result);
  });
  it('с протоколом .ru', function () {
    const expectedResult = 'Привет! <a href="https://github.ru">github.ru</a>';
    const result = replacing('Привет! github.ru');
    assert.equal(expectedResult, result);
  });
  it('с протоколом .com и дальнейшим текстом', function () {
    const expectedResult = 'Привет! <a href="https://github.com">github.com</a> нужный сайт';
    const result = replacing('Привет! github.com нужный сайт');
    assert.equal(expectedResult, result);
  });
});
