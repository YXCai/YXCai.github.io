// this is just a stub for a function you need to implement
//
function getStats(txt) {
    var numberChars = txt.length;
    var removePunc = txt.replace(/[^A-Za-z" "0-9\n]/g, " ");
    removePunc = removePunc.replace(/[\n\"]/g, " ");
    removePunc = removePunc.replace(/\s\s+/g, ' ');
    removePunc = removePunc.trim();
    var numberWords = 0;
    if (removePunc.split(" ")[0] === "")
      numberWords = 0;
    else {
      numberWords = removePunc.split(" ").length;
    }
    var numberLines = 0;
    if (txt.split("\n")[0] === "")
      numberLines = 0;
    else {
        numberLines = txt.split("\n").length;
    }

    var tempLines = txt.split("\n");
    var emptyLines = 0;
    var maxLine = 0;
    for (var i = 0; i < numberLines; i++) {
        if (tempLines[i].trim().length === 0) {
            emptyLines++;
        }
        if (tempLines[i].length > maxLine)
            maxLine = tempLines[i].length;
    }
    var tempWordList = removePunc.split(" ");
    var totalWordLength = 0;
    var listLongest = [];
    var longestWordSize = 0;
    var longestWords = {};
    /*
    for (var i = 0; i < tempWordList.length; i++) {
        lowercaseWord = tempWordList[i].toLowerCase();
        lowercaseWord = lowercaseWord.trim();
        if (lowercaseWord != "") {
            if (!(lowercaseWord in longestWords))
                longestWords[lowercaseWord] = lowercaseWord.length;
        }
    }
    */
    for (var i = 0; i < tempWordList.length; i++) {
        lowercaseWord = tempWordList[i].toLowerCase();
        lowercaseWord = lowercaseWord.trim();
        if (lowercaseWord != "" && !(listLongest.includes(lowercaseWord))) {
            listLongest.push(lowercaseWord);
        }
    }
    var sortLongestWords = [];
    listLongest.sort();
    for (var i = 0; i < (listLongest.length > 10 ? 10 : listLongest.length); i++) {
        var longestWord = "";
        for (var j = 0; j < listLongest.length; j++) {
            if (listLongest[j].length > longestWord.length && !(sortLongestWords.includes(listLongest[j])))
                longestWord = listLongest[j];

        }
        sortLongestWords.push(longestWord);
    }
    for (var i = 0; i < tempWordList.length; i++)
    {
      totalWordLength += tempWordList[i].length;
    }
    /*
    for (var word in longestWords)
        sortLongestWords.push([word, longestWords[word]]);
    sortLongestWords.sort(function(a, b) {
        return b[1] - a[1];
    });
    */


    /*
    var finalLongestWords = [];
    for (var i = 0; i < (sortLongestWords.length > 10 ? 10 : sortLongestWords.length); i++) {
        var formattingString = sortLongestWords[i][0];
        finalLongestWords[i] = formattingString;
    }
    */
    var removeDupes = Array.from(new Set(listLongest));
    listLongest.sort();
    var avWordLen = totalWordLength / numberWords;
    if (numberWords === 0)
      avWordLen = 0;
    var palindromeTestWords = removePunc.split(" ");
    var listOfPalindromes = [];

    for (var i = 0; i < palindromeTestWords.length; i++) {
        var isPalin = false;
        if (palindromeTestWords[i].length > 2)
            isPalin = isPalindrome(palindromeTestWords[i]);
        if (isPalin)
            listOfPalindromes.push(palindromeTestWords[i].toLowerCase());
    }

    var frequentWordsCalc = {};
    for (var i = 0; i < tempWordList.length; i++) {
        lowercaseWord = tempWordList[i].toLowerCase();
        lowercaseWord = lowercaseWord.trim();
        if (lowercaseWord != "") {
            if (lowercaseWord in frequentWordsCalc)
                frequentWordsCalc[lowercaseWord] += 1;
            else {
                frequentWordsCalc[lowercaseWord] = 1;
            }
        }

    }

    var sortFreqWords = [];
    for (var word in frequentWordsCalc)
        sortFreqWords.push([word, frequentWordsCalc[word]]);
    /*
    sortFreqWords.sort(function(a, b) {
        return b[0] - a[0];
    });
*/
    sortFreqWords.sort();
    var finalFreqWords = [];
    var alreadyUsedWords = [];
    for (var i = 0; i < (sortFreqWords.length > 10 ? 10 : sortFreqWords.length); i++) {
        maxLength = 0;
        var formattingString = "";
        var usedWord = "";
        for (var j = 0; j < sortFreqWords.length; j++) {
            if (sortFreqWords[j][1] > maxLength && !(alreadyUsedWords.includes(sortFreqWords[j][0]))) {
                formattingString = sortFreqWords[j][0] + "(" + sortFreqWords[j][1] + ")";
                maxLength = sortFreqWords[j][1];
                usedWord = sortFreqWords[j][0];
            }
        }
        alreadyUsedWords.push(usedWord);
        finalFreqWords.push(formattingString);
    }
    return {
        nChars: numberChars,
        nWords: numberWords,
        nLines: numberLines,
        nNonEmptyLines: numberLines - emptyLines,
        maxLineLength: maxLine,
        averageWordLength: avWordLen,
        palindromes: listOfPalindromes,
        longestWords: sortLongestWords,
        mostFrequentWords: finalFreqWords
    };
}

function isPalindrome(tstr) {
    tstr = tstr.toLowerCase();
    for (var i = 0, j = tstr.length - 1; i <= j; i++, j--) {
        if (tstr[i] != tstr[j])
            return false;
    }
    return true;
}
