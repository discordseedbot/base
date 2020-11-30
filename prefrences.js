module.exports = {
	prefix: {
		default: "s!",
		dev: "s~",
		music: "s?",
		math: "s!math",
		dmoj: "s!dmoj",
		youtube: "s!yt"
	},
	core: {
		stats: {
			timer: 600,
			loginRetryTimer: 1
		},
		tokenManager: {
			enviromentVariable: false,
			location: "aboveRoot",
			filename: "token",
			debug: {
				location: "aboveRoot",
				filename: "canary",
			}
		},
		developerAlerts: {
			enable: true,
			override: {
				error: true
			},
			developer: {
				error: "720187904705691689",
				notifications: "720187664120152114",
				unauthAccess: "720566055445069864"
			},
			userspace: {
				error: "72018793426282a0955",
				notifications: "720187870933024829"
			},
			default: {
				error: "781453506372304996",
				notifications: "781453582263255041"
			}
		},
		localization: {
			name: "SeedBot",
			website: "https://seedbot.xyz",
			contact: "contact@dariox.club"
		},
		storage: {
			location: `${__dirname}/store.json`,
			cacheTimerInterval: 2000,
		}
	}
}
