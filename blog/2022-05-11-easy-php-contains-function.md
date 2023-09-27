---
slug: easy-php-contains-function
title: Easy PHP "contains" function
description: Easy to use PHP "contains" function which works for all PHP versions
image: https://waf-demo.sunwellsolutions.com/assets/images/logo2.webp
keywords: [php, contains, function]
authors: djo
tags: [php, php functions]
---

If you want to search for a “word” (string) within text (string) you have ready built-in functions in PHP. But with my function you will make them a little easier to use.

So the built-in function for PHP 8+ is [str_contains](https://www.php.net/manual/en/function.strpos) and for PHP before version 8 – [strpos](https://www.php.net/manual/en/function.strpos), with strpos a lot more difficult to use. It also has a mode – case sensitive comparison or not (default is case insensitive).

Here is a function that will use these built-in functions but in an easier way. It returns true if the string contains your search word, and false if it doesn’t (also false if any of the params passed is null, requirement in PHP 8+). This way you can use it in your IF statements easy.

``` jsx title="PHP"
/**
 * Checks if a $string contains $piece. Returns bool. Compatible across PHP 7 and 8+ versions. Returns false if either of the params is null
 *
 * @param piece      $piece What you searching for.
 * @param string      $string The string that needs searching.
 * @param bool        $case_sensitive Whether or not to perform a case sensitive check
 *
 */
function contains($piece, $string, $case_sensitive = false) : bool {
    if (PHP_MAJOR_VERSION >= 8) {
        if ($piece === null or $string === null) {
            return false;
        }
        if (!$case_sensitive) {
            return (str_contains(strtolower($string), strtolower($piece))) ? true : false; 
        } else {
            return (str_contains($string, $piece)) ? true : false;
        }
    } else {
        if (!$case_sensitive) {
            return (strpos(strtolower($string), strtolower($piece)) !== false) ? true : false;
        } else {
            return (strpos($string, $piece) !== false) ? true : false;
        }
    }
}
```

:::tip
str_contains natively has first argument to be the string you search in and second argument the string you want to search for. In this function they are reveresed. if you'd like them in the way str_contains is used, just reverse their place like this ```contains(string $string, string $piece, $case_sensitive = false)```
:::

Here is an example of how to use it

``` jsx
$text = 'I want freedom in the pursuit for happiness';

$search_for_word = 'Happiness';

if (contains($search_for_word, $text)) {
    echo "Word found";
    // Do something else
}
```

Enjoy!