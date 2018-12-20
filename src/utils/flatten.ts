function flatten<T>(array: (T | T[])[]): T[] {
  const flattenedArray: (T | T[])[] = Array.prototype.concat.call(null, [], ...array)
  if (flattenedArray.some(Array.isArray)) {
    return flatten(flattenedArray)
  }

  return flattenedArray as T[]
}
export default flatten
