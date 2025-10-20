/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
import {dataset, projectId} from './src/sanity/env'

export default defineCliConfig({ 
    api: { projectId, dataset },
    deployment: {
        appId: "cps4oxpc2w0vr0o4f06jxze0"
    }
})
