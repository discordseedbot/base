module.exports = {
	"prefix": {
		"default": "s!",
		"dev": "s~",
		"music": "s?",
		"math": "s!math",
		"dmoj": "s!dmoj",
		"youtube": "s!yt"
	},
	"core": {
		"stats": {
			"timer": 600,
			"loginRetryTimer": 1
		},
		"tokenManager": {
			"enviromentVariable": false,
			"location": "aboveRoot",
			"filename": "token",
			"debug": {
				"location": "aboveRoot",
				"filename": "canary",
			}
		},
		"localization": {
			"name": "SeedBot",
			"website": "https://seedbot.xyz",
			"contact": "contact@dariox.club"
		}
	}
}
