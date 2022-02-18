function isTextMatch(item, word) {
  const regex = new RegExp(word, 'ig');
  return item.name.match(regex);
}

export default isTextMatch;
