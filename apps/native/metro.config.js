const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

const { makeMetroConfig } = require('@rnx-kit/metro-config')
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks')

const symlinkResolver = MetroSymlinksResolver()

const requestResolver = (context, moduleName, platform, realName) => {
	// patch for unpatched dependencies
	// e.g. react-native-version-check-expo
	if (moduleName === '@unimodules/core') {
		const expoModules = 'expo-modules-core'
		return symlinkResolver(context, expoModules, platform, expoModules)
	}

	return symlinkResolver(context, moduleName, platform, realName)
}

module.exports = {
	...defaultConfig,
	...makeMetroConfig({
		projectRoot: __dirname,
		resolver: {
			resolveRequest: requestResolver,
		},
	}),
}

// // Learn more https://docs.expo.dev/guides/monorepos
// const { getDefaultConfig } = require('expo/metro-config')
// const { FileStore } = require('metro-cache')
// const path = require('path')

// const projectRoot = __dirname
// const workspaceRoot = path.resolve(projectRoot, '../..')

// const config = getDefaultConfig(projectRoot)

// // #1 - Watch all files in the monorepo
// config.watchFolders = [workspaceRoot]
// // #2 - Try resolving with project modules first, then workspace modules
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),
// ]
// // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
// config.resolver.disableHierarchicalLookup = true

// // config.resolver.extraNodeModules = {
// //   modules: workspaceRoot,
// // }

// console.log(config)

// // Use turborepo to restore the cache when possible
// // config.cacheStores = [
// //   new FileStore({ root: path.join(projectRoot, 'node_modules', '.cache', 'metro') }),
// // ]

// module.exports = config
