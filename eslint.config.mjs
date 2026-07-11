import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Full a11y ruleset — the old site shipped with zero interaction
  // accessibility; this keeps the rebuild honest. eslint-config-next already
  // registers the plugin, so add only the recommended rules.
  { rules: jsxA11y.flatConfigs.recommended.rules },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy static site — replaced by this app at cutover, not linted.
    "tjs-site/**",
  ]),
]);

export default eslintConfig;
