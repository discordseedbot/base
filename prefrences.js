module.exports = 
{
	prefix: {
		default: "s!",
		dev: "s~",
		music: "s?",
		math: "s!math",
		dmoj: "s!dmoj",
		youtube: "s!yt"
	},
	token:
	{
		enviroment: false,
		directory: "./secret/",
		filename: "token.json",
		developer:
		{
			directory: "./secret/",
			filename: "token.dev.json",
		}
	},
	admin: [
		"488187472514252811"
	],
	cache:
	{
		interval: 600, //Measured in milliseconds
	},
	discord:
	{
		loginRetryAttempts: 2,
		attemptTimeout: 15000 // Measures in milliseconds
	},
	alert:
	{
		enable: true,
		developer:
		{
			error: "0",
			notification: "0",
			unauth: "0",
		},
		userspace:
		{
			error: "0",
			notification: "0",
		},
		default:
		{
			error: "0",
			notification: "0",
		}
	},
	localization: {
		name: "tetrabot",
		website: "https://seedbot.xyz?brand=tetra",
		contact: "tetrabot@dariox.club"
	}
}