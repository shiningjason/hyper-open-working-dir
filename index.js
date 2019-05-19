const os = require('os')
const { execSync } = require('child_process')
const electron = require('electron')

let _activePid

const getProcessWorkingDir = pid => {
  try {
    return execSync(`lsof -a -p ${pid} -d cwd -Fn | tail -1`)
      .toString()
      .replace(/^n(.*)\n$/, '$1')
  } catch (e) {}
}

const getDefaultWorkingDir = () => {
  const homeDir = os.homedir()
  const dir = electron.app.config.getConfig().defaultWorkingDir
  return dir ? dir.replace(/^~(\/|$)/, `${homeDir}$1`) : homeDir
}

const getWorkingDir = () =>
  (_activePid && getProcessWorkingDir(_activePid)) || getDefaultWorkingDir()

exports.middleware = ({ getState }) => next => async action => {
  next(action)
  switch (action.type) {
    case 'SESSION_ADD': {
      window.rpc.emit('setActivePid', action.pid)
      break
    }
    case 'SESSION_SET_ACTIVE': {
      const session = getState().sessions.sessions[action.uid]
      if (session) window.rpc.emit('setActivePid', session.pid)
      break
    }
  }
}

exports.onWindow = window => {
  window.rpc.on('setActivePid', pid => {
    _activePid = pid
  })
}

exports.decorateSessionOptions = options => ({
  ...options,
  cwd: getWorkingDir()
})
