# hyper-open-working-dir

Open [Hyper](https://hyper.is/) with working directory.  
Only compatible with macOS, Linux.

## Usage
1. Open `~/.hyper.js`.
2. Add `hyper-open-working-dir` to `plugins` list.

## Configuration

### Change default working directory

Add `defaultWorkingDir` (`string`) to `config` in `~/.hyper.js`.

```js
// ~/.hyper.js
module.exports = {
  config: {
    defaultWorkingDir: '~/Documents/workspace',
  }
}
```
