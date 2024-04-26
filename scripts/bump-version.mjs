import { execSync } from 'child_process';

const bumpType = process.argv[2];

if (!['patch', 'minor', 'major'].includes(bumpType)) {
  throw new Error(`Invalid bump type: "${bumpType}". Use "patch", "minor" or "major"`);
}

execSync(`npm version ${bumpType} --save`, { stdio: 'inherit' });

const { version } = require('../package.json');
console.log(`Bumped to version "${version}"`);

execSync(`git tag v${version} -m v${version}`, { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
