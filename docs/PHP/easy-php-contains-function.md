---
id: easy-php-contains-function
title: Easy PHP contains function
tags:
  - PHP
  - fuction
---

If you want to search for a “word” (string) within text (string) you have ready built-in functions in PHP. But with my function you will make them a little easier to use and will work on previous versions of PHP.

So the built-in function for PHP 8+ is [str_contains](https://www.php.net/manual/en/function.strpos) and for PHP before version 8 – [strpos](https://www.php.net/manual/en/function.strpos), with strpos a lot more difficult to use. It also has a mode – case sensitive comparison or not (default is case insensitive).

Here is a function that will use these built-in functions but in an easier way. It returns true if the string contains your search word, and false if it doesn’t (also false if any of the params passed is null, requirement in PHP 8+). This way you can use it in your IF statements easy.

``` jsx title="PHP"
<?php

/**
 * Checks if a $string contains $piece. Returns bool. Compatible across PHP 7 and 8+ versions. Returns false if either of the params is null
 *
 * @param string $string The string that needs searching.
 * @param string $piece What you are searching for.
 * @param bool $case_sensitive Whether or not to perform a case sensitive check
 *
 * @return bool
 */
function contains($string, $piece, $case_sensitive = false) : bool {
    if ($piece === null || $string === null) {
        return false;
    }

    // Handle case sensitivity
    if (!$case_sensitive) {
        $string = strtolower($string);
        $piece = strtolower($piece);
    }

    // Use str_contains if PHP 8+, otherwise fallback to strpos
    if (PHP_MAJOR_VERSION >= 8) {
        return str_contains($string, $piece);
    } else {
        return strpos($string, $piece) !== false;
    }
}
```

Here is an example of how to use it

``` jsx
$text = 'I want freedom in the pursuit for happiness';

$search_for_word = 'Happiness';

var_dump((contains($text, $search_for_word))); // true

var_dump((contains($text, $search_for_word, true))); // false

```

Enjoy!
