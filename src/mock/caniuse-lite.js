const fakeObj = (anyPropertyValue) => new Proxy({}, { get() { return anyPropertyValue } })

module.exports = {
	features: {},
	feature: () => ({
		stats: fakeObj(fakeObj("y"))
	})
}