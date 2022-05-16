const average = (array) =>{
    let sum = 0
    array.forEach(element => sum += element);
    return sum / array.length
}

describe.skip('average', () =>{
    test('of one value is the value itself', () =>{
        expect(average([1])).toBe(1)
    })
})