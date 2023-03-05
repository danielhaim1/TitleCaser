<?php

/**
 * Converts a string to title case, which means capitalizing the first letter of each word, except for certain words like "a", "an", "the", and short prepositions and conjunctions. The function also handles special cases like hyphenated words and abbreviations.
 *
 * @param string $str The string to convert to title case
 * @param array $options An optional array of options to customize the behavior of the function
 * @return string The input string converted to title case
 * @throws TypeError if the input is not a string or if the options are invalid
 */

 if (!function_exists("toTitleCase")) {
    function toTitleCase($str, $options = null)
    {
        $uppercaseRegex = "/[A-Z]/";
        $abbreviationRegex = "/\../";

        // Check if the input is a string, and if the options are either null or an array
        try {
            if (!is_string($str)) {
                throw new TypeError("Invalid input: input must be a string.");
            }

            if (!isset($options)) {
                $options = [];
            } elseif (!is_array($options)) {
                throw new TypeError(
                    "Invalid options: options must be an object."
                );
            }
            // Set up default and Chicago styles of options
            $defaultOptions = [
                "neverCapitalized" => ["etc.", "i.e.", "e.g.", "vs.", "etc"],
                "shortConjunctions" => [
                    "and",
                    "as",
                    "but",
                    "for",
                    "if",
                    "nor",
                    "or",
                    "so",
                    "yet",
                ],
                "articles" => ["a", "an", "the"],
                "shortPrepositions" => [
                    "as",
                    "at",
                    "by",
                    "for",
                    "in",
                    "of",
                    "off",
                    "on",
                    "per",
                    "to",
                    "up",
                    "via",
                ],
            ];

            $chicagoOptions = [
                "neverCapitalized" => [
                    "a",
                    "an",
                    "the",
                    "and",
                    "but",
                    "or",
                    "for",
                    "nor",
                    "on",
                    "at",
                    "to",
                    "from",
                    "by",
                    "with",
                    "in",
                    "of",
                ],
                "shortConjunctions" => [],
                "articles" => ["a", "an", "the"],
                "shortPrepositions" => [
                    "as",
                    "at",
                    "by",
                    "for",
                    "in",
                    "of",
                    "on",
                    "to",
                    "up",
                ],
            ];
            // Merge the options based on the input style
            $mergedOptions =
                isset($options["style"]) && $options["style"] === "chicago"
                ? array_merge($defaultOptions, $chicagoOptions)
                : array_merge($defaultOptions, $options);
            // Define a function that capitalizes a single word based on the input options
            $capitalizeWord = function ($word) use (
                $mergedOptions,
                $uppercaseRegex,
                $abbreviationRegex
            ) {
                // Handle short conjunctions, articles, and prepositions
                if (
                    in_array($word, $mergedOptions["shortConjunctions"]) ||
                    in_array($word, $mergedOptions["articles"]) ||
                    in_array($word, $mergedOptions["shortPrepositions"])
                ) {
                    return strtolower($word);
                    // Handle words with colons
                } elseif (strpos($word, ":") !== false) {
                    $words = explode(" ", $word);
                    $nextWordIndex = array_search($word, $words) + 1;
                    if ($nextWordIndex < count($words)) {
                        $words[$nextWordIndex] = ucfirst(
                            $words[$nextWordIndex]
                        );
                    }
                    return ucfirst($word);
                    // Handle hyphenated words
                } elseif (strpos($word, "-") !== false) {
                    $hyphenatedWord = explode("-", $word);
                    $capitalizedHyphenatedWord = array_map(
                        function ($hyphenatedWord, $index) use (
                            $uppercaseRegex,
                            $abbreviationRegex
                        ) {
                            if (
                                $index === count($hyphenatedWord) - 1 &&
                                preg_match(
                                    '/^(IV|VI{0,3}|IX|XI{0,3}|XIV|XV|XVI{0,2}|XVII|XIX|[IVX]+)$/i',
                                    $hyphenatedWord
                                )
                            ) {
                                return strtoupper($hyphenatedWord);
                            } else {
                                return ucfirst(strtolower($hyphenatedWord));
                            }
                        },
                        $hyphenatedWord,
                        array_keys($hyphenatedWord)
                    );
                    return implode("-", $capitalizedHyphenatedWord);
                    // Handle all other words
                } else {
                    if (
                        preg_match($uppercaseRegex, substr($word, 1)) ||
                        preg_match($abbreviationRegex, substr($word, 1))
                    ) {
                        return $word;
                    } elseif (
                        in_array(
                            $word,
                            $mergedOptions["neverCapitalized"],
                            true
                        )
                    ) {
                        return strtolower($word);
                    } else {
                        return ucfirst(strtolower($word));
                    }
                }
            };            

            // Capitalize each word in the input string, ignoring the first and last words
            $words = explode(" ", $str);
            $capitalizedWords = array_map(
                function ($word, $index) use (
                    $capitalizeWord,
                    $words,
                    $mergedOptions
                ) {
                    if ($index === 0 || $index === count($words) - 1) {
                        return $capitalizeWord(ucfirst($word));
                    } else {
                        return $capitalizeWord($word);
                    }
                },
                $words,
                array_keys($words)
            );
            return implode(" ", $capitalizedWords);
        } catch (Throwable $error) {
            throw new TypeError("Invalid argument: " . $error->getMessage());
        }
    }
}


// Example usage
// $string = 'Converts a string to title case, which means capitalizing the first letter of each word, except for certain words like "a", "an", "the", and short prepositions and conjunctions. The function also handles special cases like hyphenated words and abbreviations';
// $titleCaseString = toTitleCase($string);
// echo $titleCaseString;

?>