# Enigma.js
<img src="https://github.com/igorbezsmertnyi/enigma-js/blob/master/src/logo.jpg?raw=true" width="190px" alt="Enigma.js">
</br>
Enigma machine algorithm in javascript
</br>

[Link to Demo](https://igorbezsmertnyi.github.io/enigma-js/)

## About Enigma Machine

The Enigma machines were a series of electro-mechanical rotor cipher machines developed and used in the early- to mid-twentieth century to protect commercial, diplomatic and military communication. Enigma was invented by the German engineer Arthur Scherbius at the end of World War I. Early models were used commercially from the early 1920s, and adopted by military and government services of several countries, most notably Nazi Germany before and during World War II. Several different Enigma models were produced, but the German military models, having a plugboard, were the most complex. However, Japanese and Italian models were also in use.

***

Enigma.js this is implementation of Enigma Machine algorithm in javascript
<br/>

<img src="https://github.com/igorbezsmertnyi/enigma-js/blob/master/src/Enigma-action.jpg?raw=true" width="350px" />

Enigma machine has 3 rotors and one reflector, ```onKeyDown``` event starting the algorithm works. The first ```keyCode``` is converted to a letter and this letter going to
##### Right Rotor
<br/>
<a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L92">
<code>r_1 = (find(arr_alp, TxEncrypt) + find(arr_alp, TxKey3.value)) % 26</code>
</a>
<br/>
convert step. In the next step, converted in the first step letter, going to the

##### Middle Rotor

<br/>
<a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L93">
<code>r_2 = (find(arr_alp, rotor_1[r_1]) + Module(find(arr_alp, TxKey2.value), find(arr_alp, TxKey3.value))) % 26</code>
</a>
<br/>
and the next to

##### Left Rotor

<br/>
<a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L94">
<code>r_3 = (find(arr_alp, rotor_2[r_2]) + Module(find(arr_alp, TxKey1.value), find(arr_alp, TxKey2.value))) % 26</code>
</a>
<br/>
After all, their steps of converts are done, a letter is going to

##### Reflector

<a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L95">
<code>refl = (Module(find(arr_alp, rotor_3[r_3]), find(arr_alp, TxKey1.value))) % 26</code>
</a>
<br/>
and go back across <a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L96">Left Rotor</a>, <a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L97">Middle Rotor</a> and <a href="https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L98">Right Rotor</a>

On first ```keyDown event```, ```r_1``` got the first letter and first value from ```TxKey3``` select and returned, they index in the [```arr_alp```](https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L17) _regular alphabet_. In the second ```r_2``` got ```r_1``` value and finding an index of returned from [```rotor_1```](https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L20) alphabet, and sum it with ```Module``` of ```TxKey2``` and ```TxKey3``` indexes, ```26``` is the count of letters in the alphabet. In the third ```r_3``` got ```r_2``` index from [```rotor_2```](https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L19) alphabet and found index of this letter in the regular alphabet and was summing it with ```Module``` of ```TxKey1``` select and ```TxKey2``` select indexes from the _regular alphabet_. All next iteration are works similar to this there steps.

The [```find```](https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L32) function returning the index of ```value``` from passed ```array```
<br/>
```const find = (array, value) => {```
<br/>
if ```value``` not found, function returned ```-1```

The [```Module```](https://github.com/igorbezsmertnyi/enigma-js/blob/master/js/cipher.js#L40) function returning difference between to indexes, when indexes are equal ```0```, function returned ```26```. This need for prevent using letters from outside the limits ```keyCode``` values.

***
