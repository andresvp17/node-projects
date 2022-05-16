const palindrome = (string) =>{
    return string.split('').reverse().join('')
}

test.skip('palindrome of the Lalisa', () =>{
    const result = palindrome('Lalisa')
    expect(result).toBe('asilaL')
})

test.skip('palindrome of the empty', () =>{
    const result = palindrome('')
    expect(result).toBe('')
})