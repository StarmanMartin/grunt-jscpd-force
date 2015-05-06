Grunt JSCPD
===========

`jscpd` is a tool for detect copy/past "design pattern" in JavaScript and CoffeeScript code.

Installation
------------

```bash
npm install grunt-jscpd-force
```

```javascript
// Gruntfile.js
grunt.loadNpmTasks('grunt-jspcpd-force');
```

Usage
-----

Create a "jscpd" section in your Gruntfile
```javascript
// Gruntfile.js
grunt.initConfig({
  jscpd: {
    javascript: {
      path: 'lib/js/',
      exclude: ['globalize/**', 'plugins/**']
    }
  }
}
```

Example with coffee option
```coffeescript
// Gruntfile.js
grunt.initConfig({
  jscpd: {
    coffeescript: {
      options: {
        coffee: true
      },
      path: 'src/coffee/'
    }
  }
}
```

Options
-------

### Data

#### path
Type: `String`

Path to source folder

#### exclude
Type: `String|Array` - optional

Glob pattern for files to exclude from the analysis. 

#### output
Type: `String` - optional 

Path to the output file

#### exclude
Type: `String` or `Array` - optional

Path to directory or files to ignore

### Options

#### coffee
Type: `Boolean` - `default: false`

Source type is in CoffeeScript language

#### min-lines
Type: `Number` - `default: 5`

Min size of duplication in code lines to include it in report

#### min-tokens
Type: `Number` - `default: 70`

Min size of duplication in code tokens

Thanks
------

Thanks to [Andrey Kucherenko](https://github.com/kucherenko) to [jscpd](https://github.com/kucherenko/jscpd)




