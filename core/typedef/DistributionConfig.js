/**
 * Stored in <code>./seedbot.config.json</code>
 * @module DistributionConfig
 * @property {String} name Alphanumberic String
 * @property {String} version
 * @property {String[]} contributers Formatted as <code>Name [username@domain.tld] (protocol://domain.tld)</code>
 * @property {String} homepage Formatted as <code>protocol://domain.tld</code>
 * @property {module:DistributionConfig.Localization} localization
 * @property {module:DistributionConfig.BuildMetadata} build
 */

/**
 * @typedef {Object} module:DistributionConfig.Localization
 * @property {String} name
 * @property {String} website
 * @property {String} contact
 * @property {String} inviteLink
 */

/**
 * @typedef {Object} module:DistributionConfig.BuildMetadata
 * @property {Number} id
 * @property {Number} timestamp Milliseconds since <code>1st Jan 1970</code>
 */