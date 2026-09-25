import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat config directly, so no FlatCompat wrapper.
const eslintConfig = [
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
