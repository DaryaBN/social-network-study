import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';
import replacing from '../public/assets/replacing.js';
import time from '../public/assets/timePost.js';
import hashtag from '../public/assets/hashtag.js';
import platformFilter from '../public/assets/censorshipFilter.js';

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

describe('преобразование числа во время', function () {
  it('минуты', function () {
    const expectedResult = '1 минуту назад';
    const result = time(1);
    assert.equal(expectedResult, result);
  });
  it('минуты 5', function () {
    const expectedResult = '5 минут назад';
    const result = time(5);
    assert.equal(expectedResult, result);
  });
  it('минуты 12', function () {
    const expectedResult = '12 минут назад';
    const result = time(12);
    assert.equal(expectedResult, result);
  });
  it('минуты 22', function () {
    const expectedResult = '22 минуты назад';
    const result = time(22);
    assert.equal(expectedResult, result);
  });
  it('минуты 59', function () {
    const expectedResult = '59 минут назад';
    const result = time(59);
    assert.equal(expectedResult, result);
  });
  it('часы', function () {
    const expectedResult = '1 час назад';
    const result = time(60);
    assert.equal(expectedResult, result);
  });
  it('часы 2', function () {
    const expectedResult = '2 часа назад';
    const result = time(120);
    assert.equal(expectedResult, result);
  });
  it('часы 5', function () {
    const expectedResult = '5 часов назад';
    const result = time(300);
    assert.equal(expectedResult, result);
  });
  it('часы 23', function () {
    const expectedResult = '23 часа назад';
    const result = time(1380);
    assert.equal(expectedResult, result);
  });
  it('дни', function () {
    const expectedResult = '1 день назад';
    const result = time(1440);
    assert.equal(expectedResult, result);
  });
  it('дни 5', function () {
    const expectedResult = '5 дней назад';
    const result = time(7200);
    assert.equal(expectedResult, result);
  });
  it('дни 12', function () {
    const expectedResult = '12 дней назад';
    const result = time(17280);
    assert.equal(expectedResult, result);
  });
  it('дни 22', function () {
    const expectedResult = '22 дня назад';
    const result = time(31680);
    assert.equal(expectedResult, result);
  });
  it('дни 364', function () {
    const expectedResult = '364 дня назад';
    const result = time(524160);
    assert.equal(expectedResult, result);
  });
  it('года', function () {
    const expectedResult = 'более 1 года назад';
    const result = time(525600);
    assert.equal(expectedResult, result);
  });
  it('года 2', function () {
    const expectedResult = 'более 2 лет назад';
    const result = time(1051200);
    assert.equal(expectedResult, result);
  });
});

describe('Подсветка хештегов', function () {
  it('хештег', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> ?';
    const result = hashtag('Кто еще изучает #javascript ?');
    assert.equal(expectedResult, result);
  });
  it('хештег начало', function () {
    const expectedResult = '<a href="/search?tag=javascript" >#javascript</a> изучаю';
    const result = hashtag('#javascript изучаю');
    assert.equal(expectedResult, result);
  });
  it('хештег конец', function () {
    const expectedResult = 'как вам новая песня <a href="/search?tag=linkinpark" >#linkinpark</a>';
    const result = hashtag('как вам новая песня #linkinpark');
    assert.equal(expectedResult, result);
  });
});

describe('Фильтр мата и цензура', function () {
  it('одно матерное слово в тексте', function () {
    const expectedResult = 'Да вы что?? ***** там?';
    const result = platformFilter('Да вы что?? Охуели там?', ['охуели']);
    assert.equal(expectedResult, result);
  });
  it('несколько матерных слов в тексте', function () {
    const expectedResult = '***** как же я *****';
    const result = platformFilter('Блять, как же я заебалась', ['блять', 'заебалась']);
    assert.equal(expectedResult, result);
  });
  it('в массиве больше матерных слов, чем в тексте', function () {
    const expectedResult = 'Да вы что?? ***** там?';
    const result = platformFilter('Да вы что?? Охуели там?', ['охуели', 'заебалась']);
    assert.equal(expectedResult, result);
  });
});
