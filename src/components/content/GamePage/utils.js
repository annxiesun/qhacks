async function createWordList () {
    let set;
    console.log("hi");
    await fetch('resources/words.txt')
    .then(response => response.text())
    .then(text => {
        const textArr = text.split('\n');
        const textSet = new Set();
        textArr.forEach((word) => {
            textSet.add(word.toUpperCase());
        });
        set = textSet;
    }) 
    return set;
}

export { createWordList };