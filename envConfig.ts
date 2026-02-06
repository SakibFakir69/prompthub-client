
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd(); /// CURRENT WORKING DIRECTORY
console.log(projectDir , ' env')
loadEnvConfig(projectDir);

// ts init