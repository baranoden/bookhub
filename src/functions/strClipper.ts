export function sentenceClip(str, maxCount) {
  const words = str.split(/\s+/)

  if (words.length > maxCount) {
    return words.slice(0, maxCount).join(' ')
  } else {
    return str + ' ...'
  }
}
