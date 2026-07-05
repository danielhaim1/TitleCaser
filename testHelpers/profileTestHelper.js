const { TitleCaser } = require("../src/TitleCaser");
const liteBundle = require("../dist/lite/titlecaser.module.js");
const fullBundle = require("../dist/full/titlecaser.module.js");

const supportedDictionaryProfiles = Object.freeze(["lite", "full"]);
const bundledProfileTitleCasers = Object.freeze({
  lite: liteBundle.TitleCaser,
  full: fullBundle.TitleCaser,
});

function createProfileTitleCaser(profile, options = {}) {
  return new TitleCaser({
    style: "wikipedia",
    ...options,
    dictionaryProfile: profile,
  });
}

function runProfileCase(profile, input, expected, options = {}) {
  const titleCaser = createProfileTitleCaser(profile, options);
  expect(titleCaser.toTitleCase(input)).toBe(expected);
}

function runProfileCases(cases, options = {}) {
  cases.forEach(({ profile, input, expected }) => {
    runProfileCase(profile, input, expected, options);
  });
}

function createBundledProfileTitleCaser(profile, options = {}) {
  const BundledTitleCaser = bundledProfileTitleCasers[profile];

  if (!BundledTitleCaser) {
    throw new TypeError(`Unsupported bundled profile: ${profile}`);
  }

  return new BundledTitleCaser({
    style: "wikipedia",
    ...options,
  });
}

module.exports = {
  supportedDictionaryProfiles,
  createProfileTitleCaser,
  createBundledProfileTitleCaser,
  runProfileCase,
  runProfileCases,
};
