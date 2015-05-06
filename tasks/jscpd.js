var jscpd = require('jscpd');
var path = require('path');

module.exports = function (grunt) {

    function ensureCleanPath(options) {
        if (typeof options.path === "string" && options.path.length > 0) {
            while (options.path.substr(-1) === "/") {
                options.path = options.path.substr(0, options.path.length - 1);
            }
        } else if (!options.path) {
            options.path = ".";
        }
    }

    function ensureOutputDir(options) {
        if (options.output) {
            options.output = grunt.template.process(options.output);
            var path = require("path");
            var destDir = path.dirname(options.output);
            if (!grunt.file.exists(destDir)) {
                grunt.file.mkdir(destDir);
            }
        }
    }

    function failIfTooMuchDuplicateLines(threshold, resultMap) {
        if (threshold) {
            if (resultMap.numberOfDuplication > threshold) {
                grunt.log.error("Error: too much duplicated lines");
                return false;
            }
        }
    }

    function failIfDuplicateLines(resultMap) {
            return resultMap.numberOfFiles === 0;
    }

    grunt.registerMultiTask('jscpd', 'Find copy/paste', function () {
        var done = this.async();
        var options = this.options({
            coffee: false,
            force: false
        });

        var isTrue = true;
        var isToBreak =  true;
        var cwd = this.data.cwd;
        this.data.cwd = undefined;
        options.force |= this.data.force;

        if (!Array.isArray(this.data.path)) this.data.path = [this.data.path];
        for (var i = 0; i < this.data.path.length; ++i) {
            options.path = path.join(cwd, this.data.path[i]);
            options.exclude = this.data.exclude || null;
            options.output = this.data.output;

            if (this.data.exclude === undefined) {
                options.exclude = null;
            } else {
                options.exclude = this.data.exclude;
            }

            ensureCleanPath(options);
            ensureOutputDir(options);

            try {
                var instance = new jscpd();
                var result = instance.run(options);
                isTrue &= failIfTooMuchDuplicateLines(options.threshold, result.map);
                isToBreak &= failIfDuplicateLines(result.map);
            } catch (err) {
                grunt.log.error("Error: " + err.message);
                throw err;
            }
        }

        if(!isToBreak && !options.force){
            grunt.log.error("Error: too much duplicate lines");
            done(false);
            return false;
        }

        done(isTrue);
        return isTrue;

    });

};
