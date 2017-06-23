const golb = require('../');

const config = {
    webPort: 3000
};

golb.start(config).catch(e => console.error(e.message));