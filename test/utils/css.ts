export const getClass = (fixture: HTMLElement): string => {
  const attributes = fixture.attributes as NamedNodeMap;
  return attributes.getNamedItem('class').value;
};
