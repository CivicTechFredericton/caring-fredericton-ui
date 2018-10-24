module.exports = {
  "port": 8080,
  "files": ["./build/**/*.*"],
  "server": {
    "baseDir": "./build",
    "middleware" : {
      1 : require('compression')(),
      2 : require('connect-history-api-fallback')({ index: '/index.html', verbose: true })
    }
  }
}
