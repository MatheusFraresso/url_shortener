import idToUrl from '../../utils/idToUrl';

describe('Test Id To Url function', () => {
  it('Shoud test id 1 to return 1', () => {
    expect(idToUrl(1)).toBe('1');
  });
  it('Shoud test id 2 to return 2', () => {
    expect(idToUrl(2)).toBe('2');
  });
  it('Shoud test id 3 to return 3', () => {
    expect(idToUrl(3)).toBe('3');
  });

  it('Shoud test id 30 to return {', () => {
    expect(idToUrl(30)).toBe('{');
  });
  it('Shoud test id 97 to return z', () => {
    expect(idToUrl(97)).toBe('z');
  });
  it('Shoud test id 98 to return 11', () => {
    expect(idToUrl(98)).toBe('11');
  });
  it('Shoud test id 99 to return 11', () => {
    expect(idToUrl(99)).toBe('12');
  });
  it('Shoud test id 9409 to return yz', () => {
    expect(idToUrl(9409)).toBe('yz');
  });
});
