function getMode(mode) {
  let modes = mode ? mode.split("-") : null;
  return modes;
}
module.exports = getMode;
