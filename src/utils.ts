export const intBetween = (start: number, end: number) => {
  const output: number[] = []
  const distance = Math.abs(end - start)

  if (distance === 0) return output

  const increment = (end - start) / distance

  if (increment > 0) {
    for (let i = start + 1; i <= end - 1; i++) {
      output.push(i)
    }
  } else {
    for (let i = start - 1; i >= end + 1; i--) {
      output.push(i)
    }
  }
  return output
}
