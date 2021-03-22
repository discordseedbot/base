/**
 * Module Manifest
 * @module Manifest
 * @property {String} name - Alphanumberic Case Sensitive String
 * @property {String} version
 * @property {module:Manifest.Type} type
 * @property {module:Manifest.Author} author
 * @property {module:Manifest.Author[]} contributers
 * @property {String} contact - Contact E-Mail Address
 * @property {String} homepage - HTTP(S) Address
 * @property {string} main - Default; <code>index.js</code>
 */

/**
 * @typedef {String} module:Manifest.Author
 * @description Formatted as;<br><code>Example Name (http://domain.tld) [username@domain.tld]</code>
*/

/**
 * @typedef {String} module:Manifest.Type
 * @description Can either be <code>generic</code>, <code>bot</code>, or <code>library</code>
 */