// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    loader: {
        // Packages that should be registered with the loader in each testing environment
        packages: [
            { name: 'src', location: 'src' },
            { name: 'test', location: 'test' }
        ]
    },

    // Non-functional test suite(s) to run in each browser
    suites: ['test/animator', 'test/animations'],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: [ /* 'myPackage/tests/functional' */ ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|node_modules)\//
});
