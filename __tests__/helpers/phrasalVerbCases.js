export const phrasalVerbCases = [
  ["capitalizes the particle in find out", "find out what matters", "Find Out What Matters"],
  ["capitalizes the particle in sign up", "sign up for updates", "Sign Up for Updates"],
  ["capitalizes the particle in log in", "log in to your account", "Log In to Your Account"],
  ["capitalizes the particle in turn off", "turn off the lights", "Turn Off the Lights"],
  ["capitalizes the particle in shut down", "shut down the system", "Shut Down the System"],
  ["capitalizes the particle in back up", "back up your files", "Back Up Your Files"],
  ["capitalizes the particle in check out", "check out the guide", "Check Out the Guide"],
  ["capitalizes the particle in break down", "break down the problem", "Break Down the Problem"],
  ["capitalizes the particle in carry on", "carry on with the work", "Carry On With the Work"],
  ["keeps out lowercase when it is not a phrasal-verb particle", "an issue out of scope", "An Issue out of Scope"],
];

export function runPhrasalVerbTitleCaseTests(TitleCaser, style) {
  describe(`TitleCaser ${style.toUpperCase()} - Phrasal Verbs`, () => {
    test.each(phrasalVerbCases)("%s", (_description, input, expected) => {
      const titleCaser = new TitleCaser({ style });

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });
  });
}
