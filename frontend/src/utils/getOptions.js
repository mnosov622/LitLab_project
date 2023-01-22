export function getOptions(word, courses) {
  return courses.filter((s) => {
    const regex = new RegExp(word, "gi");
    return s.name.match(regex);
  });
}
